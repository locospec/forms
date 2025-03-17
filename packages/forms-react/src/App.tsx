import React from "react";
import "./App.css";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import { makeServer } from "./mocks/mirageServer";
import Example1 from "./examples/Example1";

function App() {
  React.useEffect(() => {
    makeServer();
    return () => {
      makeServer().shutdown();
    };
  }, []);

  const components = ["example"];

  return (
    <main className="w-screen h-screen overflow-hidden">
      <div className="w-full h-full flex">
        <div className="min-w-[50px] lg:min-w-[200px] w-[10vw] lg:w-[20vw] bg-gray-50 flex flex-col gap-y-2 p-4">
          <div className="flex flex-col gap-y-10 text-sm lg:text-2xl font-bold">
            {components.map((component) => (
              <a
                key={component}
                className="no-underline"
                href={`/${component}`}
              >
                {component + " Example"}
              </a>
            ))}
          </div>
        </div>
        <div className="w-[90vw] lg:w-[80vw] flex flex-col h-full">
          <header className="bg-gray-50 flex items-center justify-center">
            <h1 className="text-xl font-bold">Header Section - Title</h1>
          </header>

          <div className="flex-grow overflow-auto pt-4">
            <Routes>
              <Route path="*" children={<></>} />
              <Route path="/example" children={<Example1 />} />
            </Routes>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
