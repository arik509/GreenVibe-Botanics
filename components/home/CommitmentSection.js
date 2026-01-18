"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CommitmentSection() {
  const commitments = [
    {
      text: "Carbon-neutral shipping",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      text: "One order = One tree planted",
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      text: "100% recyclable packaging",
      icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    },
    {
      text: "Zero plastic policy",
      icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",
    },
  ];

  const stats = [
    {
      value: "15,842",
      label: "Trees Planted",
      sublabel: "Making forests grow",
      color: "from-emerald-500 to-green-500",
    },
    {
      value: "8,500kg",
      label: "Plastic Saved",
      sublabel: "Kept from oceans",
      color: "from-green-500 to-emerald-500",
    },
    {
      value: "28,300+",
      label: "Happy Customers",
      sublabel: "Join our family",
      color: "from-emerald-600 to-green-600",
    },
  ];

  return (
    <section className="py-28 bg-linear-to-b from-white to-emerald-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"></div>

      <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-block px-4 py-2 bg-linear-to-r from-emerald-100 to-green-100 rounded-full mb-6">
              <span className="text-emerald-700 font-bold text-sm">
                OUR COMMITMENT
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 leading-tight">
              Healing the
              <br />
              <span className="bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Planet Together
              </span>
            </h2>

            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Every purchase contributes to our mission of environmental
              restoration. We partner with leading conservation organizations to
              plant trees, eliminate plastic waste, and build a sustainable
              future.
            </p>

            {/* Commitment List */}
            <div className="space-y-5">
              {commitments.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-x-2 border border-emerald-100"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-linear-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
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
                        d={item.icon}
                      />
                    </svg>
                  </div>
                  <span className="text-lg font-semibold text-gray-800">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-10 group">
              <Image
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000"
                alt="Environmental sustainability"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-emerald-900/60 via-transparent to-transparent"></div>

              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
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
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-600">
                        Certified Carbon Neutral
                      </div>
                      <div className="text-lg font-bold text-emerald-600">
                        100% Offset Operations
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className={`bg-linear-to-br ${stat.color} rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300`}
                >
                  <div className="text-3xl font-extrabold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-white mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-emerald-50">{stat.sublabel}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
