import React from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@forms/material-renderers";
import { useFormsContext } from "@forms/context";
import { createTheme, ThemeProvider } from "@mui/material";
import LensEnumControl, {
  lensEnumControlTester,
} from "@forms/material-renderers/controls/LensEnumControl";
import LensTextControl, {
  lensTextControlTester,
} from "@forms/material-renderers/controls/LensTextControl";
import LensDropdownControl, {
  lensDropdownControlTester,
} from "@forms/material-renderers/controls/LensDropdownControl";
import LensCalendarControl, {
  lensCalendarControlTester,
} from "@forms/material-renderers/controls/LensCalendarControl";
import LensSwitchControl, {
  lensSwitchControlTester,
} from "@forms/material-renderers/controls/LensSwitchControl";
import LensCalendarDateTimeControl, {
  lensCalendarDateTimeControlTester,
} from "@forms/material-renderers/controls/LensCalendarDateTimeControl";

interface JSONFormsInterface {
  onChangeCallback?: any;
}

const JSONForm: React.FC<JSONFormsInterface> = ({}) => {
  const {
    schema,
    uischema,
    formData,
    formErrors,
    setFormErrors,
    handleFormsValuesChange,
  } = useFormsContext();

  const renderers = [
    ...materialRenderers,
    { tester: lensEnumControlTester, renderer: LensEnumControl },
    { tester: lensTextControlTester, renderer: LensTextControl },
    { tester: lensDropdownControlTester, renderer: LensDropdownControl },
    { tester: lensCalendarControlTester, renderer: LensCalendarControl },
    { tester: lensSwitchControlTester, renderer: LensSwitchControl },
    {
      tester: lensCalendarDateTimeControlTester,
      renderer: LensCalendarDateTimeControl,
    },
  ];
  const theme = createTheme({
    components: {
      MuiGrid: {
        defaultProps: {
          rowSpacing: uischema?.options?.rowSpacing | 0,
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={formData}
        renderers={renderers}
        cells={materialCells}
        validationMode="NoValidation"
        onChange={({ data, errors }: any) => {
          if (data) {
            handleFormsValuesChange(data);
          }
          setFormErrors(errors);
        }}
        additionalErrors={formErrors}
      />
    </ThemeProvider>
  );
};

export default JSONForm;
