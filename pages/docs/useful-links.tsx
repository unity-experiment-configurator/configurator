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
            when learning how to use Exhibit.
          </p>
          <ul>
            <li>
              <a href="https://www.youtube.com/embed/Uz4l10Wt0eY">
                St Andrews' Exhibit training video
              </a>
            </li>
            <li>
              <a href="https://guides.iiif.io/">
                A guide to finding IIIF Manifest URLs on popular collection
                websites
              </a>
            </li>
          </ul>
        </>
      }
    />
  );
}