import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, FormItem, Label, Select, RangeInput } from "../FormControls";
import chroma from "chroma-js";

const TwoTablesWithDistractors = ({
  onSubmit,
  submitText = "Submit",
  options,
}: {
  onSubmit: (values: any) => void;
  submitText?: string;
  options: any;
}) => {
  type Option = { label: string; value: string; color?: string };

  const colors: Option[] = [
    {
      label: "Red",
      value: "red",
      color: "#E55353",
    },
    {
      label: "Orange",
      value: "orange",
      color: "#F79437",
    },
    {
      label: "Yellow",
      value: "yellow",
      color: "#FCC244",
    },
    {
      label: "Green",
      value: "green",
      color: "#76C161",
    },
    {
      label: "Blue",
      value: "blue",
      color: "#31AFE1",
    },
  ];

  const primitives: Option[] = [
    {
      label: "Cone",
      value: "cone",
    },
    {
      label: "Cube",
      value: "cube",
    },
    {
      label: "Sphere",
      value: "sphere",
    },
    {
      label: "Torus",
      value: "torus",
    },
    {
      label: "Cylinder",
      value: "cylinder",
    },
  ];

  const globalSounds: Option[] = [
    {
      label: "Beep",
      value: "beep",
    },
    {
      label: "Boop",
      value: "boop",
    },
  ];

  const targetSounds: Option[] = [
    {
      label: "Beep",
      value: "beep",
    },
    {
      label: "Boop",
      value: "boop",
    },
  ];

  const globalSound = options?.globalSound || globalSounds[0].value;
  const targetSize = options?.targetSize || 0.5;
  const targetColor = options?.targetColor || colors[0].value;
  const targetModel = options?.targetModel || primitives[0].value;
  const targetSound = options?.targetSound || targetSounds[0].value;
  const distractorSize = options?.distractorSize || 0.5;
  const distractorCount = options?.distractorCount || 1;
  const distractorColors = options?.distractorColors || [colors[0].value];
  const distractorModels = options?.distractorModels || [primitives[0].value];

  const validationSchema = Yup.object({
    distractorCount: Yup.string().required("Please enter a value"),
  });

  const formik = useFormik({
    initialValues: {
      globalSound,
      targetSize,
      targetColor,
      targetModel,
      targetSound,
      distractorSize,
      distractorCount,
      distractorColors,
      distractorModels,
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values: any) => {
      onSubmit(values);
    },
  });

  const dot = (color = "#ccc") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: "block",
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const singleColourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : null,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor:
            !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot() }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };

  const multiColourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : null,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor:
            !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="md:pr-8 lg:pr-8 pb-8 overflow-hidden max-w-xl"
    >
      <FormItem>
        <Label value="Global Sound" />
        <Select name="globalSound" options={globalSounds} form={formik} />
      </FormItem>

      <FormItem>
        <Label value="Target Size" />
        <RangeInput
          id="targetSize"
          value={formik.values.targetSize}
          min={0}
          max={1}
          step={0.1}
          onChange={formik.handleChange}
          errors={formik.errors}
        />
      </FormItem>

      <FormItem>
        <Label value="Target Colour" />
        <Select
          name="targetColor"
          form={formik}
          options={colors}
          styles={singleColourStyles}
        />
      </FormItem>

      <FormItem>
        <Label value="Target Model" />
        <Select name="targetModel" form={formik} options={primitives} />
      </FormItem>

      <FormItem>
        <Label value="Target Sound" />
        <Select name="targetSound" options={targetSounds} form={formik} />
      </FormItem>

      <FormItem>
        <Label value="Distractor Size" />
        <RangeInput
          id="distractorSize"
          value={formik.values.distractorSize}
          min={0}
          max={1}
          step={0.1}
          onChange={formik.handleChange}
          errors={formik.errors}
        />
      </FormItem>

      <FormItem>
        <Label value="Distractor Count" />
        <RangeInput
          id="distractorCount"
          value={formik.values.distractorCount}
          min={1}
          max={25}
          onChange={formik.handleChange}
          errors={formik.errors}
        />
      </FormItem>

      <FormItem>
        <Label value="Distractor Colours" />
        <Select
          name="distractorColors"
          isMulti
          closeMenuOnSelect={false}
          form={formik}
          options={colors}
          menuPlacement="top"
          styles={multiColourStyles}
        />
      </FormItem>

      <FormItem>
        <Label value="Distractor Models" />
        <Select
          name="distractorModels"
          isMulti
          closeMenuOnSelect={false}
          form={formik}
          options={primitives}
          menuPlacement="top"
        />
      </FormItem>

      <Button text={submitText} type="submit" classes="md:mt-4 float-right" />
    </form>
  );
};

export default TwoTablesWithDistractors;
