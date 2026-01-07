"use client";

import { MediaItem as MediaItemType } from "@/app/hooks/useAlbumMedia";
import MediaItem from "./MediaItem";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface FloatingGalleryProps {
  items: MediaItemType[];
}

export default function FloatingGallery({ items }: FloatingGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Split items into 3 columns
  const col1 = items.filter((_, i) => i % 3 === 0);
  const col2 = items.filter((_, i) => i % 3 === 1);
  const col3 = items.filter((_, i) => i % 3 === 2);

  return (
    <div ref={containerRef} className="px-4 md:px-8 max-w-7xl mx-auto min-h-[100vh] overflow-hidden">
      {!isMounted ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 opacity-0">
           <div className="h-96" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <motion.div style={{ y: y1 }} className="flex flex-col gap-6 pt-24">
            {col1.map((item) => (
              <div key={item.id} className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-md">
                 <MediaItem item={item} className="w-full h-full" />
              </div>
            ))}
          </motion.div>
          
          <motion.div style={{ y: y2 }} className="flex flex-col gap-6">
            {col2.map((item) => (
              <div key={item.id} className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-md">
                 <MediaItem item={item} className="w-full h-full" />
              </div>
            ))}
          </motion.div>
          
          <motion.div style={{ y: y3 }} className="hidden md:flex flex-col gap-6 pt-12">
            {col3.map((item) => (
              <div key={item.id} className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-md">
                 <MediaItem item={item} className="w-full h-full" />
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}
