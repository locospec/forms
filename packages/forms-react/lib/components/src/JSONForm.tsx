import React from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@/material-renderers";
import { useFormsContext } from "@/context";
import LensEnumControl, {
  lensEnumControlTester,
} from "@/material-renderers/controls/LensEnumControl";

interface JSONFormsInterface {
  onChangeCallback?: any;
}

const JSONForm: React.FC<JSONFormsInterface> = ({ onChangeCallback }) => {
  const { schema, uischema, initialData, setFormData, setFormErrors } =
    useFormsContext();
  const [data, setData] = React.useState(initialData);

  const renderers = [
    ...materialRenderers,
    { tester: lensEnumControlTester, renderer: LensEnumControl },
  ];

  return (
    <JsonForms
      schema={schema}
      uischema={uischema}
      data={data}
      renderers={renderers}
      cells={materialCells}
      onChange={({ data, errors }: any) => {
        setData(data);
        setFormData(data);
        setFormErrors(errors);
        onChangeCallback && onChangeCallback(data);
      }}
    />
  );
};

export default JSONForm;
