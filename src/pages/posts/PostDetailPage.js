import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Post from "./Post";
import Review from "../reviews/Review";
import CreateReviewForm from "../reviews/CreateReviewForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Asset from "../../components/Asset";

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

  const currentUser = useCurrentUser();

  const profile_image = currentUser?.profile_image;

  const [reviews, setReviews] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        // By using destructuring, "data" is being renamed to "post".
        const [{ data: post }, { data: reviews }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/reviews/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setReviews(reviews);
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
        <Post {...post.results[0]} setPosts={setPost} postPage />
        <Container className={appStyles.Content}>
          {currentUser ? (
            <CreateReviewForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setReviews={setReviews}
            />
          ) : reviews.results.length ? (
            "Reviews"
          ) : null}
          {reviews.results.length ? (
            <InfiniteScroll
              children={reviews.results.map((review) => (
                <Review
                  key={review.id}
                  {...review}
                  setPost={setPost}
                  setReviews={setReviews}
                />
              ))}
              dataLength={reviews.results.length}
              loader={<Asset spinner/>}
              hasMore={!!reviews.next}
              next={() => fetchMoreData(reviews, setReviews)}
            />
          ) : currentUser ? (
            <span>Be the first to leave a review!</span>
          ) : (
            <span>No reviews yet...</span>
          )}
        </Container>
      </Col>
    </Row>
  );
};
export default PostDetailPage;
