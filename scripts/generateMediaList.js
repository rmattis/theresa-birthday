// This script generates a static list of all media files in public/album
// Run this before building: node scripts/generateMediaList.js

const fs = require("fs");
const path = require("path");

const albumDir = path.join(process.cwd(), "public", "album");
const outputPath = path.join(process.cwd(), "app", "data", "mediaList.json");

function getMediaFiles() {
  const mediaMap = {};
  
  try {
    const folders = fs.readdirSync(albumDir, { withFileTypes: true });
    
    for (const folder of folders) {
      if (folder.isDirectory()) {
        const folderPath = path.join(albumDir, folder.name);
        const files = fs.readdirSync(folderPath);
        
        // Filter for media files only
        const mediaFiles = files.filter((file) => {
          const ext = file.toLowerCase();
          return (
            ext.endsWith(".jpg") ||
            ext.endsWith(".jpeg") ||
            ext.endsWith(".png") ||
            ext.endsWith(".gif") ||
            ext.endsWith(".webp") ||
            ext.endsWith(".mp4") ||
            ext.endsWith(".mov") ||
            ext.endsWith(".webm")
          );
        });
        
        mediaMap[folder.name] = mediaFiles;
        console.log(`📁 ${folder.name}: ${mediaFiles.length} files`);
      }
    }
    
    return mediaMap;
  } catch (error) {
    console.error("Error reading album directory:", error);
    return {};
  }
}

// Generate the media list
console.log("🎞️  Generating media list...\n");
const mediaList = getMediaFiles();

// Write to JSON file
fs.writeFileSync(outputPath, JSON.stringify(mediaList, null, 2));

console.log(`\n✅ Media list saved to ${outputPath}`);
console.log(`📊 Total folders: ${Object.keys(mediaList).length}`);
console.log(`📸 Total files: ${Object.values(mediaList).flat().length}`);

