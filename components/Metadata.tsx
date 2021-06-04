import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FormItem,
  Label,
  RichTextInput,
  TextInput,
  Button,
  Checkbox,
} from "./FormControls";

const Metadata = ({
  // title = "",
  description = "",
  duplicationEnabled,
  maxTitleChars = 200,
  maxDescriptionChars = 1000,
  maxInstructionsChars = 1000,
  submitText = "Submit",
  disabled,
  onSubmit,
}: {
  // title?: string;
  description?: string;
  duplicationEnabled: boolean;
  maxTitleChars?: number;
  maxDescriptionChars?: number;
  maxInstructionsChars?: number;
  maxRightsChars?: number;
  submitText?: string;
  disabled?: boolean;
  onSubmit: (values: any) => void;
}) => {
  // const [passedRecaptcha, setPassedRecaptcha] = useState(false);
  // const [agreedToPolicies, setAgreedToPolicies] = useState(false);

  const validationSchema = Yup.object({
    // title: Yup.string()
    //   .max(maxTitleChars, `Please limit to ${maxTitleChars} characters`)
    //   .required("Please enter a value"),
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
    setFieldValue,
    handleSubmit,
    handleChange,
    values,
    errors,
  } = useFormik({
    initialValues: {
      // title,
      description,
      duplicationEnabled,
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values: any) => {
      // if (passedRecaptcha) {
        onSubmit(values);
      // }
    },
  });

  // const handlePassedRecaptcha = () => {
  //   setPassedRecaptcha(true);
  // };

  return (
    <form
      onSubmit={handleSubmit}
      className="md:pr-8 lg:pr-8 pb-8 overflow-hidden max-w-xl"
    >
      {/* <FormItem>
        <Label value="Title" />
        <TextInput
          id="title"
          value={values.title}
          onChange={handleChange}
          errors={errors}
        />
      </FormItem> */}
      <FormItem>
        <Label value="Description" />
        <RichTextInput
          id="description"
          value={values.description}
          // @ts-ignore
          onChange={(e) => setFieldValue("description", e)}
          errors={errors}
        />
      </FormItem>
      <FormItem>
        <Label value="Instructions" />
        <RichTextInput
          id="instructions"
          value={values.instructions}
          // @ts-ignore
          onChange={(e) => setFieldValue("instructions", e)}
          errors={errors}
        />
      </FormItem>
      {/* <FormItem>
        <Label value="Rights" optional />
        <TextInput
          id="rights"
          value={values.rights}
          onChange={handleChange}
          placeholder=""
          errors={errors}
        />
      </FormItem> */}
      <FormItem>
        <Checkbox
          id="duplicationEnabled"
          label="Allow Duplication"
          checked={values.duplicationEnabled}
          // @ts-ignore
          onChange={(e: any) =>
            setFieldValue("duplicationEnabled", e.target.checked)
          }
        />
      </FormItem>
      {/* <div className="pt-0">
        <ReCAPTCHA
          sitekey={recaptchaSiteKey}
          onChange={handlePassedRecaptcha}
        />
      </div>
      <div className="pt-4">
        <div className="pb-8">
          <input
            type="checkbox"
            id="agree-to-policies"
            className="w-5 h-5 mr-2 align-middle"
            onChange={(e) => {
              setAgreedToPolicies(e.target.checked);
            }}
          />
          <label htmlFor="agree-to-policies" className="text-sm align-middle">
            I have read and agree to the {" "}
            <a
              href="/docs/terms-of-service"
              rel="noopener noreferrer"
              target="_blank"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/docs/privacy-policy"
              rel="noopener noreferrer"
              target="_blank"
            >
              Privacy Policy
            </a>
          </label>
        </div> */}
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
