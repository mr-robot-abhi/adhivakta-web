"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useCaseStore } from "@/store/useCaseStore";
import { useEffect } from "react";
import axios from "axios";

export default function Cases() {
  const { cases, setCases } = useCaseStore();

  useEffect(() => {
    const fetchCases = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/cases", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCases(response.data.data);
    };
    fetchCases();
  }, [setCases]);

  return (
    <div className="min-h-screen smooth-scroll">
      <Navbar />
      <div className="p-8">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl font-bold text-primary mb-8"
        >
          All Cases
        </motion.h1>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-6"
        >
          {cases.map((caseData) => (
            <motion.div key={caseData.id} className="card-3d bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">{caseData.caseName}</h2>
              <p>{caseData.caseNumber}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}