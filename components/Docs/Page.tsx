import React from "react";
import SideMenu from "./SideMenu";
import Main from "../Main";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";;

const Page = ({ text }: { text: string }) => {
  return (
    <>
      <Main>
        <div className="grid grid-cols-12 gap-4">
          {/* todo: use getServerSideProps to generate this menu */}
          <div className="col-span-12 md:col-span-3">
            <SideMenu />
          </div>
          <div className="col-span-12 lg:col-span-9 docs text-gray-900 leading-normal overflow-hidden">
            {/* @ts-ignore */}
            <ReactMarkdown remarkPlugins={[gfm]}>
              {text}
            </ReactMarkdown>
          </div>
        </div>
      </Main>
    </>
  );
};

export default Page;
