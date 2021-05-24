import React, { useEffect } from "react";
import { firestore } from "../../lib/Firebase";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";

// todo: convert this to useExperiment hook
const ExperimentFromPrivateId = ({
  id,
  onLoad,
  onError,
}: {
  id: string;
  onLoad: (experiment) => void;
  onError: () => void;
}) => {
  const experimentRef = firestore.collection("experiments").doc(id);
  const [experiment, loading, error] = useDocumentData(experimentRef, { idField: "id" });
  const itemsRef = firestore.collection(`experiments/${id}/items`);
  const [items] = useCollectionData(itemsRef, { idField: "id" });
  const annotationsRef = firestore.collection(`experiments/${id}/annotations`);
  const [annotations] = useCollectionData(annotationsRef, { idField: "id" });

  useEffect(() => {
    if (error) {
      onError();
    }
  }, [error]);

  useEffect(() => {
    if (experiment && items && annotations) {
      // parse annotations and items into maps
      const annotationsArray = [...annotations];

      const annotationsMap = new Map(
        annotationsArray
          // todo: can we use .orderBy("orderIndex", "asc") in the firebase query?
          .sort((a, b) => {
            return a.orderIndex - b.orderIndex;
          })
          .map(
            (anno) =>
              [anno.id, { ...anno }]
          )
      );

      const itemsArray = [...items];
      const itemsMap = new Map(
        // todo: can we use .orderBy("created", "asc") in the firebase query?
        itemsArray.sort((a, b) => {
          return a.created - b.created;
        }).map(
          (item) => [item.id, { ...item }]
        )
      );

      const returnVal = {
        ...experiment,
        items: itemsMap,
        annotations: annotationsMap,
        presentationType: experiment.presentationType
          ? experiment.presentationType
          : "slides",
        duplicationEnabled: !!experiment.duplicationEnabled,
      };

      onLoad(returnVal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experiment, items, annotations]);

  return <></>;
};

export default ExperimentFromPrivateId;
