import React, { useState, useContext } from "react";
import Titles from "../components/Titles";
import CartTotal from "../components/CartTotal";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PlaceOrder() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("cod");
  const { cartItem, setCartItem, getCartAmount, deliveryFee, products } =
    useContext(shopDataContext);

  const { serverUrl } = useContext(authDataContext);

  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // const initPay = (order) => {
  //   const options = {
  //     // key:
  //     amount: order.amount,

  //     currency: order.currency,
  //     name: "Order Payment",
  //     description: "Order Payment",
  //     order_id: order.id,
  //     receipt: order.receipt,
  //     handler: async (response) => {
  //       console.log(response);

  //       const rzp = new window.Razorpay(options);
  //       rzp.open();
  //     },
  //   };
  // };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const productFound = products.find(
              (product) => product._id === items
            );

            if (productFound) {
              orderItems.push({
                productId: productFound._id,
                size: item,
                quantity: cartItem[items][item],
              });
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
      };

      switch (method) {
        case "cod":
          const result = await axios.post(
            serverUrl + "/api/order/placeorder",
            orderData,
            { withCredentials: true }
          );
          console.log(result.data);
          if (result.data) {
            setCartItem({});
            navigate("/order");
          } else {
            console.log(result.data.message);
          }

          break;

        // case "razorpay":
        //   const razorpayResult = await axios.post(
        //     serverUrl + "/api/order/razorpay",
        //     orderData,
        //     { withCredentials: true }
        //   );
        //   if (razorpayResult.data) {
        //     console.log(razorpayResult.data);
        //   }
        //   break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100 pt-28 pb-20 px-4 flex justify-center select-none">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SIDE — DELIVERY FORM */}
        <div className="lg:col-span-2 bg-gray-800/60 backdrop-blur-xl border border-gray-700 rounded-3xl p-10 shadow-xl">
          <Titles text1="Delivery" text2="Information" />

          {/* ❗ FORM FIXED HERE */}
          <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="First Name"
                className="w-full bg-gray-900 border border-gray-700 py-3 px-4 rounded-2xl focus:ring-2 focus:ring-blue-400"
                name="firstName"
                onChange={onChangeHandler}
                value={formData.firstName}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full bg-gray-900 border border-gray-700 py-3 px-4 rounded-2xl focus:ring-2 focus:ring-blue-400"
                name="lastName"
                onChange={onChangeHandler}
                value={formData.lastName}
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-gray-900 border border-gray-700 py-3 px-4 rounded-2xl focus:ring-2 focus:ring-blue-400"
              name="email"
              onChange={onChangeHandler}
              value={formData.email}
            />

            <input
              type="text"
              placeholder="Street"
              className="w-full bg-gray-900 border border-gray-700 py-3 px-4 rounded-2xl focus:ring-2 focus:ring-blue-400"
              name="street"
              onChange={onChangeHandler}
              value={formData.street}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="City"
                className="w-full bg-gray-900 border border-gray-700 py-3 px-4 rounded-2xl focus:ring-2 focus:ring-blue-400"
                name="city"
                onChange={onChangeHandler}
                value={formData.city}
              />
              <input
                type="text"
                placeholder="State"
                className="w-full bg-gray-900 border border-gray-700 py-3 px-4 rounded-2xl focus:ring-2 focus:ring-blue-400"
                name="state"
                onChange={onChangeHandler}
                value={formData.state}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Pincode"
                className="w-full bg-gray-900 border border-gray-700 py-3 px-4 rounded-2xl focus:ring-2 focus:ring-blue-400"
                name="pinCode"
                onChange={onChangeHandler}
                value={formData.pinCode}
              />
              <input
                type="text"
                placeholder="Country"
                className="w-full bg-gray-900 border border-gray-700 py-3 px-4 rounded-2xl focus:ring-2 focus:ring-blue-400"
                name="country"
                onChange={onChangeHandler}
                value={formData.country}
              />
            </div>

            <input
              type="text"
              placeholder="Phone"
              className="w-full bg-gray-900 border border-gray-700 py-3 px-4 rounded-2xl focus:ring-2 focus:ring-blue-400"
              name="phone"
              onChange={onChangeHandler}
              value={formData.phone}
            />

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold shadow-md transition">
              Place Order
            </button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-10">
          <div className="rounded-3xl overflow-hidden">
            <CartTotal />
          </div>

          <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700 rounded-3xl p-8 shadow-xl">
            <Titles text1="Payment" text2="Method" />

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* ❗ BUTTONS FIXED HERE */}
              <button
                type="button"
                onClick={() => setMethod("razorpay")}
                className={`w-full py-4 rounded-2xl bg-gray-900 border border-gray-700 text-gray-300 font-semibold transition ${
                  method === "razorpay"
                    ? "border-pink-300 text-pink-400 bg-blue-900/40 shadow"
                    : "hover:border-blue-500 hover:text-blue-500"
                }`}
              >
                RazorPay
              </button>

              <button
                type="button"
                onClick={() => setMethod("cod")}
                className={`w-full py-4 rounded-2xl bg-gray-900 border border-gray-700 text-gray-300 font-semibold transition ${
                  method === "cod"
                    ? "border-pink-300 text-pink-400 bg-blue-900/40 shadow"
                    : "hover:border-blue-500 hover:text-blue-500"
                }`}
              >
                Cash On Delivery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
