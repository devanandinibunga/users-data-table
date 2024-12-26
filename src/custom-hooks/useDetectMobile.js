import { useState, useEffect } from "react";
// import { MOBILE_WIDTH, DESKTOP_WIDTH } from "../common/constants";

export const useDetectMobile = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const MOBILE_WIDTH = 767;
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= MOBILE_WIDTH;

  return { isMobile };
};
