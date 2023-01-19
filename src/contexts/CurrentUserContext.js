import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { axiosRes, axiosReq } from "../api/axiosDefaults";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

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
  // Create navigate to use redirect functionality
  const navigate = useNavigate();
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
      const { data } = await axiosRes.get("/dj-rest-auth/user/");
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

  useMemo(() => {
    /**
     * This async function will request to refresh the access token by calling the API,
     * if the request fails, and the user was logged in, they will be redirected to the
     * signin page, and their logged in status will be set to "null"
     */
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate("/signin");
              }
              return null;
            });
            removeTokenTimestamp()
            return config;
          }
        }

        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axios.interceptors.response.use(
      (response) => response,
      // An async function is used if the user's token expires
      async (err) => {
        /**
         * If the user's status is unauthorized (401 error), axios will attempt
         * to refresh it by accessing the API. If the refresh attempt fails, then
         * the user is redirected to the signin page to sign in again, and their
         * login status is "null"
         */
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate("/signin");
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [navigate]);

  return (
    /**
     * By wrapping the 'children' inside the CurrentUserContext and SetCurrentUserContext
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
