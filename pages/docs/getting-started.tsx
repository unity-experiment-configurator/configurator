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
      text={`
Getting Started
======================

[Download the Interaction Lab Unity App](/downloads/InteractionLab.zip)
      `}
    />
  );
}