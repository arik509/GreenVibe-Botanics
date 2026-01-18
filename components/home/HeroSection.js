"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-linear-to-br from-gray-900 via-emerald-900 to-green-800">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=2070"
          alt="Fresh organic produce and wellness"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-emerald-900/95 via-green-900/90 to-emerald-800/85"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-emerald-500/30 to-green-500/30 backdrop-blur-md rounded-full mb-8 border border-emerald-400/40 shadow-lg"
              >
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-emerald-200 text-sm font-semibold tracking-wide">
                  100% Organic & Sustainable
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-6xl sm:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight"
              >
                <span className="text-white">Transform Your</span>
                <br />
                <span className="bg-linear-to-r from-emerald-300 via-green-300 to-emerald-400 bg-clip-text text-transparent">
                  Wellness Journey
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-xl sm:text-2xl text-emerald-100 mb-12 leading-relaxed max-w-3xl"
              >
                Experience the power of nature with our premium plant-based
                wellness collection.
                <span className="text-white font-medium">
                  {" "}
                  Sustainably sourced, ethically crafted, scientifically proven.
                </span>
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex flex-wrap gap-5 mb-16"
              >
                <Link
                  href="/items"
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-linear-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white text-lg font-bold rounded-xl transition-all duration-300 shadow-2xl hover:shadow-emerald-500/50 hover:scale-105"
                >
                  Explore Products
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
                </Link>
                <a
                  href="#mission"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white text-lg font-bold rounded-xl border-2 border-white/30 hover:border-white/50 transition-all duration-300"
                >
                  Our Mission
                </a>
              </motion.div>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6"
              >
                {[
                  {
                    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                    title: "Certified Organic",
                    desc: "USDA approved",
                  },
                  {
                    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                    title: "Carbon Neutral",
                    desc: "Zero emissions",
                  },
                  {
                    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                    title: "Wellness Focused",
                    desc: "Science-backed",
                  },
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + idx * 0.15 }}
                    className="flex items-start gap-4 bg-white/5 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/10 hover:bg-white/10 hover:border-emerald-400/40 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-linear-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={feature.icon}
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-emerald-200 text-sm">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.a
          href="#mission"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3 text-emerald-300 hover:text-emerald-200 transition-colors group"
        >
          <span className="text-sm font-medium tracking-wider uppercase">
            Discover More
          </span>
          <div className="w-6 h-10 border-2 border-emerald-300 rounded-full flex items-start justify-center p-2 group-hover:border-emerald-200">
            <div className="w-1.5 h-2 bg-emerald-300 rounded-full group-hover:bg-emerald-200"></div>
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
}
