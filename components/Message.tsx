import React from "react";
// @ts-ignore
import classNames from "classnames";

const Message = ({
  classes,
  children,
}: {
  classes?: string | undefined;
  children?: any;
}) => {
  const c = classNames("p-8 lg:p-16 text-gray-900", classes);
  return <div className={c}>{children}</div>;
};

export default Message;
