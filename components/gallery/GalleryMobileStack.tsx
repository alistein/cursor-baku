import Link from "next/link";
import { GalleryPhotoTile } from "./GalleryPhotoStrip";
import { getGalleryItemHref, type GalleryItem } from "./galleryData";

/**
 * Mobile gallery preview (Figma node 80-2523): stacked “fan” of three
 * images, then date and title. Uses the first three `photos` as back-left,
 * back-right, and front (center).
 */
export default function GalleryMobileStack({
  item,
  linkHref = getGalleryItemHref(item.id),
}: {
  item: GalleryItem;
  linkHref?: string;
}) {
  const [center, left, right] = item.photos;
  if (!center) {
    return null;
  }

  const block = (
    <div className="flex w-full max-w-[353px] flex-col gap-[12px]">
      <div className="relative aspect-353/160 w-full">
        {left && (
          <div className="absolute left-0 top-[10%] z-10 w-[55%] origin-center -rotate-[10deg]">
            <GalleryPhotoTile photo={left} className="w-full min-w-0" />
          </div>
        )}

        {right && (
          <div className="absolute right-0 top-[10%] z-10 w-[55%] origin-center rotate-[10deg]">
            <GalleryPhotoTile photo={right} className="w-full min-w-0" />
          </div>
        )}

        <div className="absolute left-1/2 top-0 z-20 w-[68%] -translate-x-1/2">
          <GalleryPhotoTile photo={center} className="w-full min-w-0" />
        </div>
      </div>

      <div className="flex w-full flex-col gap-[10px]">
        <p className="shrink-0 font-ibm text-[16px] font-normal leading-[1.45] tracking-[-0.32px] text-cursor-secondary">
          {item.date}
        </p>
        <p className="w-full min-w-0 max-w-full font-sans text-[32px] font-medium leading-[1.2] tracking-[-1.28px] text-cursor-primary">
          {item.title}
        </p>
      </div>
    </div>
  );

  if (!linkHref) {
    return <div className="w-full">{block}</div>;
  }

  return (
    <Link
      href={linkHref}
      className="group block w-full max-w-[353px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cursor-primary"
      aria-label={`Open ${item.title} gallery`}
    >
      {block}
    </Link>
  );
}
