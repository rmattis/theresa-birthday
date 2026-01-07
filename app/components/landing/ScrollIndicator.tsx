"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { albumConfig } from "@/app/data/albumConfig";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center gap-2 text-vintage-dark/60 pointer-events-none"
    >
      <span className="font-vintage-title text-sm tracking-widest uppercase">
        {albumConfig.landing.scrollHint}
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </motion.div>
  );
}

