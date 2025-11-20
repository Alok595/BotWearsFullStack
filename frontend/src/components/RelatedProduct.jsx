import React, { useContext, useEffect, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import Titles from "./Titles";
import Card from "./Card";

const RelatedProduct = ({ category, subCategory, currentProductId }) => {
  let { products } = useContext(shopDataContext);

  let [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();
      productCopy = productCopy.filter((item) => category === item.category);
      productCopy = productCopy.filter(
        (item) => subCategory === item.subCategory
      );
      productCopy = productCopy.filter((item) => item._id !== currentProductId);
      setRelated(productCopy.slice(0, 4));
    }
  }, [products, category, subCategory, currentProductId]);

  return (
    <div className="bg-[#0b0f19] text-gray-200 py-16 px-6 lg:px-20">
      {/* Section Title */}
      <div className="text-center mb-10">
        <Titles text1={"Related"} text2={"Products"} />
        <p className="text-gray-400 text-sm mt-2">
          Discover more items you might love.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {related.length > 0 ? (
          related.map((item, index) => (
            <div
              key={index}
              className="transform hover:-translate-y-2 transition-all duration-300"
            >
              <Card
                id={item._id}
                name={item.name}
                image={item.image1}
                price={item.price}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No related products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default RelatedProduct;
