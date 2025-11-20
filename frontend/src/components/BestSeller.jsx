import React, { useContext, useEffect, useState } from "react";
import Titles from "./Titles";
import { shopDataContext } from "../context/ShopContext";
import Card from "./Card";

const BestSeller = () => {
  const { products } = useContext(shopDataContext);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);

  useEffect(() => {
    // Filter out products marked as bestseller
    const filtered = products.filter((item) => item.bestseller === true);
    setBestSellerProducts(filtered.slice(0, 8)); // limit to 8
  }, [products]);

  return (
    <div className="py-20">
      <div className=" mx-auto px-6 text-center">
        {/* ===== Section Title ===== */}
        <div className="mb-10">
          <Titles text1="BEST" text2="SELLERS" />
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto mt-3">
            Discover the crowd favorites — these best-selling pieces are loved
            for their style, quality, and comfort. Don’t miss out!
          </p>
        </div>

        {/* ===== Product Grid ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-items-center">
          {bestSellerProducts.length > 0 ? (
            bestSellerProducts.map((item, index) => (
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
              No best sellers available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
