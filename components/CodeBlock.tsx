import React from "react";

const CodeBlock = ({ code }: { code: string }) => {
  return (
    <pre className="bg-gray-900 rounded text-white font-mono text-base p-2 md:p-4">
      <code className="break-words whitespace-pre-wrap">{code}</code>
    </pre>
  );
};

export default CodeBlock;
