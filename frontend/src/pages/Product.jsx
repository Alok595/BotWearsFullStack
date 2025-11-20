import React from "react";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";

const Product = () => {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-1 from-[#141414] to-[#0c2025] flex items-center justify-start flex-col py-5">
      <div className="">
        <LatestCollection />
      </div>
      <div>
        <BestSeller />
      </div>
    </div>
  );
};

export default Product;
