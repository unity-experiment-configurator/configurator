import { firebaseConfig } from "../../lib/Firebase";
import { ExperimentType, PublicExperiment } from "../../lib/Types";
import Message from "../../components/Message";
import Alert from "../../components/Alert";
import Metatags from "../../components/Metatags";
import firebase from "firebase/app";
const striptags = require('striptags');

type ExperimentProps = {
  embedded: boolean;
  experiment: any;
  type: ExperimentType;
};

async function getExperiment(publicId: string) {
  return new Promise<any>((resolve) => {
    let app;

    if (!firebase.apps.length) {
      app = firebase.initializeApp(firebaseConfig);
    } else {
      app = firebase.apps[0];
    }

    app
      .functions("europe-west3")
      .httpsCallable("getExperiment")({publicId})
      .then(({ data }) => {
        resolve(data);
      });
  });
}

export async function getServerSideProps(ctx) {
  const { publicId, embedded, type } = ctx.query;

  if (!publicId) {
    return {
      notFound: true,
    };
  }

  const experiment = await getExperiment(publicId);

  const props: ExperimentProps = {
    experiment: experiment,
    embedded: !!embedded,
    type: type
      ? type
      : experiment.presentationType
      ? experiment.presentationType
      : "tables",
  };

  return { props };
}

function ExperimentType({ type, embedded, experiment } : {
  type: ExperimentType;
  embedded: boolean;
  experiment: PublicExperiment;
}) {
  switch (type) {
    case "TwoTablesWithDistractors":
      return (
        <>
          tables experiment
        </>
      );
    default:
      return (
        <Message>
          <Alert>{`"${type}" is not a supported experiment type`}</Alert>
        </Message>
      );
  }
}

export default function Experiment(props: ExperimentProps) {
  const title: string = props.experiment.title;
  const description: string = striptags(props.experiment.description);
  return (<>
    <Metatags
      title={title}
      description={description}
    />
    <ExperimentType {...props} />
  </>);
}
