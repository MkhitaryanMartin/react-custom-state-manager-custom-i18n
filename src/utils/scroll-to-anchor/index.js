import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function ScrollToAnchor() {
  const location = useLocation();
  const hash = useRef("");
  useEffect(() => {
    if (location.hash) {
      hash.current = location.hash.slice(1);
    }

    const element = document.getElementById(hash.current);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [location]);

  return;
}

export default ScrollToAnchor;
