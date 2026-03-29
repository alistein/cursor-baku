"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { GalleryPhotoTile } from "./GalleryPhotoStrip";
import type { GalleryItem, GalleryPhoto } from "./galleryData";

function PhotoModal({
  selectedPhoto,
  onClose,
}: {
  selectedPhoto: GalleryPhoto;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-5 py-6 backdrop-blur-sm md:px-[80px]"
      role="dialog"
      aria-modal="true"
      aria-label={selectedPhoto.alt}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close photo view"
        className="absolute right-5 top-5 flex size-[52px] items-center justify-center rounded-full border border-cursor-border bg-cursor-card text-cursor-primary transition-colors hover:border-cursor-secondary md:right-[80px] md:top-[50px]"
      >
        <X size={24} strokeWidth={1.8} />
      </button>

      <div
        className="w-full max-w-[1100px]"
        onClick={(event) => event.stopPropagation()}
      >
        <GalleryPhotoTile
          photo={selectedPhoto}
          className="w-full min-w-0 max-w-[min(100%,calc(80vh*16/9))] rounded-[20px]"
        />
      </div>
    </div>
  );
}

export default function GalleryAlbumGrid({ item }: { item: GalleryItem }) {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  return (
    <>
      <div className="grid w-full grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-5">
        {item.photos.map((photo) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setSelectedPhoto(photo)}
            aria-label={`Open ${photo.alt}`}
            className="block w-full cursor-zoom-in text-left transition-opacity hover:opacity-85"
          >
            <GalleryPhotoTile
              photo={photo}
              className="w-full min-w-0"
            />
          </button>
        ))}
      </div>

      {selectedPhoto && (
        <PhotoModal
          selectedPhoto={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </>
  );
}
