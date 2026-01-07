"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface ChapterTitleProps {
  title: string;
  subtitle: string;
}

export default function ChapterTitle({ title, subtitle }: ChapterTitleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const letters = Array.from(title);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <div ref={ref} className="py-24 px-6 flex flex-col items-center text-center">
      {/* Vintage Title Card Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="w-24 h-[1px] bg-vintage-dark/30 mb-8"
      />

      <motion.h2
        className="font-vintage-title text-4xl md:text-6xl mb-4 text-vintage-dark"
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {letters.map((letter, index) => (
          <motion.span key={index} variants={child}>
            {letter}
          </motion.span>
        ))}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="font-vintage-sans text-sm md:text-base tracking-widest uppercase text-vintage-accent"
      >
        {subtitle}
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        className="w-24 h-[1px] bg-vintage-dark/30 mt-8"
      />
    </div>
  );
}
