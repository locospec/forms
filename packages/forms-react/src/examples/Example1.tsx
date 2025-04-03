import React from "react";
import { FormRenderer, useFormsContext, FormsProvider } from "../../lib/main";

const SubmitButton = ({ data }: any) => {
  const { makeActionRequest, isError, isFetched } = useFormsContext();
  if (!isFetched || isError) {
    return <></>;
  }

  return (
    <button
      className="px-4 py-2 text-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-sm"
      onClick={async () => {
        console.log(">>> makeActionRequest DATA", data);
        const res = await makeActionRequest(data);
        if (res.success) {
          alert("Success");
        } else {
          alert("Error");
        }
      }}
    >
      Submit
    </button>
  );
};

const ClearAll = () => {
  const { clearFormsData, isError, isFetched } = useFormsContext();
  if (!isFetched || isError) {
    return <></>;
  }

  return (
    <button
      className="px-4 py-2 text-lg bg-red-500 hover:bg-red-600 text-white font-semibold rounded-sm"
      onClick={async () => {
        clearFormsData();
      }}
    >
      Clear All
    </button>
  );
};

const ProviderExample = () => {
  const [data, setData] = React.useState<Record<string, any>>();
  const formsConfig = {
    endpoint: "/api/data-bench/sample",
    permissionHeaders: {
      "Content-Type": "application/json",
      sample: "This is a sample header",
    },
    // primaryKey: "id",
    // context: { value1: "SampleContext" },
  };

  return (
    <div className="flex flex-col gap-x-4 px-3 py-2">
      <FormsProvider formsConfig={formsConfig} onChangeCallback={setData}>
        <FormRenderer wrapperClasses="py-3" />
        <div className="flex justify-end gap-x-4">
          <ClearAll />
          <SubmitButton data={data} />
        </div>
      </FormsProvider>
    </div>
  );
};

export default ProviderExample;
