import { firebaseConfig } from "../../lib/Firebase";
import { PresentationType, PublicExhibit } from "../../lib/Types";
import Message from "../../components/Message";
import Alert from "../../components/Alert";
import Metatags from "../../components/Metatags";
import dynamic from "next/dynamic";
import firebase from "firebase/app";
const striptags = require('striptags');

const SlidesExhibit = dynamic(
  () => import("../../components/Exhibits/SlidesExhibit")
);
const ScrollExhibit = dynamic(
  () => import("../../components/Exhibits/ScrollExhibit")
);

type ExhibitProps = {
  embedded: boolean;
  exhibit: any;
  type: PresentationType;
};

async function getExhibit(publicId: string) {
  return new Promise<any>((resolve) => {
    let app;

    if (!firebase.apps.length) {
      app = firebase.initializeApp(firebaseConfig);
    } else {
      app = firebase.apps[0];
    }

    app
      .functions("europe-west3")
      .httpsCallable("getExhibitWithoutItems")({publicId})
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

  const exhibit = await getExhibit(publicId);

  const props: ExhibitProps = {
    exhibit: exhibit,
    embedded: !!embedded,
    type: type
      ? type
      : exhibit.presentationType
      ? exhibit.presentationType
      : "slides",
  };

  return { props };
}

function ExhibitType({ type, embedded, exhibit }) {
  switch (type) {
    case "slides":
      return (
        <SlidesExhibit embedded={embedded} exhibit={exhibit} />
      );
    case "scroll":
      return (
        <ScrollExhibit embedded={embedded} exhibit={exhibit} />
      );
    default:
      return (
        <Message>
          <Alert>{`"${type}" is not a supported story type`}</Alert>
        </Message>
      );
  }
}

export default function Exhibit(props: ExhibitProps) {
  const title: string = props.exhibit.title;
  const description: string = striptags(props.exhibit.description);
  return (<>
    <Metatags
      title={title}
      description={description}
    />
    <ExhibitType {...props} />
  </>);
}
