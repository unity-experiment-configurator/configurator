import classNames from "classnames";
import { SVGButton } from "../FormControls";
import { ItemTuple, ItemValue } from "../../lib/Types";
import TrashCircleIcon from "../../public/svg/trash-circle.svg";
import CopyCircleIcon from "../../public/svg/copy-circle.svg";
import { copyText } from "../../lib/Utils";

const Item = ({
  item,
  selected,
  onClick,
  onDelete,
}: {
  item?: ItemTuple;
  selected?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}) => {
  const itemValue: ItemValue | undefined = item ? item[1] : undefined;
  const classes = classNames(
    "item transition duration-300 px-4 cursor-pointer hover:bg-gray-100 table-row",
    {
      "bg-gray-200": selected,
      "hover:bg-gray-200": selected,
    }
  );

  return (
    <div className={classes}>
      <div
        role="cell"
        className="w-4/6 truncate table-cell align-middle pl-4"
        aria-label={itemValue?.label}
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
      >
        {itemValue?.label || "unlabelled"}
      </div>
      <div role="cell" className="w-2/6 table-cell align-middle">
        <div className="h-full float-right mr-4">
          <SVGButton
            classes="mt-1 mr-2"
            label="Copy"
            onClick={() => {
              copyText(itemValue!.url);
            }}
          >
            <CopyCircleIcon />
          </SVGButton>
          <SVGButton
            label="Delete"
            onClick={() => {
              if (onDelete) {
                onDelete();
              }
            }}
          >
            <TrashCircleIcon />
          </SVGButton>
        </div>
      </div>
    </div>
  );
};

export default Item;
