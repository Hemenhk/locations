import React from 'react'
import styles from "../../styles/Post.module.css"


const Post = () => {

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
        reviews_count
    } = props;
  return (
    <div>Post</div>
  )
}

export default Post