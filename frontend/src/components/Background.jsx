import React from "react";
import back1 from "../assets/back1.jpeg";
import back2 from "../assets/back2.jpeg";
import back3 from "../assets/back3.jpeg";
import back4 from "../assets/back4.jpeg";

const images = [back2, back1, back3, back4];

const Background = ({ heroCount }) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <img
        src={images[heroCount]}
        alt="background"
        className="w-full h-full object-cover transition-all duration-700 ease-in-out"
      />
      <div className="absolute inset-0 bg-black/40"></div>
    </div>
  );
};

export default Background;
