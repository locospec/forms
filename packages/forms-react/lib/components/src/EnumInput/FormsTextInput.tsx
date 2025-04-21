import React from "react";
import { Input } from "@/base/input";

export interface FormsTextInputInteface {
  contentType: string;
  onChangeCallback?: any;
  values?: any;
  setValues?: any;
  placeholder?: string;
  errors?: any;
  minvalue?: number;
  stepsize?: number;
  required?: boolean;
  title?: string;
}

const FormsTextInput: React.FC<FormsTextInputInteface> = ({
  onChangeCallback,
  values,
  setValues,
  placeholder = "Enter value..",
  errors,
  contentType,
  minvalue,
  stepsize,
  title,
  required = false,
}) => {
  const handleValueChange = (value: string) => {
    setValues(value);
    onChangeCallback && onChangeCallback(value);
  };

  return (
    <div className={` relative w-full`}>
      <Input
        type={contentType}
        {...(contentType === "number" ? { stepsize, minvalue } : {})}
        id="name"
        value={values}
        onChange={(e) => {
          handleValueChange(e.target.value);
        }}
        className={`bg-white  py-4 peer pl-4 autofill:bg-white focus:border-brand-orange pb-[6px] h-[50px]  outline-none  border  w-full   font-openSans font-normal text-web-body-sm leading-4 text-brand-textLightGrey`}
      />
      <label
        htmlFor="name"
        className={`absolute font-openSans font-normal text-web-body-sm leading-3 mid:text-web-body-lg mid:leading-5 ${
          !values ? "text-brand-borderGrey" : "text-transparent"
        } left-4 top-4 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-[10px] peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:leading-[13px] peer-focus:text-brand-orange peer-valid:top-1.5 peer-valid:text-[10px] peer-valid:leading-[13px] peer-valid:text-brand-borderGrey`}
      >
        {required
          ? title
            ? title + "*"
            : placeholder + "*"
          : title
          ? title
          : placeholder}
      </label>
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

export { FormsTextInput };
