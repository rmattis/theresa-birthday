"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface VideoPlayerProps {
  src: string;
  className?: string;
}

export default function VideoPlayer({ src, className = "" }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isInView(videoRef.current)) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      setHasInteracted(true);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className={`relative group cursor-pointer ${className}`} onClick={togglePlay}>
      {/* Vintage Frame Borders (Sprocket holes simulated) */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/80 z-20 flex flex-col justify-between py-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-2 h-3 bg-white/20 mx-auto rounded-sm" />
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-black/80 z-20 flex flex-col justify-between py-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-2 h-3 bg-white/20 mx-auto rounded-sm" />
        ))}
      </div>

      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover px-4" // Padding for sprocket bars
        loop
        playsInline
        muted={isMuted}
        autoPlay
      />

      {/* Controls Overlay */}
      <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {!isPlaying && <Play className="w-12 h-12 text-white/80 fill-white/80" />}
      </div>

      {/* Mute Toggle */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-6 z-40 p-2 bg-black/40 rounded-full text-white/80 hover:bg-black/60 transition-colors"
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </div>
  );
}

// Helper to check if element is in view (simple version)
function isInView(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

