import React, { useState } from "react";
import { Calendar } from "@/base/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/base/popover";
import { Input } from "@/base/input";
import { Button } from "@/base/button";
import { CalendarIcon } from "lucide-react";

export interface FormsCalendarDateTimeInteface {
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

const FormsCalendarDateTime: React.FC<FormsCalendarDateTimeInteface> = ({
  onChangeCallback,
  values,
  setValues,
  placeholder = "Select option",
  errors,
  required = false,
  title,
}) => {
  //   const [date, setDate] = useState<Date | undefined>(new Date(values));
  const [selectedDateTime, setSelectedDateTime] = useState<Date | undefined>(
    values ? new Date(values) : undefined
  );

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

  //   const handleDateSelect = (item: any) => {
  //     let d = new Intl.DateTimeFormat("en-GB", {
  //       day: "2-digit",
  //       month: "short",
  //       year: "numeric",
  //     }).format(item);

  //     let newObj = {
  //       date: d,
  //       time: values?.time,
  //     };
  //     onChangeCallback?.(newObj);
  //     setDate(item);
  //     setValues(newObj);
  //   };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    const currentTime = selectedDateTime ? selectedDateTime : new Date();
    const combinedDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      currentTime.getHours(),
      currentTime.getMinutes()
    );
    setSelectedDateTime(combinedDateTime);
    onChangeCallback?.(combinedDateTime);
    setValues(combinedDateTime);
  };

  //   const handleTimeSelect = (item: any) => {
  //     let newObj = {
  //       date: values?.date,
  //       time: item,
  //     };

  //     onChangeCallback?.(newObj);
  //     setValues(newObj);
  //   };

  const handleTimeSelect = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const currentDate = selectedDateTime ? selectedDateTime : new Date();
    const combinedDateTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      hours,
      minutes
    );
    setSelectedDateTime(combinedDateTime);
    onChangeCallback?.(combinedDateTime);
    setValues(combinedDateTime);
  };

  return (
    <div className="w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={
              "w-full h-[50px] rounded-none font-openSans font-normal text-web-body-sm leading-4 text-brand-textLightGrey"
            }
          >
            <div className="flex justify-between w-full items-center">
              <div className="relative w-full">
                {/* <Input
                  id="name"
                  value={
                    (values?.date ? values?.date : "") +
                    " " +
                    (values?.time ? values?.time : "")
                  }
                  onChange={() => {}}
                  required
                  className="bg-transparent border-none hover:cursor-pointer pointer-events-none py-4  peer  autofill:bg-white focus:border-brand-orange pb-[6px] h-[50px]  outline-none  border  w-full   font-openSans font-normal text-web-body-sm leading-4 text-brand-textLightGrey"
                /> */}
                <Input
                  id="name"
                  value={
                    selectedDateTime
                      ? `${selectedDateTime.toLocaleDateString()} ${selectedDateTime.toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )}`
                      : ""
                  }
                  onChange={() => {}}
                  required
                  className="bg-transparent border-none hover:cursor-pointer pointer-events-none py-4 peer autofill:bg-white focus:border-brand-orange pb-[6px] h-[50px] outline-none border w-full font-openSans font-normal text-web-body-sm leading-4 text-brand-textLightGrey"
                />

                <label
                  htmlFor="name"
                  className={`absolute h-full font-openSans font-normal text-web-body-sm text-wrap mid:text-web-body-lg leading-3 mid:leading-5 ${
                    !values?.date && !values?.time
                      ? "text-brand-borderGrey"
                      : "text-transparent"
                  }   left-0    pointer-events-none  transition-all duration-300 peer-valid:h-fit  peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-[10px] peer-focus:top-1.5 peer-focus:text-[10px]  peer-focus:leading-[13px] peer-focus:h-fit  peer-focus:text-brand-orange peer-valid:top-1 peer-valid:text-[10px] peer-valid:leading-[13px] peer-valid:text-brand-borderGrey`}
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
            {/* <Calendar
              mode="single"
              classNames={{
                nav_button_previous: "absolute left-1 border-none",
                nav_button_next: "absolute right-1 border-none",
              }}
              selected={date}
              onSelect={(e) => handleDateSelect(e)}
              disabled={(date) => date < new Date()}
              initialFocus
            /> */}
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
                {times.map((time, index) => (
                  <li
                    key={index}
                    onClick={() => handleTimeSelect(time)}
                    className={`p-0.5 hover:cursor-pointer w-[100px] mobile:w-auto font-openSans font-normal text-web-body-md leading-5 hover:bg-brand-bgBlack hover:text-white text-center ${
                      values?.time === time
                        ? "bg-brand-bgBlack text-white"
                        : "bg-white"
                    }  rounded `}
                  >
                    {time}
                  </li>
                ))}
              </ul>
            </div>
          </div>
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

export { FormsCalendarDateTime };
