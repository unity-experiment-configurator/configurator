import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FormItem,
  Label,
  TextArea,
  Button,
  NumberInput,
} from "./FormControls";

const Metadata = ({
  description = "",
  instructions = "",
  blockTrialCount = 1,
  maxDescriptionChars = 1000,
  maxInstructionsChars = 1000,
  submitText = "Submit",
  onSubmit,
}: {
  description?: string;
  instructions?: string;
  blockTrialCount?: number;
  maxDescriptionChars?: number;
  maxInstructionsChars?: number;
  maxRightsChars?: number;
  submitText?: string;
  onSubmit: (values: any) => void;
}) => {
  const validationSchema = Yup.object({
    description: Yup.string()
      .max(
        maxDescriptionChars,
        `Please limit to ${maxDescriptionChars} characters`
      )
      .required("Please enter a value"),
    instructions: Yup.string()
      .max(
        maxInstructionsChars,
        `Please limit to ${maxInstructionsChars} characters`
      )
      .required("Please enter a value"),
  });

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
  } = useFormik({
    initialValues: {
      description,
      instructions,
      blockTrialCount,
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
        <Label value="Description" />
        <TextArea
          id="description"
          value={values.description}
          // @ts-ignore
          onChange={handleChange}
          errors={errors}
        />
        {/* <RichTextInput
          id="description"
          value={values.description}
          // @ts-ignore
          onChange={(e) => setFieldValue("description", e)}
          errors={errors}
        /> */}
      </FormItem>
      <FormItem>
        <Label value="Instructions" />
        <TextArea
          id="instructions"
          value={values.instructions}
          // @ts-ignore
          onChange={handleChange}
          errors={errors}
        />
        {/* <RichTextInput
          id="instructions"
          value={values.instructions}
          // @ts-ignore
          onChange={(e) => setFieldValue("instructions", e)}
          errors={errors}
        /> */}
      </FormItem>
      <FormItem>
        <Label value="Trials" />
        <NumberInput
          id="blockTrialCount"
          value={values.blockTrialCount}
          min={1}
          max={100}
          // @ts-ignore
          onChange={handleChange}
          errors={errors}
        />
      </FormItem>
      <div className="pt-4">
        <Button
          text={submitText}
          type="submit"
          classes="md:mt-4 float-right"
        />
      </div>
    </form>
  );
};

export default Metadata;
