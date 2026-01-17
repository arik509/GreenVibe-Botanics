'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
    toast.success('Logged out successfully! 👋');
  };

  const isActive = (path) => pathname === path;

  return (
    <nav className={`navbar sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-base-100 shadow-lg' : 'bg-base-100/80 backdrop-blur-md'
    }`}>
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link href="/" className={isActive('/') ? 'active' : ''}>🏠 Home</Link></li>
            <li><Link href="/items" className={isActive('/items') ? 'active' : ''}>🛍️ Products</Link></li>
            {isLoggedIn && <li><Link href="/add-item" className={isActive('/add-item') ? 'active' : ''}>➕ Add Item</Link></li>}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl gap-2">
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
        {status === 'loading' ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : !isLoggedIn ? (
          <Link href="/login" className="btn btn-primary btn-sm md:btn-md gap-2">
            🔐 Login
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            {/* User Info */}
            <div className="hidden md:flex items-center gap-2">
              {session?.user?.image ? (
                <img 
                  src={session.user.image} 
                  alt={session.user.name} 
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="avatar placeholder">
                  <div className="bg-primary text-white rounded-full w-8">
                    <span className="text-sm">{session?.user?.name?.[0] || session?.user?.email?.[0]}</span>
                  </div>
                </div>
              )}
              <div className="text-sm">
                <p className="font-semibold">{session?.user?.name || 'User'}</p>
                <p className="text-xs text-gray-500">{session?.user?.email}</p>
              </div>
            </div>
            
            <button onClick={handleLogout} className="btn btn-outline btn-error btn-sm md:btn-md gap-2">
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
