import React from 'react';
import { useInView } from "react-intersection-observer";

import classNames from "classnames";

const StepsSection = ({

}: {

}) => {
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
      <div className="container mx-auto flex flex-wrap flex-col px-8 justify-center min-h-screen relative">
        steps
      </div>
    </section>
  );
};

export default StepsSection;