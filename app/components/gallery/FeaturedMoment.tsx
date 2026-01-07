"use client";

import { MediaItem as MediaItemType } from "@/app/hooks/useAlbumMedia";
import MediaItem from "./MediaItem";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface FeaturedMomentProps {
  item: MediaItemType;
}

export default function FeaturedMoment({ item }: FeaturedMomentProps) {
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="h-screen w-full relative flex items-center justify-center overflow-hidden my-12">
      {isMounted && (
        <motion.div 
          style={{ scale, opacity }}
          className="relative w-full h-full"
        >
          <MediaItem item={item} className="w-full h-full" priority />
          
          {/* Overlay Vignette */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/40 pointer-events-none" />
        </motion.div>
      )}
    </div>
  );
}
