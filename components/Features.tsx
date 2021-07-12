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
        <h2 className="font-medium md:h-24 w-full text-2xl text-white px-4 py-4">
          {title}
        </h2>
        <p className="text-white text-base px-4 mb-8">{children}</p>
      </>
    );
  };

  return (
    <div className="w-full md:w-1/4 px-4 flex flex-col flex-grow flex-shrink text-center md:text-left">
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

const FeaturesSection = () => {
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
        <Feature title="Step 1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu orci nunc. Nunc vel rhoncus purus, sed suscipit justo. Donec rutrum sapien augue, a dictum nisi congue quis. Vivamus eu dolor molestie, aliquet libero id, ornare libero. Aenean a orci lacus. 
        </Feature>
        <Feature title="Step 2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu orci nunc. Nunc vel rhoncus purus, sed suscipit justo. Donec rutrum sapien augue, a dictum nisi congue quis. Vivamus eu dolor molestie, aliquet libero id, ornare libero. Aenean a orci lacus. 
        </Feature>
        <Feature title="Step 3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu orci nunc. Nunc vel rhoncus purus, sed suscipit justo. Donec rutrum sapien augue, a dictum nisi congue quis. Vivamus eu dolor molestie, aliquet libero id, ornare libero. Aenean a orci lacus. 
        </Feature>
      </div>
    </section>
  );
};

export default FeaturesSection;