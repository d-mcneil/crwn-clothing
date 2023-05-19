// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
// import { signInWithGoogleRedirect, auth } from "../../utilities/firebase/firebase.utilities";
// These imports are only used if signing in with signInWithGoogleRedirect.
// This would reinitialize the entire application, so any functions that were being executed won't be executed anymore.

import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utilities/firebase/firebase.utilities";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";

const SignIn = () => {
  const initialStateFormFields = {
    email: "",
    password: "",
  };

  const [formFields, setFormFields] = useState(initialStateFormFields);

  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      const userDocRef = await createUserDocumentFromAuth(user);
      setFormFields(initialStateFormFields);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
        case "auth/user-not-found":
          alert("Incorrect combination of user and password.");
          break;
        default:
          console.log(error.message);
      }
    }
  };

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
    try {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
      setFormFields(initialStateFormFields);
    } catch (error) {
      console.log("Error signing in the user: ", error.message);
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in.</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Email"}
          inputAttributes={{
            required: true,
            type: "email",
            name: "email",
            value: email,
            onChange: handleChange,
            id: "email-sign-in",
          }}
        />
        <FormInput
          label={"Password"}
          inputAttributes={{
            required: true,
            type: "password",
            name: "password",
            value: password,
            onChange: handleChange,
            id: "password-sign-in",
          }}
        />
        <div className="buttons-container">
          <Button buttonAttributes={{ type: "submit" }}>Sign In</Button>
          <Button
            buttonType="google"
            buttonAttributes={{ type: "button" }}
            onClick={signInGoogleUser}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
