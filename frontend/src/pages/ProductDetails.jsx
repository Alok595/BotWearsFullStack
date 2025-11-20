import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import { FaStar } from "react-icons/fa";
import RelatedProduct from "../components/RelatedProduct";

const ProductDetails = () => {
  let { productId } = useParams();
  let { products, currency, getCartCount, addToCart, setCartItem, cartItem } =
    useContext(shopDataContext);
  let [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  const [size, setSize] = useState("");

  const fetchProductsData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage1(item.image1);
        setImage2(item.image2);
        setImage3(item.image3);
        setImage4(item.image4);
        setImage(item.image1);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductsData();
  }, [products, productId]);

  return (
    <>
      {productData ? (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#0b0f19] via-[#111827] to-[#0b0f19] text-gray-200 flex flex-col items-center gap-16 px-6 md:px-10 py-20">
          {/* Main Container */}
          <div className="flex flex-col lg:flex-row gap-12 w-full max-w-7xl justify-center">
            {/* Left Section - Product Images */}
            <div className="w-full lg:w-[45%] flex flex-col items-center bg-[#121a29]/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-800/60 p-8">
              {/* Thumbnail Selector */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {[image1, image2, image3, image4]
                  .filter(Boolean)
                  .map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="Thumbnail"
                      onClick={() => setImage(img)}
                      className={`w-24 h-24 object-cover rounded-xl border cursor-pointer transform transition-all duration-300 ${
                        image === img
                          ? "border-blue-500 scale-110 shadow-lg"
                          : "border-gray-700 hover:border-blue-400 hover:scale-105"
                      }`}
                    />
                  ))}
              </div>

              {/* Main Image */}
              <div className="relative w-full flex justify-center">
                <img
                  src={image}
                  alt={productData.name}
                  className="w-full max-w-md rounded-2xl object-cover shadow-2xl transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Add to Cart */}
              <div className="flex gap-4 mt-10 w-full justify-center">
                <button
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 text-white px-10 py-3 rounded-xl font-semibold shadow-md transition-all transform hover:scale-105"
                  onClick={() => addToCart(productData._id, size)}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Right Section - Product Details */}
            <div className="w-full lg:w-[55%] bg-[#121a29]/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-800/60 p-10">
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {productData.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-green-600 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
                  4.5 <FaStar className="text-yellow-300" />
                </span>
                <p className="text-gray-400 text-sm">
                  23,140 Ratings & 1,340 Reviews
                </p>
              </div>

              {/* Price */}
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                {currency} {productData.price}
              </div>

              {/* Description */}
              <p className="text-gray-400 mb-8 leading-relaxed">
                {productData.description ||
                  "Experience premium quality and unmatched style with our exclusive product range."}
              </p>

              {/* Size Selection */}
              {productData.sizes && (
                <div className="mb-10">
                  <h3 className="text-gray-300 font-semibold mb-3 text-lg">
                    Select Size
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    {productData.sizes.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setSize(s)}
                        className={`px-5 py-2 rounded-lg border font-medium transition-all duration-300 ${
                          size === s
                            ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                            : "border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Offers */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-3">
                  🎁 Special Offers
                </h3>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Get 10% off with selected credit cards</li>
                  <li>• Free shipping on orders above $50</li>
                  <li>• Earn reward points on every purchase</li>
                </ul>
              </div>

              {/* Delivery Info */}
              <div className="border-t border-gray-700 pt-5 mt-6 text-sm text-gray-400">
                <p>
                  Estimated Delivery:{" "}
                  <span className="font-semibold text-gray-200">
                    2 - 4 Business Days
                  </span>
                </p>
                <p className="text-gray-500 mt-1">
                  Free Delivery | 30-Day Return Policy
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section - Description / Reviews */}
          <div className="w-full max-w-7xl bg-[#121a29]/80 backdrop-blur-xl border border-gray-800/60 rounded-3xl p-10 shadow-2xl mt-6">
            <div className="flex gap-8 mb-6 border-b border-gray-700 pb-3 justify-center md:justify-start">
              <button className="text-blue-400 font-semibold border-b-2 border-blue-500 pb-1">
                Description
              </button>
              <button className="text-gray-400 hover:text-blue-400 transition">
                Reviews (124)
              </button>
            </div>

            <div className="text-gray-400 leading-relaxed text-sm md:text-base">
              <p className="mb-4">
                This product is crafted with premium materials ensuring comfort,
                durability, and a stylish edge. Its minimalist design makes it
                perfect for both daily wear and special occasions.
              </p>
              <p>
                Every detail — from the stitching to the finish — is refined for
                excellence. Join thousands of satisfied customers who trust our
                brand for quality and authenticity.
              </p>
            </div>
          </div>

          {/* Related Products */}
          <RelatedProduct
            category={productData.category}
            subCategory={productData.subCategory}
            currentProductId={productData._id}
          />
        </div>
      ) : (
        <div className="opacity-0"></div>
      )}
    </>
  );
};

export default ProductDetails;
