import { useContext, useReducer, useCallback, useRef } from "react";
import AuthCheck from "../../../components/AuthCheck";
import { firestore, logEvent, timestamp } from "../../../lib/Firebase";
import { useRouter } from "next/router";
import { UserContext } from "../../../lib/Context";
import Message from "../../../components/Message";
import Metatags from "../../../components/Metatags";
import ExhibitFromPrivateId from "../../../components/Exhibits/ExhibitFromPrivateId";
import { AnnotationTuple, Exhibit, ItemTuple, PresentationType } from "../../../lib/Types";
import { useWindowSize } from "react-use";
import { md } from "../../../lib/Utils";
import { useTargetBlank } from "../../../lib/Hooks";
import LeftCol from "../../../components/Exhibits/LeftCol";
import RightCol from "../../../components/Exhibits/RightCol";
import Main from "../../../components/Exhibits/Main";
import Footer from "../../../components/Exhibits/Footer";
import Header from "../../../components/Exhibits/Header";
import Alert from "../../../components/Alert";
import UV from "../../../components/Exhibits/UV";
import Modal from "../../../components/Modal";
import Items from "../../../components/Exhibits/Items";
import SharePanel from "../../../components/Exhibits/Share";
import Metadata from "../../../components/Exhibits/Metadata";
import Annotations from "../../../components/Exhibits/Annotations";
import {
  SVGLinkButton,
  SVGLinkButtonText,
  Button,
  SVGButton,
} from "../../../components/FormControls";
import { sanitizeClient } from "../../../lib/Utils";
import SlidesIcon from "../../../public/svg/slides.svg";
import ScrollIcon from "../../../public/svg/scroll.svg";
import { EyeIcon, PlusIcon, ShareIcon } from "@heroicons/react/solid";

export default function EditExhibitPage(props) {
  return (
    <AuthCheck>
      <EditExhibit />
    </AuthCheck>
  );
}

