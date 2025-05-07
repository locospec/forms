import React, { useState, useEffect } from "react";
import { Calendar } from "@/base/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/base/popover";
import { Input } from "@/base/input";
import { Button } from "@/base/button";
import { CalendarIcon } from "lucide-react";

export interface FormsCalendarDateTimeInterface {
  onChangeCallback?: (val: string) => void;
  values?: string;
  setValues?: (val: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  setIsLoading?: (val: boolean) => void;
  errors?: string;
  required?: boolean;
  title?: string;
}

const FormsCalendarDateTime: React.FC<FormsCalendarDateTimeInterface> = ({
  onChangeCallback,
  values,
  setValues,
  placeholder = "Select option",
  errors,
  required = false,
  title,
}) => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | undefined>(
    values ? new Date(values) : undefined
  );

  useEffect(() => {
    if (values) {
      const parsed = new Date(values);
      if (!isNaN(parsed.getTime())) setSelectedDateTime(parsed);
    }
  }, [values]);

  const generateTimes = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const formattedHour = String(hour).padStart(2, "0");
        const formattedMinute = String(minute).padStart(2, "0");
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return times;
  };

  const times = generateTimes();

  const updateParent = (date: Date) => {
    const isoString = date.toISOString();
    setValues?.(isoString);
    onChangeCallback?.(isoString);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    const currentTime = selectedDateTime ?? new Date();
    const combinedDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      currentTime.getHours(),
      currentTime.getMinutes()
    );
    setSelectedDateTime(combinedDateTime);
    updateParent(combinedDateTime);
  };

  const handleTimeSelect = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const currentDate = selectedDateTime ?? new Date();
    const combinedDateTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      hours,
      minutes
    );
    setSelectedDateTime(combinedDateTime);
    updateParent(combinedDateTime);
  };

  return (
    <div className="w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className="w-full h-[50px] rounded-none font-openSans font-normal text-web-body-sm leading-4 text-brand-textLightGrey"
          >
            <div className="flex justify-between w-full items-center">
              <div className="relative w-full">
                <Input
                  id="name"
                  focusBorderClasses="shadow-none"
                  value={
                    selectedDateTime
                      ? `${selectedDateTime.toLocaleDateString()} ${selectedDateTime.toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}`
                      : ""
                  }
                  onChange={() => {}}
                  required
                  className="bg-transparent border-none !px-0 hover:cursor-pointer pointer-events-none peer autofill:bg-white focus:border-brand-orange pb-[6px] pt-4 h-[50px] outline-none border w-full font-openSans font-normal text-web-body-sm leading-4 text-brand-textLightGrey"
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
        <PopoverContent className=" w-auto p-0" align="start">
          <div className="mobile:flex">
            <Calendar
              mode="single"
              classNames={{
                nav_button_previous: "absolute left-1 border-none",
                nav_button_next: "absolute right-1 border-none",
              }}
              selected={selectedDateTime}
              onSelect={(e) => handleDateSelect(e)}
              disabled={(date) => date < new Date()}
              initialFocus
            />
            <div className="px-6 py-1 mobile:py-3 border rounded-lg pl-16 mobile:pl-6  flex mobile:flex-col items-center">
              <p className="mb-2 mobile:mb-0">Time</p>
              <ul className="space-y-1 mobile:mt-3 ml-5 mobile:ml-0 overflow-y-auto  h-[90px]  mobile:h-[230px]">
                {times.map((time, index) => {
                  const [h, m] = time.split(":").map(Number);
                  const isSelected =
                    selectedDateTime &&
                    selectedDateTime.getHours() === h &&
                    selectedDateTime.getMinutes() === m;
                  return (
                    <li
                      key={index}
                      onClick={() => handleTimeSelect(time)}
                      className={`p-0.5 hover:cursor-pointer w-[100px] mobile:w-auto font-openSans font-normal text-web-body-md leading-5 hover:bg-brand-bgBlack hover:text-white text-center ${
                        isSelected ? "bg-brand-bgBlack text-white" : "bg-white"
                      }  rounded `}
                    >
                      {time}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {errors && (
        <label
          htmlFor="name"
          className="text-brand-textRed text-web-body-sm ml-2"
        >
          {errors}
        </label>
      )}
    </div>
  );
};

export { FormsCalendarDateTime };
