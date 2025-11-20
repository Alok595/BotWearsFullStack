import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import { authDataContext } from "../context/AuthProvider";
import axios from "axios";
import { Package, ListOrdered, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/order/list",
        {},
        { withCredentials: true }
      );
      setOrders(result.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(
        serverUrl + "/api/order/status",
        { orderId, status: e.target.value },
        { withCredentials: true }
      );
      if (result.data) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white flex">
      {/* Sidebar */}
      <div className="hidden md:block fixed top-0 left-0 h-screen w-64">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 w-full">
        <Nav />

        <div className="pt-24 px-6 pb-24 md:pb-10">
          <h1 className="text-2xl font-bold text-pink-400 mb-6 border-b border-gray-700 pb-2">
            All Orders List
          </h1>

          {/* Orders List */}
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-5 shadow-lg hover:shadow-pink-900/40 transition-all"
              >
                {/* ITEMS */}
                <div className="mb-4">
                  <h2 className="font-semibold text-lg text-pink-400 mb-2">
                    Items
                  </h2>

                  <div className="text-gray-300 space-y-1">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="text-sm">
                        {item.name} × {item.quantity}{" "}
                        <span className="text-gray-400 ml-1">
                          ({item.size})
                        </span>
                        {idx !== order.items.length - 1 && ","}
                      </p>
                    ))}
                  </div>
                </div>

                {/* ADDRESS */}
                <div className="mb-4">
                  <h2 className="font-semibold text-lg text-pink-400 mb-2">
                    Delivery Address
                  </h2>

                  <div className="text-gray-300 text-sm leading-relaxed">
                    <p>{order.address.firstName},</p>
                    <p>{order.address.street},</p>
                    <p>
                      {order.address.city}, {order.address.state},{" "}
                      {order.address.country}, {order.address.pincode}
                    </p>
                  </div>
                </div>

                {/* ORDER DETAILS */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-sm text-gray-300">
                  <p>
                    <span className="font-semibold">Items:</span>{" "}
                    {order.items.length}
                  </p>
                  <p>
                    <span className="font-semibold">Method:</span>{" "}
                    {order.paymentMethod}
                  </p>
                  <p>
                    <span className="font-semibold">Payment:</span>{" "}
                    {order.payment ? "Done" : "Pending"}
                  </p>
                  <p>
                    <span className="font-semibold">Amount:</span> ₹
                    {order.amount}
                  </p>
                </div>

                {/* STATUS DROPDOWN */}
                <div className="mt-5">
                  <select
                    value={order.status}
                    className="w-full bg-[#0f0f11] border border-gray-700 text-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-pink-500"
                    onChange={(e) => statusHandler(e, order._id)}
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out Of Delivery">Out Of Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation (Mobile Only) */}
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
          className="flex flex-col items-center text-pink-500 transition"
        >
          <Package className="w-6 h-6" />
          <span className="text-xs">Orders</span>
        </button>
      </div>
    </div>
  );
};

export default Order;
