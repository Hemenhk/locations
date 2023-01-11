import React, { useContext, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/SignUpInForm.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";
import { SetCurrentUserContext } from "../../App";

const SignInForm = () => {
  const setCurrentUser = useContext(SetCurrentUserContext);

  /**
   * This useState hook is used to update the state of the
   * two input fields, that the user has to fill in to sign in.
   * An object is used to store the value the user submits.
   */
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  // Destructuring the signUpData object allows for each key to be accessed individually.
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  /**
   * useNavigate hook used to take the user to a designated url upon successfully signing in.
   * useNavigate has replaced useHistory() in the latest version of React,
   * but the functionality is the same.
   */
  const navigate = useNavigate();

  /**
   * This handleChange function is used to intercept the user's input
   * in the sign in form. The state is updated according to the value
   * of the event.target.value, which targets the value of the 'name'
   * properties in the form i.e. 'username' and 'password1'.
   */
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * handleSubmit function is an async funtion that waits for a promise upon the
   * user's sign in submission. If the submission is successful, the user will be redirected to the home page.
   * If the user is unsuccessful, then they'll trigger an error.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      navigate("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${styles.Container} p-4`}>
          <h1>Sign In</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="d-none">Username:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                className={styles.Input}
                onChange={handleChange}
                value={username}
                placeholder="Enter Username:"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="d-none">Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                className={styles.Input}
                onChange={handleChange}
                value={password}
                placeholder="Enter Password:"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign In
            </Button>
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign Up Now!</span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
};

export default SignInForm;
