import { useReducer, useCallback } from "react";
import AuthCheck from "../../components/AuthCheck";
import LeftCol from "../../components/Experiments/LeftCol";
import RightCol from "../../components/Experiments/RightCol";
import Main from "../../components/Experiments/Main";
import Footer from "../../components/Experiments/Footer";
import Header from "../../components/Experiments/Header";
import ExperimentFromPublicId from "../../components/Experiments/ExperimentFromPublicId";
import { PublicExperiment } from "../../lib/Types";
import Metadata from "../../components/Experiments/Metadata";
import Message from "../../components/Message";
import { firestore, logEvent, timestamp } from "../../lib/Firebase";
import { useRouter } from "next/router";
// import { useWindowSize } from "react-use";
// import { md } from "../../lib/Utils";

export default function CreateExperimentPage(props) {
  return (
    <AuthCheck>
      <CreateExperiment />
    </AuthCheck>
  );
}

function CreateExperiment() {
  const router = useRouter();
  const { item, duplicate } = router.query;

  type State = {
    experimentToDuplicate: PublicExperiment | null;
    initialised: boolean;
    syncing: boolean;
  };

  const initialState: State = {
    experimentToDuplicate: null,
    initialised: false,
    syncing: false,
  };

  type Action =
    | { type: "reset" }
    | { type: "setExperimentToDuplicate"; payload: PublicExperiment };

  const reducer = (state: State, action: Action): State => {
    if (action.type === "reset") {
      return initialState;
    }

    switch (action.type) {
      case "setExperimentToDuplicate":
        return {
          ...state,
          experimentToDuplicate: action.payload,
        };
      default:
        throw new Error();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [state, dispatch] = useReducer(useCallback(reducer, []), initialState);

  // const { width } = useWindowSize();

  const editExperiment = (id: string) => {
    // fixes https://github.com/UniversalViewer/experiment/issues/64
    // why can't we use history.push(`/experiments/edit/${id}`) ?
    window.location.href = `/experiments/edit/${id}`;
  };

  const createExperiment = async (values: any) => {
    const { id } = await firestore.collection("experiments").add({
      ...values,
      publicId: firestore.collection("experiments").doc().id,
      duplicatedFrom: state.experimentToDuplicate
        ? state.experimentToDuplicate.publicId
        : null,
      created: timestamp(),
    });
  };

  return (
    <>
      {duplicate && (
        <ExperimentFromPublicId
          publicId={duplicate as string}
          onLoad={(experiment: PublicExperiment) => {
            dispatch({
              type: "setExperimentToDuplicate",
              payload: experiment,
            });
          }}
          onError={() => {
            // eslint-disable-next-line no-console
            console.warn("couldn't duplicate experiment");
          }}
        />
      )}
      <Header />
      <Main>
        <LeftCol>
          {/* <h1 className="pb-8">Details</h1> */}
          {(duplicate && state.experimentToDuplicate) ||
          duplicate === undefined ? (
            <Metadata
              title={
                state.experimentToDuplicate ? state.experimentToDuplicate.title : ""
              }
              description={
                state.experimentToDuplicate
                  ? state.experimentToDuplicate.description
                  : ""
              }
              rights={
                state.experimentToDuplicate ? state.experimentToDuplicate.rights : ""
              }
              presentationType={
                state.experimentToDuplicate
                  ? state.experimentToDuplicate.presentationType || "slides"
                  : "slides"
              }
              duplicationEnabled
              submitText="Create Experiment"
              disabled={state.syncing}
              onSubmit={(values) => {
                createExperiment(values);
              }}
            />
          ) : (
            <Message>Loading...</Message>
          )}
        </LeftCol>
        <RightCol>

        </RightCol>
      </Main>
      <Footer>

      </Footer>
    </>
  );
}
