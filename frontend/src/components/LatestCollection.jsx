import React, { useContext, useEffect, useState } from "react";
import Titles from "./Titles";
import { shopDataContext } from "../context/ShopContext";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

const LatestCollection = () => {
  const { products } = useContext(shopDataContext);
  const [latestProduct, setLatestProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLatestProduct(products.slice(0, 8));
  }, [products]);

  return (
    <div>
      <div className="max-w-[99vw] mx-auto px-6 text-center">
        {/* ===== Section Title ===== */}
        <div className="mb-10">
          <Titles text1="LATEST" text2="COLLECTIONS" />

          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto mt-3">
            Step into style with our brand new drops this year — bold designs,
            timeless comfort, and modern aesthetics crafted just for you.
          </p>
        </div>
        {/* ===== Product Grid ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-items-center">
          {latestProduct.length > 0 ? (
            latestProduct.map((item, index) => (
              <Card
                key={index}
                name={item.name}
                image={item.image1}
                id={item._id}
                price={item.price}
              />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 col-span-full mt-10">
              No products available.
            </p>
          )}
        </div>

        <div className="mt-14">
          <button
            className="px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-80 transition-all duration-300"
            onClick={() => navigate("/collection")}
          >
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;
