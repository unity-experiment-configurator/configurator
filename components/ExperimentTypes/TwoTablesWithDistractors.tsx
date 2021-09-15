import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, FormItem, Label, Select, RangeInput, Checkbox } from "../FormControls";
import chroma from "chroma-js";

const TwoTablesWithDistractors = ({
  onSubmit,
  submitText = "Submit",
  options,
  isDisabled,
}: {
  onSubmit: (values: any) => void;
  submitText?: string;
  options: any;
  isDisabled?: boolean;
}) => {
  type Option = { label: string; value: string; color?: string };

  const interactionTypes: Option[] = [
    {
      label: "Grab",
      value: "grab",
    },
    {
      label: "Point",
      value: "point",
    },
  ];

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
      value: "Cone",
    },
    {
      label: "Cube",
      value: "Cube",
    },
    {
      label: "Sphere",
      value: "Sphere",
    },
    {
      label: "Torus",
      value: "Torus",
    },
    {
      label: "Cylinder",
      value: "Cylinder",
    },
  ];

  const environmentSounds: Option[] = [
    {
      label: "None",
      value: "",
    },
    {
      label: "Ambient",
      value: "Ambient",
    },
    {
      label: "Busy Street",
      value: "BusyStreet",
    },
    {
      label: "Crowd Chatter",
      value: "CrowdChatter",
    },
  ];

  const targetSounds: Option[] = [
    {
      label: "None",
      value: "",
    },
    {
      label: "Beep",
      value: "Beep",
    },
    {
      label: "Buzz",
      value: "BuzzTypeA",
    },
    {
      label: "Correct",
      value: "CorrectTypeA",
    },
    {
      label: "Incorrect",
      value: "FalseTypeA",
    },
  ];

  const distractorColors = options?.distractorColors || [colors[0].value];
  const distractorCount = options?.distractorCount || 1;
  const distractorModels = options?.distractorModels || [primitives[0].value];
  const distractorSize = options?.distractorSize || 0.5;
  const environmentAudio = options?.environmentAudio || environmentSounds[0].value;
  const goalAudio = options?.goalAudio || targetSounds[0].value;
  const targetColor = options?.targetColor || colors[0].value;
  const targetConstantAudio = options?.targetConstantAudio || targetSounds[0].value;
  const targetModel = options?.targetModel || primitives[0].value;
  const targetOnGrabAudio = options?.targetOnGrabAudio || targetSounds[0].value;
  const targetOnReleaseAudio = options?.targetOnReleaseAudio || targetSounds[0].value;
  const targetSize = options?.targetSize || 0.5;
  const userDirectGrab = options?.userDirectGrab !== undefined ? options.userDirectGrab : true;
  const userMovement = options?.userMovement !== undefined ? options.userMovement : false;
  const userRayGrab = options?.userRayGrab !== undefined ? options.userRayGrab : false;
  
  const validationSchema = Yup.object({
    distractorCount: Yup.string().required("Please enter a value"),
  });

  const formik = useFormik({
    initialValues: {
      distractorColors,
      distractorCount,
      distractorModels,
      distractorSize,
      environmentAudio,
      goalAudio,
      targetColor,
      targetConstantAudio,
      targetModel,
      targetOnGrabAudio,
      targetOnReleaseAudio,
      targetSize,
      userDirectGrab,
      userMovement,
      userRayGrab,
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
        <Label value="Thumbstick Movement Enabled" />
        <Checkbox
          id="userMovement"
          label="Allow the user to navigate using thumbsticks"
          checked={formik.values.userMovement}
          // @ts-ignore
          onChange={(e: any) =>
            formik.setFieldValue("userMovement", e.target.checked)
          }
        />
      </FormItem>

      <FormItem>
        <Label value="Grab Enabled" />
        <Checkbox
          id="userDirectGrab"
          label="Allow the user to grab objects"
          checked={formik.values.userDirectGrab}
          // @ts-ignore
          onChange={(e: any) =>
            formik.setFieldValue("userDirectGrab", e.target.checked)
          }
        />
      </FormItem>

      <FormItem>
        <Label value="Pointer Grab Enabled" />
        <Checkbox
          id="userRayGrab"
          label="Allow the user to grab objects using a pointer"
          checked={formik.values.userRayGrab}
          // @ts-ignore
          onChange={(e: any) =>
            formik.setFieldValue("userRayGrab", e.target.checked)
          }
        />
      </FormItem>

      <FormItem>
        <Label value="Target Model" />
        <Select name="targetModel" form={formik} options={primitives} isDisabled={isDisabled} />
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
          isDisabled={isDisabled}
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
          isDisabled={isDisabled}
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
          isDisabled={isDisabled}
        />
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
        <Label value="Environment Audio" />
        <Select name="environmentAudio" options={environmentSounds} form={formik} isDisabled={isDisabled} />
      </FormItem>

      <FormItem>
        <Label value="Target On Grab Audio" />
        <Select name="targetOnGrabAudio" options={targetSounds} form={formik} isDisabled={isDisabled} />
      </FormItem>

      <FormItem>
        <Label value="Target On Release Audio" />
        <Select name="targetOnReleaseAudio" options={targetSounds} form={formik} isDisabled={isDisabled} />
      </FormItem>

      <FormItem>
        <Label value="Target While Grabbed Audio" />
        <Select name="targetConstantAudio" options={targetSounds} form={formik} isDisabled={isDisabled} menuPlacement="top" />
      </FormItem>

      <FormItem>
        <Label value="Target Dropped On Goal Audio" />
        <Select name="goalAudio" options={targetSounds} form={formik} isDisabled={isDisabled} menuPlacement="top" />
      </FormItem>

      {
        !isDisabled && <Button text={submitText} type="submit" classes="md:mt-4 float-right" />
      }
    </form>
  );
};

export default TwoTablesWithDistractors;
