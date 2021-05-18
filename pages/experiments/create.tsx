import { useReducer, useCallback } from "react";
import AuthCheck from "../../components/AuthCheck";
import LeftCol from "../../components/Exhibits/LeftCol";
import RightCol from "../../components/Exhibits/RightCol";
import Main from "../../components/Exhibits/Main";
import Footer from "../../components/Exhibits/Footer";
import Header from "../../components/Exhibits/Header";
import ExhibitFromPublicId from "../../components/Exhibits/ExhibitFromPublicId";
import { AnnotationValue, ExhibitImport, ExhibitImports, ItemValue, PublicExhibit } from "../../lib/Types";
import Metadata from "../../components/Exhibits/Metadata";
import Message from "../../components/Message";
import UV from "../../components/Exhibits/UV";
import { firestore, logEvent, timestamp } from "../../lib/Firebase";
import { useRouter } from "next/router";
import { useWindowSize } from "react-use";
import { importItem, md } from "../../lib/Utils";

export default function CreateExhibitPage(props) {
  return (
    <AuthCheck>
      <CreateExhibit />
    </AuthCheck>
  );
}

function CreateExhibit() {
  const router = useRouter();
  const { item, duplicate } = router.query;

  type State = {
    exhibitToDuplicate: PublicExhibit | null;
    initialised: boolean;
    syncing: boolean;
  };

  const initialState: State = {
    exhibitToDuplicate: null,
    initialised: false,
    syncing: false,
  };

  type Action =
    | { type: "reset" }
    | { type: "setExhibitToDuplicate"; payload: PublicExhibit };

  const reducer = (state: State, action: Action): State => {
    if (action.type === "reset") {
      return initialState;
    }

    switch (action.type) {
      case "setExhibitToDuplicate":
        return {
          ...state,
          exhibitToDuplicate: action.payload,
        };
      default:
        throw new Error();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [state, dispatch] = useReducer(useCallback(reducer, []), initialState);

  const { width } = useWindowSize();

  const editExhibit = (id: string) => {
    // fixes https://github.com/UniversalViewer/exhibit/issues/64
    // why can't we use history.push(`/exhibits/edit/${id}`) ?
    window.location.href = `/exhibits/edit/${id}`;
  };

  const createExhibit = async (values: any) => {
    const { id } = await firestore.collection("exhibits").add({
      ...values,
      publicId: firestore.collection("exhibits").doc().id,
      duplicatedFrom: state.exhibitToDuplicate
        ? state.exhibitToDuplicate.publicId
        : null,
      created: timestamp(),
    });

    let batch: any;

    // if an exhibit to duplicate was passed in the qs, copy its items and annotations
    if (state.exhibitToDuplicate) {
      batch = firestore.batch();

      Array.from(state.exhibitToDuplicate.items).forEach((item: ItemValue) => {
        const docRef = firestore.collection(`exhibits/${id}/items/`).doc();
        batch.set(docRef, {
          ...item,
          id: docRef.id,
          modified: timestamp(),
          created: timestamp(),
        });
      });

      await batch.commit();

      batch = firestore.batch();

      Array.from(state.exhibitToDuplicate.annotations).forEach(
        (annotation: AnnotationValue) => {
          const docRef = firestore
            .collection(`exhibits/${id}/annotations/`)
            .doc();
          batch.set(docRef, {
            ...annotation,
            id: docRef.id,
            modified: timestamp(),
            created: timestamp(),
          });
        }
      );

      await batch.commit();

      logEvent("duplicate_exhibit", {
        publicId: state.exhibitToDuplicate.publicId,
      });
    } else if (item) {
      // if an item was passed in the qs, add that to the exhibit's items collection

      const result: ExhibitImports = await importItem(item as string);
      batch = firestore.batch();

      result.forEach((exhibitImport: ExhibitImport) => {
        const docRef = firestore.collection(`exhibits/${id}/items/`).doc();
        batch.set(docRef, {
          ...exhibitImport,
          created: timestamp(),
        });
      });

      await batch.commit();
    }

    logEvent("create_exhibit", { id });

    editExhibit(id);
  };

  return (
    <>
      {duplicate && (
        <ExhibitFromPublicId
          publicId={duplicate as string}
          onLoad={(exhibit: PublicExhibit) => {
            dispatch({
              type: "setExhibitToDuplicate",
              payload: exhibit,
            });
          }}
          onError={() => {
            // eslint-disable-next-line no-console
            console.warn("couldn't duplicate exhibit");
          }}
        />
      )}
      <Header />
      <Main>
        <LeftCol>
          {/* <h1 className="pb-8">Details</h1> */}
          {(duplicate && state.exhibitToDuplicate) ||
          duplicate === undefined ? (
            <Metadata
              title={
                state.exhibitToDuplicate ? state.exhibitToDuplicate.title : ""
              }
              description={
                state.exhibitToDuplicate
                  ? state.exhibitToDuplicate.description
                  : ""
              }
              rights={
                state.exhibitToDuplicate ? state.exhibitToDuplicate.rights : ""
              }
              presentationType={
                state.exhibitToDuplicate
                  ? state.exhibitToDuplicate.presentationType || "slides"
                  : "slides"
              }
              duplicationEnabled
              submitText="Create Exhibit"
              disabled={state.syncing}
              onSubmit={(values) => {
                createExhibit(values);
              }}
            />
          ) : (
            <Message>Loading...</Message>
          )}
        </LeftCol>
        <RightCol>
          {
            // todo: in future not all items will be IIIF manifests
            // use Utils.importItem to get the item's mediatype
            // if it's a IIIF manifest set UV.partOf to the manifest url.
            // if it's anything else, set UV.target
            width > md &&
              (item ||
                (state.exhibitToDuplicate &&
                  state.exhibitToDuplicate.items.length > 0)) && (
                <UV
                  manifest={item as string || state.exhibitToDuplicate!.items[0].url}
                  width="100%"
                  height="100%"
                />
              )
          }
        </RightCol>
      </Main>
      <Footer>
        {/* {!isProduction && (
          <SVGLinkButton
            label="Exhibits"
            classes="mr-8"
            onClick={() => {
              history.push(`/exhibits`);
            }}
          >
            <IconBookOpenBlue className="fill-current w-5 h-5 mr-2" />
            {SVGLinkButtonText("Exhibits")}
          </SVGLinkButton>
        )} */}
      </Footer>
    </>
  );
}
