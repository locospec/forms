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

const JSONForm: React.FC<JSONFormsInterface> = ({}) => {
  const { schema, uischema, formData, setFormErrors, handleFormsValuesChange } =
    useFormsContext();

  const renderers = [
    ...materialRenderers,
    { tester: lensEnumControlTester, renderer: LensEnumControl },
  ];

  return (
    <JsonForms
      schema={schema}
      uischema={uischema}
      data={formData}
      renderers={renderers}
      cells={materialCells}
      onChange={({ data, errors }: any) => {
        if (data) {
          handleFormsValuesChange(data);
        }
        setFormErrors(errors);
      }}
    />
  );
};

export default JSONForm;
