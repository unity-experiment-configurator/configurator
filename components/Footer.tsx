import React from "react";
import CookiesPolicy from "./CookiesPolicy";

const FooterMenuItem = ({ link, text }: { link: string; text: string }) => {
  return (
    <li className="mt-2 inline-block mr-2 md:block md:mr-0">
      <a href={link} className="no-underline hover:underline text-white">
        {text}
      </a>
    </li>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-8 py-16">
        <div className="w-full flex flex-col md:flex-row">
          <div className="flex-1 md:mt-48 p-4">
            <a
              className="text-white block no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
              href="/"
            >
              Exhibit.
            </a>
          </div>

          <div className="flex-1 p-4">
            <p className="uppercase md:mb-4">Links</p>
            <ul className="list-reset p-0">
              {/* {!isProduction && (
                <FooterMenuItem link="/exhibits" text="Exhibits" />
              )} */}
              <FooterMenuItem link="#getting-started" text="Getting Started" />
              <FooterMenuItem link="#showcase" text="Showcase" />
              <FooterMenuItem link="#features" text="Features" />
              <FooterMenuItem link="#about" text="About" />
            </ul>
          </div>

          <div className="flex-1 p-4">
            <p className="uppercase md:mb-4">Help</p>
            <ul className="list-reset p-0">
              <FooterMenuItem link="/docs" text="Docs" />
              <FooterMenuItem
                link="/docs/terms-of-service"
                text="Terms of Service"
              />
              <FooterMenuItem
                link="/docs/privacy-policy"
                text="Privacy Policy"
              />
              <FooterMenuItem
                link="/docs/cookies-policy"
                text="Cookies Policy"
              />
              <FooterMenuItem
                link="/docs/accessibility-statement"
                text="Accessibility Statement"
              />
              <FooterMenuItem link="/docs/contact" text="Contact" />
              {/* <FooterMenuItem link="https://github.com/universalviewer/exhibit" text="Github" /> */}
            </ul>
          </div>

          <div className="flex-1 p-4">
            <p className="uppercase md:mb-4">Social</p>
            <ul className="list-reset p-0">
              <FooterMenuItem
                link="https://docs.google.com/forms/d/e/1FAIpQLSeHLD0kng5aXvGFsNN_tJGsZMTnp08Hv2F6kdGsJRb6bT0NWw/viewform"
                text="Slack"
              />
              <FooterMenuItem
                link="https://twitter.com/universalviewer"
                text="Twitter"
              />
            </ul>
          </div>
        </div>
      </div>
      <CookiesPolicy />
    </footer>
  );
};

export default Footer;
