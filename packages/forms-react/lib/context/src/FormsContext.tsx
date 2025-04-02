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
  formData: any;
  setFormData: any;
  setFormErrors: React.Dispatch<any>;
  baseEndpoint: string;
  permissionHeaders: any;
  handleFormsValuesChange: any;
  clearFormsData: any;
  context: Record<string, any>;
}

export const FormsContext = createContext<FormsContextType | undefined>(
  undefined
);

interface FormsConfigInterface {
  configCallback?: () => Promise<any>;
  endpoint?: string;
  permissionHeaders?: Record<string, string>;
  context?: Record<string, any>;
}

interface FormsProviderBaseInterface {
  children: React.ReactNode;
  formsConfig: FormsConfigInterface;
  onChangeCallback?: any;
}

const FormsProviderBase: React.FC<FormsProviderBaseInterface> = ({
  children,
  formsConfig,
  onChangeCallback,
}) => {
  const {
    configCallback,
    endpoint,
    permissionHeaders,
    context = {},
  } = formsConfig;
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

  const configData = config?.data || {};
  // const configMeta = config?.meta || {};

  const {
    model = "",
    dbOp = "",
    schema = {},
    uiSchema = {},
    initialData,
  } = configData || {};

  if (isFetched && (!model || !dbOp)) {
    throw new Error(
      "Missing required config: 'model' and 'dbOp' must be present."
    );
  }
  const actionEndpoint = `${endpoint}/_${dbOp}`;

  const [formErrors, setFormErrors] = React.useState([]);
  const [formData, setFormData] =
    React.useState<Record<string, any>>(initialData);

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

  const handleFormsValuesChange = (data: Record<string, any>) => {
    setFormData(data);
    onChangeCallback && onChangeCallback(data);
  };

  React.useEffect(() => {
    if (isFetched && initialData) {
      handleFormsValuesChange(initialData);
    }
  }, [isFetched, initialData]);

  const clearFormsData = () => {
    handleFormsValuesChange({});
  };

  const contextValue = React.useMemo(
    () => ({
      schema,
      uischema: uiSchema,
      initialData,
      makeActionRequest,
      isFetched,
      isError,
      formErrors,
      setFormErrors,
      baseEndpoint: endpoint || "",
      formData,
      setFormData,
      permissionHeaders,
      handleFormsValuesChange,
      clearFormsData,
      context,
    }),
    [
      schema,
      uiSchema,
      initialData,
      makeActionRequest,
      isFetched,
      isError,
      formErrors,
      endpoint,
      formData,
      setFormData,
      permissionHeaders,
      context,
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
