import React, { useState } from "react";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      // API call can go here
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[60%] mx-auto p-8 rounded-2xl shadow-xl text-white text-center flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold">Subscribe to our Newsletter</h2>
      <p className="text-gray-400">
        Get the latest updates, news, and offers directly in your inbox.
      </p>

      {submitted ? (
        <p className="text-green-400 font-semibold mt-2">
          Thank you for subscribing!
        </p>
      ) : (
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              required
              className="peer w-full p-4 rounded-lg border-2 border-gray-700 bg-gray-800 placeholder-transparent text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
            />
            <label className="absolute left-4 top-4 text-gray-400 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-blue-400 peer-focus:text-sm transition-all">
              Enter your email
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Subscribe
          </button>
        </div>
      )}
    </form>
  );
};

export default NewsletterBox;
