import { useReducer, useCallback } from "react";
import AuthCheck from "../../components/AuthCheck";
import { firestore, auth, serverTimestamp } from "../../lib/Firebase";
import Main from "../../components/Main";
import { useRouter } from "next/router";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { ExperimentType } from "../../lib/Types";
import { downloadConfig } from "../../lib/Utils";
import Metadata from "../../components/Metadata";
import { Button } from "../../components/FormControls";
import Select from "react-select";
import ExperimentEditor from "../../components/ExperimentEditor";
import { useEffect } from "react";

type ExperimentTypeListItem = { label: string; value: ExperimentType };

export default function AdminPostEdit(props) {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}

function PostManager() {
  const router = useRouter();
  const { slug, duplicate } = router.query;

  const postRef = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts")
    .doc(slug as any);
    
  const [post] = useDocumentDataOnce(postRef);

  return (
    <Main>
      {post && (
        <section className="overflow-hidden">
          {/* <h1 className="py-4 text-3xl font-bold">{post.title}</h1> */}
          {/* <div>ID: {post.slug}</div> */}
          <ExperimentForm
            postRef={postRef}
            defaultValues={post}
            duplicate={duplicate as string}
          />
        </section>
      )}
    </Main>
  );
}

function ExperimentForm({ defaultValues, postRef, duplicate }) {
  type State = {
    duplicate: string;
    experimentType: ExperimentTypeListItem;
    step: number;
  };

  const experimentTypes: ExperimentTypeListItem[] = [
    {
      label: "Two Tables with Distractors",
      value: "TwoTablesWithDistractors",
    },
  ];

  const initialState: State = {
    duplicate: duplicate,
    experimentType: experimentTypes[0],
    step: duplicate ? 1 : 0,
  };

  type Action =
    | { type: "reset" }
    | { type: "updateExperimentType"; payload: ExperimentTypeListItem }
    | { type: "setExperimentMetadata" }
    | { type: "setExperimentType" }
    | { type: "setExperimentOptions" };

  const reducer = (state: State, action: Action): State => {
    if (action.type === "reset") {
      return initialState;
    }

    switch (action.type) {
      case "updateExperimentType":
        return {
          ...state,
          experimentType: action.payload,
        };
      case "setExperimentType":
        return {
          ...state,
          step: 1,
        };
      case "setExperimentMetadata":
        return {
          ...state,
          step: 2,
        };
      case "setExperimentOptions":
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

  const updateExperimentMetadata = async ({ description, instructions, blockTrialCount }) => {
    await postRef.update({
      description,
      instructions,
      blockTrialCount,
      updatedAt: serverTimestamp(),
    });

    dispatch({
      type: "setExperimentMetadata",
    });

    // toast.success('Experiment updated');
  };

  const updateExperimentType = async () => {
    await postRef.update({
      type: state.experimentType.value,
      updatedAt: serverTimestamp(),
    });

    // moves to the next step
    dispatch({
      type: "setExperimentType",
    });
  };

  const setExperimentOptions = async (options) => {
    await postRef.update({
      options: options,
      updatedAt: serverTimestamp(),
    });

    dispatch({
      type: "setExperimentOptions",
    });
  };

  // todo: remove this initial set when more experiment types are added
  useEffect(() => {
    dispatch({
      type: "updateExperimentType",
      payload: experimentTypes[0],
    });

    updateExperimentType();
  }, []);

  return (
    <>
      {state.step === 0 && (
        <>
          <h2 className="font-medium text-2xl mb-8">
            What type of experiment would you like to conduct?
          </h2>
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
            className="basic-multi-select pb-8"
            classNamePrefix="select"
          />
          <Button
            text="Next"
            type="submit"
            onClick={async () => {
              updateExperimentType();
            }}
            classes="md:mt-4 float-right"
          />
        </>
      )}
      {state.step === 1 && (
        <>
          <h2 className="font-medium text-2xl mb-8">
            Please enter some basic information about your experiment
          </h2>
          <Metadata
            description={defaultValues.description}
            instructions={defaultValues.instructions}
            submitText="Next"
            onSubmit={async (values) => {
              updateExperimentMetadata(values);
            }}
          />
        </>
      )}
      {state.step === 2 && (
        <>
          <h2 className="font-medium text-2xl mb-8">
            Please select which options you'd like to use for this experiment
          </h2>
          <ExperimentEditor
            type={state.experimentType.value}
            options={defaultValues?.options}
            onSubmit={(options) => setExperimentOptions(options)}
            submitText="Next"
          />
        </>
      )}
      {state.step === 3 && (
        <>
          <h2 className="font-medium text-2xl mb-8">
            Your experiment has been created. Please download your config file.
          </h2>
          <Button
            text="Download Config"
            onClick={async () => {
              const doc = await postRef.get();
              const data = doc.data();
              downloadConfig(data);
            }}
          />
        </>
      )}
    </>
  );
}
