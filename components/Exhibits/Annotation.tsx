import React from "react";
import classNames from "classnames";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SVGButton, RichTextInput } from "../FormControls";
import { useTargetBlank } from "../../lib/Hooks";
import { sanitizeClient } from "../../lib/Utils";
import { ArrowDownIcon, PlusCircleIcon, TrashIcon, CheckCircleIcon } from "@heroicons/react/solid";

const Annotation = ({
  disabled,
  selected,
  value,
  maxChars = 1000,
  showArrow = true,
  onClick,
  onUpdate,
  onDelete,
}: {
  disabled: boolean;
  selected: boolean;
  value?: string | undefined;
  maxChars?: number;
  showArrow?: boolean;
  onClick?: () => void;
  onUpdate?: (values: any) => void;
  onDelete?: () => void;
}) => {
  useTargetBlank(".item-text a", []);

  const validationSchema = Yup.object({
    value: Yup.string()
      .max(maxChars, `Please limit to ${maxChars} characters`)
      .test("empty", "Please enter a value", (value: any) => {
        return value && value.replace(/<(.|\n)*?>/g, "").trim().length !== 0;
      }),
  });

  const { setFieldValue, handleSubmit, values, errors } = useFormik({
    initialValues: {
      value,
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: (
      values: any,
      {
        resetForm,
      }: {
        resetForm: any;
      }
    ) => {
      if (onUpdate) {
        resetForm({ values: "" });
        onUpdate(values.value);
      }
    },
  });

  const itemClasses = classNames(
    "item transition duration-300 bg-gray-100 rounded p-4 cursor-pointer",
    {
      "pointer-events-none opacity-60": disabled,
      "bg-gray-300": selected,
      "hover:bg-gray-300": value,
    }
  );

  const arrowClasses = classNames("mt-4 mb-4 bg-no-repeat bg-center h-6", {
    "pointer-events-none opacity-60": disabled || selected,
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          role="navigation"
          className={itemClasses}
          onClick={() => {
            if (onClick) {
              if (!disabled) {
                onClick();
              }
            }
          }}
        >
          {selected ? (
            <>
              <div className="item-text text-left text-sm">
                <RichTextInput
                  id="value"
                  value={values.value}
                  // @ts-ignore
                  onChange={(e) => setFieldValue("value", e)}
                  errors={errors}
                />
              </div>
              <div className="options">
                <div className="buttons flex pt-4 justify-center">
                  {value ? (
                    <div>
                      <SVGButton
                        classes="float-left ml-1 mr-1"
                        label="Save"
                        type="submit"
                      >
                        <CheckCircleIcon className="w-7 h-7" />
                      </SVGButton>
                      <SVGButton
                        label="Delete"
                        onClick={() => {
                          if (onDelete) {
                            onDelete();
                          }
                        }}
                      >
                        <TrashIcon className="w-7 h-7" />
                      </SVGButton>
                    </div>
                  ) : (
                    <SVGButton label="Add" type="submit">
                      <PlusCircleIcon className="w-7 h-7" />
                    </SVGButton>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                dangerouslySetInnerHTML={
                  value ? sanitizeClient(value) : sanitizeClient("...")
                }
                className="item-text leading-snug"
              />
              <div className="options" />
            </>
          )}
        </div>
      </form>
      {showArrow && (
        <div className={arrowClasses}>
          <ArrowDownIcon className="mx-auto w-6" />
        </div>
      )}
    </>
  );
};

export default Annotation;
