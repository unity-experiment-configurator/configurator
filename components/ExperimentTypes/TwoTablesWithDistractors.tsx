import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormItem,
  Label,
  Select,
  NumberInput,
  RangeInput,
} from "../FormControls";

const TwoTablesWithDistractors = ({
  onSubmit,
  submitText = "Submit",
  options,
}: {
  onSubmit: (values: any) => void;
  submitText?: string;
  options: any;
}) => {

  type Option = { label: string; value: string };

  const colors: Option[] = [
    {
      label: "Red",
      value: "red",
    },
    {
      label: "Orange",
      value: "orange",
    },
    {
      label: "Yellow",
      value: "yellow",
    },
    {
      label: "Green",
      value: "green",
    },
    {
      label: "Blue",
      value: "blue",
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
    }
  ];

  const targetSounds: Option[] = [
    {
      label: "Beep",
      value: "beep",
    },
    {
      label: "Boop",
      value: "boop",
    }
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
    distractorCount: Yup.string()
      .required("Please enter a value"),
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

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="md:pr-8 lg:pr-8 pb-8 overflow-hidden max-w-xl"
    >
      <FormItem>
        <Label value="Global Sound" />
        <Select
          name="globalSound"
          options={globalSounds}
          form={formik}
        />
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
        />
      </FormItem>

      <FormItem>
        <Label value="Target Model" />
        <Select
          name="targetModel"
          form={formik}
          options={primitives}
        />
      </FormItem>

      <FormItem>
        <Label value="Target Sound" />
        <Select
          name="targetSound"
          options={targetSounds}
          form={formik}
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
        <Select name="distractorColors" isMulti form={formik} options={colors} menuPlacement="top" />
      </FormItem>

      <FormItem>
        <Label value="Distractor Models" />
        <Select name="distractorModels" isMulti form={formik} options={primitives} menuPlacement="top" />
      </FormItem>

      <Button
        text={submitText}
        type="submit"
        classes="md:mt-4 float-right"
      />
    </form>
  );
};

export default TwoTablesWithDistractors;
