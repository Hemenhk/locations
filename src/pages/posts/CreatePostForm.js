import React, { useRef, useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";


import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const CreatePostForm = () => {
  const [errors, setErrors] = useState({});
  const [success, setSucces] = useState(false);

  const currentUser = useCurrentUser();


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

  const imageInput = useRef(null);

  // useNavigate hook will be used to redirect the user after successfully creating a post
  const navigate = useNavigate();

  // if the user is not logged in, they will be redirected to the sign in page
  useEffect(() => {
    if(!currentUser){
      navigate("/signin")
    }
  }, [navigate])
  

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

  /**
   * The handleSubmit async function creates a new FormData class, that creates a post that
   * appends the title, price, contact, content and image. In the try/catch block, the user
   * sends a post request to the API, with the new formData. If the request is successful, the
   * user will be redirected to the new post they created using the data.id of the post. If the
   * request fails, an error will be logged, only if the error is not a 401 unauthorized request.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("price", price);
    formData.append("contact", contact);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      setSucces(true);
      setTimeout(() => {
        navigate(`/posts/${data.id}`);
      }, 2000);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      {/* This form allows the user to post their rental location, by typing
        in the title, cost, contact info and some content describing the location */}

      <Form.Group className={`mb-3 ${styles.Label}`}>
        <Form.Label htmlFor="title">Title:</Form.Label>
        <Form.Control
          type="text"
          id="title"
          name="title"
          value={title}
          data-testid="title-test"
          onChange={handleChange}
          placeholder="Type Title:"
        />
      </Form.Group>
      <Form.Group className={`mb-3 ${styles.Label}`}>
        <Form.Label htmlFor="price">Price:</Form.Label>
        <Form.Control
          type="text"
          id="price"
          name="price"
          value={price}
          onChange={handleChange}
          placeholder="Type Price:"
        />
      </Form.Group>
      <Form.Group className={`mb-3 ${styles.Label}`}>
        <Form.Label htmlFor="contact">Contact:</Form.Label>
        <Form.Control
          type="text"
          id="contact"
          name="contact"
          value={contact}
          onChange={handleChange}
          placeholder="Type Contact:"
        />
      </Form.Group>
      <Form.Group className={`mb-3 ${styles.Label}`}>
        <Form.Label htmlFor="content">Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          id="content"
          name="content"
          value={content}
          onChange={handleChange}
          placeholder="Type Content:"
        />
      </Form.Group>

      {/* The navigate(-1) is the same as useHistory's go.Back function */}
      <Button
        className={btnStyles.Button}
        data-testid="create-test"
        type="submit"
      >
        Create
      </Button>
      <Button className={btnStyles.Button} onClick={() => navigate(-1)}>
        Cancel
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
      <Alert className={appStyles.Success} variant="success" show={success}>
        <p>
          Successfully created a post!
        </p>
      </Alert>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} d-flex flex-column justify-content-center`}
          >
            <Form.Group className={`text-center ${styles.ImageField}`}>
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} btn`}
                      htmlFor="image-upload"
                    >
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
                data-testid="image-test"
                id="image-upload"
                accept="image/*"
                ref={imageInput}
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
