"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function StatsSection() {
  const stats = [
    {
      value: "750+",
      label: "Premium Products",
      sublabel: "Carefully curated",
      icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
      color: "from-emerald-500 to-green-500",
    },
    {
      value: "32K+",
      label: "Happy Customers",
      sublabel: "Worldwide community",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      color: "from-green-500 to-emerald-500",
    },
    {
      value: "18K+",
      label: "Trees Planted",
      sublabel: "Growing every day",
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "from-emerald-600 to-green-600",
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=2070"
          alt="Organic products background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-emerald-600/95 via-green-600/95 to-emerald-500/95"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-20 w-80 h-80 bg-white rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"
        ></motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Impact By The Numbers
          </h2>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Every purchase creates positive change for people and planet
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: idx * 0.2,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-10 border-2 border-white/20 hover:border-white/40 transition-all duration-500 hover:bg-white/15 overflow-hidden">
                {/* linear Overlay */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                {/* Icon */}
                <motion.div
                  className="flex justify-center mb-8"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div
                    className={`w-20 h-20 bg-linear-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-emerald-500/50 transition-shadow duration-300`}
                  >
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={stat.icon}
                      />
                    </svg>
                  </div>
                </motion.div>

                {/* Value */}
                <motion.div
                  className="text-6xl md:text-7xl font-extrabold text-white mb-3 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 + 0.3 }}
                >
                  {stat.value}
                </motion.div>

                {/* Label */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">
                    {stat.label}
                  </div>
                  <div className="text-base text-emerald-100">
                    {stat.sublabel}
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all duration-500"></div>
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 + 0.5, type: "spring" }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-linear-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-xl"
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="inline-flex flex-col items-center gap-4 bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20">
            <svg
              className="w-12 h-12 text-emerald-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-white text-xl font-semibold max-w-md">
              Join our mission to create a healthier planet, one order at a time
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
