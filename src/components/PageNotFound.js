import React from 'react';
import NoResults from "../assets/no-results.png";
import styles from "../styles/PageNotFound.module.css";
import Asset from "../components/Asset";

/**
 * This code was borred by Code Insitute's 'Moments' Project
 */

const PageNotFound = () => {
  return (
    <div className={styles.NotFound}><Asset src={NoResults} message={"Sorry, the page you're looking for doesn't exist"}/></div>
  )
}

export default PageNotFound