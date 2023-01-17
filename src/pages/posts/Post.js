import React from "react";
import { Card, Media } from "react-bootstrap";
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
      </Card.Body>
    </Card>
  );
};

export default Post;
