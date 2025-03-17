import React from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@/material-renderers";
import { cn } from "@/utils";

export interface FormRendererInterface {
  schema: any;
  uischema: any;
  initialData: any;
  wrapperClasses?: string;
  onChangeCallback?: any;
}

const FormRenderer: React.FC<FormRendererInterface> = ({
  schema,
  uischema,
  initialData,
  wrapperClasses = "",
  onChangeCallback,
}) => {
  const [data, setData] = React.useState(initialData);

  return (
    <div className={cn("", wrapperClasses)}>
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
    </div>
  );
};

export { FormRenderer };
