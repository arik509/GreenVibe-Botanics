'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/items';

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock authentication - hardcoded credentials
    if (email === 'admin@greenvibe.com' && password === 'green123') {
      // Set cookie with session data (expires in 7 days)
      Cookies.set('session', JSON.stringify({ email, loggedIn: true, timestamp: Date.now() }), { expires: 7 });
      toast.success('🎉 Welcome back! Login successful!');
      
      setTimeout(() => {
        router.push(redirectTo);
      }, 500);
    } else {
      toast.error('❌ Invalid credentials. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="text-center lg:text-left space-y-6 order-2 lg:order-1">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-8xl"
            >
              🌿
            </motion.div>
            <h1 className="text-5xl font-bold text-primary">
              Welcome Back!
            </h1>
            <p className="text-xl text-gray-600">
              Login to access exclusive wellness products and manage your orders.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <div className="badge badge-primary badge-lg">✓ Secure Login</div>
              <div className="badge badge-secondary badge-lg">✓ Fast Access</div>
              <div className="badge badge-accent badge-lg">✓ Order Tracking</div>
            </div>
            
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
              <p className="text-sm font-semibold mb-2">Not a member yet?</p>
              <p className="text-sm text-gray-600 mb-4">
                Join our community and get 15% off your first order!
              </p>
              <Link href="/" className="btn btn-outline btn-primary btn-sm">
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card bg-base-100 shadow-2xl"
            >
              <div className="card-body">
                <h2 className="card-title text-3xl justify-center mb-6">
                  🔐 Login
                </h2>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Email Address</span>
                    </label>
                    <input 
                      type="email" 
                      placeholder="your@email.com" 
                      className="input input-bordered input-primary" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Password</span>
                    </label>
                    <input 
                      type="password" 
                      placeholder="Enter your password" 
                      className="input input-bordered input-primary" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                    <label className="label">
                      <a href="#" className="label-text-alt link link-hover text-primary">
                        Forgot password?
                      </a>
                    </label>
                  </div>
                  
                  <div className="form-control mt-6">
                    <button 
                      type="submit" 
                      className={`btn btn-primary btn-lg ${isLoading ? 'loading' : ''}`}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Logging in...' : '🚀 Login'}
                    </button>
                  </div>
                </form>

                <div className="divider">Demo Credentials</div>
                
                <div className="bg-primary/10 rounded-lg p-4 text-center space-y-2">
                  <p className="text-sm font-semibold text-primary">Use these credentials to test:</p>
                  <div className="space-y-1 text-sm">
                    <p className="font-mono">📧 admin@greenvibe.com</p>
                    <p className="font-mono">🔑 green123</p>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <Link href="/" className="link link-hover text-sm">
                    ← Back to Home
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
