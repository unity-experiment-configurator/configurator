import React, { useState, useEffect } from 'react';
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

  useEffect(() => void setInterval(() => set(state => (state + 1) % items.length), delay), []);

  return (
    <section
      ref={ref}
      className={classNames("min-h-screen duration-1000 ease-in-out", {
        "transform translate-y-12": !inView,
        "opacity-0": !inView,
      })}
    >
      <div className="container mx-auto flex flex-wrap flex-col px-8 justify-center min-h-screen relative">
        {/* <div className="border-black relative"> */}
        {
          transitions((props, item) => (
            <animated.div
              key={item.id}
              className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
              style={{ ...props, backgroundImage: `url(https://images.unsplash.com/${item.imageUrl}&auto=format&fit=crop)` }}
            />
          ))
        }
        {/* </div> */}
      </div>
    </section>
  );
};

export default CarouselSection;