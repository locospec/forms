import { createContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useFetchConfig } from "@/hooks";

const queryClient = new QueryClient();

interface FormsContextType {}

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
  const { configCallback, endpoint } = formsConfig;
  const configEndpoint = endpoint + "/_config";

  const {
    data: config,
    isFetched,
    isError,
  } = useFetchConfig({
    configEndpoint,
    configCallback,
  });

  console.log(">>>>>>>>> ", config, isFetched, isError);

  return <FormsContext.Provider value={{}}>{children}</FormsContext.Provider>;
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
