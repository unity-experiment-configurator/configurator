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
      title="Browser Support"
      text={
        <>
          <p>Experiment.so supports the following browsers:</p>
          <ul>
            <li>
              <a href="https://www.microsoft.com/en-us/edge">Microsoft Edge</a>
            </li>
            <li>
              <a href="https://www.google.co.uk/chrome/">Google Chrome</a>
            </li>
            <li>
              <a href="https://www.mozilla.org/en-GB/firefox/new/">
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a href="https://www.apple.com/uk/safari/">Safari</a>
            </li>
          </ul>
        </>
      }
    />
  );
}