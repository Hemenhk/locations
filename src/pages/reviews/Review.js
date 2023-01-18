import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Review.module.css";

const Review = (props) => {
  const { profile_id, profile_image, owner, updated_at, content } = props;
  return (
    <div>
      <hr />
      <Card>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Card.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          <p>{content}</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Review;
