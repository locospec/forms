import { person } from "@jsonforms/examples";
import { FormRenderer } from "../../lib/main";

const ProviderExample = () => {
  const schema = person.schema;
  const uischema = person.uischema;
  const initialData = person.data;

  return (
    <FormRenderer
      schema={schema}
      uischema={uischema}
      initialData={initialData}
    />
  );
};

export default ProviderExample;
