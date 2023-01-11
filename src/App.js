import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import SignUpForm from "./pages/auth/SignUpForm";
import "./api/axiosDefaults";
import SignInForm from "./pages/auth/SignInForm";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
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
     * By wrapping the App inside the CurrentUserContext and SetCurrentUserContext
     * all the child components in this app is able to subscribe to when the 
     * context changes.
     */
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Routes>
              <Route path="/" element={<h1>Home</h1>} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/signin" element={<SignInForm />} />
            </Routes>
          </Container>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
