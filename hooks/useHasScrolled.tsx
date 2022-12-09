import { useEffect, useState } from "react";

export const useHasScrolled = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function updatePos() {
      if (scrolled && window.scrollY < 300) {
        setScrolled(() => false);
      }
      if (window.scrollY > 300) {
        setScrolled(() => true);
      }
    }
    window.addEventListener("scroll", updatePos);
    //updatePos();

    return () => window.removeEventListener("scroll", updatePos);
  }, [scrolled]);

  return scrolled;
};
