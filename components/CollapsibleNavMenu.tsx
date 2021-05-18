import React, { useEffect } from "react";
// @ts-ignore
import classNames from "classnames";
// import { SVGLinkButton, SVGLinkButtonText } from "./FormControls";

// const LogInOutButtons = ({ classes }: { classes?: any }) => {
//   const history = useHistory();
//   // @ts-ignore
//   const auth = useSelector((state) => state.firebase.auth);

//   const logOut = () => {
//     history.push("/logout");
//   };

//   const logIn = () => {
//     history.push("/login");
//   };

//   return (
//     <li className={classes}>
//       {auth.uid ? (
//         <SVGLinkButton label="Sign Out" primary classes="mr-8" onClick={logOut}>
//           <IconLogOutWhite className="hide md:block fill-current w-5 h-5 mr-2" />
//           <IconLogOutBlack className="md:hidden fill-current w-5 h-5 mr-2" />
//           <SVGLinkButtonText text="Sign Out" />
//         </SVGLinkButton>
//       ) : (
//         <SVGLinkButton label="Sign In" primary classes="mr-8" onClick={logIn}>
//           <IconLogInWhite className="hide md:block fill-current w-5 h-5 mr-2" />
//           <IconLogInBlack className="md:hidden fill-current w-5 h-5 mr-2" />
//           <SVGLinkButtonText text="Sign In" />
//         </SVGLinkButton>
//       )}
//     </li>
//   );
// };

const LogInOutLinks = ({ classes }: { classes?: any }) => {
  // @ts-ignore
  const auth = useSelector((state) => state.firebase.auth);

  return auth.uid ? (
    <NavMenuItem link="/logout" text="Sign Out" classes={classes} />
  ) : (
    <NavMenuItem link="/login" text="Sign In" classes={classes} />
  );
};

const NavMenuItem = ({
  link,
  text,
  classes,
}: {
  link: string;
  text: string;
  classes?: any;
}) => {
  const c = classNames("mr-3", classes);

  return (
    <li className={c}>
      <a
        className="inline-block text-black dark:text-white no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
        href={link}
      >
        {text}
      </a>
    </li>
  );
};

const CollapsibleNavMenu = () => {
  // @ts-ignore
  const auth = useSelector((state) => state.firebase.auth);

  const useCollapsibleNavMenu = () => {
    useEffect(() => {
      let scrollpos = window.scrollY;
      const nav = document.getElementById("nav");

      document.addEventListener("scroll", () => {
        scrollpos = window.scrollY;

        if (scrollpos > 10) {
          nav!.classList.add("shadow-md");
          nav!.classList.add("lg:bg-white");
        } else {
          nav!.classList.remove("shadow-md");
          nav!.classList.remove("lg:bg-white");
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
    <>
      <div className="block lg:hidden pr-4">
        <button
          id="nav-toggle"
          type="button"
          className="flex items-center p-1 text-black dark:text-white dark:hover:text-gray-400 hover:text-gray-900"
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
        className="w-full flex-grow bg-white dark:bg-gray-900 lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 text-black dark:text-white p-4 lg:p-0 z-20"
        id="nav-content"
      >
        <ul className="list-reset pl-0 lg:flex justify-end flex-1 items-center list-none">
          {auth.uid && <NavMenuItem link="/stories" text="My Stories" />}
          {/* <NavMenuItem link="/docs" text="Help" /> */}
          {/* <LogInOutButtons classes="hidden lg:block" />
          <LogInOutLinks classes="block lg:hidden" /> */}
        </ul>
      </div>
    </>
  );
};

export default CollapsibleNavMenu;
