import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import { useKey } from "react-use";

export const Modal = ({
  title,
  show,
  body,
  footer,
  onClose,
}: {
  title: string;
  show: boolean;
  body: any;
  footer?: any;
  onClose: () => void;
}) => {
  // esc
  useKey((e) => e.which === 27, () => {
    if (show && onClose) {
      onClose();
    }
  });

  const bgClasses = classNames(
    "justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
  );

  const contentClasses = classNames(
    "transition duration-300 opacity-0 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
  );

  useEffect(() => {
    setTimeout(() => {
      if (!contentRef.current) {
        return;
      }

      if (show) {
        contentRef.current.classList.replace("opacity-0", "opacity-100");
      } else {
        contentRef.current.classList.replace("opacity-100", "opacity-0");
      }
    }, 0);
  }, [show]);

  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {show ? (
        <>
          <div
            role="dialog"
            className={bgClasses}
            onClick={() => {
              // onClose();
            }}
          >
            <div className="relative w-11/12 sm:w-11/12 md:w-auto lg:w-auto xl:w-auto m-6 max-w-8xl">
              {/* content */}
              <div ref={contentRef} className={contentClasses}>
                {/* header */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
                  <h2 className="font-semibold">{title}</h2>
                  <button
                    type="button"
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-4 font-semibold outline-none focus:outline-none"
                    onClick={() => onClose()}
                  >
                    <i className="bg-transparent text-black not-italic h-6 w-6 block outline-none focus:outline-none">
                      ×
                    </i>
                    <span className="sr-only">Close</span>
                  </button>
                </div>
                {/* body */}
                <div className="relative p-6 flex-auto">{body}</div>
                {/* footer */}
                {footer ? (
                  <div className="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
                    {footer}
                  </div>
                ) : (
                  <div className="flex rounded-b h-10" />
                )}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </>
  );
};

export default Modal;
