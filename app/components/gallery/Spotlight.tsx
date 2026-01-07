"use client";

import { MediaItem as MediaItemType } from "@/app/hooks/useAlbumMedia";
import MediaItem from "./MediaItem";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLightbox } from "@/app/context/LightboxContext";
import { Search } from "lucide-react";

interface SpotlightProps {
  items: MediaItemType[];
}

export default function Spotlight({ items }: SpotlightProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "-20%" });
  const { openLightbox } = useLightbox();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Pick one random highlight item if available, or just the first
  const highlightItem = items[0];

  // Render container with ref even if not mounted or empty, to keep layout stable
  return (
    <div ref={containerRef} className="h-screen relative flex items-center justify-center bg-vintage-dark my-24 overflow-hidden">
      {/* Dark overlay backdrop */}
      <motion.div 
        animate={{ opacity: isInView ? 1 : 0 }}
        className="absolute inset-0 bg-black/80 z-10 pointer-events-none"
      />

      {highlightItem && mounted && (
        <>
          {/* Spotlight Effect */}
          <motion.div
            animate={{ 
              scale: isInView ? 1 : 0.8,
              opacity: isInView ? 1 : 0 
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative z-20 w-full max-w-4xl aspect-video md:aspect-[21/9] shadow-2xl rounded-sm overflow-hidden border-4 border-vintage-gold/20"
          >
            <MediaItem item={highlightItem} className="w-full h-full" priority />
            
            {/* Interactive hint */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-zoom-in"
              onClick={() => openLightbox(items, 0)}
            >
              <Search className="w-12 h-12 text-white/80" />
            </motion.div>
          </motion.div>

          {/* Cinematic text */}
          <motion.div
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-12 left-0 right-0 text-center z-30"
          >
            <p className="font-vintage-title text-vintage-cream text-xl md:text-3xl tracking-widest uppercase">
              Unvergessliche Momente
            </p>
          </motion.div>
        </>
      )}
    </div>
  );
}
