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
            making interaction.study accessible to people of all levels of ability. The
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

          <h2>Preparation of this accessibility statement</h2>

          <p>
            This statement was prepared on 09.07.2021. It was last reviewed on
            09.07.2021.
          </p>

          <p>
            interaction.study is tested on a regular basis. Some key tools used to test
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

          <h2>What we’re doing to improve accessibility of interaction.study</h2>

          <p>
            We are tracking outstanding accessibility issues (mentioned above)
            on github in order to implement fixes as soon as possible.
          </p>
        </>
      }
    />
  );
}