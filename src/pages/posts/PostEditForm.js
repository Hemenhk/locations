import React, { useRef, useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";

const PostEditForm = () => {
  const [errors, setErrors] = useState({});

  const [hasLoaded, setHasLoaded] = useState(false);

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

  const { id } = useParams();

  /**
   * This useEffect hook contains a handleMount async function that contains a try/catch block.
   * Inside the try block, data is destructured to equal the 'get' request to the API. The values
   * in the form are being destructured to equal 'data'. Then a ternary conditional operator is run
   * that if the user is the owner of the post, the data destructured above it will populate the fields
   * on mount. If the user is not the owner, they will be redirecte to the home page.
   */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { title, price, contact, content, image, is_owner } = data;
        setHasLoaded(true);

        is_owner
          ? setPostData({ title, price, contact, content, image })
          : navigate("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id, navigate]);

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
    // If there exists an image, then replace it with a newly selected one.
    if (imageInput?.current.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      navigate(`/posts/${id}`);
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
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="Type Title:"
        />
      </Form.Group>
      <Form.Group className={`mb-3 ${styles.Label}`}>
        <Form.Label>Price:</Form.Label>
        <Form.Control
          type="text"
          name="price"
          value={price}
          onChange={handleChange}
          placeholder="Type Price:"
        />
      </Form.Group>
      <Form.Group className={`mb-3 ${styles.Label}`}>
        <Form.Label>Contact:</Form.Label>
        <Form.Control
          type="text"
          name="contact"
          value={contact}
          onChange={handleChange}
          placeholder="Type Contact:"
        />
      </Form.Group>
      <Form.Group className={`mb-3 ${styles.Label}`}>
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
      {/* The navigate(-1) is the same as useHistory's go.Back function */}
      <Button className={btnStyles.Button} type="submit">
        save
      </Button>
      <Button className={btnStyles.Button} onClick={() => navigate(-1)}>
        cancel
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      {/* If hasLoaded is true when data is fetched then load the forms. If not the display a spinner */}
      {hasLoaded ? (
        <Row>
          <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
            <Container
              className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
            >
              <Form.Group className={`text-center ${styles.ImageField}`}>
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
                <Form.Control
                  type="file"
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
      ) : (
        <Asset spinner />
      )}
    </Form>
  );
};

export default PostEditForm;
