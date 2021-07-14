import React from "react";
import { useInView } from "react-intersection-observer";
import classNames from "classnames";
import { DatabaseIcon, CubeTransparentIcon, CogIcon, DuplicateIcon } from '@heroicons/react/outline'

const FeaturesSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  const features = [
    {
      name: 'Virtual Reality',
      description: 'Currently works with Oculus Rift S.',
      icon: CubeTransparentIcon,
    },
    {
      name: 'Configurable',
      description:
        'Use our online editor to specify interaction types, colours, sounds, sizes, shapes, and more.',
      icon: CogIcon,
    },
    {
      name: 'Data Collection',
      description:
        '.csv files capture duration, head and hand positions.',
      icon: DatabaseIcon,
    },
    {
      name: 'Duplicate',
      description:
        'duplicate feature allows you to duplicate and edit existing experiments.',
      icon: DuplicateIcon,
    },
  ]

  return (
    <section
      ref={ref}
      id="features"
      className={classNames("min-h-screen duration-1000 ease-in-out overflow-hidden max-w-5xl mx-auto", {
        "transform translate-y-12": !inView,
        "opacity-0": !inView,
      })}
    >
      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Features
            </h2>
          </div>
          <dl className="mt-10 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:mt-0 lg:col-span-2">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-lg leading-6 font-medium text-blue-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 text-base text-blue-700">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
