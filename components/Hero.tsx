import Link from "next/link";
import React, { useRef, useEffect } from "react";
import { useWindowSize } from "react-use";

const Hero = ({}: {}) => {
  const { height } = useWindowSize();

  const scrollDownRef = useRef();

  useEffect(() => {
    if (scrollDownRef.current) {
      if (height > 500) {
        // @ts-ignore
        scrollDownRef.current.classList.remove("hidden");

        document.addEventListener("scroll", () => {
          const scrollpos = window.scrollY;

          if (scrollpos > 10) {
            if (scrollDownRef.current) {
              // @ts-ignore
              scrollDownRef.current.classList.add("opacity-0");
            }
          } else {
            if (scrollDownRef.current) {
              // @ts-ignore
              scrollDownRef.current.classList.remove("opacity-0");
            }
          }
        });

        // @ts-ignore
        scrollDownRef.current.style.top = `${height - 100}px`;
      } else {
        // @ts-ignore
        scrollDownRef.current.classList.add("hidden");
      }
    }
  }, [height]);

  return (
    <>
      <div className="relative h-screen">
        <div className="hero-text text-gray-100 px-4 container h-screen mx-auto flex flex-wrap flex-col items-center max-w-5xl">
          <div className="flex flex-col my-auto w-full justify-center items-start text-center ">
            <img
              src="/svg/flask.svg"
              className="h-16 lg:h-20 mx-auto svg-shadow"
            />
            <h1 className="text-white font-semibold text-3xl lg:text-4xl mx-auto text-center my-8">
              Unity Experiment Configurator
            </h1>
            <p className="text-center text-white max-w-lg mx-auto text-xl">
              Conduct and measure user interaction experiments in Virtual Reality
            </p>
            <Link href="/docs/getting-started">
              <button className="block mx-auto mt-10 transition bg-transparent border-2 border-white border-opacity-60 font-semibold hover:border-opacity-100 duration-300 text-white py-4 px-4 focus:outline-none focus:ring">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        <div
          ref={scrollDownRef}
          className="absolute text-center w-full transition duration-700"
        >
          <span className="text-sm text-white font-semibold">SCROLL</span>
          <svg
            className="mx-auto"
            style={{
              marginTop: "0.25rem",
            }}
            width="17"
            height="82"
            viewBox="0 0 17 82"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5 81V1"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="square"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Hero;
