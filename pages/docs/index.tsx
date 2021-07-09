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
      title="Docs"
      text={
        <>
          
        </>
      }
    />
  );
}
