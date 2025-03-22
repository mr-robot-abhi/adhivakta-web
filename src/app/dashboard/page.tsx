"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import CaseCard from "@/components/CaseCard";
import { auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Parallax } from "react-parallax";

export type Case = {
  _id: string;
  caseName: string;
  caseNumber: string;
  caseDate: string;
  courtType: string;
  status: string;
  documents: { fileName: string; path: string }[];
  advocateOnRecord: { name: string; email: string };
};

const fallbackCases: Case[] = [
  {
    _id: "1",
    caseName: "Test Case 1",
    caseNumber: "123/2025",
    caseDate: "2025-03-19",
    courtType: "High Court",
    status: "Pending",
    documents: [],
    advocateOnRecord: { name: "John Doe", email: "john@example.com" },
  },
];

export default function Dashboard() {
  const { user, setUser } = useAuthStore();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({ email: firebaseUser.email || "", role: "client" });
      } else {
        setUser(null);
        router.push("/auth/login");
      }
    });
    return () => unsubscribe();
  }, [setUser, router]);

  useEffect(() => {
    const fetchCases = async () => {
      if (!user) return;
      try {
        const token = await auth.currentUser?.getIdToken();
        if (!token) throw new Error("No auth token");
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        console.log("Fetching from:", `${apiUrl}/cases`);
        const response = await axios.get(`${apiUrl}/cases`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("API Response:", response.data);
        if (response.data.success) {
          setCases(response.data.data || []);
        } else {
          setError("API returned success: false");
          setCases(fallbackCases);
        }
      } catch (err: any) {
        console.error("Fetch Error:", err.response?.data || err.message);
        setError("Failed to fetch cases. Using fallback data.");
        setCases(fallbackCases);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Parallax bgImage="/bg_2.jpg" strength={300}>
        <div className="relative min-h-screen bg-opacity-80 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-extrabold text-gray-800 text-center mb-6 tracking-tight"
            >
              {user.role === "lawyer" ? "Lawyer Dashboard" : "Client Dashboard"}
            </motion.h1>
            <div className="mb-8 text-center">
              <p className="text-lg text-gray-600">Welcome, {user.email}</p>
            </div>
            {loading ? (
              <div className="text-center text-gray-600 text-lg font-medium">Loading cases...</div>
            ) : error ? (
              <div className="text-center text-red-500 text-lg font-medium">{error}</div>
            ) : cases.length === 0 ? (
              <div className="text-center text-gray-600 text-lg font-medium">No cases found.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cases.map((caseData) => (
                  <motion.div
                    key={caseData._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <CaseCard caseData={caseData} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Parallax>
    </div>
  );
}