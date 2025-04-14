import React, { useState } from "react";
import { Calendar } from "@/base/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/base/popover";
import { Input } from "@/base/input";
import { Button } from "@/base/button";
import { CalendarIcon } from "lucide-react";

export interface FormsCalendarInputInteface {
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
  isLoading?: any;
  setIsLoading?: any;
  errors?: any;
  required?: boolean;
}

const FormsCalendarInput: React.FC<FormsCalendarInputInteface> = ({
  onChangeCallback,
  values,
  setValues,
  placeholder = "Select option",
  errors,
  required = false,
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);

  const showDateFormat = (item: any) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(item);
  };

  const handleDateSelect = (item: any) => {
    onChangeCallback && onChangeCallback(item);
    setDate(item);
    setValues(item);
    setOpen(false);
    // setRenderKey(renderKey + 1);
  };

  return (
    <div
      // key={renderKey}
      className="w-full"
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={
              "w-full h-[50px] rounded-none font-openSans font-normal text-web-body-sm leading-4 text-brand-textLightGrey"
            }
          >
            <div className="flex justify-between w-full items-center">
              <div className="relative w-full">
                <Input
                  // key={renderKey}
                  id="calendar-component"
                  value={showDateFormat(values)}
                  onChange={() => {}}
                  required
                  className="bg-transparent border-none hover:cursor-pointer pointer-events-none py-4  peer  autofill:bg-white focus:border-brand-orange pb-[6px] h-[50px]  outline-none  border  w-full   font-openSans font-normal text-web-body-sm leading-4 text-brand-textLightGrey"
                />
                <label
                  htmlFor="name"
                  className={`absolute h-full font-openSans font-normal text-web-body-sm text-wrap mid:text-web-body-lg leading-3 mid:leading-5 ${
                    !values ? "text-brand-borderGrey" : "text-transparent"
                  }   left-0    pointer-events-none  transition-all duration-300 peer-valid:h-fit  peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-[10px] peer-focus:top-1.5 peer-focus:text-[10px]  peer-focus:leading-[13px] peer-focus:h-fit  peer-focus:text-brand-orange peer-valid:top-1 peer-valid:text-[10px] peer-valid:leading-[13px] peer-valid:text-brand-borderGrey`}
                >
                  <p className="py-auto  flex flex-col justify-center h-full ">
                    {required ? placeholder + "*" : placeholder}
                  </p>
                </label>
              </div>
              <CalendarIcon className="ml-auto h-6 w-6 " />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            classNames={{
              nav_button_previous: "absolute left-1 border-none",
              nav_button_next: "absolute right-1 border-none",
            }}
            selected={date}
            onSelect={(e) => handleDateSelect(e)}
            disabled={(date) => date < new Date()}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {errors && (
        <label
          htmlFor="name"
          className={"text-brand-textRed text-web-body-sm ml-2"}
        >
          {errors}
        </label>
      )}
    </div>
  );
};

export { FormsCalendarInput };
