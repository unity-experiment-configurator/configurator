import React from "react";
import Page from "../../components/Docs/Page";

export async function getStaticProps(context) {
  return {
    props: {},
  };
}

export default function Home(props) {
  return (
    <Page
      text={`
Docs 
====

Welcome to our documentation pages.
      `}
    />
  );
}
