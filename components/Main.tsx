import classNames from "classnames";

const Main = ({ classes, children } : 
  { 
    classes?: string | undefined;
    children?: any;
  }) => {
  const c = classNames(classes, "container mx-auto bg-white shadow p-8 mb-8 max-w-5xl min-h-screen");
  return (
    <main
      className={c}
    >
      {children}
    </main>
  );
};

export default Main;