import React, { useState } from "react";

import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Figure,
  Image,
} from "react-bootstrap";

import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";

const CreatePostForm = () => {
  const [errors, setErrors] = useState({});

  /**
   * This useState hook will create an object with keys that will be passed
   * into the form field.
   */
  const [postData, setPostData] = useState({
    title: "",
    price: "",
    contact: "",
    content: "",
    image: "",
  });

  // Destructure the postData hook, so the values can be accessed individually
  const { title, price, contact, content, image } = postData;

  /**
   * This handleChange function is used to intercept the user's input
   * in the post create form. The state is updated according to the value
   * of the event.target.value, which targets the value of the 'name'
   * properties in the form i.e. 'title' and 'conent', etc.
   */
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * This handleImageChange function uses event to target the image selected
   * to be uploaded. By using URL.createObjectURL, the user can select the file
   * they want to upload from their system. In case the user wants to change the
   * image uploaded, URL.revokeObjectURL is called by passing in "image" as a parameter.
   */

  const handleImageChange = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const textFields = (
    <div className="text-center">
      {/* This form allows the user to post their rental location, by typing
        in the title, cost, contact info and some content describing the location */}

      <Form.Group className="mb-3">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="Type Title:"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price:</Form.Label>
        <Form.Control
          type="text"
          name="price"
          value={price}
          onChange={handleChange}
          placeholder="Type Price:"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="contact">
        <Form.Label>Contact:</Form.Label>
        <Form.Control
          type="text"
          name="contact"
          value={contact}
          onChange={handleChange}
          placeholder="Type Contact:"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="content">
        <Form.Label>Content:</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
          placeholder="Type Content:"
        />
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
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label htmlFor="image-upload">
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.Control
                type="file"
                id="image-upload"
                name="image"
                value={image}
                accept="image/*"
                onChange={handleImageChange}
              />
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
