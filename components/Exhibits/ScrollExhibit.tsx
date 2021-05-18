/* eslint-disable prefer-template */
import { useReducer, useCallback, useEffect, useRef } from "react";
import classNames from "classnames";
import { useFullscreen, useToggle } from "react-use";
import InView from "react-intersection-observer";
import { AnnotationValue, PublicExhibit } from "../../lib/Types";
import UV from "./UV";
import { SVGLinkButton, SVGLinkButtonText } from "../FormControls";
import { useTargetBlank } from "../../lib/Hooks";
import { useWindowSize } from "react-use";
import { sanitizeSSR } from "../../lib/Utils";
import { lg, site } from "../../lib/Utils";
import DuplicateIcon from "../../public/svg/duplicate.svg";
import DuplicatedFromIcon from "../../public/svg/duplicated-from.svg";

interface ExhibitProps {
  exhibit: PublicExhibit;
  embedded: boolean;
}

type Screen = Omit<AnnotationValue, "created" | "modified">;

const ScrollExhibit = ({ exhibit, embedded }: ExhibitProps) => {
  type State = {
    exhibit: PublicExhibit;
    embedded: boolean;
    description: string | null;
    descriptionVisible: boolean;
    screens: Screen[];
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
    screens: [],
    index: 0,
    partOf: null,
    target: null,
    targetLoading: true,
  };

  type Action =
    | { type: "start"; payload: PublicExhibit }
    | { type: "index"; payload: number }
    | { type: "screenChanged"; payload: number }
    | { type: "targetChange"; payload: string | null }
    | { type: "targetLoad" }
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

        const landingScreen: Screen = {
          orderIndex: -1,
          value: action.payload.description,
          partOf,
          target,
        };

        // add the landing screen to the start
        const screens: Screen[] = [
          landingScreen as AnnotationValue,
          ...annotations,
        ];

        return {
          ...state,
          exhibit,
          screens,
          partOf,
        };
      }
      case "screenChanged": {
        // console.log("screen changed", action.payload);
        const index: number = action.payload;
        const screen: Screen = state.screens[index];

        return {
          ...state,
          index,
          partOf: screen.partOf,
          description: screen.value,
          target: index === 0 ? null : screen.target,
          targetLoading: screen.partOf !== state.partOf,
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

  useTargetBlank(".screen a", [state.exhibit]);

  const { width, height } = useWindowSize();

  const duplicateThisURL = `${site}/exhibits/create?duplicate=${exhibit.publicId}`;
  const duplicatedFromURL = `${site}/exhibits/${exhibit.duplicatedFrom}`;

  useEffect(() => {
    dispatch({ type: "start", payload: exhibit });
  }, [exhibit]);

  const ScrollScreen = ({ screen }: { screen: Screen }) => (
    <div className={classNames("table-row")}>
      <div className="h-screen w-screen table-cell align-middle">
        <InView
          as="div"
          threshold={1}
          onChange={(inView, _entry) => {
            if (inView && state.index !== screen.orderIndex + 1) {
              dispatch({
                type: "screenChanged",
                payload: screen.orderIndex + 1,
              });
            }
          }}
        >
          <div className="screen p-4">
            <div
              className={classNames(
                "text-sm bg-white bg-opacity-80 shadow-md text-gray-900 p-4 ml-auto mr-auto lg:shadow-none"
              )}
            >
              {screen.orderIndex === -1 && (
                <h1
                  className={classNames(
                    "text-xl lg:text-4xl leading-tight text-black pb-4 lg:pb-8",
                    {
                      "skeleton-box": state.targetLoading,
                    }
                  )}
                >
                  {state.targetLoading ? <>&nbsp;</> : state.exhibit.title}
                </h1>
              )}
              <div
                className={classNames("pt-0 lg:text-lg", {
                  "skeleton-box":
                    state.targetLoading && screen.orderIndex === -1,
                })}
                dangerouslySetInnerHTML={
                  state.targetLoading && screen.orderIndex === -1
                    ? sanitizeSSR("&nbsp;")
                    : screen.value
                    ? sanitizeSSR(screen.value)
                    : undefined
                }
              />
              {screen.orderIndex === -1 && (
                <>
                  <div
                    title={`${state.exhibit.author} ${
                      state.exhibit.rights && "(" + state.exhibit.rights + ")"
                    }`}
                    className={classNames(
                      "h-8 mt-2 lg:mt-4 block w-full font-semibold leading-8 overflow-ellipsis overflow-hidden lg:mb-8",
                      {
                        "skeleton-box": state.targetLoading,
                      }
                    )}
                  >
                    {!state.targetLoading && (
                      <>
                        {state.exhibit.author}
                        {state.exhibit.rights && (
                          <>&nbsp;({state.exhibit.rights})</>
                        )}
                      </>
                    )}
                  </div>
                  <div
                    className={classNames(
                      "h-8 leading-8 text-right lg:text-left pr-2"
                    )}
                  >
                    {!!state.exhibit.duplicationEnabled && (
                      <SVGLinkButton
                        disabled={state.targetLoading}
                        label="Duplicate"
                        classes="mr-4"
                        onClick={() => {
                          document.location.href = duplicateThisURL;
                        }}
                      >
                        <DuplicateIcon className="w-5 h-5 mr-1 text-black" />
                        <SVGLinkButtonText
                          text="Duplicate"
                          classes="text-black"
                        />
                      </SVGLinkButton>
                    )}
                    {state.exhibit.duplicatedFrom && (
                      <SVGLinkButton
                        disabled={state.targetLoading}
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
                </>
              )}
            </div>
          </div>
        </InView>
      </div>
    </div>
  );

  const Screens = () => {
    return (
      <>
        {state.screens.map((screen, index) => {
          return <ScrollScreen key={index} screen={screen} />;
        })}
      </>
    );
  };

  const [show, toggle] = useToggle(false);
  const isFullscreen = useFullscreen(ref, show, {
    onClose: () => toggle(false),
  });

  return (
    <div ref={ref}>
      <div className="exhibit h-screen">
        {state.partOf && (
          <div
            style={{
              marginLeft: `${
                width >= lg ? width / 4 : 0
              }px`,
            }}
          >
            <UV
              embedded={state.embedded}
              manifest={state.partOf}
              target={state.target}
              footerDisabled
              onTargetLoad={() => {
                dispatch({ type: "targetLoad" });
              }}
              onTargetChange={(target: string | null) => {
                dispatch({ type: "targetChange", payload: target });
              }}
              width={
                width >= lg
                  ? `${(width / 4) * 3}px`
                  : `${width}px`
              }
              height={`${height}px`}
            />
          </div>
        )}
      </div>
      <div className="absolute top-0 left-0 h-screen w-full overflow-y-scroll">
        {width >= lg ? (
          <div className={classNames("bg-white w-1/4 table")}>
            <Screens />
          </div>
        ) : (
          <Screens />
        )}
      </div>
    </div>
  );
};

export default ScrollExhibit;
