import React from "react";
import { useWindowSize } from "react-use";

const Footer = ({ children }: { children?: any }) => {
  const { height } = useWindowSize();
  return (
    <footer
      style={{
        height: `${height * 0.12}px`,
      }}
      className="pl-8 pr-8 pt-4 pb-4 xl:pl-12 xl:pr-12 xl:pt-4 xl:pb-8 text-center sm:text-center md:text-left lg:text-left xl:text-left"
    >
      {children}
    </footer>
  );
};

export default Footer;
