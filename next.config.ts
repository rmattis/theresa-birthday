import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use static export to avoid serverless function size limits
  // This generates pure static HTML/CSS/JS files
  output: "export",
  
  // Optimize images for static export
  images: {
    unoptimized: true, // Required for static export
  },
  
  // Exclude large directories from function tracing (backup)
  outputFileTracingExcludes: {
    "*": ["public/album/**/*"],
  },
};

export default nextConfig;
