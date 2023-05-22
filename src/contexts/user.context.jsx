import { createContext, useEffect, useState } from "react";
import {
  createUserDocumentFromAuthIfDoesNotExist,
  onAuthStateChangeListener,
} from "../utilities/firebase/firebase.utilities";

// the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  // both context and state need initial values
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(
    // return onAuthStateChangeListener to cancel the listener when unmounting to avoid memory leak
    () =>
      onAuthStateChangeListener(async (user) => {
        if (user && user.displayName) {
          // If there is no displayName, then the user is signing up via email and password,.
          // This needs to be done from the SignUp component so that the document will include the displayName.
          await createUserDocumentFromAuthIfDoesNotExist(user);
        }
        setCurrentUser(user);
      }),
    []
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
