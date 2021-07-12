import React, { useEffect, useRef } from "react";
// @ts-ignore
import classNames from "classnames";
import { useLocalStorage } from "react-use";

const CookiesPolicy = ({ classes }: { classes?: string | undefined }) => {
  const ref = useRef<HTMLDivElement>();
  const [cookiesAccepted, setCookiesAccepted] = useLocalStorage("cookiesAccepted", false);
  const c = classNames(
    "fixed bottom-0 flex w-full text-gray-900 bg-white text-base p-2",
    classes,
  );

  useEffect(() => {
    if (cookiesAccepted) {
      ref.current.classList.add("hidden");
    }
  }, [cookiesAccepted]);

  return (
    <div ref={ref} className={c} role="alert">
      <div className="w-8/12">
        <p className="py-4 lg:py-6 px-2 lg:px-4 text-sm lg:text-base">
          We use cookies to help give you the best experience on our website.
          Please read our <a href="/docs/cookies-policy">Cookies&nbsp;policy</a>{" "}
          to find out more.
        </p>
      </div>
      <div className="w-4/12">
        <button
          className="float-right m-2 mt-3 md:mt-2 transition bg-transparent border-2 border-blue-500 border-opacity-60 font-semibold hover:border-opacity-100 duration-300 text-blue-500 py-3 px-4 focus:outline-none focus:ring"
          onClick={() => {
            setCookiesAccepted(true);
          }}
        >Dismiss</button>
      </div>
    </div>
  );
};

export default CookiesPolicy;
