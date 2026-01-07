"use client";

import { motion } from "framer-motion";
import { albumConfig } from "@/app/data/albumConfig";
import ScrollIndicator from "./ScrollIndicator";

export default function LandingHero() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-vintage-cream">
      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="font-vintage-title text-6xl md:text-9xl text-vintage-dark mb-4"
        >
          {albumConfig.landing.title}
        </motion.h1>
        
        <div className="relative">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
            className="font-vintage-title text-[12rem] md:text-[16rem] leading-none text-vintage-gold/20 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
          >
            {albumConfig.landing.age}
          </motion.div>
          
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="font-vintage-hand text-2xl md:text-4xl text-vintage-accent block mt-2"
          >
            Ein Jahr auf Film
          </motion.span>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}

