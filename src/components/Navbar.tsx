"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-primary text-white p-4 fixed w-full top-0 z-10 shadow-lg"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold">Adhivakta</Link>
        <div className="space-x-4">
          <Link href="/dashboard" className="hover:text-secondary">Dashboard</Link>
          <Link href="/cases" className="hover:text-secondary">Cases</Link>
          <Link href="/auth/login" className="hover:text-secondary">Logout</Link>
        </div>
      </div>
    </motion.nav>
  );
}