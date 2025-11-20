import React, { useContext, useState } from "react";
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import UploadImg from "../assets/UploadImg.png";
import { PlusCircle, ListOrdered, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthProvider";
import axios from "axios";

const Add = () => {
  const navigate = useNavigate();

  // Image states
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // Product info states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("TopWears");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const { serverUrl } = useContext(authDataContext);

  // Add product handler
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const result = await axios.post(
        `${serverUrl}/api/product/addproduct`,
        formData,
        { withCredentials: true }
      );

      console.log(result.data);
      if (result.data) {
        setName("");
        setDescription("");
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setPrice("");
        setBestSeller(false);
        setCategory("Men");
        setSubCategory("TopWears");
        setSizes([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <form
            onSubmit={handleAddProduct}
            className="max-w-5xl mx-auto bg-[#1a1a1a] p-8 rounded-2xl shadow-lg border border-gray-800 space-y-6"
          >
            <h2 className="text-2xl font-bold text-center text-pink-400">
              Add Product
            </h2>

            {/* Upload Section */}
            <div>
              <p className="font-semibold mb-3 text-gray-300">Upload Images</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Image 1 */}
                <label
                  htmlFor="image1"
                  className="cursor-pointer border border-gray-700 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200"
                >
                  <img
                    src={image1 ? URL.createObjectURL(image1) : UploadImg}
                    alt="Preview"
                    className="w-full h-40 object-cover"
                  />
                  <input
                    type="file"
                    id="image1"
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage1(e.target.files[0])}
                  />
                </label>

                {/* Image 2 */}
                <label
                  htmlFor="image2"
                  className="cursor-pointer border border-gray-700 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200"
                >
                  <img
                    src={image2 ? URL.createObjectURL(image2) : UploadImg}
                    alt="Preview"
                    className="w-full h-40 object-cover"
                  />
                  <input
                    type="file"
                    id="image2"
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage2(e.target.files[0])}
                  />
                </label>

                {/* Image 3 */}
                <label
                  htmlFor="image3"
                  className="cursor-pointer border border-gray-700 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200"
                >
                  <img
                    src={image3 ? URL.createObjectURL(image3) : UploadImg}
                    alt="Preview"
                    className="w-full h-40 object-cover"
                  />
                  <input
                    type="file"
                    id="image3"
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage3(e.target.files[0])}
                  />
                </label>

                {/* Image 4 */}
                <label
                  htmlFor="image4"
                  className="cursor-pointer border border-gray-700 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200"
                >
                  <img
                    src={image4 ? URL.createObjectURL(image4) : UploadImg}
                    alt="Preview"
                    className="w-full h-40 object-cover"
                  />
                  <input
                    type="file"
                    id="image4"
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage4(e.target.files[0])}
                  />
                </label>
              </div>
            </div>

            {/* Product Name */}
            <div>
              <p className="font-semibold mb-2 text-gray-300">Product Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Type here"
                className="w-full bg-[#0f0f11] border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-pink-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <p className="font-semibold mb-2 text-gray-300">
                Product Description
              </p>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Type here"
                rows="4"
                className="w-full bg-[#0f0f11] border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-pink-500"
                required
              />
            </div>

            {/* Category & Subcategory */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-semibold mb-2 text-gray-300">
                  Product Category
                </p>
                <select
                  className="w-full bg-[#0f0f11] border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-pink-500"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="">Select Category</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                </select>
              </div>

              <div>
                <p className="font-semibold mb-2 text-gray-300">
                  Product Sub-Category
                </p>
                <select
                  className="w-full bg-[#0f0f11] border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-pink-500"
                  onChange={(e) => setSubCategory(e.target.value)}
                  value={subCategory}
                >
                  <option value="">Select Sub-Category</option>
                  <option value="top-wears">Top Wears</option>
                  <option value="bottom-wears">Bottom Wears</option>
                  <option value="winter-wears">Winter Wears</option>
                </select>
              </div>
            </div>

            {/* Price & Sizes */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-semibold mb-2 text-gray-300">
                  Product Price
                </p>
                <input
                  type="number"
                  placeholder="Enter price"
                  className="w-full bg-[#0f0f11] border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-pink-500"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                />
              </div>

              <div>
                <p className="font-semibold mb-2 text-gray-300">Sizes</p>
                <div className="flex flex-wrap gap-3">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <div
                      key={size}
                      onClick={() =>
                        setSizes((prev) =>
                          prev.includes(size)
                            ? prev.filter((item) => item !== size)
                            : [...prev, size]
                        )
                      }
                      className={`px-4 py-2 border rounded-lg cursor-pointer transition ${
                        sizes.includes(size)
                          ? "bg-pink-600 border-pink-500 text-white"
                          : "border-gray-600 text-gray-300 hover:border-pink-400 hover:text-pink-400"
                      }`}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Best Seller Checkbox */}
            <div className="mt-4 flex items-center gap-3">
              <input
                type="checkbox"
                id="bestseller"
                checked={bestseller}
                onChange={() => setBestSeller(!bestseller)}
                className="w-5 h-5 accent-pink-600 cursor-pointer"
              />
              <label
                htmlFor="bestseller"
                className="text-gray-300 cursor-pointer"
              >
                Mark as Best Seller
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 px-8 py-3 rounded-lg font-semibold transition"
              >
                Add Product
              </button>
            </div>
          </form>
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

export default Add;
