import { useEffect, useRef, useState } from "react";

/**
 * This code was borred by Code Insitute's 'Moments' Project
 */

const useClickOutsideToggle = () => {
  // This useState hook allows us to manipulate the navbar burger menu
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  /**
   * This useEffect hook handles the navbar burger menu's toggle functionality.
   * If the current ref is open and the user clicks outside of the target, the
   * burger menu will collapse. The add event listener uses the handleClicksOutside
   * function, and it is then cleaned up in the return statement. "ref" is passed in
   * as a dependency.
   */
  useEffect(() => {
    const handleClicksOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mouseup", handleClicksOutside);
    return () => {
      document.removeEventListener("mouseup", handleClicksOutside);
    };
  }, [ref]);

  // The values in the object below will be exported to the NavBar component.
  return {expanded, setExpanded, ref};
};

export default useClickOutsideToggle;
