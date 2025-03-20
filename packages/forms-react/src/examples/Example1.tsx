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
        const res = await makeActionRequest(data);
        console.log(">>>>> res is ", res);
      }}
    >
      Submit
    </button>
  );
};

const ProviderExample = () => {
  const [data, setData] = React.useState();
  const formsConfig = {
    endpoint: "/api/data-bench/sample",
    permissionHeaders: {
      "Content-Type": "application/json",
      sample: "This is a sample header",
    },
  };

  return (
    <div className="flex flex-col gap-x-4 px-3 py-2">
      <FormsProvider formsConfig={formsConfig}>
        <FormRenderer onChangeCallback={setData} />
        <div className="flex justify-end">
          <SubmitButton data={data} />
        </div>
      </FormsProvider>
    </div>
  );
};

export default ProviderExample;
