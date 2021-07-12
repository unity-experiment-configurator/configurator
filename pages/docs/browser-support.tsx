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
Browser Support
===============

This site supports the following browsers:

* [Microsoft Edge](https://www.microsoft.com/en-us/edge)
* [Google Chrome](https://www.google.co.uk/chrome/)
* [Mozilla Firefox](https://www.mozilla.org/en-GB/firefox/new/)
* [Safari](https://www.apple.com/uk/safari/)
`}
    />
  );
}