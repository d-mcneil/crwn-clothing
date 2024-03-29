// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use (https://firebase.google.com/docs/web/setup#available-libraries)
import {
  getAuth,
  //   signInWithRedirect, // This import is only used if signing in with signInWithGoogleRedirect.
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import firebaseConfig from "./firebaseConfig.utilities"; // follows the pattern of the commented object below
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "",
//   // with Firebase, this apiKey is not a secret
//   // Firebase needs the user to have this apiKey to access the database
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: "",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(); // persists between refreshes
const db = getFirestore();

export const createAuthUserWithEmailAndPassword = (email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = (email, password) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(auth, email, password);
};

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
// This would reinitialize the entire application, so any functions that were being executed won't be executed anymore.

export const signOutUser = () => signOut(auth);

export const onAuthStateChangeListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const createUserDocumentFromAuthIfDoesNotExist = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  // get the document reference for this user
  const userDocRef = doc(
    db,
    "users", // collection name
    userAuth.uid // unique identifier
  );

  try {
    // points to a specific spot in a collection WHETHER OR NOT THAT DATA EXISTS
    const userSnapshot = await getDoc(userDocRef);

    // check to see if there is an instance within the collection for this user or not
    if (!userSnapshot.exists()) {
      // if there is not an instance (document) within the collection, set one
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
        // if creating a user via email, displayName is not included in the userAuth object
        // then, displayName would be null, so that null will be overwritten when displayName is included in additionalInformation
      });
    }
  } catch (error) {
    console.log("Error creating the user: ", error.message);
    return null;
  }

  return userDocRef;
};
