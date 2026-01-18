"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
    toast.success("Logged out successfully! 🌿", {
      style: {
        background: "#10b981",
        color: "#fff",
      },
    });
  };

  const isActive = (path) => pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white shadow-lg border-b border-emerald-100"
            : "bg-white/95 backdrop-blur-xl"
        }`}
      >
        <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-linear-to-br from-emerald-400 to-green-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative w-12 h-12 bg-linear-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </motion.div>
              <div className="hidden sm:block">
                <span className="text-2xl font-extrabold bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  GreenVibe
                </span>
                <span className="block text-xs text-gray-500 font-medium -mt-1">
                  Botanics
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {[
                { href: "/", label: "Home" },
                { href: "/items", label: "Products" },
                ...(isLoggedIn
                  ? [{ href: "/add-item", label: "Add Item" }]
                  : []),
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group"
                >
                  <span
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 block ${
                      isActive(link.href)
                        ? "text-white"
                        : "text-gray-700 hover:text-emerald-600"
                    }`}
                  >
                    {link.label}
                  </span>
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-linear-to-r from-emerald-500 to-green-500 rounded-xl shadow-lg -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {!isActive(link.href) && (
                    <div className="absolute inset-0 bg-emerald-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Right Section - Auth */}
            <div className="flex items-center space-x-4">
              {status === "loading" ? (
                <div className="flex items-center space-x-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="w-2.5 h-2.5 bg-emerald-500 rounded-full"
                    />
                  ))}
                </div>
              ) : !isLoggedIn ? (
                <Link
                  href="/login"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 overflow-hidden rounded-xl transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-green-500 transition-transform duration-300 group-hover:scale-105"></div>
                  <div className="absolute inset-0 bg-linear-to-r from-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative text-sm font-bold text-white">
                    Sign In
                  </span>
                  <svg
                    className="relative w-4 h-4 text-white group-hover:translate-x-1 transition-transform"
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
                </Link>
              ) : (
                <div className="flex items-center space-x-3">
                  {/* User Profile */}
                  <div className="hidden md:flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-linear-to-r from-emerald-50 to-green-50 border border-emerald-200">
                    {session?.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name}
                        className="w-10 h-10 rounded-full ring-2 ring-white shadow-md"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
                        {session?.user?.name?.[0]?.toUpperCase() ||
                          session?.user?.email?.[0]?.toUpperCase()}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 leading-tight">
                        {session?.user?.name || "User"}
                      </span>
                      <span className="text-xs text-gray-600 leading-tight">
                        {session?.user?.email}
                      </span>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-gray-300 text-sm font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-emerald-50 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-emerald-100 bg-white overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {[
                  { href: "/", label: "Home" },
                  { href: "/items", label: "Products" },
                  ...(isLoggedIn
                    ? [{ href: "/add-item", label: "Add Item" }]
                    : []),
                ].map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive(link.href)
                          ? "bg-linear-to-r from-emerald-500 to-green-500 text-white shadow-lg"
                          : "text-gray-700 hover:bg-emerald-50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile User Info */}
                {isLoggedIn && (
                  <div className="pt-4 mt-4 border-t border-emerald-100">
                    <div className="flex items-center space-x-3 px-4 py-3 bg-linear-to-r from-emerald-50 to-green-50 rounded-xl">
                      {session?.user?.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user.name}
                          className="w-12 h-12 rounded-full ring-2 ring-white shadow-md"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold shadow-md">
                          {session?.user?.name?.[0]?.toUpperCase() ||
                            session?.user?.email?.[0]?.toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900">
                          {session?.user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-600">
                          {session?.user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-20"></div>
    </>
  );
}
