import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import type { GalleryPlaceholderVariant } from "@/components/gallery/galleryData";
import { getPublicAlbumById } from "@/lib/admin/gallery-list";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface GalleryOgImageProps {
  params: Promise<{
    galleryId: string;
  }>;
}

const placeholderBackgrounds: Record<GalleryPlaceholderVariant, string> = {
  audience:
    "linear-gradient(135deg, #2a1c16 0%, #ad4f1f 45%, #070707 100%)",
  workshop: "linear-gradient(90deg, #f2f2f2 0%, #d7d5cf 54%, #171717 100%)",
  presentation:
    "linear-gradient(90deg, #252321 0%, #d9d1c2 48%, #6a5144 100%)",
  speaker: "linear-gradient(90deg, #d6d3ce 0%, #6a5144 56%, #111111 100%)",
  coding: "linear-gradient(135deg, #04272b 0%, #111111 48%, #d4772f 100%)",
};

export default async function GalleryOgImage({ params }: GalleryOgImageProps) {
  const { galleryId } = await params;
  const item = await getPublicAlbumById(galleryId).catch(() => null);

  if (!item) {
    notFound();
  }

  const heroPhoto = item.photos[0];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#161312",
          padding: 64,
          color: "#f2f2f2",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 56,
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                maxWidth: 520,
              }}
            >
              <div
                style={{
                  color: "#707070",
                  fontSize: 32,
                  letterSpacing: -0.64,
                }}
              >
                {item.date}
              </div>
              <div
                style={{
                  fontSize: 72,
                  lineHeight: 0.98,
                  letterSpacing: -2.88,
                  fontWeight: 700,
                }}
              >
                {item.title}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                width: 500,
                height: 330,
                borderRadius: 28,
                overflow: "hidden",
                background: heroPhoto?.imageUrl
                  ? "#221f1e"
                  : placeholderBackgrounds[heroPhoto?.placeholderVariant ?? "audience"],
                border: "1px solid #41403e",
              }}
            >
              {heroPhoto?.imageUrl ? (
                <img
                  src={heroPhoto.imageUrl}
                  alt={heroPhoto.alt}
                  width={500}
                  height={330}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.22)",
                    fontSize: 40,
                    fontWeight: 700,
                    letterSpacing: -0.8,
                  }}
                >
                  Cursor Baku
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#707070",
              fontSize: 28,
              letterSpacing: -0.56,
            }}
          >
            <span>Gallery</span>
            <span>{item.totalPhotos} photos</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
