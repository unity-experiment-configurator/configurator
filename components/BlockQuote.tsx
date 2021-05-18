import React from "react";

const BlockQuote = ({ text }: { text: string }) => {
  return (
    <blockquote className="border-l-4 border-purple-500 italic my-8 pl-8 md:pl-12">
      {text}
    </blockquote>
  );
};

export default BlockQuote;
