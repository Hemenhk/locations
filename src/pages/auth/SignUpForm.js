import React from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import styles from "../../styles/SignUpForm.module.css";

const SignUpForm = () => {
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
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                className={styles.InputField}
                type="password"
                placeholder="Confirm Password:"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUpForm;
