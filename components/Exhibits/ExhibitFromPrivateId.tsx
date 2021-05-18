import React, { useEffect } from "react";
import { firestore } from "../../lib/Firebase";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";

// todo: convert this to useExhibit hook
const ExhibitFromPrivateId = ({
  id,
  onLoad,
  onError,
}: {
  id: string;
  onLoad: (exhibit) => void;
  onError: () => void;
}) => {
  const exhibitRef = firestore.collection("exhibits").doc(id);
  const [exhibit, loading, error] = useDocumentData(exhibitRef, { idField: "id" });
  const itemsRef = firestore.collection(`exhibits/${id}/items`);
  const [items] = useCollectionData(itemsRef, { idField: "id" });
  const annotationsRef = firestore.collection(`exhibits/${id}/annotations`);
  const [annotations] = useCollectionData(annotationsRef, { idField: "id" });

  useEffect(() => {
    if (error) {
      onError();
    }
  }, [error]);

  useEffect(() => {
    if (exhibit && items && annotations) {
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
        ...exhibit,
        items: itemsMap,
        annotations: annotationsMap,
        presentationType: exhibit.presentationType
          ? exhibit.presentationType
          : "slides",
        duplicationEnabled: !!exhibit.duplicationEnabled,
      };

      onLoad(returnVal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exhibit, items, annotations]);

  return <></>;
};

export default ExhibitFromPrivateId;
