import React from "react";
import Page from "../../components/Docs/Page";
import { SVGLinkButton } from "../../components/FormControls";
// import SlackIcon from "../../public/svg/slack.svg";

export async function getStaticProps(context) {
  return {
    props: {},
  };
}

export default function Home(props) {
  return (
    <Page
      title="Docs"
      text={
        <>
          <p>
            This documentation describes how to create an Experiment and provides
            all the information you need to get started.
          </p>
        </>
      }
    />
  );
}
