import React, { useContext, useEffect, useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import { shopDataContext } from "../context/ShopContext";
import Card from "../components/Card";
import Titles from "../components/Titles";

const Collections = () => {
  const { products, search, showSearch } = useContext(shopDataContext);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [filterOpen, setFilterOpen] = useState(false);

  const categoriesList = ["men", "women", "kids"];
  const subCategoriesList = ["top-wears", "bottom-wears", "winter-wears"];
  const toggleCategory = (value) => {
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (value) => {
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    let filtered = [...products];

    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0)
      filtered = filtered.filter((p) => category.includes(p.category));
    if (subCategory.length > 0)
      filtered = filtered.filter((p) => subCategory.includes(p.subCategory));

    if (sortType === "low-high") filtered.sort((a, b) => a.price - b.price);
    else if (sortType === "high-low")
      filtered.sort((a, b) => b.price - a.price);

    setFilteredProducts(filtered);
  }, [category, subCategory, sortType, products, search, showSearch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row px-6 gap-10">
        {/* Desktop Sidebar */}
        <div className="hidden md:block md:w-64 md:sticky md:top-24 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 h-fit md:h-[560px]">
          <h2 className="text-lg font-semibold mb-6 text-center border-b pb-2 border-gray-300 dark:border-gray-600">
            Filters
          </h2>

          {/* Category */}
          <div className="mb-6">
            <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">
              Category
            </h3>
            <div className="flex flex-col gap-2">
              {categoriesList.map((cat) => (
                <label
                  key={cat}
                  className={`flex items-center gap-2 cursor-pointer text-sm transition-colors ${
                    category.includes(cat)
                      ? "text-white bg-pink-600 px-3 py-1 rounded-full"
                      : "text-gray-700 dark:text-gray-300 hover:text-pink-500"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="accent-pink-500"
                    checked={category.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Subcategory */}
          <div className="mb-6">
            <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">
              Subcategory
            </h3>
            <div className="flex flex-col gap-2">
              {subCategoriesList.map((sub) => (
                <label
                  key={sub}
                  className={`flex items-center gap-2 cursor-pointer text-sm transition-colors ${
                    subCategory.includes(sub)
                      ? "text-white bg-pink-500 px-3 py-1 rounded-full"
                      : "text-gray-700 dark:text-gray-300 hover:text-pink-500"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="accent-pink-500"
                    checked={subCategory.includes(sub)}
                    onChange={() => toggleSubCategory(sub)}
                  />
                  {sub}
                </label>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">
              Sort By
            </h3>
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="w-full bg-transparent border border-gray-400 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500 dark:text-gray-200"
            >
              <option value="relevant">Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <button
          className="fixed top-20 left-4 z-50 bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-pink-600 transition md:hidden"
          onClick={() => setFilterOpen(true)}
        >
          <FaFilter className="text-sm" />
        </button>

        {/* Mobile Filter Drawer */}
        {filterOpen && (
          <div className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 z-50 p-6 shadow-lg border-b border-gray-300 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setFilterOpen(false)}>
                <FaTimes />
              </button>
            </div>

            {/* Category */}
            <div className="mb-4">
              <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">
                Category
              </h3>
              <div className="flex flex-col gap-2">
                {categoriesList.map((cat) => (
                  <label
                    key={cat}
                    className={`flex items-center gap-2 cursor-pointer text-sm transition-colors ${
                      category.includes(cat)
                        ? "text-white bg-pink-600 px-3 py-1 rounded-full"
                        : "text-gray-700 dark:text-gray-300 hover:text-pink-500"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="accent-pink-500"
                      checked={category.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Subcategory */}
            <div className="mb-4">
              <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">
                Subcategory
              </h3>
              <div className="flex flex-col gap-2">
                {subCategoriesList.map((sub) => (
                  <label
                    key={sub}
                    className={`flex items-center gap-2 cursor-pointer text-sm transition-colors ${
                      subCategory.includes(sub)
                        ? "text-white bg-pink-500 px-3 py-1 rounded-full"
                        : "text-gray-700 dark:text-gray-300 hover:text-pink-500"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="accent-pink-500"
                      checked={subCategory.includes(sub)}
                      onChange={() => toggleSubCategory(sub)}
                    />
                    {sub}
                  </label>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">
                Sort By
              </h3>
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="w-full bg-transparent border border-gray-400 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500 dark:text-gray-200"
              >
                <option value="relevant">Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          <div className="text-center mb-10">
            <Titles text1="OUR" text2="COLLECTIONS" />
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-3 text-sm md:text-base">
              Discover premium fashion pieces crafted for comfort, style, and
              confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 justify-items-center">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <Card
                  key={item._id}
                  name={item.name}
                  image={item.image1}
                  id={item._id}
                  price={item.price}
                />
              ))
            ) : (
              <p className="col-span-full text-gray-500 dark:text-gray-400 mt-10 text-center">
                No products found for this filter.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
