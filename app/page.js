'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Home() {
  const [storeInfo, setStoreInfo] = useState(null);

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => setStoreInfo(data.storeInfo))
      .catch(err => console.error('Error loading store info:', err));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero min-h-screen bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 text-6xl animate-bounce">🌿</div>
          <div className="absolute top-40 right-20 text-5xl animate-pulse">🍃</div>
          <div className="absolute bottom-40 left-1/4 text-4xl animate-bounce delay-100">🌱</div>
          <div className="absolute bottom-20 right-1/3 text-5xl animate-pulse delay-200">🌾</div>
        </div>
        
        <div className="hero-content text-center text-white relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.div 
              className="text-8xl mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              🌿
            </motion.div>
            <h1 className="text-6xl md:text-7xl font-bold mb-4 drop-shadow-lg">
              GreenVibe Botanics
            </h1>
            <p className="text-2xl md:text-3xl mb-2 font-light">
              Nourish Your Body, Nurture the Planet
            </p>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Discover premium plant-based wellness products that are good for you and the Earth
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/items" className="btn btn-accent btn-lg gap-2 hover:scale-105 transition-transform">
                🛍️ Shop Now
              </Link>
              <a href="#mission" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-green-600 hover:scale-105 transition-transform">
                Learn More
              </a>
            </div>
            <div className="flex gap-4 justify-center mt-8 flex-wrap">
              <div className="badge badge-lg bg-white/20 text-white border-white/30 backdrop-blur-sm">✓ 100% Organic</div>
              <div className="badge badge-lg bg-white/20 text-white border-white/30 backdrop-blur-sm">✓ Eco-Friendly</div>
              <div className="badge badge-lg bg-white/20 text-white border-white/30 backdrop-blur-sm">✓ Sustainable</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 bg-base-100">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-5xl mb-6">💚</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {storeInfo?.mission || "We believe in the power of plants to transform health and the planet. Every product is carefully sourced from ethical suppliers committed to sustainability."}
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              {(storeInfo?.values || ['Organic', 'Sustainable', 'Transparent', 'Wellness-Focused']).map((value, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  className="badge badge-primary badge-lg p-4 text-base"
                >
                  {value}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Why Choose GreenVibe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: '100% Organic', desc: 'All products are certified organic and sustainably sourced from trusted farmers', icon: '🌱' },
              { title: 'Eco-Friendly', desc: 'Zero-waste packaging and carbon-neutral shipping on every order', icon: '♻️' },
              { title: 'Wellness First', desc: 'Science-backed products formulated for optimal health and vitality', icon: '💚' }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="card-body items-center text-center">
                  <div className="text-7xl mb-4">{feature.icon}</div>
                  <h3 className="card-title text-2xl mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="stats stats-vertical lg:stats-horizontal shadow-2xl w-full bg-white">
              <div className="stat place-items-center hover:bg-green-50 transition-colors">
                <div className="stat-figure text-5xl">🛍️</div>
                <div className="stat-title font-semibold">Organic Products</div>
                <div className="stat-value text-green-600">500+</div>
                <div className="stat-desc">Carefully curated selection</div>
              </div>
              <div className="stat place-items-center hover:bg-green-50 transition-colors">
                <div className="stat-figure text-5xl">😊</div>
                <div className="stat-title font-semibold">Happy Customers</div>
                <div className="stat-value text-green-600">25K+</div>
                <div className="stat-desc">Worldwide community</div>
              </div>
              <div className="stat place-items-center hover:bg-green-50 transition-colors">
                <div className="stat-figure text-5xl">🌳</div>
                <div className="stat-title font-semibold">Trees Planted</div>
                <div className="stat-value text-green-600">10K+</div>
                <div className="stat-desc">With every purchase</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Superfoods', icon: '🌿', color: 'from-green-400 to-emerald-500' },
              { name: 'Wellness', icon: '💊', color: 'from-blue-400 to-cyan-500' },
              { name: 'Sustainable', icon: '♻️', color: 'from-teal-400 to-green-500' },
              { name: 'Herbal Teas', icon: '🍵', color: 'from-amber-400 to-orange-500' }
            ].map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.08, rotate: 2 }}
              >
                <Link href="/items">
                  <div className={`card bg-gradient-to-br ${category.color} text-white shadow-xl cursor-pointer h-full`}>
                    <div className="card-body items-center text-center justify-center">
                      <div className="text-5xl md:text-6xl mb-2">{category.icon}</div>
                      <h3 className="card-title text-lg md:text-xl">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Customer Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Maya Johnson', review: 'The moringa powder has transformed my morning routine! I feel more energized and healthy.', rating: 5, product: 'Moringa Powder', avatar: '👩' },
              { name: 'David Chen', review: 'Love the eco-friendly packaging and quality products. Finally a store that cares!', rating: 5, product: 'Bamboo Toothbrush', avatar: '👨' },
              { name: 'Aisha Patel', review: 'The herbal tea collection is amazing. Perfect for my evening relaxation ritual.', rating: 5, product: 'Herbal Tea Box', avatar: '👩‍🦱' }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -5 }}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold text-lg">{testimonial.name}</div>
                      <div className="rating rating-sm">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <input key={i} type="radio" className="mask mask-star-2 bg-yellow-500" checked readOnly />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.review}"</p>
                  <div className="divider my-2"></div>
                  <div className="badge badge-outline badge-lg">{testimonial.product}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-green-400 to-emerald-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl">📧</div>
          <div className="absolute bottom-10 right-10 text-9xl">💌</div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-6">📬</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Wellness Community</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get exclusive deals, wellness tips, and sustainable living guides delivered to your inbox
            </p>
            <div className="form-control max-w-md mx-auto">
              <div className="input-group flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="input input-bordered w-full text-gray-800" 
                />
                <button className="btn btn-accent">Subscribe</button>
              </div>
            </div>
            <p className="text-sm mt-6 opacity-90">
              🎁 Get <span className="font-bold">15% off</span> your first order when you subscribe
            </p>
          </motion.div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl mb-4">🌍</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Planet Commitment</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                For every order placed, we plant a tree through our partnership with environmental organizations. 
                We're committed to carbon-neutral shipping and plastic-free packaging.
              </p>
              <ul className="space-y-4">
                {[
                  '🌍 Carbon-neutral shipping',
                  '🌳 One order = One tree planted',
                  '📦 100% recyclable packaging',
                  '♻️ Zero plastic policy'
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-lg"
                  >
                    <span className="text-2xl">{item.split(' ')[0]}</span>
                    <span>{item.split(' ').slice(1).join(' ')}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="stats stats-vertical shadow-2xl">
                <div className="stat bg-green-50 place-items-center">
                  <div className="stat-figure text-5xl">🌳</div>
                  <div className="stat-title font-semibold">Trees Planted</div>
                  <div className="stat-value text-green-600">10,423</div>
                  <div className="stat-desc">And counting!</div>
                </div>
                <div className="stat bg-blue-50 place-items-center">
                  <div className="stat-figure text-5xl">♻️</div>
                  <div className="stat-title font-semibold">Plastic Saved</div>
                  <div className="stat-value text-blue-600">5,200kg</div>
                  <div className="stat-desc">Removed from waste</div>
                </div>
                <div className="stat bg-amber-50 place-items-center">
                  <div className="stat-figure text-5xl">📦</div>
                  <div className="stat-title font-semibold">Orders Shipped</div>
                  <div className="stat-value text-amber-600">12,500+</div>
                  <div className="stat-desc">Happy deliveries</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-7xl mb-6">🛒</div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Start Your Wellness Journey?
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Join thousands who've made the switch to sustainable, plant-based living
            </p>
            <Link href="/items" className="btn btn-accent btn-lg gap-2 hover:scale-110 transition-transform">
              Explore Products 🌿
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
