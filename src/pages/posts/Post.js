import React from "react";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
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
    ratings_id,
    ratings_count,
    reviews_count,
    postPage,
  } = props;

  // currentUser is used to define the owner of each post, through the "is_owner" variable
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  return (
    <Card className={styles.Post}>
      <Card.Body className="align-items-center justify-content-between">
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} height={55} /> {owner}
        </Link>
        <div className="d-flex align-items-center">
          <span>{updated_at}</span>
          {is_owner && postPage && "..."}
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
          ) : ratings_id ? (
            <span onClick={() => {}}>
              <i className={`fa-solid fa-star ${styles.Star}`} />
            </span>
          ) : currentUser ? (
            <span onClick={() => {}}>
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
