import Navbar from "@/components/Navbar";
import { GallerySection } from "@/components/gallery";
import { listPublicAlbums } from "@/lib/admin/gallery-list";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Gallery",
  description:
    "Browse photos from Cursor Baku hackathons, workshops, meetups, and community events in Azerbaijan.",
  path: "/gallery",
  keywords: [
    "Cursor Baku gallery",
    "Baku developer events photos",
    "Cursor Hackathon Baku photos",
    "Azerbaijan tech community gallery",
  ],
  imageAlt: "Cursor Baku gallery and community event photos",
});

export default async function GalleryPage() {
  const albums = await listPublicAlbums(100).catch(() => []);

  return (
    <main className="min-h-screen bg-cursor-bg">
      <div className="mx-auto max-w-[1440px] px-5 pt-[30px] md:px-[80px] md:pt-[28px]">
        <Navbar />
      </div>
      <GallerySection items={albums} showSeeMore={false} />
    </main>
  );
}
