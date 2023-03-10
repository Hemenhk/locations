import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

/**
 * This code was borred by Code Insitute's 'Moments' Project
 */

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      // Using reduce method, the results page retrieved from the API are looped through
      results: data.results.reduce((acc, cur) => {
        /**
         * Using the some method, the array of posts are looped through in the acc.
         * Inside, each acc item is being compared to the current post id from the newly
         * fetched post array. If the some method is true, then the post is already being displayed.
         * If the some method does not find a match, the acc is returned with a new post added to it.  
         */
        return acc.some((accResults) => accResults.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    console.log(err);
  }
};

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp)
}

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp")
}

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp")
}