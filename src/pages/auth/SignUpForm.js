import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/SignUpForm.module.css";
import appStyles from "../../App.module.css";


const SignUpForm = () => {

  /**
   * This useState hook is used to update the state of the 
   * three input fields, that the user has to fill in to sign up.
   * An object is used to store the value the user submits.
   */
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  // Destructuring the signUpData object allows for each key to be accessed individually.
  const {username, password1, password2} = signUpData;

  const [errors, setErrors] = useState({});

  /**
   * useNavigate hook used to take the user to a designated url upon successfully signin up.
   * useNavigate has replaced useHistory() in the latest version of React, 
   * but the functionality is the same.
   */
  const navigate = useNavigate();

  /**
   * This handleChange function is used to intercept the user's input
   * in the sign up form. The state is updated according to the value
   * of the event.target.value, which targets the value of the 'name'
   * properties in the form i.e. 'username', 'password1' and 'password2'.
   */
  const handleChange = event => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value
    });
  };

  /**
   * handleSubmit function is an async funtion that waits for a promise upon the 
   * user's sign up submission. If the submission is successful, the user's input
   * will be stored in the database, and the user will be redirected to the sign in page.
   * If the user is unsuccessful, then they'll trigger an error.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/dj-rest-auth/registration/', signUpData)
      // user is redirected to the sign in page
      navigate.push('/signin');
    } catch(err) {
      setErrors(err.response?.data)
    };
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-1 p-md-2">
        <Container className={styles.Container}>
          <h1>Sign Up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className={styles.InputField}
                type="text"
                placeholder="Enter username:"
                // Destructured value used
                value={username}
                name="username"
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                This username will be displayed to other users.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className={styles.InputField}
                type="password"
                placeholder="Enter password:"
                // Destructured value used
                value={password1}
                name="password1"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                className={styles.InputField}
                type="password"
                placeholder="Confirm Password:"
                // Destructured value used
                value={password2}
                name="password2"
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit">Sign Up</Button>
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign In</span>
          </Link>
        </Container>
      </Col>
      <Col md={6} className="my-auto d-none d-md-block p-2">
        <Image className={appStyles.FillerImage} src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80" />
      </Col>
    </Row>
  );
};

export default SignUpForm;
