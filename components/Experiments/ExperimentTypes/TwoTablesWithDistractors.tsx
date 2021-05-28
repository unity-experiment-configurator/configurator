import { useField, useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  CustomSelect,
  FormItem,
  Label,
  NumberInput,
} from "../../FormControls";
import Select, {ValueType, OptionsType} from "react-select";

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
  const targetType = primitives[0].value;
  const targetSound = sounds[0].value;
  const distractorCount = 1;
  const distractorTypes = [primitives[0].value];

  const validationSchema = Yup.object({
    distractorCount: Yup.string()
      .required("Please enter a value"),
  });

  const formik = useFormik({
    initialValues: {
      targetColor,
      targetType,
      targetSound,
      distractorCount,
      distractorTypes,
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values: any) => {
      onSubmit(values);
    },
  });

  // const [field] = useField("distractorTypes");

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="md:pr-8 lg:pr-8 pb-8 overflow-hidden max-w-xl"
    >
      <FormItem>
        <Label value="Target Colour" />
        <Select
          name="targetColor"
          value={colors.find(x => x.value === formik.values.targetColor)}
          options={colors}
          onChange={selectedOption => {
            formik.setFieldValue("targetColor", selectedOption.value)
          }}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </FormItem>

      <FormItem>
        <Label value="Target Type" />
        <Select
          name="targetType"
          value={primitives.find(x => x.value === formik.values.targetType)}
          options={primitives}
          onChange={selectedOption => {
            formik.setFieldValue("targetType", selectedOption.value)
          }}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </FormItem>

      <FormItem>
        <Label value="Target Sound" />
        <Select
          name="targetSound"
          value={sounds.find(x => x.value === formik.values.targetSound)}
          options={sounds}
          onChange={selectedOption => {
            formik.setFieldValue("targetSound", selectedOption.value)
          }}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </FormItem>

      <FormItem>
        <Label value="Distractor Count" />
        <NumberInput
          id="distractorCount"
          value={formik.values.distractorCount}
          min={1}
          max={50}
          onChange={formik.handleChange}
          errors={formik.errors}
        />
      </FormItem>

      <FormItem>
        <Label value="Distractor Types" />
        <Select
          name="distractorTypes"
          isMulti
          value={primitives.filter(x => formik.values["distractorTypes"].indexOf(x.value) >= 0)}
          options={primitives}
          onChange={(option: ValueType<Option | Option[]>) => {
            if (option) {
              formik.setFieldValue(
                "distractorTypes",
                (option as Option[]).map((item: Option) => item.value)
              );
            } else {
              formik.setFieldValue(
                "distractorTypes",
                []
              );
            }
          }}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        {/* @ts-ignore */}
        {/* <CustomSelect
          form={formik}
          field={distractorTypesField}
          isMulti
          // value={primitives.find(x => x.value === formik.values.distractorTypes)}
          options={primitives}
          // onChange={selectedOption => {
          //   console.log(selectedOption);
          //   formik.setFieldValue("distractorTypes", selectedOption.value)
          // }}
          // className="basic-multi-select"
          // classNamePrefix="select"
        /> */}
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
