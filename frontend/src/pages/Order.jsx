import React from "react";
import Titles from "../components/Titles";
import { useState } from "react";
import { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/authContext";
import axios from "axios";
import { useEffect } from "react";

const Order = () => {
  let [orderData, setOrderData] = useState([]);

  let { currency } = useContext(shopDataContext);
  let { serverUrl } = useContext(authDataContext);
  const { products } = useContext(shopDataContext);

  const loadOrderData = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/order/userorder",
        {},
        { withCredentials: true }
      );

      if (result.data) {
        let allOrdersItem = [];

        result.data.forEach((order) => {
          order.items.forEach((item) => {
            // 🔥 MATCH product info using productId
            const productInfo = products.find((p) => p._id === item.productId);

            if (!productInfo) return;

            allOrdersItem.push({
              ...item,
              image1: productInfo.image1,
              name: productInfo.name,
              price: productInfo.price,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);
  return (
    <div className="min-h-screen bg-gray-950 py-20 px-3 text-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="mb-4">
          <Titles text1="My" text2="Orders" />
        </div>

        {/* Orders */}
        <div className="space-y-4">
          {orderData.length === 0 ? (
            <p className="text-center text-gray-400 mt-10 text-lg">
              No orders found.
            </p>
          ) : (
            orderData.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 bg-gray-850 bg-opacity-50 border border-gray-800 rounded-2xl p-4 shadow-md hover:bg-gray-900 transition"
              >
                {/* Image */}
                <img
                  src={item.image1}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-700"
                />

                {/* Details */}
                <div className="flex flex-col justify-between flex-1">
                  {/* Name */}
                  <p className="text-lg font-semibold text-gray-200">
                    {item.name}
                  </p>

                  {/* Price, Qty, Size */}
                  <div className="flex gap-5 text-sm text-gray-300">
                    <p>
                      {currency}
                      {item.price}
                    </p>
                    <p>Qty: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>

                  {/* Date */}
                  <p className="text-gray-400 text-xs mt-1">
                    {new Date(item.date).toLocaleDateString()}
                  </p>

                  {/* Status Row */}
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`px-2 py-0.5 text-[10px] rounded-md border ${
                        item.status === "Delivered"
                          ? "bg-green-900/30 border-green-600 text-green-300"
                          : "bg-yellow-900/30 border-yellow-600 text-yellow-300"
                      }`}
                    >
                      {item.status}
                    </span>

                    <span className="px-2 py-0.5 text-[10px] rounded-md border bg-blue-900/30 border-blue-600 text-blue-300">
                      {item.paymentMethod}
                    </span>
                  </div>
                </div>

                {/* Re-load button */}
                <div className="flex items-center">
                  <button
                    onClick={loadOrderData}
                    className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-white shadow-md"
                  >
                    Track
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
