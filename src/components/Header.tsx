"use client";

import { motion } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { FaBalanceScale } from "react-icons/fa";

export default function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <FaBalanceScale className="w-8 h-8 text-indigo-400" />
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            Adhivakta
          </Link>
        </motion.div>
        <nav className="space-x-4 flex items-center">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-lg font-medium text-gray-300 hover:text-white transition duration-300"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="text-lg font-medium bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-lg font-medium text-gray-300 hover:text-white transition duration-300"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="text-lg font-medium bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}