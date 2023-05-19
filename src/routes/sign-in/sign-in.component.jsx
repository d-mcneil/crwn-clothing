// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
// import { signInWithGoogleRedirect, auth } from "../../utilities/firebase/firebase.utilities";
// These imports are only used if signing in with signInWithGoogleRedirect.
// This would reinitialize the entire application, so any functions that were being executed won't be executed anymore.

import SignUp from "../../components/sign-up/sign-up.component";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utilities/firebase/firebase.utilities";

const SignIn = () => {
  // This effect would only be used if signing in using signInWithGoogleRedirect.
  // useEffect(
  //   () =>
  //     async function () {
  //       const response = await getRedirectResult(auth);
  //       if (response) {
  //         const userDocRef = await createUserDocumentFromAuth(response.user);
  //       }
  //     },
  //   []
  // );

  const signInGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={signInGoogleUser}>Sign In With Google Popup</button>
      <SignUp />
    </div>
  );
};

export default SignIn;
