import React from "react";
import { useFormsContext } from "@/context";
import { useInfiniteFetch } from "@/hooks/src/useInfiniteFetch";
import { useDebouncedEffectAfterMount } from "@/hooks";
import { capitaliseFirstLetter, generateFilter } from "./utils";
import { FormsCalendarInput } from "./FormsCalendarInput";

export interface FormsCalendarInputWrapperInterface {
  placeholder?: string;
  emptyLabel?: string;
  callback?: (values: string | string[]) => void;
  defaultValues?: string[];
  selectedAttribute: any;
  condition: any;
  path: number[];
  resetInput?: string;
  multiple?: boolean;
  filterContainerRef: any;
  className?: any;
  schema?: any;
  handleChange?: any;
  errors?: any;
  required?: boolean;
}

const FormsCalendarInputWrapper: React.FC<
  FormsCalendarInputWrapperInterface
> = (props) => {
  const { baseEndpoint, formData, permissionHeaders } = useFormsContext();
  const { schema, path, handleChange, errors = null, required } = props;
  const { modelName, dependsOn = [] } = schema;
  const [values, setValues] = React.useState<string>();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const placeholder = capitaliseFirstLetter(path as unknown as string);

  const query_key = `${modelName}&options`;

  const filterContainerRef = React.useRef<HTMLDivElement>(null);
  const relationQueryEndpoint = `${baseEndpoint}/_read_relation_options`;

  const handleValueChange = (value: string) => {
    handleChange(path, value);
  };

  const { fetchNextPage, isFetching, hasNextPage, refetch } = useInfiniteFetch({
    queryKey: query_key,
    searchQuery: searchQuery,
    endpoint: relationQueryEndpoint,
    keepPreviousData: true,
    body: {
      relation: modelName,
      filters: generateFilter(formData, dependsOn),
    },
    refreshDep: [query_key, searchQuery],
    headers: permissionHeaders,
  });

  useDebouncedEffectAfterMount(
    () => {
      setValues("");
      refetch();
    },
    [JSON.stringify(generateFilter(formData, dependsOn))],
    500
  );

  return (
    <div className="ENUM-WRAPPER" ref={filterContainerRef}>
      <FormsCalendarInput
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        filterContainerRef={filterContainerRef}
        model_name={modelName}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onChangeCallback={handleValueChange}
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        values={values}
        setValues={setValues}
        placeholder={placeholder}
        errors={errors}
        required={required}
      />
    </div>
  );
};

export { FormsCalendarInputWrapper };
