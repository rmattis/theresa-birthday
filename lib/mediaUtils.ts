export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function isVideo(filename: string): boolean {
  const ext = filename.split(".").pop()?.toLowerCase();
  return ["mp4", "mov", "webm"].includes(ext || "");
}

export function getMediaType(filename: string): "image" | "video" {
  return isVideo(filename) ? "video" : "image";
}

