"use client";

import { MediaItem as MediaItemType } from "@/app/hooks/useAlbumMedia";
import MediaItem from "./MediaItem";
import { motion } from "framer-motion";

interface DevelopingPhotoProps {
  items: MediaItemType[];
}

export default function DevelopingPhoto({ items }: DevelopingPhotoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, filter: "brightness(2) contrast(0.5) sepia(1)" }}
          whileInView={{ opacity: 1, filter: "brightness(1) contrast(1) sepia(0)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 2, ease: "easeOut", delay: index % 3 * 0.2 }}
          className="aspect-[4/5] bg-white p-3 shadow-lg rotate-1 hover:rotate-0 transition-transform duration-500"
        >
          <MediaItem item={item} className="w-full h-full" />
        </motion.div>
      ))}
    </div>
  );
}

