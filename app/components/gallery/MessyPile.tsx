"use client";

import { MediaItem as MediaItemType } from "@/app/hooks/useAlbumMedia";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useLightbox } from "@/app/context/LightboxContext";
import MediaItem from "./MediaItem";
import { useState } from "react";

interface MessyPileProps {
  items: MediaItemType[];
}

export default function MessyPile({ items }: MessyPileProps) {
  const { openLightbox } = useLightbox();
  // Take first 15 items to keep performance good
  const pileItems = items.slice(0, 15);

  return (
    <div className="min-h-screen relative py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto relative h-[80vh] flex items-center justify-center">
        {pileItems.map((item, index) => (
          <DraggablePhoto 
            key={item.id} 
            item={item} 
            index={index} 
            total={pileItems.length}
            onOpen={() => openLightbox(items, index)}
          />
        ))}
        
        <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none">
          <p className="font-vintage-hand text-2xl text-vintage-dark/50">
            Zieh die Fotos zur Seite!
          </p>
        </div>
      </div>
    </div>
  );
}

function DraggablePhoto({ item, index, total, onOpen }: { item: MediaItemType, index: number, total: number, onOpen: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue((Math.random() - 0.5) * 30);
  const scale = useTransform(x, [-200, 200], [0.8, 0.8]);
  const opacity = useTransform(x, [-300, 0, 300], [0, 1, 0]);

  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity, zIndex: total - index }}
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      whileHover={{ scale: 1.1, cursor: "grab" }}
      whileTap={{ cursor: "grabbing" }}
      className="absolute w-64 md:w-80 aspect-[3/4] bg-white p-3 shadow-xl transform-gpu"
      onClick={() => {
        // Only open if not dragged significantly
        if (Math.abs(x.get()) < 10) onOpen();
      }}
    >
      <div className="w-full h-[85%] relative bg-gray-100 mb-2 overflow-hidden pointer-events-none">
        <MediaItem item={item} className="w-full h-full" />
      </div>
      {item.caption && (
        <div className="font-vintage-hand text-center text-xl text-vintage-dark truncate px-2">
          {item.caption}
        </div>
      )}
    </motion.div>
  );
}

