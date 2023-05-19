import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utilities/firebase/firebase.utilities";
import FormInput from "../form-input/form-input.component";
import "./sign-up.styles.scss";
import Button from "../button/button.component";

const SignUp = () => {
  const initialStateFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formFields, setFormFields] = useState(initialStateFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // confirm that password matches
    // see if we have authenticated that user
    // create user document
    switch (true) {
      case password.length < 6:
        return alert(
          "Error creating user: password must be 6 characters or longer."
        );
      case password !== confirmPassword:
        return alert("Error creating user: passwords do not match.");
      // return;
      default:
        // prettier-ignore
        console.log('trying')
        try {
          const { user } = await createAuthUserWithEmailAndPassword(
            email,
            password
          );
          const userDocRef = await createUserDocumentFromAuth(user, {
            displayName,
          });
          setFormFields(initialStateFormFields);
        } catch (error) {
          if (error.code === "auth/email-already-in-use") {
            alert("Error creating user: email is already in use.");
          }
          console.log(error);
        }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with Your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Display Name"}
          inputAttributes={{
            required: true,
            type: "text",
            name: "displayName",
            value: displayName,
            onChange: handleChange,
            id: "display-name-sign-up",
          }}
        />
        <FormInput
          label={"Email"}
          inputAttributes={{
            required: true,
            type: "email",
            name: "email",
            value: email,
            onChange: handleChange,
            id: "email-sign-up",
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
            id: "password-sign-up",
            minLength: 6,
          }}
        />
        <FormInput
          label={"Confirm Password"}
          inputAttributes={{
            required: true,
            type: "password",
            name: "confirmPassword",
            value: confirmPassword,
            onChange: handleChange,
            id: "confirm-password-sign-up",
            minLength: 6,
          }}
        />
        {/* <FormInput
          label="Password"
          required
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          id="password-sign-up"
          minLength={6}
        /> */}
        <Button buttonAttributes={{ type: "submit" }}>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUp;
