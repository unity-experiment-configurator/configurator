import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormItem,
  Label,
  Select,
  NumberInput,
} from "../FormControls";

const TwoTablesWithDistractors = ({
  onSubmit,
  submitText = "Submit",
}: {
  onSubmit: (values: any) => void;
  submitText?: string;
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

  const globalSound = globalSounds[0].value;
  const targetSize = 0.5;
  const targetColor = colors[0].value;
  const targetModel = primitives[0].value;
  const targetSound = targetSounds[0].value;
  const distractorSize = 0.5;
  const distractorCount = 1;
  const distractorColourRange = 0;
  const distractorModels = [primitives[0].value];

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
      distractorColourRange,
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
        <NumberInput
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
        <NumberInput
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
        <NumberInput
          id="distractorCount"
          value={formik.values.distractorCount}
          min={1}
          max={25}
          onChange={formik.handleChange}
          errors={formik.errors}
        />
      </FormItem>

      <FormItem>
        <Label value="Distractor Colour Range" />
        <NumberInput
          id="distractorColourRange"
          value={formik.values.distractorColourRange}
          min={0}
          max={3}
          step={1}
          onChange={formik.handleChange}
          errors={formik.errors}
        />
      </FormItem>

      <FormItem>
        <Label value="Distractor Models" />
        <Select name="distractorModels" isMulti form={formik} options={primitives} />
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
