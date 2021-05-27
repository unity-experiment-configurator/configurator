import { useReducer, useCallback, useState, useEffect } from "react";
import AuthCheck from "../../components/AuthCheck";
import LeftCol from "../../components/Experiments/LeftCol";
import RightCol from "../../components/Experiments/RightCol";
import Main from "../../components/Experiments/Main";
import Footer from "../../components/Experiments/Footer";
import Header from "../../components/Experiments/Header";
import ExperimentFromPublicId from "../../components/Experiments/ExperimentFromPublicId";
import { ExperimentType, PublicExperiment } from "../../lib/Types";
import Metadata from "../../components/Experiments/Metadata";
import Message from "../../components/Message";
import { firestore, logEvent, timestamp } from "../../lib/Firebase";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Select from "react-select";
import Alert from "../../components/Alert";
import { Button } from "../../components/FormControls";
import Experiment from "../../components/Experiments/Experiment";
const OneTableWithDistractors = dynamic(
  () =>
    import(
      "../../components/Experiments/ExperimentTypes/OneTableWithDistractors"
    )
);
const TwoTablesWithDistractors = dynamic(
  () =>
    import(
      "../../components/Experiments/ExperimentTypes/TwoTablesWithDistractors"
    )
);

type ExperimentTypeListItem = { label: string; value: ExperimentType };

export default function CreateExperimentPage(props) {
  return (
    <AuthCheck>
      <CreateExperiment />
    </AuthCheck>
  );
}

function CreateExperiment() {
  const router = useRouter();
  const { duplicate } = router.query;

  type State = {
    experimentId: string;
    experimentToDuplicate: PublicExperiment | null;
    initialised: boolean;
    syncing: boolean;
    experimentType: ExperimentTypeListItem;
    step: number;
  };

  const experimentTypes: ExperimentTypeListItem[] = [
    {
      label: "One Table with Distractors",
      value: "OneTableWithDistractors",
    },
    {
      label: "Two Tables with Distractors",
      value: "TwoTablesWithDistractors",
    },
  ];

  const initialState: State = {
    experimentId: undefined,
    experimentToDuplicate: null,
    initialised: false,
    syncing: false,
    experimentType: experimentTypes[0],
    step: 0,
  };

  type Action =
    | { type: "reset" }
    | { type: "setExperimentToDuplicate"; payload: PublicExperiment }
    | { type: "setExperimentId"; payload: string }
    | { type: "updateExperimentType"; payload: ExperimentTypeListItem }
    | { type: "setExperimentType" }
    | { type: "setExperimentDetails"; payload: any };;

  const reducer = (state: State, action: Action): State => {
    if (action.type === "reset") {
      return initialState;
    }

    switch (action.type) {
      case "setExperimentToDuplicate":
        return {
          ...state,
          experimentToDuplicate: action.payload,
          experimentType: action.payload
            ? experimentTypes.find(
                (type) => type.value === action.payload.experimentType
              ) || experimentTypes[0]
            : experimentTypes[0],
        };
      case "setExperimentId":
        return {
          ...state,
          experimentId: action.payload,
          step: 1,
        };
      case "updateExperimentType":
        return {
          ...state,
          experimentType: action.payload,
        };
      case "setExperimentType":
        return {
          ...state,
          step: 2,
        };
      case "setExperimentDetails":
        return {
          ...state,
          step: 3,
        };
      default:
        throw new Error();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [state, dispatch] = useReducer(useCallback(reducer, []), initialState);

  // const { width } = useWindowSize();

  // const editExperiment = (id: string) => {
  //   // fixes https://github.com/UniversalViewer/experiment/issues/64
  //   // why can't we use history.push(`/experiments/edit/${id}`) ?
  //   window.location.href = `/experiments/edit/${id}`;
  // };

  function ExperimentType({ type }: { type: ExperimentType }) {
    switch (type) {
      case "OneTableWithDistractors":
        return <OneTableWithDistractors onSubmit={() => {}} submitText="Next" />;
      case "TwoTablesWithDistractors":
        return <TwoTablesWithDistractors onSubmit={() => {}} submitText="Next" />;
      default:
        return (
          <Message>
            <Alert>{`"${type}" is not a supported experiment type`}</Alert>
          </Message>
        );
    }
  }

  const createExperiment = async (values: any) => {
    const { id } = await firestore.collection("experiments").add({
      ...values,
      publicId: firestore.collection("experiments").doc().id,
      duplicatedFrom: state.experimentToDuplicate
        ? state.experimentToDuplicate.publicId
        : null,
      created: timestamp(),
    });
    return { id };
  };

  const setExperimentType = async () => {
    await firestore.doc(`exhibits/${state.experimentId}`).update({
      type: state.experimentType,
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
          {(duplicate && state.experimentToDuplicate) ||
          duplicate === undefined ? (
            <>
              {
                state.step === 0 && (
                  <Metadata
                    title={
                      state.experimentToDuplicate
                        ? state.experimentToDuplicate.title
                        : ""
                    }
                    description={
                      state.experimentToDuplicate
                        ? state.experimentToDuplicate.description
                        : ""
                    }
                    duplicationEnabled
                    submitText="Next"
                    disabled={state.syncing}
                    onSubmit={async (values) => {
                      const  { id } = await createExperiment(values);
                      dispatch({
                        type: "setExperimentId",
                        payload: id,
                      });
                    }}
                  />
                )
              }
              {
                state.step === 1 && (
                  <>
                    <Select
                      name="experimentType"
                      value={state.experimentType}
                      options={experimentTypes}
                      onChange={(type) => {
                        dispatch({
                          type: "updateExperimentType",
                          payload: type,
                        });
                      }}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                    <Button
                      text="Next"
                      type="submit"
                      onClick={async () => {
                        await setExperimentType();
                        dispatch({
                          type: "setExperimentType"
                        });
                      }}
                      classes="md:mt-4 float-right"
                    />
                  </>
                )
              }
              {
                state.step === 2 && (
                  <ExperimentType type={state.experimentType.value} />
                )
              }
              {
                state.step === 3 && (
                  <>done</>
                )
              }
            </>
          ) : (
            <Message>Loading...</Message>
          )}
        </LeftCol>
        <RightCol></RightCol>
      </Main>
      <Footer></Footer>
    </>
  );
}
