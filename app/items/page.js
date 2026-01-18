"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.products);
        setCategories(data.categories);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading products:", error);
        setLoading(false);
      });
  }, []);

  const filteredItems = items
    .filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-linear-to-br from-emerald-50 to-green-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-4 border-emerald-500 border-t-transparent rounded-full"
        ></motion.div>
        <p className="mt-6 text-xl font-semibold text-gray-700">
          Loading premium products...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-emerald-50/30">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-emerald-600 via-green-600 to-emerald-500 text-white py-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
          ></motion.div>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
          ></motion.div>
        </div>

        <div className="relative z-10 max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-6"
          >
            <div className="inline-block w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center">
              <svg
                className="w-14 h-14 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-extrabold mb-6"
          >
            Our Premium Collection
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-emerald-50 max-w-3xl mx-auto"
          >
            Discover organic, plant-based wellness essentials crafted with care
            for you and the planet
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            {[
              {
                icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
                text: `${items.length}+ Products`,
              },
              {
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                text: "100% Organic",
              },
              {
                icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
                text: "Free Shipping $50+",
              },
            ].map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-5 py-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/30"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={badge.icon}
                  />
                </svg>
                <span className="font-semibold">{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-6 py-4 pl-14 rounded-2xl border-2 border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-gray-700 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-6 py-4 rounded-2xl border-2 border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-gray-700 font-medium bg-white"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory("All")}
            className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
              selectedCategory === "All"
                ? "bg-linear-to-r from-emerald-500 to-green-500 text-white shadow-xl"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-emerald-500"
            }`}
          >
            🌟 All Products
          </motion.button>
          {categories.map((cat) => (
            <motion.button
              key={cat.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
                selectedCategory === cat.name
                  ? "bg-linear-to-r from-emerald-500 to-green-500 text-white shadow-xl"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-emerald-500"
              }`}
            >
              {cat.icon} {cat.name}
            </motion.button>
          ))}
        </div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-10"
        >
          <p className="text-lg text-gray-600">
            Showing{" "}
            <span className="font-bold text-emerald-600 text-xl">
              {filteredItems.length}
            </span>{" "}
            premium products
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20 bg-white rounded-3xl shadow-xl"
            >
              <div className="text-7xl mb-6">🔍</div>
              <h3 className="text-3xl font-bold mb-3 text-gray-900">
                No products found
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                Try adjusting your search or filter
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-8 py-4 bg-linear-to-r from-emerald-500 to-green-500 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300"
              >
                Clear All Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  whileHover={{ y: -12 }}
                  className="group"
                >
                  <Link href={`/items/${item.id}`}>
                    <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-emerald-400 h-full flex flex-col">
                      {/* Image Container */}
                      <div className="relative h-64 bg-linear-to-br from-emerald-50 to-green-50 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* Stock Badge */}
                        <div className="absolute top-4 right-4">
                          {item.inStock ? (
                            <div className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-full text-xs font-bold shadow-lg">
                              <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              In Stock
                            </div>
                          ) : (
                            <div className="px-3 py-1.5 bg-red-500 text-white rounded-full text-xs font-bold shadow-lg">
                              Out of Stock
                            </div>
                          )}
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-emerald-700 rounded-full text-xs font-bold shadow-lg">
                            {item.category}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-grow flex flex-col">
                        <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                          {item.title}
                        </h2>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                          {item.description}
                        </p>

                        {/* Benefits */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.benefits.slice(0, 2).map((benefit, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold"
                            >
                              {benefit}
                            </span>
                          ))}
                          {item.benefits.length > 2 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                              +{item.benefits.length - 2} more
                            </span>
                          )}
                        </div>

                        {/* Price and Rating */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          <div className="text-3xl font-extrabold bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            ${item.price}
                          </div>
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 rounded-full">
                            <svg
                              className="w-4 h-4 text-yellow-500 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                            <span className="text-sm font-bold text-gray-900">
                              {item.rating}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({item.reviews})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect Border */}
                      <div className="absolute inset-0 border-4 border-transparent group-hover:border-emerald-400/30 rounded-3xl pointer-events-none transition-all duration-500"></div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
