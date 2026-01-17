'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch from public JSON file
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        setItems(data.products);
        setCategories(data.categories);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading products:', error);
        setLoading(false);
      });
  }, []);

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-lg">Loading amazing products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-green-400 to-emerald-600 text-white py-20">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="text-7xl mb-4"
            >
              🌿
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Products</h1>
            <p className="text-xl md:text-2xl mb-6">
              Discover our curated collection of organic, plant-based wellness essentials
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <div className="badge badge-lg bg-white/20 text-white border-white/30">
                {items.length}+ Products
              </div>
              <div className="badge badge-lg bg-white/20 text-white border-white/30">
                100% Organic
              </div>
              <div className="badge badge-lg bg-white/20 text-white border-white/30">
                Free Shipping $50+
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="form-control">
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="input input-bordered w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-square btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory('All')}
            className={`btn ${selectedCategory === 'All' ? 'btn-primary' : 'btn-outline'}`}
          >
            🌟 All Products
          </motion.button>
          {categories.map((cat) => (
            <motion.button 
              key={cat.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat.name)}
              className={`btn ${selectedCategory === cat.name ? 'btn-primary' : 'btn-outline'}`}
            >
              {cat.icon} {cat.name}
            </motion.button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600">
            Showing <span className="font-bold text-primary">{filteredItems.length}</span> products
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Products Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -8 }}
              >
                <Link href={`/items/${item.id}`}>
                  <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 border-transparent hover:border-primary">
                    <figure className="px-6 pt-6 h-56 bg-base-200">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="rounded-xl w-full h-full object-cover hover:scale-110 transition-transform duration-300" 
                      />
                    </figure>
                    <div className="card-body">
                      <div className="flex justify-between items-start mb-2">
                        <div className="badge badge-secondary badge-sm">{item.category}</div>
                        {item.inStock ? (
                          <div className="badge badge-success badge-sm gap-1">
                            <span className="text-xs">✓</span> In Stock
                          </div>
                        ) : (
                          <div className="badge badge-error badge-sm">Out of Stock</div>
                        )}
                      </div>
                      
                      <h2 className="card-title text-lg hover:text-primary transition-colors">
                        {item.title}
                      </h2>
                      <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                      
                      {/* Benefits */}
                      <div className="flex flex-wrap gap-1 my-2">
                        {item.benefits.slice(0, 2).map((benefit, i) => (
                          <span key={i} className="badge badge-outline badge-xs">{benefit}</span>
                        ))}
                        {item.benefits.length > 2 && (
                          <span className="badge badge-outline badge-xs">+{item.benefits.length - 2}</span>
                        )}
                      </div>

                      <div className="card-actions justify-between items-center mt-4">
                        <div className="text-2xl font-bold text-primary">${item.price}</div>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500 text-xl">⭐</span>
                          <span className="text-sm font-semibold">{item.rating}</span>
                          <span className="text-xs text-gray-500">({item.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
