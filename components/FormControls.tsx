/* eslint-disable react/button-has-type */
import React, { ChangeEvent } from "react";
import { FormikErrors } from "formik";
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;
import "react-quill/dist/quill.snow.css";
// @ts-ignore
import classNames from "classnames";
import ReactSelect, { ValueType } from "react-select";

interface Option {
  label: string;
  value: string;
}

export const Select = ({
  name,
  form,
  options,
  isMulti,
}: {
  name: string;
  form: any;
  options: Option[];
  isMulti?: boolean;
}) => {
  const onChange = (option: ValueType<Option | Option[]>) => {
    form.setFieldValue(
      name,
      isMulti
        ? ((option as Option[]) || []).map((item: Option) => item.value)
        : (option as Option).value
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(
            (option) => form.values[name].indexOf(option.value) >= 0
          )
        : options.find(
            (option) =>
              option.value ===
              (Array.isArray(form.values[name])
                ? form.values[name][0]
                : form.values[name])
          );
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  return (
    <ReactSelect
      name={name}
      isMulti={isMulti}
      value={getValue()}
      options={options}
      onChange={onChange}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
};

export const Button = ({
  disabled = false,
  text,
  label,
  type = "button",
  onClick = () => {
    return false;
  },
  onMouseUp = () => {
    return false;
  },
  classes,
}: {
  disabled?: boolean;
  text: string;
  label?: string;
  type?: "submit" | "button";
  onClick?: (event: any) => void;
  onMouseUp?: (event: any) => void;
  classes?: string | undefined;
}) => {
  const c = classNames(
    classes,
    "transition duration-300 bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 focus:outline-none focus:ring",
    {
      "opacity-25": disabled,
    }
  );
  return (
    <button
      aria-label={label || text}
      disabled={disabled}
      className={c}
      type={type}
      onClick={onClick}
      onMouseUp={onMouseUp}
    >
      {text}
    </button>
  );
};

export const FormItem = ({
  classes,
  children,
}: {
  classes?: string | undefined;
  children?: any;
}) => {
  const c = classNames(classes, "mb-8");
  return <div className={c}>{children}</div>;
};

export const Label = ({
  value,
  htmlFor,
  optional,
  classes,
}: {
  value: string;
  htmlFor?: string;
  optional?: boolean;
  classes?: string | undefined;
}) => {
  const c = classNames(classes, "block text-gray-900 text-sm font-bold mb-2");
  const label = `${value} ${!optional && "(required)"}`;
  return (
    <label
      title={label}
      aria-label={label}
      className={c}
      htmlFor={htmlFor || value.toLowerCase()}
    >
      {value}{" "}
      {optional && (
        <span className="text-gray-700 font-normal">(optional)</span>
      )}
    </label>
  );
};

export const LinkButton = ({
  disabled = false,
  text,
  label,
  type = "button",
  onClick = () => {
    return false;
  },
  classes,
}: {
  disabled?: boolean;
  text: string;
  label?: string;
  type?: "submit" | "button";
  onClick?: () => void;
  classes?: string | undefined;
}) => {
  const c = classNames(
    classes,
    "text-primary-600 bg-transparent font-bold py-2 px-0 focus:outline-none focus:outline-none",
    {
      "opacity-25": disabled,
    }
  );
  return (
    <button
      aria-label={label || text}
      disabled={disabled}
      className={c}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export const SVGButton = ({
  children,
  label,
  disabled = false,
  off = false,
  type = "button",
  onClick = () => {
    return false;
  },
  classes,
}: {
  children: any;
  label: string;
  disabled?: boolean;
  off?: boolean;
  type?: "submit" | "button";
  onClick?: () => void;
  classes?: string | undefined;
}) => {
  const c = classNames(classes, {
    "opacity-25": disabled || off,
  });
  return (
    <button
      aria-label={label}
      title={label}
      disabled={disabled}
      className={c}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const SVGLinkButton = ({
  children,
  label,
  disabled = false,
  type = "button",
  primary,
  minimizeDisabled = false,
  onClick = () => {
    return false;
  },
  classes,
}: {
  children: any;
  label: string;
  disabled?: boolean;
  type?: "submit" | "button";
  primary?: boolean;
  minimizeDisabled?: boolean;
  onClick?: () => void;
  classes?: string | undefined;
}) => {
  const c = classNames(
    classes,
    "transition duration-300 font-bold py-2 px-0 focus:outline-none focus:outline-none inline-flex items-center",
    {
      "opacity-25": disabled,
      "text-primary-600 bg-transparent": !primary,
      "md:bg-primary-500 md:hover:bg-primary-700 text-white md:px-4 md:focus:ring":
        primary && !minimizeDisabled,
      "bg-primary-500 hover:bg-primary-700 text-white px-4 focus:ring":
        primary && minimizeDisabled,
    }
  );
  return (
    <button
      aria-label={label}
      title={label}
      disabled={disabled}
      className={c}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const SVGLinkButtonText = ({
  text,
  minimizeDisabled = false,
  classes,
}: {
  text: string;
  minimizeDisabled?: boolean;
  classes?: string | undefined;
}) => {
  // must use .hide not .hidden, otherwise the UV's .hidden class hides the links when it loads
  const c = classNames(classes, {
    "hide md:block": !minimizeDisabled,
  });

  return <span className={c}>{text}</span>;
};

type OnChange = (
  eventOrPath: string | ChangeEvent<any>
) => void | ((eventOrTextValue: string | ChangeEvent<any>) => void);
type Errors = FormikErrors<any>;

const hasError = (id: string, errors: Errors | undefined) => {
  return errors !== undefined && Object.keys(errors).includes(id);
};

export const TextArea = ({
  id,
  value,
  onChange,
  errors,
  classes,
}: {
  id: string;
  value: string;
  onChange: OnChange;
  errors?: Errors | undefined;
  classes?: string | undefined;
}) => {
  const err: boolean = hasError(id, errors);
  const c = classNames(
    classes,
    "appearance-none w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring",
    {
      "border-red-500": err,
      "border-gray-400": !err,
    }
  );
  return (
    <>
      <textarea
        key={id}
        className={c}
        id={id}
        name={id}
        onChange={onChange}
        value={value}
      />
      {err && <ValidationMessage message={(errors as any)[id]} />}
    </>
  );
};

export const TextInput = ({
  id,
  value,
  onChange,
  readonly = false,
  maxLength,
  placeholder,
  errors,
  classes,
}: {
  id: string;
  value: string | undefined;
  onChange?: OnChange;
  readonly?: boolean;
  maxLength?: number;
  placeholder?: string;
  errors?: Errors | undefined;
  classes?: string | undefined;
}) => {
  const err: boolean = hasError(id, errors);
  const c = classNames(
    classes,
    "appearance-none w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring border",
    {
      "border-red-500": err,
      "border-gray-400": !err,
    }
  );
  return (
    <>
      <input
        key={id}
        className={c}
        id={id}
        maxLength={maxLength}
        placeholder={placeholder}
        name={id}
        type="text"
        onChange={onChange}
        value={value}
        readOnly={readonly}
      />
      {err && <ValidationMessage message={(errors as any)[id]} />}
    </>
  );
};

export const HiddenField = ({
  id,
  value,
}: {
  id: string;
  value: string | undefined;
}) => {
  return (
    <input key={id} id={id} name={id} type="hidden" value={value} readOnly />
  );
};

export const Checkbox = ({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange?: OnChange;
}) => {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        className="w-5 h-5 mr-2 align-middle"
        onChange={onChange}
      />
      <label htmlFor={id} className="text-sm align-middle">
        {label}
      </label>
    </>
  );
};

export const TextInputWithButton = ({
  id,
  disabled,
  placeholder,
  buttonText,
  errors,
  buttonType = "button",
  inputValue,
  onChange,
  onButtonClick = () => {
    return false;
  },
}: {
  id: string;
  disabled?: boolean;
  placeholder?: string;
  buttonText?: string;
  errors?: Errors | undefined;
  buttonType?: "submit" | "button";
  inputValue?: string;
  onChange?: OnChange;
  onButtonClick?: () => void;
}) => {
  const inputClasses = classNames(
    "appearance-none w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring w-8/12 border border-gray-400"
  );
  const buttonClasses = classNames(
    "transition duration-300 bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 focus:outline-none focus:ring w-4/12"
  );

  const err: boolean = hasError(id, errors);

  return (
    <>
      <div className="w-full flex">
        <input
          id={id}
          name={id}
          type="text"
          value={inputValue}
          disabled={disabled}
          placeholder={placeholder}
          className={inputClasses}
          onChange={onChange}
        />
        <button
          disabled={disabled}
          aria-label={buttonText}
          className={buttonClasses}
          type={buttonType}
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </div>
      {err && (
        <div className="w-full">
          <ValidationMessage message={(errors as any)[id]} />
        </div>
      )}
    </>
  );
};

export const RichTextInput = ({
  id,
  value,
  onChange,
  errors,
  classes,
}: {
  id: string;
  value: string | undefined;
  onChange: OnChange;
  errors?: Errors | undefined;
  classes?: string | undefined;
}) => {
  const err: boolean = hasError(id, errors);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }],
      ["link"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "blockquote",
    "list",
    "bullet",
    "color",
    "link",
  ];

  const c = classNames(classes, {
    border: err,
    "border-red-500": err,
  });

  return (
    <>
      <div className={c}>
        <ReactQuill
          value={value}
          modules={modules}
          formats={formats}
          onChange={onChange}
          bounds=".annotation-text"
          className="bg-white"
        />
      </div>
      {err && <ValidationMessage message={(errors as any)[id]} />}
    </>
  );
};

export const ValidationMessage = ({
  message,
  classes,
}: {
  message: string;
  classes?: string | undefined;
}) => {
  const c = classNames(classes, "pt-2 text-red-500 text-xs italic");
  return <p className={c}>{message}</p>;
};

export const NumberInput = ({
  id,
  value,
  min,
  max,
  step = 1,
  onChange,
  errors,
  classes,
}: {
  id: string;
  value: string;
  min: number;
  max: number;
  step?: number;
  onChange?: OnChange;
  errors?: Errors | undefined;
  classes?: string | undefined;
}) => {
  const err: boolean = hasError(id, errors);

  const c = classNames(
    classes,
    "appearance-none w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring border",
    {
      "border-red-500": err,
      "border-gray-400": !err,
    }
  );

  return (
    <>
      <input
        type="number"
        id={id}
        value={value}
        min={min}
        max={max}
        step={step}
        className={c}
        onChange={onChange}
      />
    </>
  );
};
