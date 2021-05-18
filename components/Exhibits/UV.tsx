import { useRef, useLayoutEffect, useEffect, useState } from "react";
const { init } = typeof window === "object" ? require("universalviewer") : () => false;
import classNames from "classnames";

const UV = ({
  manifest,
  target = null,
  embedded = false,
  resetOnTargetLost = true,
  footerDisabled = false,
  config = "/uv-config.json",
  onFullScreen = () => {},
  classes,
  onTargetChange,
  onTargetLoad,
  width = "100vw",
  height = "100vh",
}: {
  manifest: string;
  target?: string | null;
  embedded?: boolean;
  resetOnTargetLost?: boolean;
  footerDisabled?: boolean;
  config?: string;
  onFullScreen?: () => void;
  classes?: string | undefined;
  onTargetChange?: (target: string | null) => void;
  onTargetLoad?: () => void;
  width?: string;
  height?: string;
}) => {
  const el = useRef<HTMLDivElement>(null);
  const uv = useRef<any>(null);
  const refLoaded = useRef<boolean>(false);

  const [loaded, setLoaded] = useState<boolean>(false);

  useLayoutEffect(() => {
    refLoaded.current = false;
    setLoaded(false);

    if (manifest) {
      uv.current = init(el.current, {
        manifestUri: manifest,
        assetsDir: "/uv-assets",
        configUri: config,
        embedded,
        readOnlyDataProvider: true,
      });

      uv.current.on(
        "created",
        () => {
          if (uv.current) {
            setTimeout(() => {
              uv.current.resize();
            }, 250);
          }
        },
        false
      );

      uv.current.on("toggleFullScreen", onFullScreen, false);

      uv.current.on(
        "load",
        () => {
          if (el.current) {
            refLoaded.current = true;
            setLoaded(true);
            if (onTargetLoad) {
              onTargetLoad();
            }
            setTimeout(() => {
              uv.current.resize();
            }, 250);
          }
        },
        false
      );

      uv.current.on(
        "targetChange",
        (target: string) => {
          if (onTargetChange) {
            onTargetChange(target);
          }
        },
        false
      );
    }

    // cleanup
    return () => {
      uv.current.on("created", () => {
        // do nothing
      });
      uv.current.on("load", () => {
        // do nothing
      });
      uv.current.on("targetChange", () => {
        // do nothing
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manifest]);

  useEffect(() => {
    if (uv.current && refLoaded.current === true && loaded === true) {
      if (target === null && resetOnTargetLost) {
        uv.current.set({
          canvasIndex: 0,
          target: null,
        });
      } else {
        uv.current.set({
          target,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, loaded]);

  const c = classNames("uv", classes, {
    scroll: footerDisabled,
  });

  return (
    <div
      ref={el}
      id="uv"
      className={c}
      style={{
        width,
        height,
      }}
    />
  );
};

export default UV;
