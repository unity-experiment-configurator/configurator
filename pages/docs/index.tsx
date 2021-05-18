import React from "react";
import Page from "../../components/Docs/Page";
import { SVGLinkButton } from "../../components/FormControls";
import SlackIcon from "../../public/svg/slack.svg";

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
            Exhibit enables you to create narratives weaving together content
            from any digital collection supporting{" "}
            <a href="https://iiif.io">IIIF</a>.
          </p>

          <p>
            Developed by <a href="https://mnemoscene.io">Mnemoscene</a> using
            the <a href="https://universalviewer.io">Universal Viewer</a>,
            Exhibit provides a range of features including IIIF image zoom, IIIF
            Search API, IIIF Authentication API, 3D models, metadata display,
            embedding and more.
          </p>

          <p>
            This documentation describes how to create an Exhibit and provides
            all the information you need to get started.
          </p>

          <p>
            Join the <a href="https://docs.google.com/forms/d/e/1FAIpQLSeHLD0kng5aXvGFsNN_tJGsZMTnp08Hv2F6kdGsJRb6bT0NWw/viewform">Universal Viewer Slack</a> to keep up with new developments and
            meet our community. We have a dedicated #exhibit channel for
            discussion related to Exhibit.so
          </p>

          <p>
            <SVGLinkButton
              label="Join our Slack"
              classes="bg-blue-500 rounded px-4 mt-4 text-white"
              primary
              onClick={() => {
                document.location.href =
                  "https://docs.google.com/forms/d/e/1FAIpQLSeHLD0kng5aXvGFsNN_tJGsZMTnp08Hv2F6kdGsJRb6bT0NWw/viewform";
              }}
            >
              <SlackIcon className="mr-2" />
              <span>Join Slack</span>
            </SVGLinkButton>
          </p>
        </>
      }
    />
  );
}
