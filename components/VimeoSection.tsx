import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import classNames from "classnames";

const Vimeo = ({ title, id }: { title: string; id: string }) => {
  return (
    <iframe
      title={title}
      src={`https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0&speed=0&badge=0&autopause=0`}
      allow="autoplay; fullscreen"
      allowFullScreen
      frameBorder="0"
      className="w-full h-[80vh]"
    ></iframe>
  );
};

const VimeoSection = ({
  vimeoId,
  title,
  onInView,
}: {
  vimeoId: string;
  title: string;
  onInView?: (inView: boolean) => void;
}) => {

  const { ref: firstInViewRef, inView: firstInView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  const { ref: everyInViewRef, inView: everyInView } = useInView({
    threshold: 0.25,
    triggerOnce: false,
  });

  useEffect(() => {
    if (onInView) {
      onInView(everyInView);
    }
  }, [everyInView]);

  return (
    <>
      <section
        ref={firstInViewRef}
        className={classNames("min-h-screen duration-1000 ease-in-out", {
          "transform translate-y-12": !firstInView,
          "opacity-0": !firstInView,
        })}
      >
        <div
          ref={everyInViewRef}
          className="cursor-pointer container mx-auto flex flex-wrap flex-col px-1 md:px-8 justify-center min-h-screen"
        >
          <Vimeo id={vimeoId} title={title} />
        </div>
      </section>
    </>
  );
};

export default VimeoSection;
