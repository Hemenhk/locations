import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

/**
 * The code on lines 8-9 creates two contexts that will be passed into
 * the code on lines 12-13, which will then be used on the sign in and out 
 * functionalities
 */

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  /**
   * This useState hook is used to track the current user's logged in status.
   * As this requires neither an array or an object, the initial value passed in
   * is 'null'
   */
  const [currentUser, setCurrentUser] = useState(null);

  /**
   * This handleMount function will use an async function to fetch the user's
   * account from the database. If successful, the user will be able to log in,
   * if unsuccessful the catch section will log the error.
   */
  const handleMount = async () => {
    try {
      const { data } = await axios.get("/dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * By passing in 'handleMount' inside this useEffect hook, React is being told
   * to call the 'handleMount' function when the component renders. Thus, the user
   * is a able to log in and see the rendered result. As this is used for log in
   * purposes, there is no need for a cleanup.
   */
  useEffect(() => {
    handleMount();
  }, []);

  return (
    /**
     * By wrapping the 'chilren' inside the CurrentUserContext and SetCurrentUserContext
     * all the child components in this app are able to subscribe to when the
     * context changes.
     */
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
