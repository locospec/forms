import { Switch } from "@/base/switch";
import React from "react";

export interface FormsSwitchInputInteface {
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

const FormsSwitchInput: React.FC<FormsSwitchInputInteface> = ({
  onChangeCallback,
  values,
  setValues,
  placeholder = "Select option",
  errors,
  required = false,
  title,
}) => {
  const handleSwitchChange = (checked: boolean) => {
    setValues(checked);
    onChangeCallback && onChangeCallback(checked);
  };

  return (
    <div className="flex gap-x-4 items-center h-full ">
      <Switch
        thumbClassName="h-6 w-6 data-[state=unchecked]:bg-brand-textGrey"
        checked={values !== "" ? values : false}
        onCheckedChange={(checked) => {
          handleSwitchChange(checked);
        }}
        className=" data-[state=unchecked]:bg-transparent hidden lg:flex  data-[state=unchecked]:border-2 data-[state=unchecked]:border-brand-textGrey p-1 h-8 w-[52px] data-[state=unchecked]:text-brand-textGrey"
      />
      <p className="font-openSans font-normal text-web-body-sm leading-[14px] text-brand-textGrey">
        {required
          ? title
            ? title + "*"
            : placeholder + "*"
          : title
          ? title
          : placeholder}
      </p>
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

export { FormsSwitchInput };
