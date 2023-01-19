import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Review.module.css";
import { axiosRes } from "../../api/axiosDefaults";

const Review = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setReviews,
  } = props;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/reviews/${id}`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            reviews_count: prevPost.results[0].reviews_count - 1,
          },
        ],
      }));
      
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.filter((review) => review.id !== id),
      }))
    } catch (err) {
      console.log(err);
    }
  };

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
        {is_owner && <MoreDropdown  handleDelete={handleDelete}/>}
      </Card>
    </div>
  );
};

export default Review;
