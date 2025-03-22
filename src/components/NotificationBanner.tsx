"use client";
import { motion } from "framer-motion";

export default function NotificationBanner({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="bg-secondary text-white p-4 rounded-lg shadow-lg fixed top-4 right-4 z-20"
    >
      {message}
    </motion.div>
  );
}