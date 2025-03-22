"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";
import { Parallax } from "react-parallax";
import Link from "next/link";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"client" | "lawyer" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      setError("Please select a role (Client or Lawyer).");
      return;
    }

    try {
      // Check if user already exists
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const checkResponse = await axios.post(`${apiUrl}/auth/check-user`, { email });
      if (checkResponse.data.exists) {
        setError("User already exists. Please log in or use a different email.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, name, role, firebaseUid: userCredential.user.uid }),
      });
      setUser({ email: userCredential.user.email || "", role });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRoleChange = (selectedRole: "client" | "lawyer") => {
    setRole(selectedRole);
  };

  return (
    <Parallax bgImage="/bg_2.jpg" strength={200}>
      <div className="min-h-screen bg-gray-100 bg-opacity-80 flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100"
        >
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">Sign Up for Adhivakta</h2>
          {error && <p className="text-red-500 text-center mb-6 font-medium">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Role (Select One)</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={role === "client"}
                    onChange={() => handleRoleChange("client")}
                    className="mr-2"
                    onClick={() => role === "client" && setRole(null)}
                  />
                  Client
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={role === "lawyer"}
                    onChange={() => handleRoleChange("lawyer")}
                    className="mr-2"
                    onClick={() => role === "lawyer" && setRole(null)}
                  />
                  Lawyer
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-indigo-600 hover:underline font-medium">Login</Link>
          </p>
        </motion.div>
      </div>
    </Parallax>
  );
}