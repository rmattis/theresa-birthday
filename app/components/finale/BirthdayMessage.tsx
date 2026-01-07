"use client";

import { motion } from "framer-motion";
import { albumConfig } from "@/app/data/albumConfig";
import Confetti from "@/app/components/effects/Confetti";
import Sparkles from "@/app/components/effects/Sparkles";
import LoveLetter from "./LoveLetter";

export default function BirthdayMessage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-24 px-4 bg-vintage-cream relative overflow-hidden">
      <Confetti />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center mb-16 z-10"
      >
        <Sparkles>
          <h2 className="font-vintage-title text-5xl md:text-7xl text-vintage-dark mb-4">
            {albumConfig.finale.title}
          </h2>
        </Sparkles>
      </motion.div>

      <LoveLetter />
      
      <footer className="mt-24 text-vintage-dark/40 font-vintage-sans text-xs tracking-widest uppercase">
        2025 • Made with ❤️
      </footer>
    </div>
  );
}

