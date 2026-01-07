"use client";

import { MediaItem as MediaItemType } from "@/app/hooks/useAlbumMedia";
import { motion } from "framer-motion";
import { useLightbox } from "@/app/context/LightboxContext";
import Image from "next/image";
import { useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

interface MediaItemProps {
  item: MediaItemType;
  index?: number;
  allItems?: MediaItemType[];
  className?: string;
  priority?: boolean;
  aspectRatio?: "portrait" | "square" | "video";
}

export default function MediaItem({ 
  item, 
  index = 0, 
  allItems,
  className = "", 
  priority = false,
  aspectRatio = "portrait"
}: MediaItemProps) {
  const { openLightbox } = useLightbox();
  const items = allItems || [item];

  const aspectClasses = {
    portrait: "aspect-[3/4]",
    square: "aspect-square",
    video: "aspect-video",
  };

  const handleClick = () => {
    openLightbox(items, index);
  };

  if (item.type === "video") {
    return (
      <VideoItem 
        item={item} 
        className={className}
        aspectRatio={aspectRatio}
        onClick={handleClick}
      />
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`relative ${aspectClasses[aspectRatio]} overflow-hidden rounded-lg cursor-pointer bg-vintage-sepia ${className}`}
    >
      <Image
        src={item.src}
        alt={item.caption || "Memory"}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
        priority={priority}
      />
      
      {/* Vintage overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      
      {/* Caption on hover */}
      {item.caption && (
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity">
          <p className="text-white font-vintage-hand text-lg">{item.caption}</p>
        </div>
      )}
    </motion.div>
  );
}

function VideoItem({ 
  item, 
  className,
  aspectRatio,
  onClick
}: { 
  item: MediaItemType; 
  className: string;
  aspectRatio: "portrait" | "square" | "video";
  onClick: () => void;
}) {
  const [isMuted, setIsMuted] = useState(true);

  const aspectClasses = {
    portrait: "aspect-[3/4]",
    square: "aspect-square",
    video: "aspect-video",
  };

  return (
    <div 
      className={`relative ${aspectClasses[aspectRatio]} overflow-hidden rounded-lg bg-black ${className}`}
    >
      <video
        src={item.src}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted={isMuted}
        autoPlay
        onClick={onClick}
      />
      
      {/* Mute Toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMuted(!isMuted);
        }}
        className="absolute bottom-3 right-3 p-2 bg-black/50 rounded-full text-white/80 hover:bg-black/70 transition-colors z-10"
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* Play indicator */}
      <div className="absolute top-3 left-3 p-1.5 bg-black/50 rounded-full pointer-events-none">
        <Play className="w-3 h-3 text-white fill-white" />
      </div>
    </div>
  );
}
