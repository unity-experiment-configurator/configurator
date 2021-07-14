import React, { useEffect, useRef } from "react";
import { useWindowSize } from "react-use";
// import { useKey } from "react-use";

export const Modal = ({
  show,
  body,
  onClose,
}: {
  show: boolean;
  body: any;
  onClose: () => void;
}) => {
  // esc
  // useKey((e) => e.which === 27, () => {
  //   if (show && onClose) {
  //     onClose();
  //   }
  // });

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

  const { height } = useWindowSize();

  return (
    <>
      {show ? (
        <>
          <div
            role="dialog"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => {
              // onClose();
            }}
          >
            <div className="relative w-full" style={{
              height: height
            }}>
              {/* content */}
              <div ref={contentRef} className="table transition duration-300 opacity-0 border-0 shadow-lg relative w-full bg-black outline-none focus:outline-none">
                {/* header */}
                <div className="table-row">
                  <div className="table-cell" style={{
                    height: height / 8
                  }}>
                    <button
                      type="button"
                      className="ml-auto bg-transparent border-0 p-6 pr-8 text-white float-right text-md lg:text-lg font-semibold outline-none focus:outline-none"
                      onClick={() => onClose()}
                    >
                      <i className="bg-transparent text-white not-italic block outline-none focus:outline-none tracking-wider">
                        close&nbsp;<span>x</span>
                      </i>
                      {/* <span className="sr-only">Close</span> */}
                    </button>
                  </div>
                </div>
                {/* body */}
                <div className="table-row">
                  <div className="table-cell align-middle" style={{
                    height: height - (height / 8)
                  }}>
                    {body}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-100 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </>
  );
};

export default Modal;
