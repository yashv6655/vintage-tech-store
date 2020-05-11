import React, { useContext } from "react";
import { FaAngleDoubleUp, FaAngleUp } from "react-icons/fa";
import { UserContext } from "../context/user";

export default function ScrollButton() {
  const { height } = useContext(UserContext);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={height > 300 ? "scroll-btn show-scroll-btn" : "scroll-btn"}
      onClick={scrollToTop}
    >
      <FaAngleUp />
    </button>
  );
}
