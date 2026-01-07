"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface PersonalNoteProps {
  note: string;
}

export default function PersonalNote({ note }: PersonalNoteProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className="max-w-md mx-auto px-8 py-12 mb-12 relative">
      {/* Paper texture background could be added here */}
      <div className="absolute inset-0 bg-vintage-sepia/20 -skew-y-1 rounded-sm -z-10" />
      
      <motion.p
        initial={{ opacity: 0, pathLength: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="font-vintage-hand text-2xl md:text-3xl text-vintage-dark leading-relaxed text-center"
      >
        {note}
      </motion.p>
    </div>
  );
}

