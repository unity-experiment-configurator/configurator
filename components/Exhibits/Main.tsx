import { useWindowSize } from "react-use";

const Main = ({ children }: { children?: any }) => {
  const { height } = useWindowSize();
  return (
    <main
      style={{
        height: `${height * 0.78}px`,
      }}
      className="md:flex lg:flex p-8 pt-0 pb-0 xl:pl-12 xl:pr-12 overflow-auto"
    >
      {children}
    </main>
  );
};

export default Main;
