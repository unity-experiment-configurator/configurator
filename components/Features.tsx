import React from "react";
import { useInView } from "react-intersection-observer";
import classNames from "classnames";

const Feature = ({
  // title,
  // link,
  children,
}: {
  // title: string;
  // link?: string;
  children?: any;
}) => {
  // const FeatureContents = () => {
  //   return (
  //     <>
  //       <img src="/svg/flask.svg" className="mx-auto w-20 mb-4 mt-4 lg:mt-0" />
  //       <h2 className="font-medium md:h-24 w-full text-2xl px-4 text-center py-4 text-blue-800">
  //         {title}
  //       </h2>
  //       <p className="text-blue-800 text-lg text-center px-4 mb-8">{children}</p>
  //     </>
  //   );
  // };

  return (
    <div className="w-full md:w-1/4 px-4 flex flex-col flex-grow flex-shrink text-center md:text-left">
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
};

const FeaturesSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      id="features"
      className={classNames("min-h-screen duration-1000 ease-in-out", {
        "transform translate-y-12": !inView,
        "opacity-0": !inView,
      })}
    >
      <div className="container mx-auto flex flex-wrap pt-24 md:pt-40 px-8 max-w-5xl">
        <Feature>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto w-20 mb-4 mt-4 lg:mt-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg> */}
          <h2 className="font-medium md:h-24 w-full text-2xl px-4 text-center py-4 text-blue-800">
            Create an Experiment
          </h2>
          <p className="text-blue-800 text-lg text-center px-4 mb-8">
            Use our online visual editor to configure an interaction experiment. Specify interaction types, colours, sounds, sizes, shapes, and more.
          </p>
        </Feature>
        <Feature>
          {/* <svg
            width="350"
            height="350"
            viewBox="0 0 350 350"
            className="mx-auto w-20 mb-4 mt-4 lg:mt-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0)">
              <path
                d="M333.961 156.499H315.312V147.132C315.312 128.032 299.776 112.495 280.68 112.495H200.001V90.9526C200.001 82.912 193.458 76.369 185.421 76.369H160.79C152.749 76.369 146.206 82.912 146.206 90.9526V112.495H65.5354C46.4355 112.495 30.8988 128.032 30.8988 147.132V156.499H12.254C4.42347 156.499 -1.94446 162.867 -1.94446 170.698V211.636C-1.94446 219.467 4.42347 225.831 12.254 225.831H30.8988V235.202C30.8988 254.298 46.4355 269.834 65.5354 269.834H121.777C133.727 269.834 145.257 264.532 153.399 255.282C158.386 249.618 165.567 246.37 173.102 246.37C180.637 246.37 187.818 249.618 192.801 255.282C200.946 264.532 212.472 269.834 224.426 269.834H280.672C299.768 269.834 315.305 254.298 315.305 235.202V225.831H333.953C341.784 225.831 348.148 219.463 348.148 211.636V170.698C348.156 162.867 341.788 156.499 333.961 156.499ZM153.986 90.9526C153.986 87.2027 157.04 84.149 160.79 84.149H185.421C189.171 84.149 192.221 87.1988 192.221 90.9526V112.495H153.986V90.9526ZM12.254 218.054C8.71414 218.054 5.83554 215.176 5.83554 211.64V170.698C5.83554 167.158 8.71414 164.279 12.254 164.279H30.8988V218.054H12.254ZM307.532 235.206C307.532 250.015 295.485 262.058 280.68 262.058H224.43C214.709 262.058 205.315 257.717 198.643 250.143C192.182 242.803 182.869 238.594 173.106 238.594C163.338 238.594 154.029 242.803 147.564 250.143C140.896 257.717 131.498 262.058 121.781 262.058H65.5354C50.7261 262.058 38.6788 250.011 38.6788 235.206V225.834V156.499V147.132C38.6788 132.323 50.7261 120.275 65.5354 120.275H146.206H200.001H280.676C295.485 120.275 307.528 132.323 307.528 147.132V156.499V225.834V235.206H307.532ZM340.376 211.636C340.376 215.172 337.497 218.051 333.961 218.051H315.312V164.279H333.961C337.497 164.279 340.376 167.158 340.376 170.698V211.636Z"
                fill="black"
              />
              <path
                d="M63.4931 174.3C62.4973 174.3 61.5014 173.919 60.7429 173.16C59.2219 171.639 59.2219 169.181 60.7429 167.66L90.6842 137.718C92.2052 136.197 94.6637 136.197 96.1847 137.718C97.7057 139.239 97.7057 141.698 96.1847 143.219L66.2433 173.16C65.4848 173.919 64.489 174.3 63.4931 174.3Z"
                fill="black"
              />
              <path
                d="M111.998 159.327C111.002 159.327 110.006 158.946 109.247 158.187C107.726 156.666 107.726 154.208 109.247 152.687L123.345 138.59C124.866 137.069 127.324 137.069 128.845 138.59C130.366 140.111 130.366 142.569 128.845 144.09L114.748 158.187C113.989 158.946 112.993 159.327 111.998 159.327Z"
                fill="black"
              />
              <path
                d="M64.3684 206.956C63.3726 206.956 62.3767 206.575 61.6182 205.817C60.0972 204.296 60.0972 201.837 61.6182 200.316L96.1419 165.792C97.6629 164.271 100.121 164.271 101.642 165.792C103.163 167.313 103.163 169.772 101.642 171.293L67.1186 205.817C66.3601 206.575 65.3642 206.956 64.3684 206.956Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="350" height="350" fill="white" />
              </clipPath>
            </defs>
          </svg> */}
          <h2 className="font-medium md:h-24 w-full text-2xl px-4 text-center py-4 text-blue-800">
            Run the Experiment
          </h2>
          <p className="text-blue-800 text-lg text-center px-4 mb-8">
            Download your custom configuration file and run the Unity VR interaction environment for experiment participants.
          </p>
        </Feature>
        <Feature>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto w-20 mb-4 mt-4 lg:mt-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
              clipRule="evenodd"
            />
          </svg> */}
          <h2 className="font-medium md:h-24 w-full text-2xl px-4 text-center py-4 text-blue-800">
            Analyse the Results
          </h2>
          <p className="text-blue-800 text-lg text-center px-4 mb-8">
            Interaction data is collected and viewable in a spreadsheet for analysis.
          </p>
        </Feature>
      </div>
    </section>
  );
};

export default FeaturesSection;
