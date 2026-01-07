"use client";

import { motion } from "framer-motion";

interface StickerProps {
  type: "heart" | "star" | "tape" | "stamp";
  className?: string;
  style?: any;
}

export default function Sticker({ type, className = "", style }: StickerProps) {
  // Simple SVG shapes for now to avoid needing external assets immediately
  const renderShape = () => {
    switch (type) {
      case "heart":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full fill-red-400 drop-shadow-md">
            <path d="M50 88.9L16.7 55.6C7.2 46.1 7.2 30.9 16.7 21.4s24.7-9.5 33.3 0L50 21.4l0 0 0 0L50 21.4l0 0 0 0l33.3-33.3c8.6-9.5 23.8-9.5 33.3 0s9.5 24.7 0 34.2L50 88.9z" />
          </svg>
        );
      case "star":
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full fill-vintage-gold drop-shadow-md">
             <polygon points="50 0 61 35 98 35 68 57 79 91 50 70 21 91 32 57 2 35 39 35" />
          </svg>
        );
      case "tape":
        return (
          <div className="w-full h-8 bg-white/40 backdrop-blur-sm shadow-sm rotate-[-2deg] border-l-2 border-r-2 border-transparent border-dashed" style={{ clipPath: "polygon(2% 0, 100% 0, 98% 100%, 0% 100%)" }} />
        );
      case "stamp":
        return (
           <div className="w-full h-full border-4 border-vintage-dark/30 rounded-full flex items-center justify-center rotate-[-15deg] opacity-60">
             <span className="font-vintage-title text-xs uppercase tracking-widest text-vintage-dark/50">2025 Memory</span>
           </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      className={`absolute z-0 pointer-events-none sticker-float ${className}`}
      style={style}
    >
      <div className="sticker-hover w-24 h-24">
        {renderShape()}
      </div>
    </motion.div>
  );
}

