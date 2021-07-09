import React from "react";
import SideMenu from "./SideMenu";
import Footer from "../Footer";
import Main from "../Main";

const Page = ({ title, text }: { title: string; text: any }) => {
  return (
    <>
      <Main>
        <div className="grid grid-cols-12 gap-4">
          <SideMenu />
          <div className="col-span-9 docs text-gray-900 leading-normal">
            <div className="font-sans">
              <h1 className="break-normal text-gray-900 text-2xl">
                {title}
              </h1>
              <hr className="border-b border-gray-300 mb-8" />
            </div>
            {text}
          </div>
        </div>
      </Main>
    </>
  );
};

export default Page;
