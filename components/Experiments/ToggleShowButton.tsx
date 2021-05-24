import { useState } from "react";
import classNames from "classnames";
import { SVGButton } from "../FormControls";
import { PlusIcon, MinusSmIcon } from "@heroicons/react/solid";

const ToggleShowButton = ({
  disabled,
  classes,
  onClick,
}: {
  disabled?: boolean;
  classes?: string | undefined;
  onClick: () => void;
}) => {
  const [hide, setHide] = useState(true);
  const c = classNames(classes);
  return (
    <SVGButton
      disabled={disabled}
      classes={c}
      label={hide ? "hide" : "show"}
      onClick={() => {
        setHide(!hide);
        onClick();
      }}
    >
      {hide ? <MinusSmIcon className="w-6" /> : <PlusIcon className="w-6" />}
    </SVGButton>
  );
};

export default ToggleShowButton;
