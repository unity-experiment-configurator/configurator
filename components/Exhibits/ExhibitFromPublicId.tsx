import { useEffect } from "react";
import { getExhibit, getExhibitWithoutItems } from "../../lib/Firebase";
import { PublicExhibit } from "../../lib/Types";

const ExhibitFromPublicId = ({
  publicId,
  withoutItems,
  onLoad,
  onError,
}: {
  publicId: string;
  withoutItems?: boolean;
  onLoad: (exhibit: PublicExhibit) => void;
  onError: () => void;
}) => {
  useEffect(() => {
    if (withoutItems) {
      getExhibitWithoutItems(publicId).then(({ data }) => {
        if (data.error) {
          onError();
        } else {
          onLoad(data);
        }
      });
    } else {
      getExhibit(publicId).then(({ data }) => {
        if (data.error) {
          onError();
        } else {
          onLoad(data);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicId]);

  return <></>;
};

export default ExhibitFromPublicId;
