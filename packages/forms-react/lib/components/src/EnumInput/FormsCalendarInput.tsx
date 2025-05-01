import React, { useState } from "react";
import { Calendar } from "@/base/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/base/popover";
import { Input } from "@/base/input";
import { Button } from "@/base/button";
import { CalendarIcon } from "lucide-react";

export interface FormsCalendarInputInteface {
  onChangeCallback?: any;
  values?: any;
  setValues?: any;
  placeholder?: string;
  isLoading?: any;
  setIsLoading?: any;
  errors?: any;
  required?: boolean;
  title?: string;
}

const FormsCalendarInput: React.FC<FormsCalendarInputInteface> = ({
  onChangeCallback,
  values,
  setValues,
  placeholder = "Select option",
  errors,
  required = false,
  title,
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date(values));
  const [open, setOpen] = useState(false);

  const showDateFormat = (dateValue: string | Date | undefined) => {
    if (!dateValue) return "";

    const dateObj =
      typeof dateValue === "string" ? new Date(dateValue) : dateValue;

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(dateObj);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`; // 'YYYY-MM-DD'

    onChangeCallback?.(formattedDate);
    setDate(selectedDate);
    setValues?.(formattedDate);
    setOpen(false);
  };

  return (
    <div className="w-full">
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
                  id="calendar-component"
                  value={showDateFormat(values)}
                  onChange={() => {}}
                  required
                  focusBorderClasses="shadow-none"
                  className="bg-transparent border-none hover:cursor-pointer !px-0 pointer-events-none py-4  peer  autofill:bg-white focus:border-brand-orange pb-[6px] h-[50px]  outline-none rounded-none  border  w-full   font-openSans font-normal text-web-body-sm leading-4 text-brand-textLightGrey"
                />
                <label
                  htmlFor="name"
                  className={`absolute font-openSans font-normal text-wrap leading-[13px]  text-[10px] text-brand-borderGrey top-1.5   left-0    pointer-events-none  transition-all duration-300 `}
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
