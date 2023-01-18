import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import styles from "../../styles/Home.module.css";
import appStyles from "../../App.module.css"
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png"

const Home = ({ message, filter = "" }) => {
  /**
   * This useState hook will create a default value of an object
   * with the key being results, and its value being an empty array of posts.
   */
  const [posts, setPosts] = useState({ results: [] });

  // This useState will create a loading asset if the posts are loading
  const [hasLoaded, setHasLoaded] = useState(false);

  /**
   * The useLocation hook will be used to track the URL, thus allowing
   * the app to trigger functions depending on the URL. "Pathname" is destructured
   * to allow for easy access to the value.
   */
  const { pathname } = useLocation();

  /**
   * This useEffect hook will use an async function with a try/catch block. If the
   * 'get' request to the API is successful, with filtering, the new state of 'posts' will
   * fetch the data from the posts. After the posts have been fetched the new state of 'hasLoaded'
   * will be changed to 'true'. If the 'get' request fails, the console will fire an error. As this
   * try/catch block depends on 'filter' and 'pathname', these two values will be passed in as dependencies.
   */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${filter}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    // hasLoaded will be false before the fetchPosts function has run
    setHasLoaded(false);
    // Call fetchPosts function
    fetchPosts();
  }, [filter, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {hasLoaded ? (
            <>
            {posts.results.length ? (
                posts.results.map(post => (
                    <Post key={post.id} {...post} setPosts={setPosts}/>
                ))
            ) : (
                <Container className={appStyles.Content}>
                    <Asset src={NoResults} message={message} />
                </Container>
            )}
            </>
        ) : (
            <Container className={appStyles.Content}>
                <Asset spinner />
            </Container>
        )}
      </Col>
    </Row>
  );
};

export default Home;
