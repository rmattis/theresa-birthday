// This script optimizes images for production
// Run: node scripts/optimizeImages.js
// Requires: npm install sharp --save-dev

const fs = require("fs");
const path = require("path");

async function optimizeImages() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    console.log("⚠️  Sharp not installed. Skipping image optimization.");
    console.log("   Run 'npm install sharp --save-dev' to enable optimization.");
    return;
  }

  const albumDir = path.join(process.cwd(), "public", "album");
  const optimizedDir = path.join(process.cwd(), "public", "album-optimized");

  // Create optimized directory if it doesn't exist
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
  }

  console.log("🖼️  Optimizing images...\n");

  let totalOriginal = 0;
  let totalOptimized = 0;
  let fileCount = 0;

  const folders = fs.readdirSync(albumDir, { withFileTypes: true });

  for (const folder of folders) {
    if (!folder.isDirectory()) continue;

    const folderPath = path.join(albumDir, folder.name);
    const optimizedFolderPath = path.join(optimizedDir, folder.name);

    if (!fs.existsSync(optimizedFolderPath)) {
      fs.mkdirSync(optimizedFolderPath, { recursive: true });
    }

    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      const ext = file.toLowerCase();
      if (!ext.endsWith(".jpg") && !ext.endsWith(".jpeg") && !ext.endsWith(".png")) {
        // Copy non-image files as-is
        if (ext.endsWith(".mp4") || ext.endsWith(".mov") || ext.endsWith(".webm")) {
          const srcPath = path.join(folderPath, file);
          const destPath = path.join(optimizedFolderPath, file);
          fs.copyFileSync(srcPath, destPath);
        }
        continue;
      }

      const srcPath = path.join(folderPath, file);
      const destPath = path.join(optimizedFolderPath, file.replace(/\.(jpg|jpeg|png)$/i, ".webp"));

      try {
        const originalSize = fs.statSync(srcPath).size;
        totalOriginal += originalSize;

        await sharp(srcPath)
          .resize(1600, 1600, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({ quality: 80 })
          .toFile(destPath);

        const optimizedSize = fs.statSync(destPath).size;
        totalOptimized += optimizedSize;
        fileCount++;

        const savings = (((originalSize - optimizedSize) / originalSize) * 100).toFixed(1);
        console.log(`  ✓ ${folder.name}/${file} → ${savings}% smaller`);
      } catch (err) {
        console.error(`  ✗ Failed to optimize ${file}:`, err.message);
      }
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log(`📊 Optimization complete!`);
  console.log(`   Files processed: ${fileCount}`);
  console.log(`   Original size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Optimized size: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Total savings: ${(((totalOriginal - totalOptimized) / totalOriginal) * 100).toFixed(1)}%`);
}

optimizeImages().catch(console.error);

