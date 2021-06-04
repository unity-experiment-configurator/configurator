import firebase from "firebase/app";
import "firebase/functions";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { isProduction } from "./Utils";
typeof window === "object" ? require("firebase/analytics") : () => false;

export const firebaseConfig = {
  apiKey: "AIzaSyATd9M_zQ0raUl9K1jvyDktMRiZ2aAR-rQ",
  authDomain: "interaction-design-76dc8.firebaseapp.com",
  projectId: "interaction-design-76dc8",
  storageBucket: "interaction-design-76dc8.appspot.com",
  messagingSenderId: "925035894657",
  appId: "1:925035894657:web:47b83de8998de908997a80",
  measurementId: "G-GP3T5GP395",
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
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}

// export const getImage = async (publicId: string) => {
//   // @ts-ignore
//   const fn = functions.httpsCallable("getImage");
//   return fn({ publicId });
// };

export const timestamp = () => {
  return firebase.firestore.Timestamp.now();
};

export const setCurrentScreen = (screen: string) => {
  analytics.setCurrentScreen(screen);
};

export type AnalyticsEvent =
  | "page_view"
  | "create_experiment"
  | "duplicate_experiment"
  | "open_share_panel";

// https://developers.google.com/gtagjs/reference/event
export const logEvent = (event: AnalyticsEvent, params: any) => {
  // console.log(event, params);
  if (isProduction) {
    analytics.logEvent(event as string, params);
  }
};
