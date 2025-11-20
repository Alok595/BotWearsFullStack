import React from "react";
import { PlusCircle, ListOrdered, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-[#1a1a1a] border-r border-gray-800 flex flex-col py-6 shadow-lg">
      {/* Header */}
      <h2 className="text-white text-2xl font-bold text-center mb-8 tracking-wide">
        Admin Menu
      </h2>

      {/* Menu Buttons */}
      <div className="flex flex-col gap-3 px-4">
        <button
          onClick={() => navigate("/add")}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition"
        >
          <PlusCircle className="w-5 h-5 text-pink-500" />
          <span>Add Item</span>
        </button>

        <button
          onClick={() => navigate("/lists")}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition"
        >
          <ListOrdered className="w-5 h-5 text-pink-500" />
          <span>List Items</span>
        </button>

        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition"
        >
          <Package className="w-5 h-5 text-pink-500" />
          <span>View Orders</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
