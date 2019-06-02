import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./firebase-config.js";

function initFirebase(config) {
  if (typeof window === "object") {
    return firebase.initializeApp(config);
  } else {
    const fb = require("firebase");
    return fb.initializeApp(config);
  }
}

const app = initFirebase(firebaseConfig);

// returning firestore handle
export const firestore = app.firestore();
