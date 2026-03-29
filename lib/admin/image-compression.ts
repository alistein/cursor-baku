"use client";

import imageCompression from "browser-image-compression";

const compressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: "image/webp",
} as const;

function webpFileName(name: string): string {
  const baseName = name.replace(/\.[^/.]+$/, "");
  return `${baseName || "image"}.webp`;
}

export async function compressImageFile(file: File): Promise<File> {
  const compressed = await imageCompression(file, compressionOptions);

  return new File([compressed], webpFileName(file.name), {
    type: "image/webp",
    lastModified: Date.now(),
  });
}

export function compressImageFiles(files: File[]): Promise<File[]> {
  return Promise.all(files.map((file) => compressImageFile(file)));
}
