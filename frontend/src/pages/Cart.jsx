import  { useContext, useState, useEffect } from "react";
import Titles from "../components/Titles";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import CartTotal from "../components/CartTotal";
import React from "react";


const Cart = () => {
  const { updateQuantity, cartItem, currency, products } =
    useContext(shopDataContext);

  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quanity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white pt-40 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <Titles text1="YOUR" text2="CART" />
          <p className="text-gray-400 mt-3 text-sm md:text-base">
            Review the items you've added to your bag.
          </p>
        </div>

        {/* Cart Items */}
        <div className="space-y-6">
          {cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            return (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#111] 
                border border-gray-700 rounded-2xl p-6 shadow-xl shadow-black/40"
              >
                {/* Product Image */}
                <div className="w-32 h-32 rounded-xl overflow-hidden border border-gray-700">
                  <img
                    src={productData.image1}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col gap-2">
                  <p className="text-lg font-semibold">{productData.name}</p>

                  <p className="text-gray-400 text-sm">
                    Size: <span className="text-gray-200">{item.size}</span>
                  </p>

                  <p className="text-pink-500 font-bold text-lg">
                    {currency}
                    {productData.price}
                  </p>
                </div>

                {/* Quantity + Delete */}
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min={1}
                    defaultValue={item.quanity}
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateQuantity(
                            item._id,
                            item.size,
                            Number(e.target.value)
                          )
                    }
                    className="w-20 px-3 py-2 bg-[#222] text-white border border-gray-700 
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />

                  <button
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="text-red-500 hover:text-red-600 text-xl transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}

          {cartData.length === 0 && (
            <p className="text-center text-gray-500 mt-10 text-lg">
              Your cart is empty.
            </p>
          )}
        </div>

        {/* Cart Total + Checkout Button */}
        <div className="mt-20 flex justify-end">
          <div className="w-full sm:w-[400px]">
            <CartTotal />

            <button
              onClick={() => {
                if (cartData.length > 0) {
                  navigate("/placeorder");
                } else {
                  console.log("Your Cart Is Empty!");
                }
              }}
              className="w-full mt-6 bg-pink-600 hover:bg-pink-700 transition py-3 rounded-lg 
              text-white font-semibold tracking-wider shadow-lg shadow-pink-900"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
