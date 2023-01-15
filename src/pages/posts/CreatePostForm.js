import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
const CreatePostForm = () => {
  const [errors, setErrors] = useState({});

  const textFields = (
    <div className="text-center">

        {/* This form allows the user to post their rental location, by typing
        in the title, cost, contact info and some content describing the location */}

      <Form.Group className="mb-3">
        <Form.Label>Title:</Form.Label>
        <Form.Control type="text" name="title" placeholder="Type Title:" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="price">
      <Form.Label>Price:</Form.Label>
        <Form.Control type="text" name="price" placeholder="Type Price:" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="contact">
      <Form.Label>Contact:</Form.Label>
        <Form.Control type="text" name="contact" placeholder="Type Contact:" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="content">
      <Form.Label>Content:</Form.Label>
        <Form.Control as="textarea" rows={6} name="content" placeholder="Type Content:" />
      </Form.Group>

      <Button onClick={() => {}}>cancel</Button>
      <Button type="submit">create</Button>
    </div>
  );

  return (
    <Form>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <Form.Label
                className="d-flex justify-content-center"
                htmlFor="image-upload"
              >
                <Asset src={Upload} message="Click or tap to upload an image" />
              </Form.Label>
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default CreatePostForm;
