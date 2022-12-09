import { useEffect, useState } from "react";

export const useScrollPos = () => {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    function updatePos() {
      setScrollPos(() => window.scrollY);
    }
    window.addEventListener("scroll", updatePos);
    //updatePos();

    return () => window.removeEventListener("scroll", updatePos);
  }, []);

  return scrollPos;
};
