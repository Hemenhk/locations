import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Post from "./Post";

const PostDetailPage = () => {
  /**
   * useParams is used to access the ":id" of the posts from the routing.
   * "id" is being destructured in place so that it may be accessed easily
   * in the JSX
   */
  const { id } = useParams();
  /**
   * This useState hook is used to set the state for an object key called "results",
   * that has a value of an empty array. The empty array will contain posts the users
   * create.
   */
  const [post, setPost] = useState({ results: [] });
  useEffect(() => {
    const handleMount = async () => {
      try {
        // By using destructuring, "data" is being renamed to "post".
        const [{ data: post }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
        ]);
        setPost({ results: [post] });
        console.log(post);
      } catch (err) {
        console.log(err);
      }
    };

    // Call handleMount function
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* Import Post component, and spread the post results from setPost */}
        <Post {...post.results[0]} setPosts={setPost}/>
        <Container className={appStyles.Content}>Comments</Container>
      </Col>
    </Row>
  );
};
export default PostDetailPage;
