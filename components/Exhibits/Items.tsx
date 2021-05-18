import { useEffect, useReducer, useCallback, useRef, memo } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  ItemDBValue,
  ItemTuple,
  ItemMap,
  ItemValue,
  ExhibitImports,
  ExhibitImport,
} from "../../lib/Types";
import Item from "./Item";
import { TextInputWithButton, ValidationMessage } from "../FormControls";
import { importItem } from "../../lib/Utils";
import { firestore, logEvent, timestamp } from "../../lib/Firebase";
import { isValidUrl, urlsEqual } from "../../lib/Utils";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Items = ({
  exhibitId,
  onItemSelected,
  onItemDeleted,
  maxChars = 1000,
}: {
  exhibitId: string;
  onItemSelected: (item: ItemTuple) => void;
  onItemDeleted: (item: ItemTuple) => void;
  maxChars?: number;
}) => {
  const itemsRef = firestore.collection(`exhibits/${exhibitId}/items`).orderBy("created", "asc");
  const [items] = useCollectionData(itemsRef, { idField: "id" });

  type State = {
    items: ItemMap;
    initialised: boolean;
    selectedItem: string | null;
    syncing: boolean;
    importing: boolean;
    lastImportedItem: string | null;
  };

  const initialState: State = {
    items: new Map<string, ItemValue>(),
    initialised: false,
    selectedItem: null,
    syncing: false,
    importing: false,
    lastImportedItem: null,
  };

  type Action =
    | { type: "sync"; payload: ItemDBValue[] }
    | { type: "import"; payload: string }
    | { type: "importComplete"; payload: string }
    | { type: "delete"; payload: [string] }
    | { type: "select"; payload: string }
    | { type: "error"; payload: string }
    | { type: "reset" };

  const reducer = (state: State, action: Action): State => {
    let batch: any;

    if (action.type === "reset") {
      return initialState;
    }

    // sync is called whenever new items are received from the server
    // don't allow any new operations until sync is complete
    if (action.type !== "sync" && action.type !== "error" && state.syncing) {
      // eslint-disable-next-line no-console
      console.warn("syncing, rejected", action.type);
      return {
        ...state,
      };
    }

    switch (action.type) {
      case "sync": {
        // console.log("sync");

        const items: ItemDBValue[] = [...action.payload];
        const itemsMap: ItemMap = new Map(
          items.map((item: ItemDBValue) => [item.id, { ...item }] as ItemTuple)
        );

        return {
          ...state,
          initialised: true,
          syncing: false,
          items: itemsMap,
          importing: false,
        };
      }
      case "import": {
        // console.log("import");

        importItem(action.payload)
          .then(async (result: ExhibitImports) => {
            batch = firestore.batch();

            result.forEach((exhibitImport: ExhibitImport) => {
              // if it's not already imported
              if (
                !Array.from(state.items).find(
                  (i) => i[1].url === exhibitImport.url
                )
              ) {
                const docRef = firestore
                  .collection(`exhibits/${exhibitId}/items/`)
                  .doc();
                batch.set(docRef, {
                  ...exhibitImport,
                  created: timestamp(),
                });

                // log event
                logEvent("import_iiif", {
                  url: exhibitImport.url,
                });
              }
            });

            await batch.commit();
            dispatch({ type: "importComplete", payload: action.payload });
          })
          .catch((err) => {
            dispatch({ type: "error", payload: err });
          });

        return {
          ...state,
          syncing: true,
          importing: true,
        };
      }
      case "importComplete": {
        return {
          ...state,
          importing: false,
          lastImportedItem: action.payload,
        };
      }
      case "error": {
        // update formik status
        setStatus({
          url: action.payload,
        });
        return {
          ...state,
          importing: false,
          syncing: false,
        };
      }
      case "delete": {
        // console.log("delete");
        const itemsToDelete: string[] = action.payload;

        batch = firestore.batch();

        Array.from(state.items).forEach((item: ItemTuple) => {
          const [id] = item;
          const docRef = firestore.doc(`exhibits/${exhibitId}/items/${id}`);
          if (itemsToDelete.includes(id)) {
            // delete
            batch.delete(docRef);
          }
        });

        batch.commit();

        return {
          ...state,
          syncing: true,
        };
      }
      case "select": {
        // console.log("select");
        return {
          ...state,
          selectedItem: action.payload,
        };
      }
      default: {
        throw new Error();
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [state, dispatch] = useReducer(useCallback(reducer, []), initialState);

  const useItems = ({ items }) => {
    useEffect(() => {
      if (!items) {
        dispatch({ type: "reset" });
      } else {
        dispatch({ type: "sync", payload: items });
      }
    }, [items]);
  };

  useItems({ items });

  const listRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const highlightNewItem = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setTimeout(() => {
        if (listRef.current) {
          const items: NodeListOf<HTMLDivElement> = listRef.current.querySelectorAll(
            ".item"
          );

          if (items.length) {
            const lastItem = items[items.length - 1];
            lastItem.classList.add("new");
            setTimeout(() => {
              lastItem.classList.remove("new");
            }, 1000);
          }
        }
      }, 100);
    }
  };

  useEffect(() => {
    // scroll to the bottom if a new item is added
    if (state.lastImportedItem) {
      highlightNewItem();
    }
  }, [state.lastImportedItem]);

  const ItemList = ({
    disabled = false,
    items,
  }: {
    disabled: boolean;
    items: ItemMap;
  }) => {
    return (
      <>
        {Array.from(items).map((item: ItemTuple) => {
          const [id] = item;
          return (
            <Item
              key={id}
              item={item}
              selected={state.selectedItem === id}
              onClick={() => {
                dispatch({ type: "select", payload: id });
                onItemSelected(item);
              }}
              onDelete={() => {
                dispatch({ type: "delete", payload: [id] });
                onItemDeleted(item);
              }}
            />
          );
        })}
        <div ref={bottomRef} />
      </>
    );
  };

  const MemoizedItemList = memo(ItemList);

  const validationSchema = Yup.object({
    url: Yup.string()
      .max(maxChars, `Please limit to ${maxChars} characters`)
      .test(
        "valid",
        "Please enter a valid, unique IIIF manifest URL",
        (value) => {
          const valid: boolean = isValidUrl(value);
          // && (
          //   // eslint-disable-next-line
          //   value.endsWith(".json") || /(?:\/|^)[^.\/]+$/.test(value)
          // );
          let duplicate: boolean = false;
          if (valid) {
            duplicate = Array.from(state.items).some((item: ItemTuple) => {
              return urlsEqual(item[1].url, value);
            });
          }
          return valid && !duplicate;
        }
      ),
  });

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    status,
    setStatus,
  } = useFormik({
    initialValues: {
      url: "",
    },
    enableReinitialize: true,
    validationSchema,
    validateOnChange: false,
    onSubmit: (
      values: any,
      {
        resetForm,
      }: {
        resetForm: any;
      }
    ) => {
      resetForm({ values: "" });
      dispatch({ type: "import", payload: values.url });
    },
  });

  return !state.initialised && state.syncing ? (
    <div>Loading...</div>
  ) : (
    <>
      <div
        ref={listRef}
        className="overflow-y-auto h-64"
        style={{
          minWidth: "50vw",
        }}
      >
        <div ref={listRef} className="import-items table w-full">
          <MemoizedItemList disabled={state.syncing} items={state.items} />
        </div>
      </div>
      {/* add a new item */}
      <form onSubmit={handleSubmit}>
        <div className="item edit flex flex-wrap p-4">
          <TextInputWithButton
            id="url"
            disabled={state.importing}
            buttonText="Import"
            placeholder={state.importing ? "importing..." : "IIIF Manifest URL"}
            buttonType="submit"
            inputValue={values.url}
            onChange={handleChange}
            errors={errors}
          />
          {status && (
            <div className="w-full">
              <ValidationMessage message={status.url.toString()} />
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default Items;
