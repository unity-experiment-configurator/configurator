import { useEffect } from "react";
import { getExperiment } from "../../lib/Firebase";
import { PublicExperiment } from "../../lib/Types";

const ExperimentFromPublicId = ({
  publicId,
  onLoad,
  onError,
}: {
  publicId: string;
  onLoad: (experiment: PublicExperiment) => void;
  onError: () => void;
}) => {
  useEffect(() => {
    getExperiment(publicId).then(({ data }) => {
      if (data.error) {
        onError();
      } else {
        onLoad(data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicId]);

  return <></>;
};

export default ExperimentFromPublicId;
