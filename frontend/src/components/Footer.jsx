import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row justify-between gap-8">
        {/* Branding */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-white">BotWears</h1>
          <p className="text-gray-400 max-w-xs">
            Providing high-quality services and updates. Stay connected with us
            through our newsletter and social media.
          </p>
          <div className="flex gap-4 mt-2">
            <p className="hover:text-white transition">
              <FaFacebookF />
            </p>
            <p className="hover:text-white transition">
              <FaTwitter />
            </p>
            <p className="hover:text-white transition">
              <FaInstagram />
            </p>
            <p className="hover:text-white transition">
              <FaLinkedinIn />
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-12">
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="flex flex-col gap-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="flex flex-col gap-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MyBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
