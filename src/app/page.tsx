"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Parallax } from "react-parallax";
import { FaFolder, FaLock, FaUsers, FaClock, FaBell, FaChartBar } from "react-icons/fa";

export default function Home() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({ email: firebaseUser.email || "", role: "client" });
        router.push("/dashboard");
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [setUser, router]);

  if (user) return null;

  return (
    <div className="bg-white">
      {/* Hero Section with Parallax */}
      <Parallax bgImage="/bg_1.jpg" strength={300}>
        <section className="relative h-[600px] text-white">
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl font-extrabold tracking-tight"
              >
                Streamline Your Legal Case Management
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
              >
                A comprehensive platform for lawyers and clients to manage cases, documents, and collaboration efficiently.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8 space-x-4"
              >
                <Link
                  href="/auth/signup"
                  className="inline-block bg-black text-white px-6 py-3 rounded-md font-semibold text-lg hover:bg-gray-800 transition duration-300"
                >
                  Get Started
                </Link>
                <Link
                  href="#features"
                  className="inline-block bg-white text-black border border-gray-300 px-6 py-3 rounded-md font-semibold text-lg hover:bg-gray-100 transition duration-300"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </Parallax>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-900 mb-12"
          >
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <FaFolder className="w-6 h-6 text-gray-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Case Management</h3>
              </div>
              <p className="text-gray-600 text-sm">Track all your legal cases with detailed information, status updates, and document management.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <FaLock className="w-6 h-6 text-gray-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Document Storage</h3>
              </div>
              <p className="text-gray-600 text-sm">Securely store and organize case-related documents with easy upload and retrieval.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <FaUsers className="w-6 h-6 text-gray-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Lawyer Collaboration</h3>
              </div>
              <p className="text-gray-600 text-sm">Enable seamless collaboration between multiple lawyers working on the same case.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <FaClock className="w-6 h-6 text-gray-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Client Portal</h3>
              </div>
              <p className="text-gray-600 text-sm">Provide clients with a dedicated portal to view case updates and documents.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <FaBell className="w-6 h-6 text-gray-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              </div>
              <p className="text-gray-600 text-sm">Stay updated with automated notifications for case updates and deadlines.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <FaChartBar className="w-6 h-6 text-gray-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Analytics & Reporting</h3>
              </div>
              <p className="text-gray-600 text-sm">Generate comprehensive reports on case progress and performance.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <Parallax bgImage="/bg_3.jpg" strength={200}>
        <section className="py-20 bg-white bg-opacity-80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-6"
            >
              Ready to Simplify Your Legal Work?
            </motion.h2>
            <Link
              href="/auth/signup"
              className="inline-block bg-black text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-800 transition duration-300"
            >
              Sign Up Now
            </Link>
          </div>
        </section>
      </Parallax>
    </div>
  );
}