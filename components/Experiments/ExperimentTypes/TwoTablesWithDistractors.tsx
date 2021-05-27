import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormItem,
  Label,
  NumberInput,
} from "../../FormControls";

const TwoTablesWithDistractors = ({
  onSubmit,
  submitText = "Submit",
}: {
  onSubmit: (values: any) => void;
  submitText?: string;
}) => {

  const distractorCount = 1;

  const validationSchema = Yup.object({
    distractorCount: Yup.string()
      .required("Please enter a value"),
  });

  const {
    setFieldValue,
    handleSubmit,
    handleChange,
    values,
    errors,
  } = useFormik({
    initialValues: {
      distractorCount,
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values: any) => {
      onSubmit(values);
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="md:pr-8 lg:pr-8 pb-8 overflow-hidden max-w-xl"
    >
      <FormItem>
        <Label value="Distractor Count" />
        <NumberInput
          id="distractorCount"
          value={values.distractorCount}
          min={1}
          max={50}
          onChange={handleChange}
          errors={errors}
        />
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
