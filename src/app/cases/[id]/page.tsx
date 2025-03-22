"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Case } from "@/types";

export default function CaseDetail({ params }: { params: { id: string } }) {
  const [caseData, setCaseData] = useState<Case | null>(null);

  useEffect(() => {
    const fetchCase = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/cases/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCaseData(response.data.data);
    };
    fetchCase();
  }, [params.id]);

  if (!caseData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen smooth-scroll">
      <Navbar />
      <div className="p-8">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl font-bold text-primary mb-8"
        >
          {caseData.caseName}
        </motion.h1>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white p-6 rounded-lg shadow-lg card-3d"
        >
          <p><strong>Case Number:</strong> {caseData.caseNumber}</p>
          <p><strong>Date:</strong> {new Date(caseData.caseDate).toLocaleDateString()}</p>
          <p><strong>Court:</strong> {caseData.courtType}</p>
          <p><strong>Status:</strong> {caseData.status}</p>
        </motion.div>
      </div>
    </div>
  );
}