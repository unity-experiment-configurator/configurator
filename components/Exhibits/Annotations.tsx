import { useEffect, useReducer, useCallback, memo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  AnnotationDBValue,
  AnnotationMap,
  AnnotationValue,
  AnnotationTuple,
  Motivation,
} from "../../lib/Types";
import Annotation from "./Annotation";
import { timestamp } from "../../lib/Firebase";
import { firestore } from "../../lib/Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface AnnotationsProps {
  disabled: boolean;
  exhibitId: string;
  target: string | null;
  partOf: string | null;
  selectedAnnotation: string | null;
  onDelete: (anno: AnnotationTuple) => void;
  onSelect: (anno: AnnotationTuple) => void;
  onAdd: () => void;
  onUpdate: (anno: AnnotationTuple) => void;
}

const Annotations = ({
  disabled,
  exhibitId,
  target,
  partOf,
  selectedAnnotation,
  onDelete,
  onSelect,
  onAdd,
  onUpdate,
}: AnnotationsProps) => {

  const annotationsRef = firestore.collection(`exhibits/${exhibitId}/annotations`);
  const [annotations] = useCollectionData(annotationsRef, { idField: "id" });

  type State = {
    annotations: AnnotationMap;
    initialised: boolean;
    partOf: string | null;
    selectedAnnotation: string | null;
    syncing: boolean;
    target: string | null;
  };

  const initialState: State = {
    annotations: new Map<string, AnnotationValue>(),
    initialised: false,
    partOf: null,
    selectedAnnotation: null,
    syncing: false,
    target: null,
  };

  type Action =
    | { type: "sync"; payload: AnnotationDBValue[] }
    | { type: "add"; payload: string }
    | { type: "delete"; payload: string[] }
    | { type: "cancel" }
    | { type: "edit"; payload: string }
    | { type: "update"; payload: AnnotationTuple }
    | { type: "reorder"; payload: { src: number; dest: number } }
    | { type: "reset" }
    | { type: "propsChange"; payload: AnnotationsProps };

  const reducer = (state: State, action: Action): State => {
    let batch: any;
    let index: number;

    if (action.type === "reset") {
      return initialState;
    }

    // sync is called whenever new annotations are received from the server
    // don't allow any new operations until sync is complete
    if (action.type !== "sync" && state.syncing) {
      // console.warn("syncing, rejected", action.type);
      return {
        ...state,
      };
    }

    switch (action.type) {
      case "sync": {
        // console.log("sync");
        const annotations: AnnotationDBValue[] = [...action.payload];
        const annotationsMap: AnnotationMap = new Map(
          annotations
            .sort((a, b) => {
              return a.orderIndex - b.orderIndex;
            })
            .map(
              (anno: AnnotationDBValue) =>
                [anno.id, { ...anno }] as AnnotationTuple
            )
        );

        return {
          ...state,
          initialised: true,
          syncing: false,
          annotations: annotationsMap,
        };
      }
      case "add": {
        firestore.collection(`exhibits/${exhibitId}/annotations/`).add({
          value: action.payload,
          created: timestamp(),
          format: "text/html", // todo: use MediaType.Text_HTML
          modified: timestamp(),
          motivation: Motivation.COMMENTING,
          orderIndex: state.annotations.size,
          partOf: state.partOf,
          target: state.target,
        } as AnnotationValue);

        return {
          ...state,
          selectedAnnotation: null,
          syncing: true,
        };
      }
      case "edit": {
        return {
          ...state,
          selectedAnnotation: action.payload,
        };
      }
      case "update": {
        const [id, values] = action.payload;

        firestore.doc(`exhibits/${exhibitId}/annotations/${id}`).set({
          ...values,
          modified: timestamp(),
        });

        return {
          ...state,
          selectedAnnotation: null,
          syncing: true,
        };
      }
      case "cancel": {
        return {
          ...state,
          selectedAnnotation: null,
        };
      }
      case "reorder": {
        const src: number = action.payload.src;
        const dest: number = action.payload.dest;

        // dropped at the same location
        if (src === dest) {
          return {
            ...state,
          };
        }

        const annosToReorder: AnnotationTuple[] = Array.from(state.annotations);
        const [removed] = annosToReorder.splice(src, 1);
        annosToReorder.splice(dest, 0, removed);

        batch = firestore.batch();
        index = 0;

        annosToReorder.forEach((anno: AnnotationTuple) => {
          const [id, values] = anno;
          const docRef = firestore.doc(
            `exhibits/${exhibitId}/annotations/${id}`
          );
          // update order index
          batch.set(docRef, {
            ...values,
            modified: timestamp(),
            orderIndex: index,
          });
          index++;
        });

        batch.commit();

        return {
          ...state,
          annotations: new Map(annosToReorder),
          syncing: true,
        };
      }
      case "delete": {
        const annosToDelete: string[] = action.payload;

        batch = firestore.batch();
        index = 0;

        Array.from(state.annotations).forEach((anno: AnnotationTuple) => {
          const [id, values] = anno;
          const docRef = firestore.doc(
            `exhibits/${exhibitId}/annotations/${id}`
          );
          if (annosToDelete.includes(id)) {
            // delete
            batch.delete(docRef);
          } else {
            // update order index
            batch.set(docRef, {
              ...values,
              orderIndex: index,
            });
            index++;
          }
        });

        batch.commit();

        return {
          ...state,
          selectedAnnotation: null,
          syncing: true,
        };
      }
      case "propsChange": {
        const props: AnnotationsProps = action.payload;
        return {
          ...state,
          ...props,
        };
      }
      default: {
        throw new Error();
      }
    }
  };

  // https://github.com/facebook/react/issues/16295#issuecomment-641867291
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [state, dispatch] = useReducer(useCallback(reducer, []), initialState);

  const useAnnotations = ({
    annotations,
  }) => {
    useEffect(() => {
      if (!annotations) {
        dispatch({ type: "reset" });
      } else {
        dispatch({
          type: "sync",
          payload: annotations,
        });
      }
    }, [annotations]);
  };

  useAnnotations({ annotations });

  // use props
  useEffect(() => {
    dispatch({
      type: "propsChange",
      payload: {
        selectedAnnotation,
        target,
        partOf,
      } as AnnotationsProps,
    });
  }, [selectedAnnotation, target, partOf]);

  const onDragEnd = async (result: any) => {
    if (result.destination) {
      dispatch({
        type: "reorder",
        payload: {
          src: result.source.index,
          dest: result.destination.index,
        },
      });
    }
  };

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // change background colour if dragging
    // background: isDragging ? "red" : "inherit",
    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (_isDraggingOver: boolean) => ({});

  const AnnotationList = ({
    disabled,
    annotations,
    selectedAnnotation,
  }: {
    disabled: boolean;
    annotations: AnnotationMap;
    selectedAnnotation: string | null;
  }) => {
    return (
      <>
        {Array.from(annotations).map(
          (annotation: AnnotationTuple, index: number) => {
            const [id, anno] = annotation;
            return (
              <Draggable
                aria-label="Reorderable List Item"
                key={id}
                draggableId={id}
                isDragDisabled={disabled || selectedAnnotation !== null}
                index={index}
              >
                {(draggableProvided: any, draggableSnapshot: any) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    style={getItemStyle(
                      draggableSnapshot.isDragging,
                      draggableProvided.draggableProps.style
                    )}
                    className={draggableSnapshot.isDragging ? "dragging" : ""}
                  >
                    <Annotation
                      disabled={disabled}
                      value={anno.value}
                      selected={selectedAnnotation === id}
                      showArrow={target ? true : index !== annotations.size - 1}
                      onClick={() => {
                        if (selectedAnnotation !== id) {
                          dispatch({ type: "edit", payload: id });
                          onSelect(annotation);
                        }
                      }}
                      onUpdate={(value: string) => {
                        dispatch({
                          type: "update",
                          payload: [
                            id,
                            {
                              ...anno,
                              target,
                              value,
                            },
                          ],
                        });
                        onUpdate(annotation);
                      }}
                      onDelete={() => {
                        dispatch({ type: "delete", payload: [id] });
                        onDelete(annotation);
                      }}
                      // onCancel={() => {
                      //   dispatch({ type: "cancel" });
                      // }}
                    />
                  </div>
                )}
              </Draggable>
            );
          }
        )}
      </>
    );
  };

  const MemoizedAnnotationList = memo(AnnotationList);

  return !state.initialised && state.syncing ? (
    <div>Loading...</div>
  ) : (
    <div className="annotations pr-4 h-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(droppableProvided: any, droppableSnapshot: any) => (
            <div
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
              style={getListStyle(droppableSnapshot.isDraggingOver)}
            >
              <MemoizedAnnotationList
                selectedAnnotation={state.selectedAnnotation}
                disabled={disabled || state.syncing}
                annotations={state.annotations}
              />
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* add a new annotation */}
      {state.target ? (
        <Annotation
          disabled={disabled || state.selectedAnnotation !== null}
          selected={state.selectedAnnotation === null}
          showArrow={false}
          onUpdate={(value: string) => {
            dispatch({ type: "add", payload: value });
            if (onAdd) {
              onAdd();
            }
          }}
        />
      ) : (
        !state.annotations.size && (
          <div className="text-center">Please add an item to annotate</div>
        )
      )}
    </div>
  );
};

export default Annotations;
