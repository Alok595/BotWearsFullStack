import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useContext } from "react";
import { authDataContext } from "../context/authContext";
import { auth, provider } from "../../utils/Firebase";
import { signInWithPopup } from "firebase/auth";
import { userDataContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  let { getCurrentUser } = useContext(userDataContext);

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      getCurrentUser();
      navigate("/");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      const result = await axios.post(
        serverUrl + "/api/auth/googlelogin",
        {
          name,
          email,
        },
        { withCredentials: true }
      );
      getCurrentUser();
      navigate("/");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 p-6">
      <div className="bg-gray-900/70 backdrop-blur-xl border border-gray-700 shadow-2xl rounded-2xl p-8 w-full max-w-sm">
        {/* Logo */}
        <div
          className="flex justify-center mb-6 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="Logo" className="w-14 h-14 opacity-90" />
        </div>

        <h2 className="text-xl font-semibold text-white text-center mb-1">
          Welcome Back
        </h2>
        <h3 className="text-2xl font-semibold text-white text-center mb-4">
          Log In to Your Account
        </h3>
        <p className="text-sm text-gray-400 text-center mb-6">
          Access your personalized E-Kart experience
        </p>

        <form onSubmit={handleLogIn} className="space-y-5">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          {/* Password field with show/hide toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/20"
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 mt-6 mb-4">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium py-3 rounded-xl transition-all duration-300 border border-gray-700"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
