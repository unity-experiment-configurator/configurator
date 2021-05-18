import React from "react";

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
        <h2 className="font-serif font-medium md:h-32 w-full text-2xl text-white px-4 py-4">
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

export default Feature;
