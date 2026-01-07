"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

const Sparkle = ({ size, color, style }: { size: number; color: string; style: any }) => {
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 0.8 }}
      className="absolute block pointer-events-none z-10"
      style={style}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 68 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
          fill={color}
        />
      </svg>
    </motion.span>
  );
};

export default function Sparkles({ children }: { children: React.ReactNode }) {
  const [sparkles, setSparkles] = useState<{ id: string; createdAt: number; color: string; size: number; style: any }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const sparkle = {
        id: String(random(10000, 99999)),
        createdAt: now,
        color: "#d4af37",
        size: random(10, 20),
        style: {
          top: random(0, 100) + "%",
          left: random(0, 100) + "%",
        },
      };

      setSparkles((currentSparkles) => {
        const nextSparkles = currentSparkles.filter((sp) => now - sp.createdAt < 750);
        nextSparkles.push(sparkle);
        return nextSparkles;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block">
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <span className="relative z-20">{children}</span>
    </span>
  );
}

