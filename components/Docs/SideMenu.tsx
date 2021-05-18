import React, { useEffect } from "react";
import ActiveLink from "../ActiveLink";

const SideMenuItem = ({ path, text }: { path: string; text: string }) => {
  return (
    <li className="py-2 md:my-0 hover:bg-purple-100 lg:hover:bg-transparent">
      <ActiveLink
        activeClassName="block pl-4 align-middle text-gray-700 no-underline hover:text-purple-500 border-l-4 border-transparent lg:border-purple-500 lg:hover:border-purple-500 text-gray-900 font-bold"
        href={path}
      >
        <a className="font-normal block pl-4 align-middle text-gray-700 no-underline hover:text-purple-500 border-l-4 border-transparent lg:hover:border-gray-300 pb-1 md:pb-0 text-sm">{text}</a>
      </ActiveLink>
    </li>
  );
};

const SideMenu = () => {
  const useCollapsibleNavMenu = () => {
    useEffect(() => {
      const sideMenuDiv = document.getElementById("menu-content");
      const sideMenu = document.getElementById("menu-toggle");

      document.addEventListener("click", (e: any) => {
        const target = (e && e.target) || (e && e.srcElement);

        // Help Menu
        if (!checkParent(target, sideMenuDiv)) {
          // click NOT on the menu
          if (checkParent(target, sideMenu)) {
            // click on the link
            if (sideMenuDiv!.classList.contains("hidden")) {
              sideMenuDiv!.classList.remove("hidden");
            } else {
              sideMenuDiv!.classList.add("hidden");
            }
          } else {
            // click both outside link and outside menu, hide menu
            sideMenuDiv!.classList.add("hidden");
          }
        }
      });

      function checkParent(t: any, elm: any) {
        while (t.parentNode) {
          if (t === elm) {
            return true;
          }
          t = t.parentNode;
        }
        return false;
      }
    }, []);
  };

  useCollapsibleNavMenu();

  return (
    <div className="w-full lg:w-1/5 lg:px-2 text-xl text-gray-800 leading-normal">
      <div className="block lg:hidden sticky inset-0">
        <button
          id="menu-toggle"
          type="button"
          aria-label="Menu"
          className="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-purple-500 appearance-none focus:outline-none"
        >
          <svg
            className="fill-current h-3 float-right"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </button>
      </div>
      <div
        className="w-full sticky inset-0 hidden lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 border border-gray-600 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20"
        id="menu-content"
      >
        <ul className="list-reset list-none pl-0 pt-4">
          <SideMenuItem path="/docs/" text="Home" />
          <SideMenuItem path="/docs/getting-started" text="Getting Started" />
          <SideMenuItem
            path="/docs/creating-an-exhibit"
            text="Creating an Exhibit"
          />
          <SideMenuItem
            path="/docs/additional-features"
            text="Additional Features"
          />
          <SideMenuItem path="/docs/browser-support" text="Browser Support" />
          <SideMenuItem path="/docs/useful-links" text="Useful Links" />
          {/* <SideMenuItem path="/docs/faq" text="FAQ" /> */}
          <SideMenuItem path="/docs/terms-of-service" text="Terms of Service" />
          <SideMenuItem path="/docs/privacy-policy" text="Privacy Policy" />
          <SideMenuItem path="/docs/cookies-policy" text="Cookies Policy" />
          <SideMenuItem
            path="/docs/accessibility-statement"
            text="Accessibility Statement"
          />
          <SideMenuItem path="/docs/contact" text="Contact" />
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
