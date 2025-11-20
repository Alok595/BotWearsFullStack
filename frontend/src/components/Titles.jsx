import React from "react";

const Titles = ({ text1, text2 }) => {
  return (
    <div className="text-center mb-8">
      <p className="text-2xl md:text-3xl font-semibold text-gray-100 tracking-wide">
        {text1}
        <span className="text-pink-500 font-bold border-b-2 border-pink-500">
          {text2}
        </span>
      </p>
      <div className="w-20 h-[2px] bg-pink-500 mx-auto mt-3 rounded-full"></div>
    </div>
  );
};

export default Titles;
