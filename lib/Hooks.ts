import { auth, firestore } from "./Firebase";
import { useEffect, useState, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// import { logEvent, setCurrentScreen } from "./Firebase";
// import { useRouter } from "next/router";

// const router = useRouter();

// Custom hook to read auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}

// export const useConfirmCallback = (
//   message: string,
//   cb: (args: any) => void
// ) => {
//   return useCallback(
//     (...args) => {
//       // eslint-disable-next-line no-alert
//       if (window.confirm(message)) {
//         cb(args);
//       }
//     },
//     [message, cb]
//   );
// };

export const useTargetBlank = (selector: string, deps: any[]) => {
  useEffect(() => {
    const anchors = document.querySelectorAll(selector);
    for (let i = 0; i < anchors.length; i++) {
      anchors[i].setAttribute("target", "_blank");
    }
  }, [selector, deps]);
};

// // todo: test
// export const useGoogleAnalytics = () => {
//   // const pagePath = router.asPath;

//   useEffect(() => {
//     //const pagePath = location.pathname + location.search;
//     const pagePath = router.asPath;
//     setCurrentScreen(pagePath);
//     logEvent("page_view", { pagePath });
//   }, [location]);
// };