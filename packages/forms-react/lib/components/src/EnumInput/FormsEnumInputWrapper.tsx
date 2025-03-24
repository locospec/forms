import React from "react";
import { useFormsContext } from "@/context";
import { useInfiniteFetch } from "@/hooks/src/useInfiniteFetch";
import { FormsEnumInput } from "./FormsEnumInput";
import { useDebouncedEffectAfterMount, useEffectAfterMount } from "@/hooks";
import { capitaliseFirstLetter, generateFilter } from "./utils";

export interface FormsEnumInputWrapperInterface {
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

const FormsEnumInputWrapper: React.FC<FormsEnumInputWrapperInterface> = (
  props
) => {
  const { baseEndpoint, formData, permissionHeaders } = useFormsContext();
  const { schema, path, handleChange, errors = null, required } = props;
  const { modelName, dependsOn = [], options = [] } = schema;
  const [values, setValues] = React.useState<string>();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const placeholder = capitaliseFirstLetter(path as unknown as string);

  const query_key = `${modelName}&options`;

  const filterContainerRef = React.useRef<HTMLDivElement>(null);
  const relationQueryEndpoint = `${baseEndpoint}/_read_relation_options`;

  const handleValueChange = (value: string) => {
    handleChange(path, value);
  };
  const previousSameGroupRef = React.useRef(
    JSON.stringify(generateFilter(formData, dependsOn))
  );

  const {
    flatData: apiOptions,
    fetchNextPage,
    isFetching,
    hasNextPage,
    refetch,
  } = useInfiniteFetch({
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

  const enum_options: any[] = [];
  let areOptionsStatic = false;
  if (options.length > 0) {
    areOptionsStatic = true;
    enum_options.push(...options);
  } else {
    areOptionsStatic = false;
    enum_options.push(...apiOptions);
  }

  useDebouncedEffectAfterMount(
    () => {
      setValues("");
      refetch();
    },
    [JSON.stringify(generateFilter(formData, dependsOn))],
    500
  );

  useEffectAfterMount(() => {
    if (open && !areOptionsStatic) {
      const currentSameGroup = JSON.stringify(
        generateFilter(formData, dependsOn)
      );

      if (previousSameGroupRef.current !== currentSameGroup) {
        setIsLoading(true);
        refetch()
          .then(() => {
            previousSameGroupRef.current = currentSameGroup;
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  }, [open, areOptionsStatic]);

  return (
    <div className="ENUM-WRAPPER" ref={filterContainerRef}>
      <FormsEnumInput
        open={open}
        setOpen={setOpen}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        options={enum_options}
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

export { FormsEnumInputWrapper };
