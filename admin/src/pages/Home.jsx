import React from "react";
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import { PlusCircle, ListOrdered, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white flex">
      {/* Sidebar for desktop */}
      <div className="hidden md:block fixed top-0 left-0 h-screen w-64">
        <SideBar />
      </div>

      {/* Main Section */}
      <div className="flex-1 md:ml-64 w-full">
        <Nav />

        <div className="pt-24 px-6 pb-24 md:pb-10">
          {/* Header */}
          <h1 className="text-3xl font-bold text-pink-400 mb-6">
            Welcome to Your Admin Dashboard 💼
          </h1>
          <p className="text-gray-400 max-w-2xl mb-10">
            Manage your store efficiently — add new products, view all listings,
            and track customer orders — all from one place.
          </p>

          {/* Motivational Quotes Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800 shadow-md hover:border-pink-600 transition">
              <p className="italic text-gray-300">
                “Great things are done by a series of small things brought
                together.”
              </p>
              <p className="text-pink-400 text-sm mt-3 text-right">
                – Vincent van Gogh
              </p>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800 shadow-md hover:border-pink-600 transition">
              <p className="italic text-gray-300">
                “The secret of getting ahead is getting started.”
              </p>
              <p className="text-pink-400 text-sm mt-3 text-right">
                – Mark Twain
              </p>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800 shadow-md hover:border-pink-600 transition">
              <p className="italic text-gray-300">
                “Success is not the key to happiness. Happiness is the key to
                success.”
              </p>
              <p className="text-pink-400 text-sm mt-3 text-right">
                – Albert Schweitzer
              </p>
            </div>
          </div>

          {/* Explanation Cards for Add, List, Orders */}
          <h2 className="text-2xl font-semibold text-pink-400 mb-6">
            Quick Access
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add Product */}
            <div
              onClick={() => navigate("/add")}
              className="cursor-pointer bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800 shadow-md hover:border-pink-600 hover:scale-105 transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <PlusCircle className="w-8 h-8 text-pink-500" />
                <h3 className="text-lg font-semibold">Add Product</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Quickly add new items to your store with images, details, price,
                and category. Keep your catalog fresh and updated.
              </p>
            </div>

            {/* List Products */}
            <div
              onClick={() => navigate("/lists")}
              className="cursor-pointer bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800 shadow-md hover:border-pink-600 hover:scale-105 transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <ListOrdered className="w-8 h-8 text-pink-500" />
                <h3 className="text-lg font-semibold">List Products</h3>
              </div>
              <p className="text-gray-400 text-sm">
                View all products you’ve added — manage prices, categories,
                images, and quickly delete or update products as needed.
              </p>
            </div>

            {/* Orders */}
            <div
              onClick={() => navigate("/orders")}
              className="cursor-pointer bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800 shadow-md hover:border-pink-600 hover:scale-105 transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <Package className="w-8 h-8 text-pink-500" />
                <h3 className="text-lg font-semibold">Orders</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Track all customer orders in one place — check order details,
                statuses, and revenue at a glance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navbar for mobile */}
      <div className="fixed bottom-0 left-0 w-full bg-[#1a1a1a] border-t border-gray-800 flex justify-around py-3 md:hidden z-50">
        <button
          onClick={() => navigate("/add")}
          className="flex flex-col items-center text-gray-300 hover:text-pink-500 transition"
        >
          <PlusCircle className="w-6 h-6" />
          <span className="text-xs">Add</span>
        </button>

        <button
          onClick={() => navigate("/lists")}
          className="flex flex-col items-center text-gray-300 hover:text-pink-500 transition"
        >
          <ListOrdered className="w-6 h-6" />
          <span className="text-xs">List</span>
        </button>

        <button
          onClick={() => navigate("/orders")}
          className="flex flex-col items-center text-gray-300 hover:text-pink-500 transition"
        >
          <Package className="w-6 h-6" />
          <span className="text-xs">Orders</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
