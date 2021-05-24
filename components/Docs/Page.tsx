import React from "react";
import SideMenu from "./SideMenu";
import Footer from "../Footer";

const Page = ({ title, text }: { title: string; text: any }) => {
  return (
    <>
      <div className="container w-full mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="pl-4 flex items-center">
          <a
            className="text-black no-underline hover:no-underline font-bold text-xl lg:text-2xl"
            href="/"
          >
            Experiment.
          </a>
        </div>
      </div>
      <div className="container w-full flex flex-wrap mx-auto px-2 py-8">
        <SideMenu />
        <div className="docs w-full lg:w-4/5 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-300 border-rounded">
          <div className="font-sans">
            <h1 className="font-sans break-normal text-gray-900 text-2xl">
              {title}
            </h1>
            <hr className="border-b border-gray-300 mb-8" />
          </div>
          {text}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
