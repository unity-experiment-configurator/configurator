import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormItem,
  Label,
  Select,
  NumberInput,
} from "../../FormControls";

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

  const sounds: Option[] = [
    {
      label: "Beep",
      value: "beep",
    },
    {
      label: "Boop",
      value: "boop",
    }
  ];

  const targetColor = colors[0].value;
  const targetModel = primitives[0].value;
  const targetSound = sounds[0].value;
  const distractorCount = 1;
  const distractorModels = [primitives[0].value];

  const validationSchema = Yup.object({
    distractorCount: Yup.string()
      .required("Please enter a value"),
  });

  const formik = useFormik({
    initialValues: {
      targetColor,
      targetModel,
      targetSound,
      distractorCount,
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
          options={sounds}
          form={formik}
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
