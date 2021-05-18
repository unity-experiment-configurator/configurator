import React from "react";
import Alert from "../../components/Alert";
import Page from "../../components/Docs/Page";
import { demoExhibit } from "../../lib/Utils";

export async function getStaticProps(context) {
  return {
    props: {},
  };
}

export default function Doc(props) {
  return (
    <Page
      title="Getting Started"
      text={
        <>
          <p>
            Exhibit currently supports images and 3D objects via the{" "}
            <a href="https://iiif.io/api/presentation/3.0/">
              IIIF Presentation API
            </a>
            .
          </p>
          <p>
            <a href="https://iiif.io">IIIF</a> is a leading community developed
            framework used widely by Galleries, Libraries, Archives, and
            Museums. You can find out{" "}
            <a href="https://iiif.io/community/#how-to-get-involved-1">
              which collections have IIIF support here
            </a>
            .
          </p>
          <h2>There are a number of ways to create an exhibit.</h2>
          <ol>
            <li>
              Try our{" "}
              <a href={`/exhibits/create?duplicate=${demoExhibit}`}>
                Demo Exhibit
              </a>
              . You can adapt the demo via the editor or simply preview the
              published version.
            </li>
            <li>
              <a href="https://exhibit.so/exhibits/create">
                Create your own Exhibit
              </a>{" "}
              by importing IIIF manifests/collections to the Exhibit Editor.
              This service is free and no login is required. You’ll also receive
              a url so that you can edit and share your Exhibit with others.
              <Alert>
                Please note, if you are already using IIIF with your collections
                and would like a simpler alternative to manually importing
                items, we recommend you use the{" "}
                <a href="/docs/additional-features#exhibit-button">
                  'Exhibit' button
                </a>
                . This method is currently adopted at The University of St
                Andrews and allows users to add items directly from a catalogue
                to Exhibit.so.
              </Alert>
            </li>
            <li>
              Create If you’d like to know more about how to get started with
              IIIF or enquire about setting up your own custom instance, please
              get in touch at{" "}
              <a href="mailto:hello@mnemoscene.io">hello@mnemoscene.io</a>
            </li>
          </ol>
        </>
      }
    />
  );
}