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
      title="Accessibility Statement"
      text={
        <>
          <p>
            Royal Holloway University and Mnemoscene Ltd are committed to
            making interaction-design-configurator.vercel.app accessible to people of all levels of ability. The
            following statement summarises where we currently are in relation to
            the World Wide Web Consortium’s Web Content Accessibility Guidelines
            (WCAG) 2.1, and outlines where we’d like to get to.
          </p>

          <h2>Using this web application</h2>

          <ul>
            <li>change colours, contrast levels and fonts</li>
            <li>zoom in up to 300% without the text spilling off the screen</li>
            <li>navigate most of the website using just a keyboard</li>
            <li>
              navigate most of the website using speech recognition software
            </li>
            <li>
              listen to most of the website using a screen reader (including the
              most recent versions of JAWS, NVDA and VoiceOver)
            </li>
            <li>
              We’ve also made the website text as simple as possible to
              understand.{" "}
              <a href="https://mcmw.abilitynet.org.uk/">AbilityNet</a> has
              advice on making your device easier to use if you have a
              disability.
            </li>
          </ul>

          <h2>How accessible this web application is</h2>

          <p>
            We know some parts of this web application are not fully accessible:
          </p>

          <ul>
            <li>
              The experiments/create page has missing aria-labels on the text
              editor buttons
            </li>
            <li>
              The experiments/edit page has missing aria-labels on the draggable
              list items
            </li>
          </ul>

          <h2>What to do if you can’t access parts of this web application</h2>

          <p>
            If you need information on this web application in a different
            format like accessible PDF, large print, easy read, audio recording
            or braille please contact us at:
          </p>

          <ul>
            <li>hello@mnemoscene.io</li>
          </ul>

          <p>
            We’ll consider your request and get back to you in 5 working days.
          </p>

          <p>
            For a more immediate response, please consider joining our Slack
            channel, where we have a dedicated channel for accessibility, at{" "}
            <a href="https://bit.ly/3kD5O0d">https://bit.ly/3kD5O0d</a>
          </p>

          <h2>If you would like to report accessibility problems</h2>

          <p>
            We’re always looking to improve the accessibility of this web
            application. If you find any problems not listed on this page or
            think we’re not meeting accessibility requirements, please contact
            us at:
          </p>

          <ul>
            <li>hello@mnemoscene.io</li>
          </ul>

          <h2>Enforcement procedure</h2>

          <p>
            The Equality and Human Rights Commission (EHRC) is responsible for
            enforcing the Public Sector Bodies (Websites and Mobile
            Applications) (No. 2) Accessibility Regulations 2018 (the
            ‘accessibility regulations’). If you’re not happy with how we
            respond to your complaint,{" "}
            <a href="https://www.equalityadvisoryservice.com/">
              contact the Equality Advisory and Support Service (EASS)
            </a>
            .
          </p>

          <h2>
            Technical information about this web application’s accessibility
          </h2>

          <p>
            Royal Holloway University and Mnemoscene are committed to making
            this web application accessible, in accordance with the Public
            Sector Bodies (Websites and Mobile Applications) (No. 2)
            Accessibility Regulations 2018.
          </p>

          <h2>Non-accessible content</h2>

          <p>
            This web application is partially compliant with the{" "}
            <a href="https://www.w3.org/TR/WCAG21/">
              Web Content Accessibility Guidelines version 2.1
            </a>{" "}
            AA standard, due to the non-compliances and exemptions listed below.
          </p>

          <p>
            The content listed below is non-accessible for the following
            reasons.
          </p>

          <strong>
            The experiments/create page has missing aria-labels on the text editor
            buttons
          </strong>

          <p>
            We are following{" "}
            <a href="https://github.com/quilljs/quill/issues/2038">
              developments here
            </a>{" "}
            and will implement a fix when available.
          </p>

          <strong>
            The experiments/edit page has missing aria-labels on the draggable list
            items
          </strong>

          <p>
            We are following{" "}
            <a href="https://github.com/atlassian/react-beautiful-dnd/labels/accessibility%20%E2%99%BF%EF%B8%8F">
              developments here
            </a>{" "}
            and will implement a fix when available.
          </p>

          <p>
            We are following{" "}
            <a href="https://github.com/UniversalViewer/universalviewer/issues?q=is%3Aissue+is%3Aopen+label%3Aaccessibility">
              developments here
            </a>{" "}
            and will implement fixes when available.
          </p>

          <h2>
            Content that’s not within the scope of the accessibility regulations
          </h2>

          <p>
            Our application is designed to load third-party content. We are not
            responsible for the accessibility of third party content, or
            associated links to third party content, including but not limited
            to web pages, images, audiovisual content, 3D models, PDFs, and
            eBooks.
          </p>

          <p>
            We cannot reasonably accept responsibility for ensuring third party
            content meets accessibility standards. However, where it is within
            our control, we will make every reasonable effort to work towards
            meeting accessibility requirements.
          </p>

          <h2>Preparation of this accessibility statement</h2>

          <p>
            This statement was prepared on 21.09.2020. It was last reviewed on
            21.09.2020.
          </p>

          <p>
            interaction-design-configurator.vercel.app is tested on a regular basis. Some key tools used to test
            the site are listed below. The latest test was organised and carried
            out by Mnemoscene Ltd.
          </p>

          <ul>
            <li>
              <a href="https://developers.google.com/web/tools/lighthouse">
                Lighthouse
              </a>{" "}
              - provides a detailed overview of accessibility issues
            </li>
          </ul>

          <h2>What we’re doing to improve accessibility of interaction-design-configurator.vercel.app</h2>

          <p>
            We are tracking outstanding accessibility issues (mentioned above)
            on github in order to implement fixes as soon as possible.
          </p>
        </>
      }
    />
  );
}