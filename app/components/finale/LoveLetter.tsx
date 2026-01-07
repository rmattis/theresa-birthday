"use client";

import { motion } from "framer-motion";
import { albumConfig } from "@/app/data/albumConfig";

export default function LoveLetter() {
  return (
    <div className="max-w-2xl mx-auto p-8 relative">
      <motion.div
        initial={{ rotate: -2, scale: 0.9, opacity: 0 }}
        whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="bg-white p-8 md:p-12 shadow-2xl relative"
      >
        {/* Paper Texture Effect */}
        <div className="absolute inset-0 bg-[#f8f5e6] opacity-50 z-0" />
        
        <div className="relative z-10 text-center">
          <h3 className="font-vintage-title text-3xl mb-6 text-vintage-dark">
            {albumConfig.finale.loveLetterTitle}
          </h3>
          <p className="font-vintage-hand text-2xl md:text-3xl leading-relaxed text-vintage-dark/80 whitespace-pre-wrap">
            {albumConfig.finale.message || "Füge deine Nachricht in der Config hinzu ❤️"}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

