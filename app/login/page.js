'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/items';
  const error = searchParams.get('error');

  // Show error toast if there's an error in URL
  useState(() => {
    if (error) {
      toast.error('Authentication failed. Please try again.');
    }
  }, [error]);

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (result?.error) {
        toast.error('Invalid credentials. Please try again.');
      } else {
        toast.success('🎉 Login successful!');
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl });
    } catch (error) {
      toast.error('Google login failed. Please try again.');
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

                {/* Google Login Button */}
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="btn btn-outline btn-lg gap-2 w-full hover:bg-blue-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {isLoading ? 'Connecting...' : 'Continue with Google'}
                </button>

                <div className="divider">OR</div>
                
                {/* Email/Password Login Form */}
                <form onSubmit={handleCredentialsLogin} className="space-y-4">
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
                      {isLoading ? 'Logging in...' : '🚀 Login with Email'}
                    </button>
                  </div>
                </form>

                <div className="divider">Demo Credentials</div>
                
                <div className="bg-primary/10 rounded-lg p-4 text-center space-y-2">
                  <p className="text-sm font-semibold text-primary">Test the credentials login:</p>
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
