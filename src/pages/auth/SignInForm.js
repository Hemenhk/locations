import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/SignUpInForm.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";

const SignInForm = () => {
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = signInData;

  const handleChange = event => {
    setSignInData({
        ...signInData,
        [event.target.name]: event.target.value,
    })
  }

  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${styles.Container} p-4`}>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="d-none">Username:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                className={styles.Input}
                onChange={handleChange}
                value={username}
                placeholder="Enter Username"
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
                placeholder="Enter Password"
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
