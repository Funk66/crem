import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBIauoiTATE_tPOq04bmFTUlV-TbsjeGyM",
  authDomain: "crem21.firebaseapp.com",
  projectId: "crem21",
  storageBucket: "crem21.appspot.com",
  messagingSenderId: "860973427087",
  appId: "1:860973427087:web:aa4a36c81e464576cd43fa",
  measurementId: "G-3PJVJFJ7LY",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();

window.addEventListener("offline", () => firestore.disableNetwork());
window.addEventListener("online", () => firestore.enableNetwork());
