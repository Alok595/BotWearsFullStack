import React from "react";
import {
  FaUndo,
  FaShippingFast,
  FaUserShield,
  FaCreditCard,
} from "react-icons/fa";
import Titles from "../components/Titles";

const policies = [
  {
    title: "Return Policy",
    description:
      "You can return any product within 15 days of delivery. Products must be unused and in original packaging for a full refund.",
    icon: <FaUndo size={30} className="text-blue-500" />,
  },
  {
    title: "Shipping Policy",
    description:
      "We offer free standard shipping on orders above ₹999. Orders are processed within 1-2 business days.",
    icon: <FaShippingFast size={30} className="text-green-500" />,
  },
  {
    title: "Privacy Policy",
    description:
      "We respect your privacy and ensure your personal information is safe. We do not share your data with third parties.",
    icon: <FaUserShield size={30} className="text-purple-500" />,
  },
  {
    title: "Payment Policy",
    description:
      "We accept all major credit/debit cards, UPI, and net banking. Payments are secure and encrypted.",
    icon: <FaCreditCard size={30} className="text-yellow-500" />,
  },
];

const OurPolicy = () => {
  return (
    <div className="   text-gray-900 dark:text-gray-100  px-6 ">
      {/* Header */}
      <div className="text-center mb-12">
        <Titles text1="OUR" text2="POLICIES" />
        <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
          Learn about our policies to ensure a smooth shopping experience for
          all our customers.
        </p>
      </div>

      {/* Horizontal Policy Sections */}
      <div className="flex flex-wrap justify-center gap-8">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700 transition hover:shadow-lg max-w-xs text-center"
          >
            <div className="mb-4">{policy.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{policy.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {policy.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPolicy;
