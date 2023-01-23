import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/SignUpInForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";



const SignUpForm = () => {

  /**
   *
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
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const [success, setSucces] = useState(false);

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
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
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
      await axios.post("/dj-rest-auth/registration/", signUpData);
      setSucces(true);
      setTimeout(() => {
        // user is redirected to the sign in page
        navigate("/signin");
      }, 3000);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={`justify-content-center ${styles.Row}`}>
      <Alert className={appStyles.Success} variant="success" show={success}>
        <p>
          Congratulations <span>{username}</span> on creating your account!
        </p>
      </Alert>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={styles.Container}>
          <h1>Sign Up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className={`mb-3 ${styles.Label}`} controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.InputField}
                type="text"
                placeholder="Enter username:"
                // Destructured value used
                value={username}
                name="username"
                onChange={handleChange}
              />
              {errors.username?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <Form.Text className="text-muted">
                This username will be displayed to other users.
              </Form.Text>
            </Form.Group>

            <Form.Group
              className={`mb-3 ${styles.Label}`}
              controlId="password1"
            >
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.InputField}
                type="password"
                placeholder="Enter password:"
                // Destructured value used
                value={password1}
                name="password1"
                onChange={handleChange}
              />
              {errors.password1?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form.Group>
            <Form.Group
              className={`mb-3 ${styles.Label}`}
              controlId="password2"
            >
              <Form.Label className="d-none">Confirm Password</Form.Label>
              <Form.Control
                className={styles.InputField}
                type="password"
                placeholder="Confirm Password:"
                // Destructured value used
                value={password2}
                name="password2"
                onChange={handleChange}
              />
              {errors.password2?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form.Group>
            <Button className={btnStyles.Button} type="submit">
              Sign Up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="warning" key={idx} className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign In</span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUpForm;
