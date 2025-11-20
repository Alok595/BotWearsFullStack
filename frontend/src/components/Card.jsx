import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";

const Card = ({ name, image, id, price }) => {
  const navigate = useNavigate();
  const { currency } = useContext(shopDataContext);

  return (
    <div
      className="bg-white dark:bg-[#181818] rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 w-full max-w-[320px] mx-auto"
      onClick={() => navigate(`/productdetail/${id}`)}
    >
      {/* ===== Product Image ===== */}
      <div className="w-full h-[350px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
        <img src={image} alt={name} className="object-cover w-full h-full  " />
      </div>

      {/* ===== Product Info ===== */}
      <div className="px-5 py-4 text-left">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
          {name}
        </h3>
        <p className="text-pink-600 dark:text-pink-400 font-bold mt-2 text-base">
          {currency}
          {price}
        </p>
      </div>
    </div>
  );
};

export default Card;
