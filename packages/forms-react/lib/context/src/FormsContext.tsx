import React, { createContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useFetchConfig } from "@/hooks";

const queryClient = new QueryClient();

export interface FormsContextType {
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

interface FormsConfigInterface {
  configCallback?: () => Promise<any>;
  endpoint?: string;
  permissionHeaders?: Record<string, string>;
}

interface FormsProviderBaseInterface {
  children: React.ReactNode;
  formsConfig: FormsConfigInterface;
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
  const actionEndpoint = `${endpoint}/${model}/_${dbOp}`;

  const [formErrors, setFormErrors] = React.useState([]);

  const makeActionRequest = React.useCallback(
    async (data: Record<string, any>) => {
      if (formErrors.length > 0) {
        console.log("Please resolve form errors");
        throw new Error(`Error: ${formErrors.length} Errors found`);
      }

      try {
        const response = await fetch(actionEndpoint, {
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

        return await response.json();
      } catch (error) {
        console.error("Error in makeActionRequest:", error);
        throw error;
      }
    },
    [actionEndpoint, formErrors, permissionHeaders]
  );

  const contextValue = React.useMemo(
    () => ({
      schema,
      uischema,
      initialData,
      makeActionRequest,
      isFetched,
      isError,
      formErrors,
      setFormErrors,
    }),
    [
      schema,
      uischema,
      initialData,
      makeActionRequest,
      isFetched,
      isError,
      formErrors,
    ]
  );

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <FormsContext.Provider value={contextValue}>
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
