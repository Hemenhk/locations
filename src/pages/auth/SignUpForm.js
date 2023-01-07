import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
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



  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-1 p-md-2" l>
        <Container className={styles.Container}>
          <h1>Sign Up</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className={styles.InputField}
                type="text"
                placeholder="Enter username:"
                // Destructured value used
                value={username}
              />
              <Form.Text className="text-muted">
                This username will be displayed to other users.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className={styles.InputField}
                type="password"
                placeholder="Enter password:"
                // Destructured value used
                value={password1}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                className={styles.InputField}
                type="password"
                placeholder="Confirm Password:"
                // Destructured value used
                value={password2}
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
