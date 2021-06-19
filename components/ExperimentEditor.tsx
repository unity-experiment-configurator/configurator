import dynamic from "next/dynamic";
import { ExperimentType } from "../lib/Types";

const TwoTablesWithDistractors = dynamic(
  () => import("./ExperimentTypes/TwoTablesWithDistractors")
);

// UI component for main post content
export default function ExperimentEditor({ type, options, isDisabled, onSubmit, submitText = "submit" }: {
  type: ExperimentType;
  options: any;
  isDisabled?: boolean;
  onSubmit?: (options: any) => void;
  submitText?: string;
}) {

  switch (type) {
    case "TwoTablesWithDistractors":
      return (
        <TwoTablesWithDistractors
          onSubmit={onSubmit}
          options={options}
          submitText={submitText}
          isDisabled={isDisabled}
        />
      );
    default:
      return <p>{`"${type}" is not a supported experiment type`}</p>;
  }
}