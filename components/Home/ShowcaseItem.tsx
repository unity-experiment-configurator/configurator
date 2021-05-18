import React from "react";
// @ts-ignore
import classNames from "classnames";

const ShowcaseItem = ({
  title,
  text,
  link,
  label,
  image,
  fade = true,
}: {
  title: string;
  text: string;
  link: string;
  label?: string;
  image?: any;
  fade?: boolean;
}) => {
  const ShowcaseItemContents = () => {
    return (
      <>
        <h2 className="font-serif text-shadow-lg text-center md:text-left w-full font-medium text-xl text-white pt-16 md:pt-8 px-4 py-4">
          {title}
        </h2>
        <span className="m-auto text-shadow-lg text-white text-base text-center md:text-left w-full px-4 font-normal">
          {text}
        </span>
      </>
    );
  };

  return (
    <div className="w-full md:w-1/4 p-4 flex-col flex-grow flex-shrink text-center md:text-left">
      <div
        className="h-full hover-zoom flex-1 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${image || "/images/showcase-placeholder.png"})`,
          minHeight: "16rem",
        }}
      >
        {link ? (
          <a
            aria-label={label || title}
            href={link}
            className={classNames(
              "h-full flex flex-wrap flex-grow no-underline hover:no-underline",
              {
                fade,
              }
            )}
          >
            <ShowcaseItemContents />
          </a>
        ) : (
          <ShowcaseItemContents />
        )}
      </div>
    </div>
  );
};

export default ShowcaseItem;
