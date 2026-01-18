"use client";
import { motion } from "framer-motion";

export default function MissionSection({ storeInfo }) {
  const values = storeInfo?.values || [
    "Organic",
    "Sustainable",
    "Transparent",
    "Wellness-Focused",
  ];

  return (
    <section
      id="mission"
      className="py-28 bg-linear-to-b from-emerald-50 to-white relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-block px-4 py-2 bg-linear-to-r from-emerald-100 to-green-100 rounded-full mb-6">
            <span className="text-emerald-700 font-bold text-sm">
              OUR MISSION
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight">
            Transforming Health,
            <br />
            <span className="bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Restoring the Planet
            </span>
          </h2>

          {/* Mission Statement */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-12 max-w-4xl mx-auto"
          >
            {storeInfo?.mission ||
              "We believe in the transformative power of plants to heal both body and Earth. Every product we create is a testament to our commitment to sustainability, transparency, and the well-being of our global community."}
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-32 h-1 bg-linear-to-r from-emerald-500 to-green-500 mx-auto rounded-full mb-12"
          ></motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
              Our Core Values
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="group relative"
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-green-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>

                  {/* Value Pill */}
                  <div className="relative px-8 py-4 bg-linear-to-r from-emerald-500 to-green-500 text-white rounded-2xl text-base font-bold shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent group-hover:border-white">
                    {value}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Additional Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          >
            {[
              {
                icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
                title: "Global Impact",
                desc: "Serving conscious consumers in 45+ countries worldwide",
              },
              {
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                title: "Growing Community",
                desc: "25,000+ wellness advocates trust our products daily",
              },
              {
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Timeless Quality",
                desc: "Handcrafted with care, delivered with love since 2018",
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + idx * 0.15 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100 hover:border-emerald-300 group"
              >
                <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
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
                      d={card.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
