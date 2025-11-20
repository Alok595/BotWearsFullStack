import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import contactImg from "../assets/back4.jpeg";
import NewsletterBox from "../components/NewLetterBox";

const Contact = () => {
  return (
    <section className="min-h-screen w-full bg-gray-900 text-gray-200 flex flex-col justify-center px-6 py-20">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 flex-grow">
        {/* Left Side - Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={contactImg}
            alt="Contact Us"
            className="rounded-2xl shadow-2xl w-full max-w-lg h-auto object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Right Side - Contact Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-5xl font-extrabold mb-6 text-white">
            Get in <span className="text-blue-500">Touch</span>
          </h2>
          <p className="text-gray-400 mb-10 leading-relaxed text-lg">
            Have questions or want to work with us? Our team is here to help
            you. Reach out anytime — we’d love to hear from you and make
            something amazing together.
          </p>

          {/* Contact Details */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 bg-gray-800/70 p-5 rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all">
              <FaPhoneAlt className="text-blue-500 text-2xl" />
              <div>
                <h4 className="text-white font-semibold">Phone</h4>
                <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-800/70 p-5 rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all">
              <FaEnvelope className="text-blue-500 text-2xl" />
              <div>
                <h4 className="text-white font-semibold">Email</h4>
                <p className="text-gray-400 text-sm">info@yourcompany.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-800/70 p-5 rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all">
              <FaMapMarkerAlt className="text-blue-500 text-2xl" />
              <div>
                <h4 className="text-white font-semibold">Address</h4>
                <p className="text-gray-400 text-sm">
                  123 Innovation Street, San Francisco, CA
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold transition-all shadow-md hover:shadow-blue-500/30">
            Contact Us
          </button>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mt-16">
        <NewsletterBox />
      </div>
    </section>
  );
};

export default Contact;
