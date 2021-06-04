import { useReducer, useCallback } from "react";
import AuthCheck from '../../components/AuthCheck';
import { firestore, auth, serverTimestamp } from '../../lib/Firebase';
import Main from '../../components/Main';
import { useRouter } from 'next/router';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import dynamic from "next/dynamic";
import { ExperimentType, PublicExperiment } from '../../lib/Types';
import { site } from "../../lib/Utils";
import Metadata from "../../components/Metadata";
import { Button } from "../../components/FormControls";
import Select from "react-select";

const TwoTablesWithDistractors = dynamic(
  () =>
    import(
      "../../components/ExperimentTypes/TwoTablesWithDistractors"
    )
);

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
  const { slug } = router.query;

  const postRef = firestore.collection('users').doc(auth.currentUser.uid).collection('posts').doc(slug as any);
  const [post] = useDocumentDataOnce(postRef);

  return (
    <Main>
      {post && (
        <section className="overflow-hidden">
          {/* <h1 className="py-4 text-2xl font-bold">{post.title}</h1> */}
          {/* <div>ID: {post.slug}</div> */}
          <ExperimentForm postRef={postRef} defaultValues={post} />
        </section>
      )}
    </Main>
  );
}

function ExperimentForm({ defaultValues, postRef }) {
  
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
    | { type: "updateExperimentType"; payload: ExperimentTypeListItem }
    | { type: "setExperimentMetadata" }
    | { type: "setExperimentType" }
    | { type: "setExperimentOptions" };

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
      case "updateExperimentType":
        return {
          ...state,
          experimentType: action.payload,
        };
    case "setExperimentMetadata":
      return {
        ...state,
        step: 1,
      };
      case "setExperimentType":
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

  function ExperimentType({ type }: { type: ExperimentType }) {
    switch (type) {
      case "TwoTablesWithDistractors":
        return <TwoTablesWithDistractors onSubmit={options => setExperimentOptions(options)} submitText="Next" />;
      default:
        return (
          <p>{`"${type}" is not a supported experiment type`}</p>
        );
    }
  }

  const updateExperimentMetadata = async ({ description, instructions, duplicationEnabled }) => {

    await postRef.update({
      description,
      instructions,
      duplicationEnabled,
      updatedAt: serverTimestamp(),
    });

    dispatch({
      type: "setExperimentMetadata"
    });

    // toast.success('Experiment updated');
  };

  const updateExperimentType = async () => {
    await postRef.update({
      type: state.experimentType.value,
      updatedAt: serverTimestamp(),
    });

    dispatch({
      type: "setExperimentType"
    });
  };

  const setExperimentOptions = async (options) => {
    await postRef.update({
      options: options,
      updatedAt: serverTimestamp(),
    });

    dispatch({
      type: "setExperimentOptions"
    });
  };

  const downloadConfig = async () => {
    const doc = await postRef.get();
    const data = doc.data();
    const uxfSettings = {
      "UXF": {
        "trials_per_block": 10,
        "catch_trials_per_block": 3,
        "delay_time": 0.6
      }
    };
    const config = {
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
      url: `${site}/${data.username}/${data.slug}`,
      ...uxfSettings
    };

    download(JSON.stringify(config, null, 2), "config.json", "text/plain");
  }

  function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  return (
    <>
      {
        state.step === 0 && (
          <>
            <h2 className="font-medium text-xl mb-8">Please enter some basic information about your experiment</h2>
            <Metadata
              duplicationEnabled
              submitText="Next"
              disabled={state.syncing}
              onSubmit={async (values) => {
                updateExperimentMetadata(values);
              }}
            />
          </>
        )
      }
      {
        state.step === 1 && (
          <>
            <h2 className="font-medium text-xl mb-8">What type of experiment would you like to conduct?</h2>
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
                updateExperimentType();
              }}
              classes="md:mt-4 float-right"
            />
          </>
        )
      }
      {
        state.step === 2 && (
          <>
            <h2 className="font-medium text-xl mb-8">Please select which options you'd like to use for this experiment</h2>
            <ExperimentType type={state.experimentType.value} />
          </>
        )
      }
      {
        state.step === 3 && (
          <>
            <h2 className="font-medium text-xl mb-8">Your experiment has been created. Please download your config file below</h2>
            <Button text="Download Config" onClick={()=> {
              downloadConfig();
            }}  />
          </>
        )
      }
    </>
  )

  // return (
  //   <form onSubmit={handleSubmit(updateExperiment)}>
  //     <div>
  
  //       <div className="mt-2 mb-8">
  //         <input className="w-5 h-5 mr-2 align-middle" id="published" name="published" type="checkbox" ref={register} />
  //         <label htmlFor="published">Published</label>
  //       </div>

  //       <button type="submit" className="inline-block mr-2 bg-blue-500 text-white p-4" disabled={!isDirty || !isValid}>
  //         Save Changes
  //       </button>

  //       {/* <button className="inline-block mr-2 bg-blue-500 p-4 text-white" onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button> */}
        
  //       {/* <Link href={`/${defaultValues.username}/${defaultValues.slug}`}>
  //         <button className="inline-block mr-2 bg-blue-500 p-4 text-white">View</button>
  //       </Link> */}

  //     </div>
  //   </form>
  // );
}