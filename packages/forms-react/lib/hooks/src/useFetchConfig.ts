import { useQuery } from "@tanstack/react-query";

export interface useFetchConfigProps {
  configEndpoint: string;
  configCallback?: () => any;
  permissionHeaders?: any;
}

const useFetchConfig = ({
  configEndpoint,
  configCallback,
  permissionHeaders,
}: useFetchConfigProps) => {
  if (!configCallback && !configEndpoint) {
    throw new Error("Either configCallback or configEndpoint must be provided");
  }
  const configCallerFunction = async () => {
    const response = await fetch(configEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...permissionHeaders,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch table configuration.");
    }

    const config = await response.json();
    return config;
  };

  return useQuery({
    queryKey: [configEndpoint],
    queryFn: configCallback ? configCallback : configCallerFunction,
  });
};

useFetchConfig.displayName = "useFetchConfig";

export { useFetchConfig };
