import { person } from "@jsonforms/examples";
import { FormRenderer } from "../../lib/main";

const ProviderExample = () => {
  const schema = person.schema;
  const uischema = person.uischema;
  const initialData = person.data;

  // console.log(">>>>>>>> SCHEMA", schema);
  // console.log(">>>>>>>> uischema", uischema);
  // console.log(">>>>>>>> initialData", initialData);

  return (
    <FormRenderer
      schema={schema}
      uischema={uischema}
      initialData={initialData}
      formsConfig={{ endpoint: "/sample" }}
    />
  );
};

export default ProviderExample;
