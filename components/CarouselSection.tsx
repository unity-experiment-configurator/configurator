import React, { useState, useEffect, useRef } from 'react';
import { useInView } from "react-intersection-observer";
import { useTransition, animated, config } from 'react-spring';

import classNames from "classnames";

interface CarouselItem {
  id: number;
  imageUrl: string;
}

const CarouselSection = ({
  items,
  delay = 2000,
}: {
  items: CarouselItem[];
  delay?: number;
}) => {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  const [index, set] = useState<number>(0);

  const transitions = useTransition(items[index], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
  });

  const intervalRef = useRef<any>();

  useEffect(() => {
    intervalRef.current = setInterval(() => set(state => (state + 1) % items.length), delay);
    return () => {
      clearInterval(intervalRef.current);
    }
  }, []);

  return (
    <section
      ref={ref}
      className={classNames("min-h-screen duration-1000 ease-in-out", {
        "transform translate-y-12": !inView,
        "opacity-0": !inView,
      })}
    >
      <div className="container mx-auto flex flex-wrap flex-col min-h-screen max-w-5xl">
        <div className="relative h-[80vh] lg:h-[70vh] w-full lg:w-[70vw] mx-auto mt-[10vh] max-w-5xl">
          {
            transitions((props, item) => (
              <animated.div
                key={item.id}
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                style={{ ...props, backgroundImage: `url(${item.imageUrl})` }}
              />
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default CarouselSection;