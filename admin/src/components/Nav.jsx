import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Home,
  Users,
  Package,
  BarChart2,
  Menu,
  X,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import Logo from "../assets/logo.png";
import axios from "axios";
import { adminDataContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthProvider";

const Nav = () => {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const { serverUrl } = useContext(authDataContext);

  const { getCurrentAdmin, adminData } = useContext(adminDataContext);
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(result.data);
      getCurrentAdmin();
      navigate("/login");
    } catch (error) {
      console.log(result);
    }
  };

  // Close profile popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* ===== Top Navbar ===== */}
      <nav className="fixed top-0 left-0 w-full bg-[#0f0f11]/95 backdrop-blur-md border-b border-gray-800 shadow-lg z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Left section */}
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src={Logo}
                alt="Admin Logo"
                className="w-10 h-10 rounded-md shadow-md"
              />
              <h1 className="text-2xl font-bold text-white tracking-wide">
                Admin Panel
              </h1>
            </div>
          </div>

          {/* Profile section */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-600 text-white font-semibold hover:opacity-90 transition"
            >
              A
            </button>

            {/* Profile dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-3 w-56 bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-xl text-gray-300 py-2 animate-fade-in">
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className="font-semibold text-white">{adminData.role}</p>
                  <p className="text-sm text-gray-400">{adminData.email}</p>
                </div>

                <ul className="py-2">
                  <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-800 cursor-pointer transition">
                    <Settings className="w-5 h-5" /> Settings
                  </li>
                  <li
                    onClick={logOut}
                    className="px-4 py-2 flex items-center gap-2 hover:bg-gray-800 cursor-pointer transition text-pink-400"
                  >
                    <LogOut className="w-5 h-5" /> Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
