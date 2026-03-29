import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import GalleryAlbumGrid from "@/components/gallery/GalleryAlbumGrid";
import type { GalleryItem } from "@/components/gallery/galleryData";
import { getPublicAlbumById } from "@/lib/admin/gallery-list";
import { createPageMetadata } from "@/lib/seo";

interface GalleryDetailPageProps {
  params: Promise<{
    galleryId: string;
  }>;
}

function getOgImage(item: GalleryItem) {
  return item.photos[0]?.imageUrl ?? `/gallery/${item.id}/opengraph-image`;
}

export async function generateMetadata({
  params,
}: GalleryDetailPageProps): Promise<Metadata> {
  const { galleryId } = await params;
  const item = await getPublicAlbumById(galleryId).catch(() => null);

  if (!item) {
    return {
      title: "Gallery Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = `Explore ${item.totalPhotos} photos from ${item.title}, a Cursor Baku community event in Azerbaijan${item.date ? ` from ${item.date}` : ""}.`;
  const imageUrl = getOgImage(item);

  return createPageMetadata({
    title: item.title,
    description,
    path: `/gallery/${item.id}`,
    image: imageUrl,
    imageAlt: item.photos[0]?.alt ?? `${item.title} gallery by Cursor Baku`,
    keywords: [
      item.title,
      "Cursor Baku photos",
      "Baku developer community photos",
      "Azerbaijan tech events",
    ],
  });
}

export default async function GalleryDetailPage({
  params,
}: GalleryDetailPageProps) {
  const { galleryId } = await params;
  const item = await getPublicAlbumById(galleryId).catch(() => null);

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-cursor-bg">
      <div className="mx-auto max-w-[1440px] px-5 pt-[30px] md:px-[80px] md:pt-[28px]">
        <Navbar />
      </div>

      <section className="bg-cursor-bg py-[80px] md:py-[120px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-[80px] px-5 md:gap-[100px] md:px-[80px]">
          <div className="flex flex-col gap-[10px]">
            <p className="font-ibm text-[20px] leading-[1.45] tracking-[-0.4px] text-cursor-secondary">
              {item.date}
            </p>
            <h1 className="max-w-[760px] font-sans text-[48px] font-medium leading-none tracking-[-1.92px] text-cursor-primary md:text-[72px] md:tracking-[-2.88px]">
              {item.title}
            </h1>
          </div>

          <GalleryAlbumGrid item={item} />
        </div>
      </section>
    </main>
  );
}
