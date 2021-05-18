import React from "react";
import { lg } from "../../lib/Utils";
import { useWindowSize } from "react-use";

const HeroBackground = () => {
  const {width} = useWindowSize();

  return (
    <>
      {width > lg ? (
        <video
          poster="/images/poster.png"
          playsInline
          autoPlay
          muted
          loop
          className="absolute object-cover h-full w-full"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/images/hero.png"
          className="absolute object-cover h-full w-full"
          alt="shapes"
        />
      )}
    </>
  );
};

export default HeroBackground;
