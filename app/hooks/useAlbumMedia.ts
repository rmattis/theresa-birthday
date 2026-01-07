"use client";

import { useState, useEffect } from "react";
import { albumConfig } from "@/app/data/albumConfig";
import { shuffleArray } from "@/lib/mediaUtils";

export interface MediaItem {
  id: string;
  src: string;
  filename: string;
  type: "image" | "video";
  caption?: string;
}

export type AlbumContent = Record<string, MediaItem[]>;

export function useAlbumMedia() {
  const [media, setMedia] = useState<AlbumContent>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMedia() {
      try {
        const response = await fetch("/api/media");
        if (!response.ok) throw new Error("Failed to fetch media");
        
        const mediaMap: Record<string, string[]> = await response.json();
        const processedMedia: AlbumContent = {};

        Object.entries(mediaMap).forEach(([folder, files]) => {
          let folderFiles = [...files];

          // Sort or Shuffle
          if (albumConfig.settings.randomOrder) {
            folderFiles = shuffleArray(folderFiles);
          } else {
            folderFiles.sort((a, b) => a.localeCompare(b));
          }

          processedMedia[folder] = folderFiles.map((filename) => {
            const ext = filename.split(".").pop()?.toLowerCase();
            const type = ["mp4", "mov", "webm"].includes(ext || "") ? "video" : "image";
            
            return {
              id: filename,
              filename,
              src: `/album/${folder}/${filename}`,
              type,
              caption: albumConfig.captions[filename] || undefined,
            };
          });
        });

        setMedia(processedMedia);
      } catch (err) {
        console.error(err);
        setError("Could not load album media");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMedia();
  }, []);

  return { media, isLoading, error };
}

