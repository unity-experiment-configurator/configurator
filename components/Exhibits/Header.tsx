import React from "react";
import { useWindowSize } from "react-use";
import { SVGLinkButton, SVGLinkButtonText } from "../FormControls";
import { auth } from '../../lib/Firebase';

function SignOutButton() {
  return (
    <SVGLinkButton
      label="Log out"
      primary={true}
      classes="mr-8"
      onClick={() => auth.signOut()}
    >
      <SVGLinkButtonText text="Sign Out" />
    </SVGLinkButton>
  )
}

const Header = ({ children }: { children?: any }) => {
  const { height } = useWindowSize();

  return (
    <header
      style={{
        height: `${height * 0.1}px`,
      }}
    >
      <nav className="h-full">
        <div className="w-full mx-auto flex flex-wrap items-center justify-between p-8 pt-2 xl:pl-12 xl:pr-12">
          <div className="flex items-center">
            <a
              className="text-black no-underline hover:no-underline font-bold text-xl lg:text-2xl"
              href="/"
            >
              Exhibit.
            </a>
          </div>
          <div
            className="flex-grow items-center w-autoblock text-black z-20"
            id="nav-content"
          >
            <ul className="list-reset pl-0 flex justify-end flex-1 items-center list-none">
              <li className="mr-3">
                <a
                  className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                  href="/docs"
                >
                  Help
                </a>
              </li>
              {/* <li>
                <SignOutButton />
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
