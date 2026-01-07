"use client";

import { MediaItem as MediaItemType } from "@/app/hooks/useAlbumMedia";
import MediaItem from "./MediaItem";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLightbox } from "@/app/context/LightboxContext";

interface ParallaxScrollProps {
  items: MediaItemType[];
}

export default function ParallaxScroll({ items }: ParallaxScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openLightbox } = useLightbox();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  // Always render the container with the ref
  return (
    <div ref={containerRef} className="min-h-[150vh] relative py-24 px-4 overflow-hidden">
      {!isMounted ? (
         // Static loading state
         <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 opacity-0">
           {/* Invisible placeholder to hold height */}
           <div className="h-[500px]" />
         </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div style={{ y: y1 }} className="flex flex-col gap-16 pt-24">
            {items.filter((_, i) => i % 4 === 0).map((item, i) => (
              <ParallaxItem key={item.id} item={item} onClick={() => openLightbox(items, items.indexOf(item))} />
            ))}
          </motion.div>
          <motion.div style={{ y: y2 }} className="flex flex-col gap-16">
            {items.filter((_, i) => i % 4 === 1).map((item, i) => (
              <ParallaxItem key={item.id} item={item} onClick={() => openLightbox(items, items.indexOf(item))} />
            ))}
          </motion.div>
          <motion.div style={{ y: y3 }} className="flex flex-col gap-16 pt-48">
            {items.filter((_, i) => i % 4 === 2).map((item, i) => (
              <ParallaxItem key={item.id} item={item} onClick={() => openLightbox(items, items.indexOf(item))} />
            ))}
          </motion.div>
          <motion.div style={{ y: y4 }} className="flex flex-col gap-16 pt-12">
            {items.filter((_, i) => i % 4 === 3).map((item, i) => (
              <ParallaxItem key={item.id} item={item} onClick={() => openLightbox(items, items.indexOf(item))} />
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}

function ParallaxItem({ item, onClick }: { item: MediaItemType, onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: Math.random() * 4 - 2 }}
      className="relative aspect-[3/4] bg-white p-2 shadow-lg cursor-pointer transform-gpu"
      onClick={onClick}
    >
      <MediaItem item={item} className="w-full h-full" />
    </motion.div>
  );
}
