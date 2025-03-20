import React from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@/material-renderers";
import { useFormsContext } from "@/context";

interface JSONFormsInterface {
  onChangeCallback?: any;
}

const JSONForm: React.FC<JSONFormsInterface> = ({ onChangeCallback }) => {
  const { schema, uischema, initialData, setFormErrors } = useFormsContext();
  const [data, setData] = React.useState(initialData);

  return (
    <JsonForms
      schema={schema}
      uischema={uischema}
      data={data}
      renderers={materialRenderers}
      cells={materialCells}
      onChange={({ data, errors }: any) => {
        setData(data);
        setFormErrors(errors);
        onChangeCallback && onChangeCallback(data);
      }}
    />
  );
};

export default JSONForm;
