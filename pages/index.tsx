import React from "react";
import Footer from "../components/Footer";
import Metatags from "../components/Metatags";
import NavMenu from "../components/NavMenu";
import classNames from "classnames";

export async function getStaticProps(context) {
  return {
    props: {},
  };
}

export default function Home(props) {
  const LinkButton = ({
    link,
    text,
    icon,
    classes,
    disabled,
  }: {
    link: string;
    text: string;
    icon: any;
    classes?: string | undefined;
    disabled?: boolean;
  }) => {
    const c = classNames(
      "rounded focus:outline-none shadow-md font-bold leading-8",
      classes,
      {
        "opacity-25": disabled,
      }
    );
    return (
      <a href={link} className={c}>
        {text}&nbsp;{icon}
      </a>
    );
  };

  return (
    <>
      <Metatags title="Interaction Design for the Masses" description="." />

      <NavMenu />

      <section id="about" className="bg-gray-100 py-16">
        <div className="container mx-auto flex flex-wrap py-8 px-8 text-gray-900">
          <LinkButton
            link={`/experiments/create`}
            text="Create an Experiment"
            classes="bg-blue-500 py-4 px-8 text-white text-xl"
            icon={
              // heroicons arrow-right
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="md:block inline pl-2 float-right h-full w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            }
          />
        </div>
      </section>

      <Footer />
    </>
  );
}
