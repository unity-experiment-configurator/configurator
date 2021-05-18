import classNames from "classnames";

const RightCol = ({
  classes,
  children,
}: {
  classes?: string | undefined;
  children?: any;
}) => {
  const c = classNames(classes, "md:w-1/2 pl-4 h-full");
  return <div className={c}>{children}</div>;
};

export default RightCol;
