"use client";

import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

const LensSample = React.lazy(() => import("../../browser/LensSample"));

const LensStory = () => {
  return (
    <div className="flex flex-col p-4 h-screen items-center w-full gap-y-4">
      <h3 className="font-bold text-lg">Table with Multi Select </h3>
      <div className="flex-grow overflow-y-auto border-2 max-h-[500px] w-full">
        <BrowserOnly>
          {() => {
            return <LensSample />;
          }}
        </BrowserOnly>
      </div>
    </div>
  );
};

export default LensStory;
