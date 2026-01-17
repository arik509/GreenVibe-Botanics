'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsLoggedIn(!!Cookies.get('session'));
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    Cookies.remove('session');
    setIsLoggedIn(false);
    toast.success('Logged out successfully! 👋');
    router.push('/');
  };

  const isActive = (path) => pathname === path;

  return (
    <div className={`navbar sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-base-100 shadow-lg' : 'bg-base-100/80 backdrop-blur-md'
    }`}>
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link href="/" className={isActive('/') ? 'active' : ''}>🏠 Home</Link></li>
            <li><Link href="/items" className={isActive('/items') ? 'active' : ''}>🛍️ Products</Link></li>
            {isLoggedIn && <li><Link href="/add-item" className={isActive('/add-item') ? 'active' : ''}>➕ Add Item</Link></li>}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost normal-case text-xl gap-2">
          <span className="text-2xl">🌿</span>
          <span className="hidden sm:inline font-bold text-primary">GreenVibe</span>
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link href="/" className={isActive('/') ? 'active bg-primary text-white' : ''}>
              🏠 Home
            </Link>
          </li>
          <li>
            <Link href="/items" className={isActive('/items') ? 'active bg-primary text-white' : ''}>
              🛍️ Products
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link href="/add-item" className={isActive('/add-item') ? 'active bg-primary text-white' : ''}>
                ➕ Add Item
              </Link>
            </li>
          )}
        </ul>
      </div>
      
      <div className="navbar-end gap-2">
        {!isLoggedIn ? (
          <Link href="/login" className="btn btn-primary btn-sm md:btn-md gap-2">
            🔐 Login
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-success/20 rounded-full">
              <span className="text-sm">✓ Logged in</span>
            </div>
            <button onClick={handleLogout} className="btn btn-outline btn-error btn-sm md:btn-md gap-2">
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
