/* eslint-disable prefer-template */
import { useReducer, useCallback, useEffect, useRef } from "react";
// @ts-ignore
import classNames from "classnames";
import { useFullscreen, useToggle } from "react-use";
import { AnnotationValue, PublicExhibit } from "../../lib/Types";
import UV from "./UV";
import { SVGButton, SVGLinkButton, SVGLinkButtonText } from "../FormControls";
import ToggleShowButton from "./ToggleShowButton";
import { useTargetBlank } from "../../lib/Hooks";
import { useWindowSize } from "react-use";
import { sanitizeSSR } from "../../lib/Utils";
import ArrowLeftIcon from "../../public/svg/arrow-left.svg";
import ArrowRightIcon from "../../public/svg/arrow-right.svg";
import RestartIcon from "../../public/svg/restart.svg";
import DuplicateIcon from "../../public/svg/duplicate.svg";
import DuplicatedFromIcon from "../../public/svg/duplicated-from.svg";
import { site } from "../../lib/Utils";
//import { ArrowDownIcon, PlusCircleIcon, TrashIcon, CheckCircleIcon } from "@heroicons/react/solid";

interface ExhibitProps {
  exhibit: PublicExhibit;
  embedded: boolean;
}

const SlidesExhibit = ({ exhibit, embedded }: ExhibitProps) => {
  type Slide = Omit<AnnotationValue, "created" | "modified">;

  type State = {
    exhibit: PublicExhibit;
    embedded: boolean;
    description: string | null;
    descriptionVisible: boolean;
    slides: Slide[];
    index: number;
    partOf: string | null;
    target: string | null;
    targetLoading: boolean;
  };

  const initialState: State = {
    exhibit,
    embedded,
    description: null,
    descriptionVisible: true,
    slides: [],
    index: 0,
    partOf: null,
    target: null,
    targetLoading: true,
  };

  type Action =
    | { type: "start"; payload: PublicExhibit }
    | { type: "index"; payload: number }
    | { type: "previous" }
    | { type: "next" }
    | { type: "restart" }
    | { type: "targetChange"; payload: string | null }
    | { type: "targetLoad" }
    | { type: "toggleDescription" }
    | { type: "partOfChange"; payload: string | null };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "start": {
        const annotations = action.payload.annotations;

        const firstAnnotation: AnnotationValue | null = annotations.length
          ? annotations[0]
          : null;

        const partOf: string | null = firstAnnotation
          ? firstAnnotation.partOf
          : null;
        const target: string | null = firstAnnotation
          ? firstAnnotation.target
          : null;

        const landingSlide: Slide = {
          orderIndex: -1,
          value: action.payload.description,
          partOf,
          target,
        };

        // add the landing slide to the start
        const slides: Slide[] = [
          landingSlide as AnnotationValue,
          ...annotations,
        ];

        return {
          ...state,
          exhibit,
          description: landingSlide.value,
          slides,
          partOf,
        };
      }
      case "restart": {
        const restartSlide: Slide = state.slides[0];

        return {
          ...state,
          index: 0,
          partOf: restartSlide.partOf,
          description: restartSlide.value,
          target: null,
          targetLoading: restartSlide.partOf !== state.partOf,
        };
      }
      case "toggleDescription": {
        return {
          ...state,
          descriptionVisible: !state.descriptionVisible,
        };
      }
      case "previous": {
        const prevIndex: number =
          state.index > 0 ? state.index - 1 : state.index;
        const prevSlide: Slide = state.slides[prevIndex];

        return {
          ...state,
          index: prevIndex,
          partOf: prevSlide.partOf,
          description: prevSlide.value,
          target: prevIndex === 0 ? null : prevSlide.target,
          targetLoading: prevSlide.partOf !== state.partOf,
        };
      }
      case "next": {
        const nextIndex: number =
          state.index < state.slides.length - 1 ? state.index + 1 : state.index;
        const nextSlide: Slide = state.slides[nextIndex];

        return {
          ...state,
          index: nextIndex,
          partOf: nextSlide.partOf,
          description: nextSlide.value,
          target: nextSlide.target,
          targetLoading: nextSlide.partOf !== state.partOf,
        };
      }
      case "targetLoad": {
        return {
          ...state,
          targetLoading: false,
        };
      }
      case "targetChange": {
        return {
          ...state,
        };
      }
      case "partOfChange": {
        return {
          ...state,
          partOf: action.payload,
          targetLoading: true,
        };
      }
      default: {
        // eslint-disable-next-line no-console
        console.warn("no action found");
        return state;
      }
    }
  };

  const ref = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [state, dispatch] = useReducer(useCallback(reducer, []), initialState);

  useTargetBlank("#description a", [state.index]);

  const { width, height } = useWindowSize();

  const duplicateThisURL = `${site}/exhibits/create?duplicate=${exhibit.publicId}`;
  const duplicatedFromURL = `${site}/exhibits/${exhibit.duplicatedFrom}`;

  // const isMountedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch({ type: "start", payload: exhibit });
  }, [exhibit]);

  const [show, toggle] = useToggle(false);

  useFullscreen(ref, show, {
    onClose: () => toggle(false),
  });

  return (
    <div ref={ref}>
      <div className="exhibit h-screen">
        {state.partOf && (
          <UV
            embedded={state.embedded}
            manifest={state.partOf}
            target={state.target}
            config="/uv-config-viewing.json"
            onFullScreen={() => {
              toggle();
            }}
            onTargetLoad={() => {
              dispatch({ type: "targetLoad" });
            }}
            onTargetChange={(target: string | null) => {
              dispatch({ type: "targetChange", payload: target });
            }}
            width={`${width}px`}
            height={`${height}px`}
          />
        )}
      </div>
      <div
        id="description"
        className="fixed z-50 top-0 text-sm bg-white bg-opacity-80 shadow-md text-gray-900 m-0 w-full p-4 md:m-2 md:w-1/2 xl:w-1/3"
      >
        <div className="flex">
          <div className="h-8 w-4/6">
            <ToggleShowButton
              classes="m-1"
              disabled={state.targetLoading}
              onClick={() => {
                dispatch({ type: "toggleDescription" });
              }}
            />
          </div>
          <div className="h-8 w-2/6 text-right">
            <SVGButton
              disabled={state.targetLoading}
              classes={classNames("mr-2", {
                hidden:
                  state.index === 0 || state.index === state.slides.length - 1,
              })}
              label="Previous"
              onClick={() => {
                dispatch({ type: "previous" });
              }}
            >
              <ArrowLeftIcon className="m-1" />
            </SVGButton>
            <SVGButton
              disabled={state.targetLoading}
              classes={classNames("mr-2", {
                hidden: state.index === state.slides.length - 1,
              })}
              label="Next"
              onClick={() => {
                dispatch({ type: "next" });
              }}
            >
              <ArrowRightIcon className="m-1" />
            </SVGButton>
            <SVGButton
              disabled={state.targetLoading}
              classes={classNames("mr-2", {
                hidden: state.index !== state.slides.length - 1,
              })}
              label="Restart"
              onClick={() => {
                dispatch({ type: "restart" });
              }}
            >
              <RestartIcon className="m-1" />
            </SVGButton>
          </div>
        </div>
        <div
          className={classNames("p-1 pt-3", {
            hidden: !state.descriptionVisible,
          })}
        >
          {state.index === 0 && (
            <h1
              className={classNames("text-lg text-black pb-2", {
                "skeleton-box": state.targetLoading,
              })}
            >
              {state.targetLoading ? <>&nbsp;</> : state.exhibit.title}
            </h1>
          )}
          <div
            className={classNames("pt-0", {
              "skeleton-box": state.targetLoading,
            })}
            dangerouslySetInnerHTML={
              state.targetLoading
                ? sanitizeSSR("&nbsp;")
                : state.description
                ? sanitizeSSR(state.description)
                : undefined
            }
          />
          <div
            title={`${state.exhibit.author} ${
              state.exhibit.rights && "(" + state.exhibit.rights + ")"
            }`}
            className={classNames(
              "h-8 mt-2 leading-8 truncate w-4/6 font-semibold",
              {
                hidden: state.index !== 0,
                "skeleton-box": state.index === 0 && state.targetLoading,
              }
            )}
          >
            {state.index === 0 && !state.targetLoading && (
              <>
                {state.exhibit.author}
                {state.exhibit.rights && <>&nbsp;({state.exhibit.rights})</>}
              </>
            )}
          </div>
          <div
            className={classNames("h-8 leading-8 text-right pr-2", {
              hidden: state.index !== 0,
            })}
          >
            {(state.exhibit.duplicationEnabled ||
              state.exhibit.duplicationEnabled === undefined) && (
              <SVGLinkButton
                disabled={state.targetLoading}
                label="Duplicate"
                onClick={() => {
                  document.location.href = duplicateThisURL;
                }}
              >
                <DuplicateIcon className="w-5 h-5 mr-1 text-black" />
                <SVGLinkButtonText text="Duplicate" classes="text-black" />
              </SVGLinkButton>
            )}
            {state.exhibit.duplicatedFrom && (
              <SVGLinkButton
                disabled={state.targetLoading}
                classes="ml-4"
                label="Duplicated From"
                onClick={() => {
                  document.location.href = duplicatedFromURL;
                }}
              >
                <DuplicatedFromIcon className="w-5 h-5 mr-1 text-black" />
                <SVGLinkButtonText
                  text="Duplicated From"
                  classes="text-black"
                />
              </SVGLinkButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidesExhibit;
