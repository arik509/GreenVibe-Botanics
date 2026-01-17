'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AddItemPage() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
    benefits: '',
    rating: 4.5,
    reviews: 0,
    inStock: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => setCategories(data.categories))
      .catch(err => console.error('Error loading categories:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Convert benefits string to array
    const benefitsArray = formData.benefits.split(',').map(b => b.trim()).filter(b => b);
    
    const productData = {
      ...formData,
      benefits: benefitsArray,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews)
    };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would POST to your Express API
      console.log('New Product:', productData);
      
      toast.success('✅ Product added successfully!', {
        duration: 4000,
        icon: '🎉',
      });
      
      setTimeout(() => {
        router.push('/items');
      }, 2000);
    } catch (error) {
      toast.error('❌ Failed to add product. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-8">
              <motion.div 
                className="text-6xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🌿
              </motion.div>
              <h1 className="text-5xl font-bold mb-2">Add New Wellness Product</h1>
              <p className="text-gray-600 text-lg">
                Share amazing plant-based products with our community
              </p>
            </div>

            <form onSubmit={handleSubmit} className="card bg-base-100 shadow-2xl">
              <div className="card-body space-y-6">
                {/* Product Title */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-lg">Product Title</span>
                    <span className="label-text-alt text-error">* Required</span>
                  </label>
                  <input 
                    type="text" 
                    name="title" 
                    placeholder="e.g., Organic Spirulina Powder" 
                    className="input input-bordered input-primary input-lg" 
                    required 
                    value={formData.title}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Description */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-lg">Description</span>
                    <span className="label-text-alt text-error">* Required</span>
                  </label>
                  <textarea 
                    name="description" 
                    placeholder="Provide a detailed product description including features, uses, and what makes it special..." 
                    className="textarea textarea-bordered textarea-primary h-32 text-base" 
                    required 
                    value={formData.description}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  ></textarea>
                  <label className="label">
                    <span className="label-text-alt">Min. 50 characters</span>
                    <span className="label-text-alt">{formData.description.length} characters</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Price */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-lg">Price (USD)</span>
                      <span className="label-text-alt text-error">* Required</span>
                    </label>
                    <label className="input-group">
                      <span className="bg-primary text-white">$</span>
                      <input 
                        type="number" 
                        name="price" 
                        step="0.01" 
                        min="0"
                        placeholder="29.99" 
                        className="input input-bordered input-primary w-full" 
                        required 
                        value={formData.price}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                    </label>
                  </div>

                  {/* Category */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-lg">Category</span>
                      <span className="label-text-alt text-error">* Required</span>
                    </label>
                    <select 
                      name="category" 
                      className="select select-bordered select-primary" 
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
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-lg">Image URL</span>
                    <span className="label-text-alt text-error">* Required</span>
                  </label>
                  <input 
                    type="url" 
                    name="image" 
                    placeholder="https://images.unsplash.com/photo-..." 
                    className="input input-bordered input-primary" 
                    required 
                    value={formData.image}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <label className="label">
                    <span className="label-text-alt">
                      💡 Tip: Use <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="link link-primary">Unsplash</a> for free high-quality images
                    </span>
                  </label>
                  {formData.image && (
                    <div className="mt-2">
                      <p className="text-sm mb-2">Image Preview:</p>
                      <img src={formData.image} alt="Preview" className="w-48 h-48 object-cover rounded-lg shadow-md" onError={(e) => e.target.style.display = 'none'} />
                    </div>
                  )}
                </div>

                {/* Benefits */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-lg">Product Benefits</span>
                    <span className="label-text-alt text-error">* Required</span>
                  </label>
                  <input 
                    type="text" 
                    name="benefits" 
                    placeholder="Energy Boost, Rich in Antioxidants, Organic, Vegan" 
                    className="input input-bordered input-primary" 
                    required 
                    value={formData.benefits}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <label className="label">
                    <span className="label-text-alt">Separate multiple benefits with commas</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Rating */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-lg">Initial Rating</span>
                    </label>
                    <input 
                      type="number" 
                      name="rating" 
                      step="0.1" 
                      min="0" 
                      max="5"
                      className="input input-bordered input-primary" 
                      value={formData.rating}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    <label className="label">
                      <span className="label-text-alt">0.0 to 5.0</span>
                    </label>
                  </div>

                  {/* Reviews Count */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-lg">Reviews Count</span>
                    </label>
                    <input 
                      type="number" 
                      name="reviews" 
                      min="0"
                      className="input input-bordered input-primary" 
                      value={formData.reviews}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* In Stock Checkbox */}
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-4 bg-base-200 rounded-lg p-4">
                    <input 
                      type="checkbox" 
                      name="inStock" 
                      className="checkbox checkbox-primary checkbox-lg" 
                      checked={formData.inStock}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    <div>
                      <span className="label-text font-semibold text-lg">Product is in stock</span>
                      <p className="text-sm text-gray-600">Check this if the product is available for purchase</p>
                    </div>
                  </label>
                </div>

                <div className="divider"></div>

                {/* Submit Button */}
                <div className="form-control">
                  <button 
                    type="submit" 
                    className={`btn btn-primary btn-lg gap-2 ${isSubmitting ? 'loading' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Adding Product...' : '🌿 Add Product to Store'}
                  </button>
                </div>

                <div className="text-center">
                  <Link href="/items" className="link link-hover text-gray-600">
                    ← Cancel and go back
                  </Link>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
