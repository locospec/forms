import React, { createContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useFetchConfig } from "@/hooks";

const queryClient = new QueryClient();

interface FormsContextType {
  schema: any;
  uischema: any;
  initialData: any;
  makeActionRequest: any;
  isFetched: boolean;
  isError: boolean;
  formErrors: any;
  setFormErrors: React.Dispatch<any>;
}

export const FormsContext = createContext<FormsContextType | undefined>(
  undefined
);

interface FormsProviderBaseInterface {
  children: React.ReactNode;
  formsConfig: any;
}

const FormsProviderBase: React.FC<FormsProviderBaseInterface> = ({
  children,
  formsConfig,
}) => {
  const { configCallback, endpoint, permissionHeaders } = formsConfig;
  const configEndpoint = endpoint + "/_config";

  const {
    data: config,
    isFetched,
    isError,
  } = useFetchConfig({
    configEndpoint,
    configCallback,
    permissionHeaders,
  });

  const {
    model = "",
    dbOp = "",
    schema = {},
    uischema = {},
    initialData = {},
  } = config || {};

  if (isFetched && (!model || !dbOp)) {
    throw new Error(
      "Missing required config: 'model' and 'dbOp' must be present."
    );
  }

  const action_endpoint = endpoint + "/" + model + "/_" + dbOp;

  const [formErrors, setFormErrors] = React.useState([]);

  const makeActionRequest = async (
    data: Record<string, Record<string, any> | string>
  ) => {
    try {
      console.log("formErrors", formErrors);

      if (formErrors.length > 0) {
        console.log("Please resolve form errors");
        throw new Error(`Error: ${formErrors.length} Errors found`);
      }

      const response = await fetch(action_endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...permissionHeaders,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error in makeActionRequest:", error);
      throw error;
    }
  };

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <FormsContext.Provider
      value={{
        schema,
        uischema,
        initialData,
        makeActionRequest,
        isFetched,
        isError,
        formErrors,
        setFormErrors,
      }}
    >
      {!isFetched ? <>Loading....</> : children}
    </FormsContext.Provider>
  );
};
FormsProviderBase.displayName = "FormsProviderBase";

interface FormsProviderInterface extends FormsProviderBaseInterface {
  showDevTools?: boolean;
}

const FormsProvider: React.FC<FormsProviderInterface> = ({
  showDevTools = false,
  ...props
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {showDevTools && <ReactQueryDevtools />}
      <FormsProviderBase {...props} />
    </QueryClientProvider>
  );
};

export { FormsProvider, FormsProviderBase };
