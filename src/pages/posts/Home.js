import React, { useState, useEffect } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import styles from "../../styles/Home.module.css";
import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

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

  // This useState hook handles the state of the search bar's input text
  const [query, setQuery] = useState("");

  /**
   * This useEffect hook will use an async function with a try/catch block. If the
   * 'get' request to the API is successful, with filtering, the new state of 'posts' will
   * fetch the data from the posts. After the posts have been fetched the new state of 'hasLoaded'
   * will be changed to 'true'. If the 'get' request fails, the console will fire an error. As this
   * try/catch block depends on 'filter', 'query' and 'pathname', these two values will be passed in as dependencies.
   */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    // hasLoaded will be false before the fetchPosts function has run
    setHasLoaded(false);

    const timer = setTimeout(() => {
      // Call fetchPosts function
      fetchPosts();
    }, 1000);

    // This is a cleanup function clearing the timer
    return () => {
      clearTimeout(timer);
    };
  }, [filter, pathname, query]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            // This handler will target the user input
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search for posts"
          />
        </Form>

        {/* This nested ternary conditional block will be used to display posts
        on the home page. If 'hasLoaded' is true, then the lenght of the post results will be displayed. 
        If there are no posts to be found, then the Asset component will notify of such. If 'hasLoaded'
        is false, then a spinner will appear until the posts have been fetched/loaded */}
        {hasLoaded ? (
          <>
            {/* An InfiniteScroll component is used to display all fetched posts on a single page without
            the need for a next button. This creates good UX, as it creates a seamless scroll functionality. */}
            
            {posts.results.length ? (
              <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
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
