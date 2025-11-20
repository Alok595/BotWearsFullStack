import React from "react";
import { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import Titles from "./Titles";

const CartTotal = () => {
  const { currency, getCartAmount, deliveryFee } = useContext(shopDataContext);

  return (
    <div className="w-full max-w-md bg-[#0d0d0d] text-white border border-gray-700 rounded-2xl p-6 shadow-lg shadow-black/40">
      {/* Title */}
      <div className="mb-6">
        <Titles text1={"CART"} text2={"TOTALS"} />
      </div>

      {/* Totals Section */}
      <div className="space-y-5">
        {/* SubTotal */}
        <div className="flex justify-between text-gray-300 text-sm">
          <p>Subtotal</p>
          <p className="font-semibold text-gray-100">
            {currency} {getCartAmount()}.00
          </p>
        </div>

        <hr className="border-gray-700" />

        {/* Shipping Fee */}
        <div className="flex justify-between text-gray-300 text-sm">
          <p>Shipping Fee</p>
          <p className="font-semibold text-gray-100">
            {currency} {deliveryFee}
          </p>
        </div>

        <hr className="border-gray-700" />

        {/* Total */}
        <div className="flex justify-between text-lg">
          <b className="text-gray-200">Total</b>
          <b className="text-pink-500">
            {currency}{" "}
            {getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
