"use client";

import { MediaItem as MediaItemType } from "@/app/hooks/useAlbumMedia";
import MediaItem from "./MediaItem";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface PolaroidStackProps {
  items: MediaItemType[];
}

export default function PolaroidStack({ items }: PolaroidStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Take first 3-5 items for the stack
  const stackItems = items.slice(0, 5);

  return (
    <div ref={containerRef} className="h-[150vh] relative flex justify-center items-start pt-24">
      <div className="sticky top-1/4 w-72 h-96 md:w-96 md:h-[30rem] perspective-1000">
        {!isMounted ? (
           <div className="w-full h-full bg-white shadow-xl opacity-0" />
        ) : (
          stackItems.map((item, index) => {
            // Calculate rotation and position based on index and scroll
            const rotation = (index - 2) * 5; // -10, -5, 0, 5, 10 degrees
            
            return (
              <motion.div
                key={item.id}
                style={{
                  zIndex: stackItems.length - index,
                  rotate: rotation,
                }}
                className="absolute inset-0 bg-white p-4 shadow-xl transform-gpu origin-bottom-center"
                initial={{ rotate: rotation }}
                whileInView={{
                  rotate: [rotation - 2, rotation + 2, rotation],
                  transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }
                }}
              >
                <div className="w-full h-[85%] relative bg-gray-100 mb-4 overflow-hidden">
                  <MediaItem item={item} className="w-full h-full" />
                </div>
                <div className="font-vintage-hand text-center text-2xl text-vintage-dark">
                  {item.caption || ""}
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
