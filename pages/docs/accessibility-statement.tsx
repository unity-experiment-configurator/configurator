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
Accessibility Statement
=======================

Royal Holloway University and Mnemoscene Ltd are committed to
making interaction.study accessible to people of all levels of ability. The
following statement summarises where we currently are in relation to
the World Wide Web Consortium’s Web Content Accessibility Guidelines
(WCAG) 2.1, and outlines where we’d like to get to.

Using this web application
--------------------------

* change colours, contrast levels and fonts
* zoom in up to 300% without the text spilling off the screen
* navigate most of the website using just a keyboard
* navigate most of the website using speech recognition software
* listen to most of the website using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver)  
*  We’ve also made the website text as simple as possible to understand. [AbilityNet](https://mcmw.abilitynet.org.uk/) has advice on making your device easier to use if you have a disability.

What to do if you can’t access parts of this web application
------------------------------------------------------------

If you need information on this web application in a different
format like accessible PDF, large print, easy read, audio recording
or braille please contact us at:

<itservicedesk@royalholloway.ac.uk>

We’ll consider your request and get back to you in 5 working days.

If you would like to report accessibility problems
--------------------------------------------------

We’re always looking to improve the accessibility of this web
application. If you find any problems not listed on this page or
think we’re not meeting accessibility requirements, please contact
us at:

<itservicedesk@royalholloway.ac.uk>

Enforcement procedure
---------------------

The Equality and Human Rights Commission (EHRC) is responsible for
enforcing the Public Sector Bodies (Websites and Mobile
Applications) (No. 2) Accessibility Regulations 2018 (the
‘accessibility regulations’). If you’re not happy with how we
respond to your complaint, 
[contact the Equality Advisory and Support Service (EASS)](https://www.equalityadvisoryservice.com/).


Technical information about this web application’s accessibility
----------------------------------------------------------------

Royal Holloway University and Mnemoscene are committed to making
this web application accessible, in accordance with the Public
Sector Bodies (Websites and Mobile Applications) (No. 2)
Accessibility Regulations 2018.

Non-accessible content
----------------------

This web application is partially compliant with the [Web Content Accessibility Guidelines version 2.1](https://www.w3.org/TR/WCAG21/)
AA standard, due to the non-compliances and exemptions listed below.

Preparation of this accessibility statement
-------------------------------------------

This statement was prepared on July 12, 2021. It was last reviewed on July 12, 2021.

interaction.study is tested on a regular basis. Some key tools used to test
the site are listed below. The latest test was organised and carried
out by Mnemoscene Ltd.


* [Lighthouse](https://developers.google.com/web/tools/lighthouse) provides a detailed overview of accessibility issues
`}
    />
  );
}