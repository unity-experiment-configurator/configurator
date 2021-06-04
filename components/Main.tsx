const Main = ({ children }: { children?: any }) => {
  return (
    <main
      className="container mx-auto bg-white shadow p-8 mb-8 max-w-5xl"
    >
      {children}
    </main>
  );
};

export default Main;