import React from "react";
import SideMenu from "./SideMenu";
import Main from "../Main";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";;

const Page = ({ text }: { text: string }) => {
  function LinkRenderer(props) {
    return <a href={props.href}>{props.children}</a>
  }

  return (
    <>
      <Main>
        <div className="grid grid-cols-12 gap-4">
          {/* todo: use getServerSideProps to generate this menu */}
          <SideMenu />
          <div className="col-span-9 docs text-gray-900 leading-normal overflow-hidden">
            {/* <div className="font-sans">
              <h1 className="break-normal text-gray-900 text-2xl">
                {title}
              </h1>
              <hr className="border-b border-gray-300 mb-8" />
            </div> */}
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
