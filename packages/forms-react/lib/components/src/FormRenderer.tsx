import React from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@/material-renderers";
import { cn } from "@/utils";
import { FormsProvider } from "@/context/src/FormsContext";

export interface FormRendererInterface {
  schema: any;
  uischema: any;
  initialData: any;
  wrapperClasses?: string;
  onChangeCallback?: any;
  showDevTools?: boolean;
  formsConfig: any;
}

const FormRenderer: React.FC<FormRendererInterface> = ({
  schema,
  uischema,
  initialData,
  wrapperClasses = "",
  onChangeCallback,
  showDevTools = true,
  formsConfig,
}) => {
  const [data, setData] = React.useState(initialData);
  console.log;

  return (
    <FormsProvider showDevTools={showDevTools} formsConfig={formsConfig}>
      <div className={cn("px-4 flex flex-col", wrapperClasses)}>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data, errors }: any) => {
            setData(data);
            if (errors.length > 0) {
              console.error("Errors", errors);
            }
            onChangeCallback && onChangeCallback({ data, errors });
          }}
        />
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-sm"
            onClick={() => {
              console.log(
                "TODO: Make action call here with this data : ",
                data
              );
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </FormsProvider>
  );
};

export { FormRenderer };
