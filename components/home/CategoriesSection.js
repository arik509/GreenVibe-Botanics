"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CategoriesSection() {
  const categories = [
    {
      name: "Superfoods",
      description: "Nutrient-dense powerhouses",
      image:
        "https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=600",
      color: "from-emerald-600 to-green-600",
    },
    {
      name: "Wellness",
      description: "Daily health essentials",
      image:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=600",
      color: "from-green-600 to-emerald-600",
    },
    {
      name: "Sustainable",
      description: "Eco-friendly choices",
      image:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=600",
      color: "from-emerald-500 to-green-500",
    },
    {
      name: "Herbal Teas",
      description: "Soothing natural blends",
      image:
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=600",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-28 bg-linear-to-b from-white to-emerald-50/30 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-emerald-100 rounded-full mb-4">
            <span className="text-emerald-700 font-semibold text-sm">
              EXPLORE COLLECTIONS
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Shop by{" "}
            <span className="bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of premium plant-based wellness
            products
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group"
            >
              <Link href="/items" className="block">
                <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                  {/* Image */}
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* linear Overlay */}
                  <div
                    className={`absolute inset-0 bg-linear-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}
                  ></div>

                  {/* Animated Border */}
                  <div className="absolute inset-0 border-4 border-white/20 rounded-3xl group-hover:border-white/40 transition-all duration-300"></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.3 }}
                    >
                      <h3 className="text-3xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">
                        {category.name}
                      </h3>
                      <p className="text-emerald-50 text-sm font-medium mb-4">
                        {category.description}
                      </p>

                      {/* Arrow Button */}
                      <div className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all duration-300">
                        <span>Explore</span>
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                    </motion.div>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
