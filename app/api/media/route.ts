import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const albumDir = path.join(process.cwd(), "public", "album");
  
  try {
    const folders = fs.readdirSync(albumDir).filter((file) => {
      return fs.statSync(path.join(albumDir, file)).isDirectory();
    });

    const mediaMap: Record<string, string[]> = {};

    for (const folder of folders) {
      const folderPath = path.join(albumDir, folder);
      const files = fs.readdirSync(folderPath).filter((file) => {
        const ext = path.extname(file).toLowerCase();
        // Filter for images and videos, ignore .DS_Store etc
        return [".jpg", ".jpeg", ".png", ".gif", ".mp4", ".mov", ".webm"].includes(ext);
      });
      
      mediaMap[folder] = files;
    }

    return NextResponse.json(mediaMap);
  } catch (error) {
    console.error("Error reading album directory:", error);
    return NextResponse.json({ error: "Failed to read album directory" }, { status: 500 });
  }
}

