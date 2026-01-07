"use client";

import { MediaItem as MediaItemType } from "@/app/hooks/useAlbumMedia";
import { motion } from "framer-motion";
import { useLightbox } from "@/app/context/LightboxContext";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

interface MediaItemProps {
  item: MediaItemType;
  index?: number;
  allItems?: MediaItemType[];
  className?: string;
  priority?: boolean;
  aspectRatio?: "portrait" | "square" | "video";
}

// Intersection Observer hook for lazy loading
function useIntersectionObserver(
  ref: React.RefObject<Element | null>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasIntersected(true);
        }
      },
      {
        rootMargin: "200px", // Start loading 200px before entering viewport
        threshold: 0,
        ...options,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options]);

  return { isIntersecting, hasIntersected };
}

export default function MediaItem({
  item,
  index = 0,
  allItems,
  className = "",
  priority = false,
  aspectRatio = "portrait",
}: MediaItemProps) {
  const { openLightbox } = useLightbox();
  const items = allItems || [item];
  const containerRef = useRef<HTMLDivElement>(null);
  const { hasIntersected } = useIntersectionObserver(containerRef);

  // Load immediately if priority, otherwise wait for intersection
  const shouldLoad = priority || hasIntersected;

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
        ref={containerRef}
        item={item}
        className={className}
        aspectRatio={aspectRatio}
        onClick={handleClick}
        shouldLoad={shouldLoad}
      />
    );
  }

  return (
    <motion.div
      ref={containerRef}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`relative ${aspectClasses[aspectRatio]} overflow-hidden rounded-lg cursor-pointer ${className}`}
    >
      {/* Loading skeleton */}
      {!shouldLoad && (
        <div className="absolute inset-0 bg-gradient-to-br from-vintage-sepia/30 to-vintage-cream animate-pulse" />
      )}

      {/* Actual image - only load when in viewport or priority */}
      {shouldLoad && (
        <OptimizedImage
          src={item.src}
          alt={item.caption || "Memory"}
          priority={priority}
        />
      )}

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

// Optimized image component with loading state
function OptimizedImage({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority: boolean;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <>
      {/* Loading skeleton while image loads */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-vintage-sepia/30 to-vintage-cream">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-vintage-sepia/20 flex items-center justify-center">
          <span className="text-vintage-dark/50 text-sm">📷</span>
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className={`object-cover transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        quality={75}
      />
    </>
  );
}

// Video component with lazy loading
const VideoItem = ({
  ref,
  item,
  className,
  aspectRatio,
  onClick,
  shouldLoad,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
  item: MediaItemType;
  className: string;
  aspectRatio: "portrait" | "square" | "video";
  onClick: () => void;
  shouldLoad: boolean;
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const aspectClasses = {
    portrait: "aspect-[3/4]",
    square: "aspect-square",
    video: "aspect-video",
  };

  // Pause video when not in viewport to save resources
  useEffect(() => {
    if (videoRef.current) {
      if (shouldLoad) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [shouldLoad]);

  return (
    <div
      ref={ref}
      className={`relative ${aspectClasses[aspectRatio]} overflow-hidden rounded-lg bg-vintage-dark ${className}`}
    >
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-vintage-dark to-vintage-sepia/50 flex items-center justify-center">
          <Play className="w-8 h-8 text-white/50" />
        </div>
      )}

      {shouldLoad && (
        <video
          ref={videoRef}
          src={item.src}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          loop
          playsInline
          muted={isMuted}
          autoPlay
          preload="metadata"
          onClick={onClick}
          onLoadedData={() => setIsLoaded(true)}
        />
      )}

      {/* Mute Toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMuted(!isMuted);
        }}
        className="absolute bottom-3 right-3 p-2 bg-black/50 rounded-full text-white/80 hover:bg-black/70 transition-colors z-10"
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </button>

      {/* Play indicator */}
      <div className="absolute top-3 left-3 p-1.5 bg-black/50 rounded-full pointer-events-none">
        <Play className="w-3 h-3 text-white fill-white" />
      </div>
    </div>
  );
};
