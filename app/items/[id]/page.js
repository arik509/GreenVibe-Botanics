"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        const product = data.products.find((p) => p.id === parseInt(params.id));
        setItem(product);

        // Get related products from same category
        if (product) {
          const related = data.products
            .filter(
              (p) => p.category === product.category && p.id !== product.id
            )
            .slice(0, 4);
          setRelatedItems(related);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading product:", error);
        setLoading(false);
      });
  }, [params.id]);

  const handleAddToCart = () => {
    toast.success(`🛒 Added ${quantity} ${item.title} to cart!`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">
          The product you're looking for doesn't exist.
        </p>
        <Link href="/items" className="btn btn-primary">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs mb-8">
          <ul>
            <li>
              <Link href="/" className="link link-hover">
                Home
              </Link>
            </li>
            <li>
              <Link href="/items" className="link link-hover">
                Products
              </Link>
            </li>
            <li>
              <Link href="/items" className="link link-hover">
                {item.category}
              </Link>
            </li>
            <li className="font-semibold">{item.title}</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="card bg-base-200 shadow-2xl sticky top-24">
              <figure className="p-8">
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-xl max-h-125 w-full object-cover"
                />
              </figure>
              <div className="px-8 pb-8">
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-base-300 rounded-lg opacity-50"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <div className="badge badge-secondary mb-3 badge-lg">
                {item.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {item.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="rating rating-sm">
                  {[...Array(5)].map((_, i) => (
                    <input
                      key={i}
                      type="radio"
                      className="mask mask-star-2 bg-yellow-500"
                      checked={i < Math.round(item.rating)}
                      readOnly
                    />
                  ))}
                </div>
                <span className="text-xl font-semibold">{item.rating}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">{item.reviews} reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-6">
                <div className="text-5xl font-bold text-primary">
                  ${item.price}
                </div>
                <div className="text-gray-500 line-through text-xl">
                  ${(item.price * 1.3).toFixed(2)}
                </div>
                <div className="badge badge-error">23% OFF</div>
              </div>

              {/* Stock Status */}
              {item.inStock ? (
                <div className="alert alert-success mb-6 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-bold">In Stock - Ready to ship!</h3>
                    <div className="text-xs">
                      Order within 2 hours for same-day dispatch
                    </div>
                  </div>
                </div>
              ) : (
                <div className="alert alert-error mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Currently Out of Stock - Notify me when available</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-base-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span>📋</span> About This Product
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>✨</span> Key Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {item.benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 bg-primary/10 rounded-lg p-3"
                  >
                    <span className="text-primary text-xl">✓</span>
                    <span className="font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  className="btn btn-circle btn-outline btn-lg"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <span className="text-2xl">−</span>
                </button>
                <span className="text-3xl font-bold w-16 text-center">
                  {quantity}
                </span>
                <button
                  className="btn btn-circle btn-outline btn-lg"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <span className="text-2xl">+</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="btn btn-primary btn-lg flex-1 gap-2"
                disabled={!item.inStock}
                onClick={handleAddToCart}
              >
                🛒 Add to Cart
              </button>
              <button className="btn btn-outline btn-lg gap-2">
                ♥ Wishlist
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🚚</span>
                <div>
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">♻️</span>
                <div>
                  <p className="font-semibold">Eco-Friendly Packaging</p>
                  <p className="text-sm text-gray-600">
                    100% recyclable materials
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌿</span>
                <div>
                  <p className="font-semibold">Certified Organic</p>
                  <p className="text-sm text-gray-600">Third-party verified</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌳</span>
                <div>
                  <p className="font-semibold">One Order = One Tree</p>
                  <p className="text-sm text-gray-600">
                    We plant a tree with every purchase
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedItems.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8 text-center">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((relatedItem, idx) => (
                <motion.div
                  key={relatedItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link href={`/items/${relatedItem.id}`}>
                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
                      <figure className="px-6 pt-6 h-48">
                        <img
                          src={relatedItem.image}
                          alt={relatedItem.title}
                          className="rounded-xl w-full h-full object-cover"
                        />
                      </figure>
                      <div className="card-body">
                        <h3 className="card-title text-base">
                          {relatedItem.title}
                        </h3>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-primary">
                            ${relatedItem.price}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">⭐</span>
                            <span className="text-sm">
                              {relatedItem.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
