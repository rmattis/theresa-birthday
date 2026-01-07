"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PhotoSectionProps {
  children: ReactNode;
  id?: string;
  variant?: "default" | "dark" | "paper";
}

export default function PhotoSection({ children, id, variant = "default" }: PhotoSectionProps) {
  const bgClasses = {
    default: "bg-vintage-cream",
    dark: "bg-vintage-dark text-vintage-cream",
    paper: "bg-[#f4f1ea] bg-[url('/paper-texture.png')] bg-blend-multiply",
  };

  return (
    <section id={id} className={`min-h-screen w-full relative py-24 ${bgClasses[variant]} overflow-hidden`}>
      {/* Decorative elements based on variant could go here */}
      {variant === "paper" && (
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent" />
      )}
      
      {children}
    </section>
  );
}
