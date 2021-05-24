import React, { useEffect } from "react";

const NavMenuItem = ({ link, text }: { link: string; text: string }) => {
  return (
    <li className="mr-3">
      <a
        className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
        href={link}
      >
        {text}
      </a>
    </li>
  );
};

const NavMenu = () => {
  const useCollapsibleNavMenu = () => {
    useEffect(() => {
      let scrollpos = window.scrollY;
      const nav = document.getElementById("nav");

      document.addEventListener("scroll", () => {
        scrollpos = window.scrollY;

        if (scrollpos > 10) {
          nav!.classList.remove("lg:bg-transparent");
          nav!.classList.add("shadow-md");
          nav!.classList.add("lg:bg-white");
        } else {
          nav!.classList.remove("shadow-md");
          nav!.classList.remove("lg:bg-white");
          nav!.classList.add("lg:bg-transparent");
        }
      });

      const navContent = document.getElementById("nav-content");
      const navToggleButton = document.getElementById("nav-toggle");

      document.addEventListener("click", (e: any) => {
        const target = (e && e.target) || (e && e.srcElement);

        // Nav Menu
        if (!isParent(target, navContent)) {
          // click NOT on the menu
          if (isParent(target, navToggleButton)) {
            if (navContent!.classList.contains("hidden")) {
              navContent!.classList.remove("hidden");
            } else {
              navContent!.classList.add("hidden");
            }
          } else {
            navContent!.classList.add("hidden");
          }
        } else {
          navContent!.classList.add("hidden");
        }
      });
      function isParent(target: any, parent: any) {
        while (target.parentNode) {
          if (target === parent) {
            return true;
          }
          target = target.parentNode;
        }
        return false;
      }
    }, []);
  };

  useCollapsibleNavMenu();

  return (
    <nav
      id="nav"
      className="fixed w-full z-30 top-0 bg-white lg:bg-transparent"
    >
      <div className="container w-full mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="pl-4 flex items-center">
          <a
            className="text-black no-underline hover:no-underline font-bold text-xl lg:text-2xl"
            href="/"
          >
            Experiment.
          </a>
        </div>

        <div className="block lg:hidden pr-4">
          <button
            id="nav-toggle"
            type="button"
            className="flex items-center p-1 text-black hover:text-gray-900"
          >
            <svg
              className="fill-current h-6 w-6"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div
          className="w-full flex-grow lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 text-black p-4 lg:p-0 z-20"
          id="nav-content"
        >
          <ul className="list-reset pl-0 lg:flex justify-end flex-1 items-center list-none">
            {/* {!isProduction && <NavMenuItem link="/experiments" text="Experiments" />} */}
            <NavMenuItem link="/#getting-started" text="Getting Started" />
            <NavMenuItem link="/#showcase" text="Showcase" />
            <NavMenuItem link="/#features" text="Features" />
            <NavMenuItem link="/#about" text="About" />
            <NavMenuItem link="/docs" text="Docs" />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
