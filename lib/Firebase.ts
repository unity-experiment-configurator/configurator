import firebase from "firebase/app";
import "firebase/functions";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { isProduction } from "./Exhibit";
typeof window === "object" ? require("firebase/analytics") : () => false;

export const firebaseConfig = {
  apiKey: "AIzaSyC3pM0EKK4NfX21KMsOU-ldkBVshdDmDkE",
  authDomain: "exhibit-staging-eea8b.firebaseapp.com",
  projectId: "exhibit-staging-eea8b",
  storageBucket: "exhibit-staging-eea8b.appspot.com",
  messagingSenderId: "42800390262",
  appId: "1:42800390262:web:995f90928d11097ff9bf57",
  measurementId: "G-B9XHV5TCNJ",
};

let functions: firebase.functions.Functions;

if (!firebase.apps.length) {
  const app = firebase.initializeApp(firebaseConfig);
  functions = app.functions("europe-west3");
  // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Firestore exports
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

// Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

// Analytics exports
let analytics: any = {};

if (typeof window === "object") {
  analytics = firebase.analytics()
}

/// Helper functions
export async function getUserWithUsername(username: string) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
// export function postToJSON(doc) {
//   const data = doc.data();
//   return {
//     ...data,
//     // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
//     createdAt: data?.createdAt.toMillis() || 0,
//     updatedAt: data?.updatedAt.toMillis() || 0,
//   };
// }

export const getStats = async () => {
  // @ts-ignore
  const fn = functions.httpsCallable("getStats");
  return fn();
};

export const getExhibit = async (publicId: string) => {
  // @ts-ignore
  const fn = functions.httpsCallable("getExhibit");
  return fn({ publicId });
};

export const getExhibitWithoutItems = async (publicId: string) => {
  // @ts-ignore
  const fn = functions.httpsCallable("getExhibitWithoutItems");
  return fn({ publicId });
};

export const timestamp = () => {
  return firebase.firestore.Timestamp.now();
};

export const setCurrentScreen = (screen: string) => {
  analytics.setCurrentScreen(screen);
};

export type AnalyticsEvent =
  | "page_view"
  | "create_exhibit"
  | "duplicate_exhibit"
  | "import_iiif"
  | "add_item"
  | "update_details"
  | "open_share_panel";

// https://developers.google.com/gtagjs/reference/event
export const logEvent = (event: AnalyticsEvent, params: any) => {
  // console.log(event, params);
  if (isProduction) {
    analytics.logEvent(event as string, params);
  }
};