function EditExhibit() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useContext(UserContext);

  type State = {
    detailsVisible: boolean;
    exhibit: Exhibit | null;
    initialised: boolean;
    item: string | null;
    itemsVisible: boolean;
    error: boolean;
    selectedAnnotation: any;
    selectedItem: string | null;
    shareVisible: boolean;
    syncing: boolean;
    target: string | null;
    targetLoading: boolean;
  };

  const initialState: State = {
    detailsVisible: false,
    exhibit: null,
    initialised: false,
    item: null,
    itemsVisible: false,
    error: false,
    selectedAnnotation: null,
    selectedItem: null,
    shareVisible: false,
    syncing: false,
    target: null,
    targetLoading: false,
  };

  type Action =
    | { type: "addItem" }
    | { type: "delete" }
    | { type: "hideDetails" }
    | { type: "hideItems" }
    | { type: "hideShare" }
    | { type: "error" }
    | { type: "reset" }
    | { type: "selectAnnotation"; payload }
    | { type: "selectItem"; payload: string | null }
    | { type: "setPresentationType"; payload: PresentationType }
    | { type: "showDetails" }
    | { type: "showDetails" }
    | { type: "showItems" }
    | { type: "showShare" }
    | { type: "sync"; payload: Exhibit }
    | { type: "targetChange"; payload: string | null }
    | { type: "targetLoad" }
    | { type: "updateDetails"; payload: any };

  const reducer = (state: State, action: Action): State => {
    if (action.type === "reset") {
      // console.log("reset");
      return {
        ...initialState,
      };
    }

    // sync is called whenever new data is received from the server
    // don't allow any new operations until sync is complete
    if (action.type !== "error" && action.type !== "sync" && state.syncing) {
      // console.log("syncing, rejected", action.type);
      return {
        ...state,
      };
    }

    let item: string | null;

    switch (action.type) {
      case "sync": {
        // console.log("sync");

        // set the initial default item if there's only one
        const itemsMap = action.payload.items;

        item = state.item;

        // if no item is set, default to the first item
        if (!state.item) {
          if (itemsMap.size) {
            item = Array.from(itemsMap)[0][1].url;
          }
        }

        return {
          ...state,
          initialised: true,
          syncing: false,
          exhibit: action.payload,
          item,
          target: item ? state.target : null,
        };
      }
      case "error": {
        return {
          ...state,
          error: true,
        };
      }
      case "selectAnnotation": {
        item = action.payload ? action.payload[1].partOf : state.item;

        return {
          ...state,
          item,
          selectedAnnotation: action.payload,
          // only set targetLoading to true if the new target isn't part of the current manifest
          targetLoading: action.payload
            ? action.payload[1].partOf !== state.item
            : false,
        };
      }
      case "selectItem": {
        return {
          ...state,
          selectedItem: action.payload,
        };
      }
      case "setPresentationType": {
        const presentationType: PresentationType = action.payload;

        // don't update id, annotations, items
        const { id, annotations, items, ...temp } = state.exhibit as Exhibit;

        firestore.doc(`exhibits/${id}`).set({
          ...temp,
          presentationType,
          modified: timestamp(),
        });

        return {
          ...state,
        };
      }
      case "addItem": {
        logEvent("add_item", {
          url: state.selectedItem,
        });

        return {
          ...state,
          item: state.selectedItem,
          selectedItem: null,
          selectedAnnotation: null,
          target: null,
          itemsVisible: false,
        };
      }
      case "targetChange": {
        return {
          ...state,
          target: action.payload,
        };
      }
      case "targetLoad": {
        return {
          ...state,
          targetLoading: false,
        };
      }
      case "showDetails": {
        return {
          ...state,
          detailsVisible: true,
        };
      }
      case "hideDetails": {
        return {
          ...state,
          detailsVisible: false,
        };
      }
      case "updateDetails": {        
        const values = action.payload;

        // don't update id, annotations, items
        const { id, annotations, items, ...temp } = state.exhibit as Exhibit;

        firestore.doc(`exhibits/${id}`).set({
          ...temp,
          ...values,
          modified: timestamp(),
        });

        // log event
        logEvent("update_details", { id });

        return {
          ...state,
          detailsVisible: false,
        };
      }
      case "showItems": {
        return {
          ...state,
          itemsVisible: true,
        };
      }
      case "hideItems": {
        return {
          ...state,
          selectedItem: null,
          itemsVisible: false,
        };
      }
      case "showShare": {
        // log event
        logEvent("open_share_panel", { id });

        return {
          ...state,
          shareVisible: true,
        };
      }
      case "hideShare": {
        return {
          ...state,
          shareVisible: false,
        };
      }
      default: {
        throw new Error();
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [state, dispatch] = useReducer(useCallback(reducer, []), initialState);

  const isMountedRef = useRef<HTMLDivElement>(null);

  const { width } = useWindowSize();

  const isUVVisible = (): boolean => {
    return width > md;
  };

  useTargetBlank("#description a", [state.exhibit]);

  if (user) {
    if (id === undefined) {
      return <Alert>Exhibit not found</Alert>;
    }
    return (
      <>
        <ExhibitFromPrivateId
          id={id as string}
          onLoad={(exhibit: Exhibit) => {
            dispatch({
              type: "sync",
              payload: exhibit,
            });
          }}
          onError={() => {
            dispatch({ type: "error" });
          }}
        />
        {/* sadly this doesn't work */}
        {/* <Head>
          <script src="https://unpkg.com/resize-observer-polyfill@1.5.1/dist/ResizeObserver.js"></script>
          <script src="/uv-assets/js/bundle.js"></script>
        </Head> */}
        <Metatags
          title={`${state.exhibit?.title} (edit)`}
          description={state.exhibit?.description}
        />
        <Header />
        <Main>
          <LeftCol>
            {state.error ? (
              <Alert>
                <p>Exhibit not found</p>
              </Alert>
            ) : state.syncing ? (
              <Message>Loading...</Message>
            ) : (
              state.exhibit && (
                <>
                  <div className="mr-4">
                    <div
                      role="navigation"
                      className="rounded p-4 cursor-pointer border-2 border-solid border-gray-300"
                      style={{
                        backgroundImage: "url('/svg/pencil.svg')",
                        backgroundPosition: "right 0.5rem top 0.5rem",
                        backgroundRepeat: "no-repeat",
                      }}
                      onClick={() => {
                        dispatch({ type: "showDetails" });
                      }}
                    >
                      <h1
                        className="pb-2 truncate text-xl"
                        title={state.exhibit.title}
                      >
                        {state.exhibit.title}
                      </h1>
                      <div
                        id="description"
                        className="text-gray-900 truncate pb-2"
                        title={state.exhibit.description}
                        dangerouslySetInnerHTML={sanitizeClient(state.exhibit.description)}
                      />
                    </div>
                    <div
                      className="mt-4 mb-4 bg-no-repeat bg-center h-6"
                      style={{
                        backgroundImage: `url(${'/svg/arrow-down.svg'})`,
                      }}
                    />
                  </div>
                  {state.target || state.exhibit.annotations.size >= 1 ? (
                    <Annotations
                      disabled={isUVVisible() && state.targetLoading}
                      selectedAnnotation={
                        state.selectedAnnotation
                          ? state.selectedAnnotation[0]
                          : null
                      }
                      exhibitId={state.exhibit.id}
                      target={state.target}
                      partOf={state.item}
                      onSelect={(anno: AnnotationTuple) => {
                        dispatch({ type: "selectAnnotation", payload: anno });
                      }}
                      onAdd={() => {
                        dispatch({ type: "selectAnnotation", payload: null });
                      }}
                      onUpdate={() => {
                        dispatch({ type: "selectAnnotation", payload: null });
                      }}
                      onDelete={() => {
                        dispatch({ type: "selectAnnotation", payload: null });
                      }}
                    />
                  ) : (
                    <div className="text-center">
                      Please add an item to annotate
                    </div>
                  )}
                </>
              )
            )}
          </LeftCol>
          <RightCol>
            {/* 
            todo: in future not all items will be IIIF manifests
            use selectedItem.format
            if it's a IIIF manifest set UV.partOf to selectedItem.url.
            if it's anything else, set UV.target 
          */}
            {isUVVisible() && state.exhibit && state.item && (
              <div className="pr-8 xl:pr-12">
                <div
                  className="fixed"
                  style={{
                    width: "46vw",
                    height: "80vh",
                  }}
                >
                  <UV
                    manifest={state.item}
                    resetOnTargetLost={false}
                    target={
                      state.selectedAnnotation
                        ? state.selectedAnnotation[1].target
                        : null
                    }
                    onTargetLoad={() => {
                      if (isMountedRef.current) {
                        // avoid state change on unmounted component
                        dispatch({ type: "targetLoad" });
                      }
                    }}
                    onTargetChange={(target: string | null) => {
                      if (isMountedRef.current) {
                        // avoid state change on unmounted component
                        dispatch({ type: "targetChange", payload: target });
                      }
                    }}
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
            )}
          </RightCol>
        </Main>
        <Footer>
          {/* {!isProduction && (
          <SVGLinkButton
            label="Exhibits"
            classes="mr-8"
            disabled={state.syncing}
            onClick={() => {
              history.push(`/exhibits`);
            }}
          >
            <IconBookOpenBlack className="fill-current w-5 h-5 mr-2" />
            {SVGLinkButtonText("Exhibits")}
          </SVGLinkButton>
        )} */}
          {state.exhibit && (
            <SVGLinkButton
              label="Add Item"
              primary
              classes="mr-8"
              disabled={state.syncing}
              onClick={() => {
                dispatch({ type: "showItems" });
              }}
            >
              <PlusIcon className="w-5 h-5 mr-2 text-primary-500 md:text-white" />
              <SVGLinkButtonText text="Add Item" />
            </SVGLinkButton>
          )}
          {/* {state.exhibit && !isProduction && (
          <SVGLinkButton
            label="Delete"
            classes="mr-8"
            disabled={state.syncing}
            onClick={deleteExhibit}
          >
            <IconTrashPrimary className="fill-current w-5 h-5 mr-2" />
            {SVGLinkButtonText("Delete")}
          </SVGLinkButton>
        )} */}
          {state.exhibit && (
            <>
              <SVGButton
                label="Switch to a slideshow presentation"
                off={state.exhibit.presentationType !== "slides"}
                classes="py-2 px-2 rounded-l-md rounded-r-none bg-primary-500 text-white"
                onClick={() => {
                  dispatch({ type: "setPresentationType", payload: "slides" });
                }}
              >
                <SlidesIcon className="w-5 h-5" />
              </SVGButton>
              <SVGButton
                label="Switch to a scrollytelling presentation"
                off={state.exhibit.presentationType !== "scroll"}
                classes="mr-8 py-2 px-2 rounded-r-md rounded-l-none bg-primary-500 text-white"
                onClick={() => {
                  dispatch({ type: "setPresentationType", payload: "scroll" });
                }}
              >
                <ScrollIcon className="w-5 h-5" />
              </SVGButton>
            </>
          )}
          {state.exhibit && state.exhibit.annotations.size > 0 && (
            <SVGLinkButton
              classes="mr-8"
              disabled={state.syncing}
              label="View"
              onClick={() => {
                const win = window.open(
                  `/exhibits/${state.exhibit?.publicId}`,
                  "_blank"
                );
                win!.focus();
              }}
            >
              <EyeIcon className="w-5 h-5 mr-2" />
              <SVGLinkButtonText text="Preview" />
            </SVGLinkButton>
          )}
          {state.exhibit && (
            <SVGLinkButton
              classes="mr-8"
              disabled={state.syncing}
              label="Share"
              onClick={() => {
                dispatch({ type: "showShare" });
              }}
            >

              <ShareIcon className="w-5 h-5 mr-2" />
              <SVGLinkButtonText text="Share" />
            </SVGLinkButton>
          )}
        </Footer>
        <Modal
          title="Details"
          show={state.detailsVisible}
          onClose={() => {
            dispatch({ type: "hideDetails" });
          }}
          body={
            state.exhibit && (
              <div
                className="overflow-y-auto h-64"
                style={{
                  minWidth: "40vw",
                }}
              >
                <Metadata
                  title={state.exhibit.title}
                  author={state.exhibit.author}
                  description={state.exhibit.description}
                  rights={state.exhibit.rights}
                  presentationType={state.exhibit.presentationType}
                  duplicationEnabled={state.exhibit.duplicationEnabled}
                  submitText="Update"
                  disabled={state.syncing}
                  onSubmit={(values) => {
                    dispatch({ type: "updateDetails", payload: values });
                  }}
                />
              </div>
            )
          }
        />
        <Modal
          title="Items"
          show={state.itemsVisible}
          onClose={() => {
            dispatch({ type: "hideItems" });
          }}
          body={
            <Items
              exhibitId={state.exhibit?.id}
              onItemSelected={(item: ItemTuple) => {
                dispatch({ type: "selectItem", payload: item[1].url });
              }}
              onItemDeleted={(item: ItemTuple) => {
                if (item[1].url === state.selectedItem) {
                  dispatch({ type: "selectItem", payload: null });
                }
              }}
            />
          }
          footer={
            <Button
              disabled={!state.selectedItem}
              text="Add Item"
              classes="mr-2"
              onClick={() => {
                dispatch({ type: "addItem" });
              }}
            />
          }
        />
        <Modal
          title="Share"
          show={state.shareVisible}
          onClose={() => {
            dispatch({ type: "hideShare" });
          }}
          body={
            state.exhibit && (
              <SharePanel exhibitId={state.exhibit?.id} publicId={state.exhibit?.publicId} />
            )
          }
        />
        <div ref={isMountedRef} />
      </>
    );
  } else {
    return <Message>loading...</Message>;
  }
}
