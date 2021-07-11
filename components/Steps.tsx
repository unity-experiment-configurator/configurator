import React from 'react';
import { useInView } from "react-intersection-observer";
import classNames from "classnames";

const Feature = ({
  title,
  link,
  children,
}: {
  title: string;
  link?: string;
  children?: any;
}) => {
  const FeatureContents = () => {
    return (
      <>
        <h2 className="font-medium md:h-32 w-full text-2xl text-white px-4 py-4">
          {title}
        </h2>
        <p className="text-white text-base px-4 mb-8">{children}</p>
      </>
    );
  };

  return (
    <div className="w-full md:w-1/4 p-2 flex flex-col flex-grow flex-shrink text-center md:text-left">
      <div className="flex-1 overflow-hidden">
        {link ? (
          <a
            href={link}
            className="flex flex-wrap no-underline hover:no-underline"
          >
            <FeatureContents />
          </a>
        ) : (
          <FeatureContents />
        )}
      </div>
    </div>
  );
};

const StepsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className={classNames("min-h-screen duration-1000 ease-in-out", {
        "transform translate-y-12": !inView,
        "opacity-0": !inView,
      })}
    >
      <div className="container mx-auto flex flex-wrap py-8 px-8">
        <Feature title="Zoom and describe">
          Use Exhibit's "zoom and describe" feature to create a close-look
          experience of your images and 3D models.
        </Feature>
        <Feature title="Zoom and describe">
          Use Exhibit's "zoom and describe" feature to create a close-look
          experience of your images and 3D models.
        </Feature>
        <Feature title="Zoom and describe">
          Use Exhibit's "zoom and describe" feature to create a close-look
          experience of your images and 3D models.
        </Feature>
      </div>
    </section>
  );
};

export default StepsSection;