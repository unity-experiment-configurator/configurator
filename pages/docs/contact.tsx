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
      title="Contact"
      text={
        <>
          <p>
            Please send all enquiries to{" "}
            <a href="mailto:hello@mnemoscene.io">hello@mnemoscene.io</a>
          </p>
        </>
      }
    />
  );
}