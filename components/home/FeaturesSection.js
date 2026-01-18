"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      title: "100% Organic",
      desc: "Rigorously tested and certified organic by USDA. All products sourced from trusted regenerative farms committed to soil health.",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Eco-Friendly",
      desc: "Zero-waste packaging made from recycled materials. Carbon-neutral shipping on every single order. No plastic, ever.",
      image:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800",
      icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Wellness First",
      desc: "Formulated with science-backed ingredients proven to enhance vitality, immunity, and overall well-being for optimal health.",
      image:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      color: "from-emerald-600 to-green-600",
    },
  ];

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl transform -translate-y-1/2"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-green-100/40 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 bg-emerald-100 rounded-full mb-4">
            <span className="text-emerald-700 font-semibold text-sm">
              WHY CHOOSE US
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            The{" "}
            <span className="bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              GreenVibe
            </span>{" "}
            Difference
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just a wellness brand—we're a movement toward conscious,
            sustainable living
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.7 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-emerald-200">
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* linear Overlay */}
                  <div
                    className={`absolute inset-0 bg-linear-to-t ${feature.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}
                  ></div>

                  {/* Icon Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border-2 border-white/30 group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d={feature.icon}
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom linear for Text */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/60 to-transparent"></div>

                  {/* Title on Image */}
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-3xl font-extrabold text-white group-hover:translate-x-1 transition-transform duration-300">
                      {feature.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-gray-600 leading-relaxed text-base">
                    {feature.desc}
                  </p>

                  {/* Learn More Link */}
                  <div className="mt-6 flex items-center gap-2 text-emerald-600 font-bold group-hover:gap-3 transition-all duration-300">
                    <span>Discover More</span>
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
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-emerald-400/30 rounded-3xl transition-all duration-300 pointer-events-none"></div>
              </div>

              {/* Decorative Element */}
              <div
                className={`absolute -bottom-4 -right-4 w-24 h-24 bg-linear-to-br ${feature.color} rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-10`}
              ></div>
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
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-emerald-50 to-green-50 rounded-2xl border-2 border-emerald-200">
            <svg
              className="w-6 h-6 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-emerald-700 font-semibold">
              All products backed by our 30-day satisfaction guarantee
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
