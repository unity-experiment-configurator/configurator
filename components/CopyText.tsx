import { useState, useRef } from "react";
import classNames from "classnames";
import { copyText } from "../lib/Utils";

const CopyText = ({ id, text }: { id: string; text: string }) => {
  const [copied, setCopied] = useState(false);

  const inputClasses = classNames(
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 dark:text-white leading-tight focus:outline-none focus:ring w-9/12 rounded-r-none"
  );
  const buttonClasses = classNames(
    "transition duration-300 bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring rounded-l-none w-3/12"
  );

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        id={id}
        name={id}
        type="text"
        value={text}
        readOnly
        className={inputClasses}
        onClick={() => {
          inputRef.current?.focus();
          inputRef.current?.select();
        }}
      />
      <button
        type="button"
        aria-label={copied ? "Copied" : "Copy"}
        className={buttonClasses}
        onClick={() => {
          copyText(text);
          setCopied(true);
          inputRef.current?.focus();
          inputRef.current?.select();
          setTimeout(() => {
            // avoid state change on unmounted component
            if (inputRef.current) {
              setCopied(false);
            }
          }, 2000);
        }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </>
  );
};

export default CopyText;
