"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { MediaItem } from "@/app/hooks/useAlbumMedia";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface LightboxContextType {
  openLightbox: (items: MediaItem[], initialIndex: number) => void;
  closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export function useLightbox() {
  const context = useContext(LightboxContext);
  if (!context) throw new Error("useLightbox must be used within a LightboxProvider");
  return context;
}

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((newItems: MediaItem[], initialIndex: number) => {
    setItems(newItems);
    setCurrentIndex(initialIndex);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  }, []);

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const currentItem = items[currentIndex];

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}
      <AnimatePresence>
        {isOpen && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-50"
            >
              <X size={32} />
            </button>

            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 hidden md:block z-50"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 hidden md:block z-50"
            >
              <ChevronRight size={40} />
            </button>

            {/* Content */}
            <motion.div
              key={currentItem.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-7xl max-h-screen p-4 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {currentItem.type === "video" ? (
                <video
                  src={currentItem.src}
                  controls
                  autoPlay
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={currentItem.src}
                    alt={currentItem.caption || "Full size memory"}
                    fill
                    className="object-contain"
                    quality={90}
                    priority
                  />
                </div>
              )}

              {/* Caption */}
              {currentItem.caption && (
                <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="inline-block bg-black/60 px-6 py-3 rounded-full text-white font-vintage-hand text-2xl backdrop-blur-md"
                  >
                    {currentItem.caption}
                  </motion.p>
                </div>
              )}
            </motion.div>
            
            {/* Counter */}
            <div className="absolute top-4 left-4 text-white/50 font-vintage-sans text-sm tracking-widest">
              {currentIndex + 1} / {items.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}

