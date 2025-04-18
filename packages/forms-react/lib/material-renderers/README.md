# JSON Forms - More Forms. Less Code

_Complex forms in the blink of an eye_

JSON Forms eliminates the tedious task of writing fully-featured forms by hand by leveraging the capabilities of JSON, JSON Schema and Javascript.

## Material Renderers Package

This is the JSON Forms Material Renderers Package. This package only contains renderers and must be combined with [JSON Forms React](https://github.com/eclipsesource/jsonforms/blob/master/packages/react).

See the official [documentation](https://jsonforms.io/docs/integrations/react/) and the JSON Forms React [seed repository](https://github.com/eclipsesource/jsonforms-react-seed) for examples on how to integrate JSON Forms with your application.

You can combine [JSON Forms React](https://github.com/eclipsesource/jsonforms/blob/master/packages/react) with other renderers too, for example with the [Vanilla Renderers](https://github.com/eclipsesource/jsonforms/tree/master/packages/vanilla).

Check <https://www.npmjs.com/search?q=%40jsonforms> for all published JSONForms packages.

### Quick start

Install JSON Forms Core, React and React Material Renderers

```bash
npm i --save @jsonforms/core @jsonforms/react @jsonforms/material-renderers
```

Use the `JsonForms` component for each form you want to render and hand over the renderer set.

```ts
import React, { useState } from "react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";

const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
    },
    done: {
      type: "boolean",
    },
    due_date: {
      type: "string",
      format: "date",
    },
    recurrence: {
      type: "string",
      enum: ["Never", "Daily", "Weekly", "Monthly"],
    },
  },
  required: ["name", "due_date"],
};

const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      label: false,
      scope: "#/properties/done",
    },
    {
      type: "Control",
      scope: "#/properties/name",
    },
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/due_date",
        },
        {
          type: "Control",
          scope: "#/properties/recurrence",
        },
      ],
    },
  ],
};

const initialData = {};

function App() {
  const [data, setData] = useState(initialData);
  return (
    <JsonForms
      schema={schema}
      uischema={uischema}
      data={data}
      renderers={materialRenderers}
      cells={materialCells}
      onChange={({ data, _errors }) => setData(data)}
    />
  );
}
```

## License

The JSON Forms project is licensed under the MIT License. See the [LICENSE file](https://github.com/eclipsesource/jsonforms/blob/master/LICENSE) for more information.

## Roadmap

Our current roadmap is available [here](https://github.com/eclipsesource/jsonforms/blob/master/ROADMAP.md).

## Feedback, Help and Support

JSON Forms is developed by [EclipseSource](https://eclipsesource.com).

If you encounter any problems feel free to [open an issue](https://github.com/eclipsesource/jsonforms/issues/new/choose) on the repo.
For questions and discussions please use the [JSON Forms board](https://jsonforms.discourse.group).
You can also reach us via [email](mailto:jsonforms@eclipsesource.com?subject=JSON%20Forms).
In addition, EclipseSource also offers [professional support](https://jsonforms.io/support) for JSON Forms.

## Migration

See our [migration guide](https://github.com/eclipsesource/jsonforms/blob/master/MIGRATION.md) when updating JSON Forms.
