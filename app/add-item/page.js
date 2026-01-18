"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AddItemPage() {
  const { data: session } = useSession();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    benefits: "",
    rating: 4.5,
    reviews: 0,
    inStock: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((err) => console.error("Error loading categories:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const benefitsArray = formData.benefits
      .split(",")
      .map((b) => b.trim())
      .filter((b) => b);

    const productData = {
      ...formData,
      benefits: benefitsArray,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews),
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("New Product:", productData);

      toast.success("Product added successfully! 🌿", {
        duration: 4000,
        style: {
          background: "#10b981",
          color: "#fff",
        },
      });

      setTimeout(() => {
        router.push("/items");
      }, 2000);
    } catch (error) {
      toast.error("Failed to add product. Please try again.", {
        style: {
          background: "#ef4444",
          color: "#fff",
        },
      });
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-emerald-50/30 to-green-50/30 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Badge */}
        {session?.user && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-4 p-5 bg-linear-to-r from-emerald-500 to-green-500 rounded-2xl shadow-xl text-white"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="font-bold text-lg">Logged in as</p>
              <p className="text-emerald-50">
                {session.user.name || session.user.email}
              </p>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 bg-linear-to-br from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl">
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </motion.div>
          <h1 className="text-6xl font-extrabold mb-4">
            <span className="bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Add New Product
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Share amazing plant-based products with our community
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-10 border-2 border-emerald-100"
        >
          <div className="space-y-8">
            {/* Product Title */}
            <div>
              <label className="flex items-center justify-between text-sm font-bold text-gray-700 mb-3">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Product Title
                </span>
                <span className="text-red-500">* Required</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g., Organic Spirulina Powder"
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-gray-700 text-lg"
                required
                value={formData.title}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center justify-between text-sm font-bold text-gray-700 mb-3">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Description
                </span>
                <span className="text-red-500">* Required</span>
              </label>
              <textarea
                name="description"
                placeholder="Provide a detailed product description including features, uses, and what makes it special..."
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-gray-700 h-40 resize-none"
                required
                value={formData.description}
                onChange={handleChange}
                disabled={isSubmitting}
              ></textarea>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>Min. 50 characters</span>
                <span
                  className={
                    formData.description.length >= 50
                      ? "text-emerald-600 font-semibold"
                      : ""
                  }
                >
                  {formData.description.length} characters
                </span>
              </div>
            </div>

            {/* Price and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center justify-between text-sm font-bold text-gray-700 mb-3">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Price (USD)
                  </span>
                  <span className="text-red-500">* Required</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    min="0"
                    placeholder="29.99"
                    className="w-full pl-10 pr-6 py-4 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-gray-700 text-lg"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center justify-between text-sm font-bold text-gray-700 mb-3">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Category
                  </span>
                  <span className="text-red-500">* Required</span>
                </label>
                <select
                  name="category"
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-gray-700 text-lg bg-white"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="flex items-center justify-between text-sm font-bold text-gray-700 mb-3">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Image URL
                </span>
                <span className="text-red-500">* Required</span>
              </label>
              <input
                type="url"
                name="image"
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-gray-700"
                required
                value={formData.image}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <p className="mt-2 text-sm text-gray-600">
                💡 Tip: Use{" "}
                <a
                  href="https://unsplash.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 font-semibold hover:underline"
                >
                  Unsplash
                </a>{" "}
                for free high-quality images
              </p>
              {formData.image && (
                <div className="mt-4 p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-200">
                  <p className="text-sm font-semibold text-emerald-700 mb-3">
                    Image Preview:
                  </p>
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                    onError={(e) => {
                      e.target.style.display = "none";
                      toast.error("Invalid image URL");
                    }}
                  />
                </div>
              )}
            </div>

            {/* Benefits */}
            <div>
              <label className="flex items-center justify-between text-sm font-bold text-gray-700 mb-3">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Product Benefits
                </span>
                <span className="text-red-500">* Required</span>
              </label>
              <input
                type="text"
                name="benefits"
                placeholder="Energy Boost, Rich in Antioxidants, Organic, Vegan"
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-gray-700"
                required
                value={formData.benefits}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <p className="mt-2 text-sm text-gray-600">
                Separate multiple benefits with commas
              </p>
            </div>

            {/* Rating and Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Initial Rating
                </label>
                <input
                  type="number"
                  name="rating"
                  step="0.1"
                  min="0"
                  max="5"
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-gray-700"
                  value={formData.rating}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <p className="mt-2 text-sm text-gray-600">0.0 to 5.0</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Reviews Count
                </label>
                <input
                  type="number"
                  name="reviews"
                  min="0"
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-gray-700"
                  value={formData.reviews}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* In Stock Checkbox */}
            <div className="p-6 bg-linear-to-r from-emerald-50 to-green-50 rounded-2xl border-2 border-emerald-200">
              <label className="flex items-start gap-4 cursor-pointer">
                <input
                  type="checkbox"
                  name="inStock"
                  className="w-6 h-6 mt-1 text-emerald-600 bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-emerald-100 cursor-pointer"
                  checked={formData.inStock}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <div>
                  <span className="text-lg font-bold text-gray-900 block mb-1">
                    Product is in stock
                  </span>
                  <p className="text-sm text-gray-600">
                    Check this if the product is available for immediate
                    purchase
                  </p>
                </div>
              </label>
            </div>

            {/* Divider */}
            <div className="h-px bg-linear-to-r from-transparent via-emerald-300 to-transparent"></div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full px-8 py-5 bg-linear-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Adding Product...
                </>
              ) : (
                <>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Product to Store
                </>
              )}
            </button>

            {/* Cancel Link */}
            <div className="text-center">
              <Link
                href="/items"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-semibold transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Cancel and go back
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
