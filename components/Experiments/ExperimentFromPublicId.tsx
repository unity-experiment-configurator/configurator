import { useEffect } from "react";
import { getExperiment, getExperimentWithoutItems } from "../../lib/Firebase";
import { PublicExperiment } from "../../lib/Types";

const ExperimentFromPublicId = ({
  publicId,
  withoutItems,
  onLoad,
  onError,
}: {
  publicId: string;
  withoutItems?: boolean;
  onLoad: (experiment: PublicExperiment) => void;
  onError: () => void;
}) => {
  useEffect(() => {
    if (withoutItems) {
      getExperimentWithoutItems(publicId).then(({ data }) => {
        if (data.error) {
          onError();
        } else {
          onLoad(data);
        }
      });
    } else {
      getExperiment(publicId).then(({ data }) => {
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

export default ExperimentFromPublicId;
