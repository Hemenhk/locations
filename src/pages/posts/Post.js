import React from "react";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Post.module.css";

const Post = (props) => {
  /**
   * Destructure serializer fields from API to access easily in JSX
   */
  const {
    id,
    owner,
    created_at,
    updated_at,
    content,
    image,
    profile_id,
    profile_image,
    title,
    rating_id,
    ratings_count,
    reviews_count,
    postPage,
    setPosts,
  } = props;

  // currentUser is used to define the owner of each post, through the "is_owner" variable
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const navigate = useNavigate();

  // handleEdit function will navigate the user's post to the PostEditForm page
  const handleEdit = () => {
    navigate(`/posts/${id}/edit`);
  };

  // handleDelete will delete the user's post, and navigate them back to the Home page
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}`);
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * The handleRating async function hasa try/catch block that awaits the axiosResponse to
   * post ratings on a particular post. If the promise is successful, then the state of Posts changes
   * to add + 1 rating on a post.
   */
  const handleRating = async () => {
    try {
      const { data } = await axiosRes.post("/ratings/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          /**
           * If the post.id matches the id, the ratings count will increment by 1. If the id does not match,
           * nothing happens, as the return statement only returns the post.
           */
          return post.id === id
            ? {
                ...post,
                ratings_count: post.ratings_count + 1,
                rating_id: data.id,
              }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * The handleDerating async function has a try/catch block that awaits the axiosResponse to
   * post ratings on a particular post. If the promise is successful, then the state of Posts changes
   * to subtracts 1 rating on a post.
   */

  const handleUnrating = async () => {
    try {
      await axiosRes.delete(`/ratings/${rating_id}`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? {
                ...post,
                ratings_count: post.ratings_count - 1,
                rating_id: null,
              }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body className="align-items-center justify-content-between">
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} height={55} /> {owner}
        </Link>
        <div className="d-flex align-items-center">
          <span>{updated_at}</span>
          {is_owner && postPage && (
            <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
          )}
        </div>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't rate your own post!</Tooltip>}
            >
              <i className="fa-solid fa-star" />
            </OverlayTrigger>
          ) : // If there is a matching rating id, then the user will be able to decrement it
          rating_id ? (
            <span onClick={handleUnrating}>
              <i className={`fa-solid fa-star ${styles.Star}`} />
            </span>
          ) : currentUser ? (
            // If the current user exists, they will be able to rate a post
            <span onClick={handleRating}>
              <i className={`fa-solid fa-star ${styles.StarOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to rate posts!</Tooltip>}
            >
              <i className="fa-solid fa-star" />
            </OverlayTrigger>
          )}
          {ratings_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
