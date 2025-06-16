import React from "react";
import { cn } from "@forms/utils";
import JSONForm from "./JSONForm";

export interface FormRendererInterface {
  wrapperClasses?: string;
  onChangeCallback?: any;
}

const FormRenderer: React.FC<FormRendererInterface> = ({
  wrapperClasses = "",
  onChangeCallback,
}) => {
  return (
    <div className={cn("px-4 flex flex-col", wrapperClasses)}>
      <JSONForm onChangeCallback={onChangeCallback} />
    </div>
  );
};

export { FormRenderer };
