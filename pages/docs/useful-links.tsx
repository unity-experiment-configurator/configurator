import React from "react";
import Page from "../../components/Docs/Page";

export async function getStaticProps(context) {
  return {
    props: {},
  };
}

export default function Doc(props) {
  return (
    <Page
      title="Useful Links"
      text={
        <>
          <p>
            The following is a collection of links that you might find useful
            when learning how to use Experiment.
          </p>
          <ul>
            
          </ul>
        </>
      }
    />
  );
}