import React from "react";
import CookiesPolicy from "./CookiesPolicy";

const FooterMenuItem = ({ link, text }: { link: string; text: string }) => {
  return (
    <li className="mt-2 mr-2 block">
      <a href={link} className="no-underline hover:underline text-white">
        {text}
      </a>
    </li>
  );
};

const Footer = () => {
  return (
    <footer className="bg-blue-600">
      <div className="container mx-auto max-w-5xl pt-8 pb-16">
        <div className="grid grid-cols-12 gap-4">
          <div className="hidden md:block col-span-9">
            <img src="/images/Logos.png" className="mt-16" />
          </div>

          {/* <div className="col-span-3">
            <p className="uppercase md:mb-4">Links</p>
            <ul className="list-reset p-0">
              <FooterMenuItem link="#getting-started" text="Getting Started" />
              <FooterMenuItem link="#showcase" text="Showcase" />
              <FooterMenuItem link="#features" text="Features" />
              <FooterMenuItem link="#about" text="About" />
            </ul>
          </div> */}

          <div className="col-span-12 px-8 md:col-span-3 md:px-0 md:mx-0">
            <p className="uppercase mb-4 text-white">Help</p>
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
            </ul>
          </div>

          <div className="col-span-12 block md:hidden px-8 mx-auto">
            <img src="/images/Logos.png" className="mt-16" />
          </div>

          {/* <div className="flex-1 p-4">
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
          </div> */}
        </div>
      </div>
      <CookiesPolicy />
    </footer>
  );
};

export default Footer;
