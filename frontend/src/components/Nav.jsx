import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  X,
  LogOut,
  Package,
  Phone,
  Home,
  Boxes,
} from "lucide-react";
import Logo from "../assets/logo.png";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { shopDataContext } from "../context/ShopContext";

const Nav = () => {
  const { getCurrentUser, userData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);

  const { showSearch, setShowSearch, search, setSearch, getCartCount } =
    useContext(shopDataContext);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      getCurrentUser();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Close profile popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* ===== Top Navbar (hidden on small screens) ===== */}
      <nav className=" md:block w-full fixed top-0 left-0 z-50 bg-[#0f0f11]/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 relative">
          {/* ===== Logo ===== */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={Logo}
              alt="E-Kart Logo"
              className="w-10 h-10 rounded-md shadow-md"
            />
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Bot-Wears
            </h1>
          </div>

          {/* ===== Nav Links ===== */}
          <ul className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
            {["Home", "Collection", "About", "Contact"].map((item) => (
              <li
                key={item}
                onClick={() =>
                  navigate(item === "Home" ? "/" : `/${item.toLowerCase()}`)
                }
                className="hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>

          {/* ===== Icons ===== */}
          <div className="flex items-center gap-5 text-gray-300 relative">
            {/* Search */}
            <button
              type="button"
              onClick={() => setShowSearch(!showSearch)}
              className="hover:text-pink-400 transition-colors duration-200"
              aria-label="Search"
            >
              {showSearch ? (
                <X className="w-6 h-6" />
              ) : (
                <Search
                  className="w-6 h-6"
                  onClick={() => navigate("/collection")}
                />
              )}
            </button>

            {/* Cart */}
            <button
              type="button"
              className=" hidden md:block  relative hover:text-pink-400 transition-colors duration-200"
              aria-label="Cart"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className=" w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {getCartCount()}
              </span>
            </button>

            {/* User */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setShowProfile(!showProfile)}
                className="hover:text-pink-400 transition-colors duration-200"
                aria-label="User"
              >
                {!userData ? (
                  <User className="w-6 h-6" />
                ) : (
                  <div className="w-[32px] h-[32px] capitalize rounded-full overflow-hidden border border-pink-500 shadow-md flex justify-center font-bold items-center text-white bg-pink-600">
                    {userData?.name?.slice(0, 1)}
                  </div>
                )}
              </button>

              {/* ===== Profile Popup ===== */}
              {showProfile && (
                <div className="absolute right-0 mt-3 w-56 bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-xl text-gray-300 py-2 animate-fade-in">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="font-semibold text-white">
                      {userData?.name || "Guest User"}
                    </p>
                    <p className="text-sm text-gray-400">
                      {userData?.email || "Not logged in"}
                    </p>
                  </div>

                  <ul className="py-2">
                    <li
                      onClick={() => {
                        navigate("/order");
                        setShowProfile(false);
                      }}
                      className="px-4 py-2 flex items-center gap-2 hover:bg-gray-800 cursor-pointer transition-colors"
                    >
                      <Package className="w-5 h-5" />
                      Orders
                    </li>

                    <li
                      onClick={() => {
                        navigate("/contact");
                        setShowProfile(false);
                      }}
                      className="px-4 py-2 flex items-center gap-2 hover:bg-gray-800 cursor-pointer transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      Contact
                    </li>

                    <li
                      onClick={() => {
                        handleLogout();
                        setShowProfile(false);
                      }}
                      className="px-4 py-2 flex items-center gap-2 hover:bg-gray-800 cursor-pointer transition-colors text-pink-400"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===== Search Bar ===== */}
        <div
          className={`w-full bg-[#1a1a1a] border-t border-gray-700 shadow-lg overflow-hidden transition-all duration-300 ${
            showSearch ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, brands, and more..."
              className="w-full bg-transparent outline-none text-white placeholder-gray-500 text-lg"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
        </div>
      </nav>

      {/* ===== Bottom Mobile Nav (visible only on small screens) ===== */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#0f0f11]/95 backdrop-blur-md border-t border-gray-800 text-gray-300 flex justify-around items-center py-3 z-50 shadow-lg">
        <button
          onClick={() => navigate("/")}
          className="flex flex-col items-center gap-1 text-sm hover:text-pink-400 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => navigate("/collection")}
          className="flex flex-col items-center gap-1 text-sm hover:text-pink-400 transition-colors"
        >
          <Boxes className="w-5 h-5" />
          <span>Collection</span>
        </button>

        <button
          onClick={() => navigate("/contact")}
          className="flex flex-col items-center gap-1 text-sm hover:text-pink-400 transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span>Contact</span>
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="relative flex flex-col items-center gap-1 text-sm hover:text-pink-400 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Cart</span>
          <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
            {getCartCount()}
          </span>
        </button>
      </div>
    </>
  );
};

export default Nav;
