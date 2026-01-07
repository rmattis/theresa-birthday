"use client";

import { MediaItem as MediaItemType } from "@/app/hooks/useAlbumMedia";
import MediaItem from "./MediaItem";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface FilmStripProps {
  items: MediaItemType[];
}

export default function FilmStrip({ items }: FilmStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-1/2 -translate-y-1/2 overflow-hidden w-full">
        {!isMounted ? (
           <div className="pl-8 w-full flex gap-8 opacity-0">
             <div className="w-64 h-96 bg-black" />
           </div>
        ) : (
          <motion.div style={{ x }} className="flex gap-8 pl-8 w-max">
            {items.map((item) => (
              <div
                key={item.id}
                className="relative w-64 md:w-96 aspect-[3/4] bg-black p-4 flex-shrink-0 shadow-2xl"
              >
                {/* Film Perforations */}
                <div className="absolute top-0 left-0 right-0 h-4 flex justify-between px-2 py-1">
                   {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="w-3 h-2 bg-white/20 rounded-[1px]" />
                   ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-4 flex justify-between px-2 py-1">
                   {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="w-3 h-2 bg-white/20 rounded-[1px]" />
                   ))}
                </div>
                
                <MediaItem item={item} className="w-full h-full" />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
