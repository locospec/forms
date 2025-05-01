import React from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/base/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/base/popover";
import { useFetchMoreOnScroll } from "@/hooks";

export interface FormsEnumInputInteface {
  options: { title: string; const: string }[];
  filterContainerRef: any;
  model_name: string;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onChangeCallback?: any;
  fetchNextPage?: any;
  isFetching?: any;
  hasNextPage?: any;
  values?: any;
  setValues?: any;
  placeholder?: string;
  open?: any;
  setOpen?: any;
  isLoading?: any;
  setIsLoading?: any;
  errors?: any;
  required?: boolean;
  title?: string;
}

const FormsEnumInput: React.FC<FormsEnumInputInteface> = ({
  options,
  filterContainerRef,
  model_name,
  title,
  searchQuery,
  setSearchQuery,
  onChangeCallback,
  fetchNextPage,
  isFetching,
  hasNextPage,
  values,
  setValues,
  placeholder = "Select option",
  open,
  setOpen,
  isLoading,
  errors,
  required = false,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { fetchMoreOnBottomReached } = useFetchMoreOnScroll({
    containerRef: containerRef,
    fetchNextPage,
    isFetching,
    hasNextPage,
  });

  const handleInputClear = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setValues("");
    onChangeCallback && onChangeCallback("");
  };

  const handleValueChange = (value: string) => {
    setValues(value);
    onChangeCallback && onChangeCallback(value);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "relative rounded-none flex items-center justify-start px-2 w-full gap-2 whitespace-nowrap font-openSans font-normal text-web-body-sm leading-4 text-brand-textLightGrey transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#EEEEEE]",
            "h-14 px-4 py-2 border hover:bg-accent hover:text-brand-borderGrey",
            errors
              ? "border-red-500 text-[#d32f2f] focus-visible:ring-red-500"
              : "border-border bg-background hover:text-accent-foreground"
          )}
          aria-expanded={open}
        >
          <div className="max-w-[150px]  truncate">
            {values && values.length > 0
              ? options
                  .filter((option) => values.includes(option?.const))
                  .map((option) => option.title)
                  .join(",")
              : `${placeholder} ${required ? "*" : ""}`}
          </div>
          {values && values.length > 0 ? (
            <div
              className="h-4 w-4 absolute right-2 hover:bg-aaccent"
              onClick={handleInputClear}
            >
              <X className="shrink-0 opacity-50" />
            </div>
          ) : (
            <div className="h-4 w-4 absolute right-2">
              <ChevronDown className="shrink-0 opacity-50 hover:bg-accent" />
            </div>
          )}
          <div
            className={`absolute left-4 font-openSans font-normal text-wrap leading-[13px]  text-[10px] text-brand-borderGrey top-1.5 ${
              !values ? "text-transparent" : ""
            }    pointer-events-none  transition-all duration-300 `}
          >
            <p className="py-auto  flex flex-col justify-center h-full ">
              {required
                ? title
                  ? title + "*"
                  : placeholder + "*"
                : title
                ? title
                : placeholder}
            </p>
          </div>
        </div>
      </PopoverTrigger>
      {errors && (
        <label className="text-[#d32f2f] text-xs ml-[14px]">{errors}</label>
      )}
      <PopoverContent
        className="w-[280px] max-w-[300px] p-0"
        containerRef={filterContainerRef}
      >
        <Command>
          <div
            className="flex items-center border-b px-3"
            cmdk-input-wrapper=""
          >
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              className={cn(
                "flex h-8 border-0 w-full bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground hover:bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
              )}
              value={searchQuery}
              placeholder={placeholder}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </div>
          <CommandSeparator />
          <CommandList
            ref={containerRef}
            key={model_name}
            onScroll={(e) =>
              fetchMoreOnBottomReached(e.target as HTMLDivElement)
            }
          >
            <CommandEmpty>
              {isLoading ? "Loading options" : "NO options found"}
            </CommandEmpty>
            <CommandGroup>
              {!isLoading &&
                options.map((option) => {
                  return (
                    <CommandItem
                      key={option?.const}
                      value={option?.const}
                      onSelect={handleValueChange}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          values && values.includes(option?.const)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {option?.title}
                    </CommandItem>
                  );
                })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export { FormsEnumInput };
