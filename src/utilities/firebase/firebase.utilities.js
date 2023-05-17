// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  //   signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import firebaseConfig from "./firebaseConfig.utilities";
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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  // get the document reference for this user
  const userDocRef = doc(
    db,
    "users", // collection name
    userAuth.uid // unique identifier
  );

  const userSnapshot = await getDoc(userDocRef);
  // points to a specific spot in a collection WHETHER OR NOT THAT DATA EXISTS

  // check to see if there is an instance within the collection for this user or not
  if (!userSnapshot.exists()) {
    // if there is not an instance (document) within the collection, set one
    try {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error creating the user: ", error.message);
    }
  }

  return userDocRef;
};
