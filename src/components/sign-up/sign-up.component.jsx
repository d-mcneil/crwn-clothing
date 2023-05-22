import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuthIfDoesNotExist,
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

    switch (true) {
      case password.length < 6:
        alert("Error creating user: password must be 6 characters or longer.");
        break;
      case password !== confirmPassword:
        alert("Error creating user: passwords do not match.");
        break;
      default:
        // prettier-ignore
        try {
          const { user } = await createAuthUserWithEmailAndPassword(email, password);
          const userDocRef = await createUserDocumentFromAuthIfDoesNotExist(user, { displayName });
          setFormFields(initialStateFormFields);
        } catch (error) {
          switch (error.code) {
            case "auth/email-already-in-use":
              alert("Error creating the user: email is already in use.");
              break;
            default:
              console.log("Error creating the user: ", error.message);
          }
        }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>
        Sign up with your email and password (or sign in with Google).
      </span>
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
        {/* 
        // Another way of doing the FormInput component which is less explicit within the component about the attributes that are being passed.
        <FormInput 
          label="Password"
          required
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          id="password-sign-up"
          minLength={6}
        /> 
        */}
        <Button buttonAttributes={{ type: "submit" }}>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUp;
