import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ExperimentType } from "../../lib/Types";
import { recaptchaSiteKey } from "../../lib/Utils";
import { useController, useForm } from "react-hook-form";

function NumberInput(props) {
  const { field, fieldState } = useController(props);

  return (
    <label className="block mt-8">
      <span className="text-gray-700">{props.label}</span>
      <input
        {...field}
        type="number"
        min={props.min}
        max={props.max}
        className="form-input mt-1 block w-full"
      />
      {/* <p>{fieldState.invalid ? "invalid" : "valid"}</p> */}
    </label>
  );
}

function SelectInput(props) {
  const { field, fieldState } = useController(props);

  return (
    <label className="block mt-8">
      <span className="text-gray-700">{props.label}</span>
      <select {...field} className="block w-full mt-1">
        {props.options.map((option, idx) => {
          return <option key={idx}>{option}</option>;
        })}
      </select>
    </label>
  );
}

const Experiment = ({
  title = "",
  author = "",
  description = "",
  rights = "",
  presentationType,
  duplicationEnabled,
  maxTitleChars = 200,
  maxAuthorChars = 200,
  maxDescriptionChars = 1000,
  maxRightsChars = 200,
  submitText = "Submit",
  disabled,
  onSubmit,
}: {
  title?: string;
  author?: string;
  description?: string;
  rights?: string;
  presentationType: ExperimentType;
  duplicationEnabled: boolean;
  maxTitleChars?: number;
  maxAuthorChars?: number;
  maxDescriptionChars?: number;
  maxRightsChars?: number;
  submitText?: string;
  disabled?: boolean;
  onSubmit: (values: any) => void;
}) => {
  const [passedRecaptcha, setPassedRecaptcha] = useState(false);
  const [agreedToPolicies, setAgreedToPolicies] = useState(false);

  const primitives = ["Cone", "Cube", "Sphere"];
  const colors = ["Red", "Green", "Blue"];
  const targetSounds = ["Beep", "Boop"];
  const uxfSettings = {
    UXF: {
      trials_per_block: 10,
      catch_trials_per_block: 3,
      delay_time: 0.6,
    },
  };

  function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      TargetColor: colors[0],
      TargetType: primitives[0],
      TargetSound: targetSounds[0],
      DistractorCount: 1,
      DistractorTypes: primitives[0],
    },
    mode: "onChange",
  });

  const onSubmitHandler = (data) => {
    const config = {
      ...data,
      ...uxfSettings,
    };
    download(JSON.stringify(config), "config.json", "text/plain");
    console.log(config);
  };

  // console.log(watch("title")); // watch input value by passing the name of it

  const atLeastOneDistractorType = () =>
    getValues("DistractorTypes").length
      ? true
      : "Please select at least one Distractor Type.";

  const handlePassedRecaptcha = () => {
    setPassedRecaptcha(true);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="p-8 max-w-screen-md"
    >
      {/* <label className="block mt-8">
  <span className="text-gray-700">Title</span>
  <input type="text" className="mt-1 block w-full" defaultValue="test" {...register("title")} />
</label> */}

      <SelectInput
        control={control}
        options={colors}
        label="Target Colour"
        name="TargetColor"
        rules={{ required: true }}
      />

      <SelectInput
        control={control}
        options={primitives}
        label="Target Type"
        name="TargetType"
        rules={{ required: true }}
      />

      <SelectInput
        control={control}
        options={targetSounds}
        label="Target Sound"
        name="TargetSound"
        rules={{ required: true }}
      />

      <NumberInput
        control={control}
        label="Distractor Count"
        min={1}
        max={50}
        name="DistractorCount"
        rules={{ required: true }}
      />

      <div className="block mt-8">
        <span className="text-gray-700">Distractor Types</span>
        <div className="mt-2">
          {primitives.map((option, idx) => {
            return (
              <div key={idx}>
                <label className="inline-flex items-center">
                  <input
                    className="form-checkbox"
                    type="checkbox"
                    value={option}
                    {...register("DistractorTypes", {
                      validate: atLeastOneDistractorType,
                    })}
                  />
                  <span className="ml-2">{option}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {errors.DistractorTypes && (
        <span className="text-red-600">{errors.DistractorTypes.message}</span>
      )}

      {/* {errors.DistractorTypes && <span>Please select one</span>}  */}

      {/* {...register("DistractorTypes", { validate: atLeastOneDistractorType})} */}

      {/* <CheckboxListInput control={control} options={primitives} label="Distractor Types" name="DistractorTypes" validate={atLeastOneDistractorType}  /> */}

      {/* <input type="text" {...register("exampleRequired", { required: true })} />
{errors.exampleRequired && <span>This field is required</span>} */}

      <div className="block mt-8">
        <button type="submit" className="p-4 font-medium bg-gray-200">
          Download Config
        </button>
      </div>
    </form>
  );
};

export default Experiment;
