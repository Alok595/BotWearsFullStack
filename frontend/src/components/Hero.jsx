import React from "react";
import { FaBullseye } from "react-icons/fa";

const Hero = ({ heroData, heroCount, setHeroCount }) => {
  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-center items-start px-10 md:px-20 text-white">
      {/* Text Section */}
      <div className="space-y-4 mb-8">
        <p className="text-[#88d9ee] text-2xl md:text-4xl lg:text-6xl font-semibold drop-shadow-lg">
          {heroData.text1}
        </p>
        <p className="text-white text-3xl md:text-5xl lg:text-7xl font-bold drop-shadow-lg">
          {heroData.text2}
        </p>
      </div>

      {/* Dots Navigation */}
      <div className="flex gap-4 mt-10">
        {[0, 1, 2, 3].map((i) => (
          <FaBullseye
            key={i}
            onClick={() => setHeroCount(i)}
            className={`w-5 h-5 cursor-pointer transition-all duration-300 ${
              heroCount === i ? "fill-white scale-110" : "fill-blue-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
