import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import { authDataContext } from "../context/AuthProvider";
import axios from "axios";
import { Trash2, PlusCircle, ListOrdered, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [list, setList] = useState([]);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/product/list`, {
        withCredentials: true,
      });
      console.log(result.data);
      setList(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/product/delete/${id}`,
        {},
        { withCredentials: true }
      );

      if (result.data) {
        fetchList();
      } else {
        console.log("Failed To remove Product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white flex">
      {/* Sidebar for desktop */}
      <div className="hidden md:block fixed top-0 left-0 h-screen w-64">
        <SideBar />
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64 w-full">
        <Nav />

        <div className="pt-24 px-6 pb-24 md:pb-10">
          <h1 className="text-2xl font-bold text-pink-400 mb-6 border-b border-gray-700 pb-2">
            All Listed Products
          </h1>

          {list?.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((item) => (
                <div
                  key={item._id}
                  className="relative bg-[#1a1a1a] rounded-2xl shadow-lg border border-gray-800 overflow-hidden hover:shadow-pink-900/40 transition-all duration-200"
                >
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-red-100/10 hover:bg-red-500/20 transition"
                    title="Delete Product"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>

                  {/* Image Section */}
                  <div className="w-full h-64 bg-gray-900 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image1}
                      alt={item.name}
                      className="object-contain w-full h-full"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-4 space-y-2">
                    <h2 className="text-lg font-semibold truncate">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {item.description || "No description available."}
                    </p>

                    <div className="flex justify-between items-center mt-3">
                      <span className="text-lg font-bold text-pink-400">
                        ₹{item.price || "N/A"}
                      </span>
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          item.bestseller
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-gray-700 text-gray-300"
                        }`}
                      >
                        {item.bestseller ? "Bestseller" : "Normal"}
                      </span>
                    </div>

                    <div className="text-sm text-gray-500">
                      Category: {item.category || "N/A"}
                    </div>
                    <div className="text-sm text-gray-500">
                      SubCategory: {item.subCategory || "N/A"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 mt-12">
              No Product Available
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navbar for small devices */}
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
          className="flex flex-col items-center text-pink-500 transition"
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

export default List;
