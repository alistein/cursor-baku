import Link from "next/link";
import GalleryMobileStack from "./GalleryMobileStack";
import GalleryPhotoStrip from "./GalleryPhotoStrip";
import {
  GALLERY_ITEMS,
  getGalleryItemHref,
  type GalleryItem,
} from "./galleryData";

interface GallerySectionProps {
  items?: GalleryItem[];
  maxItems?: number;
  seeMoreHref?: string | null;
  showDescription?: boolean;
  showSeeMore?: boolean;
}

export default function GallerySection({
  items = GALLERY_ITEMS,
  maxItems,
  seeMoreHref = "/gallery",
  showDescription = true,
  showSeeMore = true,
}: GallerySectionProps) {
  const visibleItems = typeof maxItems === "number" ? items.slice(0, maxItems) : items;

  return (
    <section id="gallery" className="bg-cursor-bg py-[80px] md:py-[120px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[80px] px-5 md:gap-[100px] md:px-[80px]">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <h2 className="font-sans text-[48px] font-medium leading-none tracking-[-1.92px] text-cursor-primary md:text-[72px] md:tracking-[-2.88px]">
            Gallery
          </h2>
          {showDescription && (
            <p className="w-full max-w-[300px] text-left font-ibm text-[18px] leading-[1.4] tracking-[-0.36px] text-cursor-secondary md:text-right md:text-[24px] md:tracking-[-0.48px]">
              A visual journey through our workshops and events.
            </p>
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-[80px] md:gap-[100px]">
          <div className="hidden w-full flex-col gap-[80px] md:flex md:gap-[100px]">
            {visibleItems.map((item) => (
              <GalleryPhotoStrip
                key={item.id}
                item={item}
                href={getGalleryItemHref(item.id)}
              />
            ))}
          </div>

          <div className="flex w-full flex-col items-center gap-[80px] md:hidden">
            {visibleItems.map((item) => (
              <GalleryMobileStack key={item.id} item={item} />
            ))}
          </div>

          {showSeeMore && (
            <>
              {seeMoreHref ? (
                <Link
                  href={seeMoreHref}
                  className="flex h-[52px] items-center justify-center rounded-[50px] border border-cursor-border bg-cursor-card px-[30px] py-3 font-ibm text-[18px] leading-[1.5] tracking-[-0.36px] text-cursor-primary transition-colors hover:border-cursor-secondary"
                >
                  See more
                </Link>
              ) : (
                <button
                  type="button"
                  className="flex h-[52px] items-center justify-center rounded-[50px] border border-cursor-border bg-cursor-card px-[30px] py-3 font-ibm text-[18px] leading-[1.5] tracking-[-0.36px] text-cursor-primary transition-colors hover:border-cursor-secondary"
                >
                  See more
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
