import { useController, useForm } from "react-hook-form";

function NumberInput(props) {
  const { field, fieldState } = useController(props);

  return (
    <label className="block mt-8">
      <span className="text-gray-700">{ props.label }</span>
      <input {...field} type="number" min={props.min} max={props.max} className="form-input mt-1 block w-full" />
      {/* <p>{fieldState.invalid ? "invalid" : "valid"}</p> */}
    </label>
  );
}

function SelectInput(props) {
  const { field, fieldState } = useController(props);

  return (
    <label className="block mt-8">
      <span className="text-gray-700">{ props.label }</span>
      <select {...field} className="block w-full mt-1">
        {
          props.options.map((option, idx) => {
            return <option key={idx}>{option}</option>
          })
        }
      </select>
    </label>
  );
}

function CheckboxListInput(props) {
  const { field, fieldState } = useController(props);

  return (
    <div className="block mt-8">
      <span className="text-gray-700">{ props.label }</span>
      <div className="mt-2">
        {
          props.options.map((option, idx) => {
            return <div key={idx}>
              <label className="inline-flex items-center">
                <input className="form-checkbox" {...field} type="checkbox" name="sameName" />
                <span className="ml-2">{ option }</span>
              </label>
            </div>
          })
        }
      </div>
    </div>
  );
}

export default function Home() {

  const primitives = ["Cone", "Cube", "Sphere"];
  const colors = ["Red", "Green", "Blue"];
  const targetSounds = ["Beep", "Boop"];

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
    defaultValues: {
      TargetColor: colors[0],
      TargetType: primitives[0],
      TargetSound: targetSounds[0],
      DistractorCount: 1
    },
    mode: "onChange"
  });
  const onSubmit = data => console.log(data);

  // console.log(watch("title")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 max-w-screen-md">

      {/* <label className="block mt-8">
        <span className="text-gray-700">Title</span>
        <input type="text" className="mt-1 block w-full" defaultValue="test" {...register("title")} />
      </label> */}

      <SelectInput control={control} options={colors} label="Target Colour" name="TargetColor" rules={{ required: true }}  />

      <SelectInput control={control} options={primitives} label="Target Type" name="TargetType" rules={{ required: true }}  />

      <SelectInput control={control} options={targetSounds} label="Target Sound" name="TargetSound" rules={{ required: true }}  />

      <NumberInput control={control} label="Distractor Count" min={1} max={50} name="DistractorCount" rules={{ required: true }}  />

      <CheckboxListInput control={control} options={primitives} label="Distractor Types" name="DistractorTypes" rules={{ required: true }}  />

      {/* <input type="text" {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>} */}
      
      <div className="block mt-8">
        <button type="submit" className="p-4 font-medium bg-gray-200">Download Config</button>
      </div>
    </form>
  );
}
