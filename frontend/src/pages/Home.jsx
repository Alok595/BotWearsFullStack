import React, { useState } from "react";
import Background from "../components/Background";
import Hero from "../components/Hero";
import { useEffect } from "react";
import Product from "./Product";
import OurPolicy from "../components/OurPolicy";
import NewLetterBox from "../components/NewLetterBox";
import Footer from "../components/Footer";

const Home = () => {
  const heroData = [
    { text1: "30% off limited offer", text2: "Style that inspires" },
    { text1: "New arrivals are here", text2: "Fresh fashion drops" },
    { text1: "Exclusive deals today", text2: "Upgrade your look" },
    { text1: "Trending now", text2: "Wear it with confidence" },
  ];

  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount((prevCount) => (prevCount === 3 ? 0 : prevCount + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-[70px] w-full min-h-screen bg-gray-900 text-white overflow-x-hidden ">
      <div className="w-screen h-screen bg-linear-to-b from-[#141414] to-[#0c2025] relative overflow-hidden">
        <Background heroCount={heroCount} />
        <Hero
          heroCount={heroCount}
          heroData={heroData[heroCount]}
          setHeroCount={setHeroCount}
        />
      </div>

      <Product />
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  );
};

export default Home;
