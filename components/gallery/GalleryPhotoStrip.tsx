/* eslint-disable @next/next/no-img-element -- backend gallery URLs are not fixed Next image domains yet */
import Link from "next/link";
import type {
  GalleryItem,
  GalleryPhoto,
  GalleryPlaceholderVariant,
} from "./galleryData";

const placeholderStyles: Record<GalleryPlaceholderVariant, string> = {
  audience:
    "bg-[radial-gradient(circle_at_22%_36%,#f2f2f2_0_4%,transparent_5%),radial-gradient(circle_at_47%_43%,#c9c9c9_0_5%,transparent_6%),radial-gradient(circle_at_72%_34%,#f2f2f2_0_4%,transparent_5%),linear-gradient(135deg,#2a1c16_0%,#ad4f1f_45%,#111_100%)] before:absolute before:bottom-0 before:left-0 before:h-[42%] before:w-full before:bg-[#070707]/70 after:absolute after:left-[58%] after:top-[8%] after:h-[68%] after:w-[15%] after:-rotate-[18deg] after:rounded-full after:bg-[#f2f2f2]/70",
  workshop:
    "bg-[linear-gradient(90deg,#f2f2f2_0_52%,#d7d5cf_53%_100%)] before:absolute before:bottom-[16%] before:left-[8%] before:h-[28%] before:w-[84%] before:rounded-[10px] before:bg-[#1f2933]/60 after:absolute after:left-[20%] after:top-[24%] after:size-[28px] after:rounded-full after:bg-[#161312]/75",
  presentation:
    "bg-[linear-gradient(90deg,#252321_0_46%,#d9d1c2_47%_100%)] before:absolute before:bottom-[16%] before:left-[14%] before:h-[38%] before:w-[72%] before:rounded-t-[24px] before:bg-[#141414]/65 after:absolute after:right-[12%] after:top-[18%] after:h-[46%] after:w-[5px] after:bg-[#f2f2f2]/55",
  speaker:
    "bg-[linear-gradient(90deg,#d6d3ce_0_54%,#6a5144_55%_100%)] before:absolute before:bottom-[14%] before:left-[16%] before:h-[42%] before:w-[70%] before:rounded-t-[36px] before:bg-[#171717]/70 after:absolute after:left-[54%] after:top-[24%] after:size-[34px] after:rounded-full after:bg-[#f2f2f2]/80",
  coding:
    "bg-[linear-gradient(135deg,#04272b_0%,#111_48%,#d4772f_100%)] before:absolute before:bottom-[18%] before:left-[10%] before:h-[46%] before:w-[74%] before:rounded-[8px] before:bg-[#080808]/85 after:absolute after:right-[14%] after:top-[16%] after:h-[58%] after:w-[2px] after:bg-[#f2f2f2]/55",
};

export function GalleryPhotoTile({
  photo,
  overlayCount,
  className = "min-w-0 flex-1",
}: {
  photo: GalleryPhoto;
  overlayCount?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-[14px] bg-white ${className}`}
    >
      {photo.imageUrl ? (
        <img
          src={photo.imageUrl}
          alt={photo.alt}
          className="absolute inset-0 size-full object-cover object-center"
        />
      ) : (
        <div
          aria-label={photo.alt}
          role="img"
          className={`absolute inset-0 size-full overflow-hidden grayscale ${placeholderStyles[photo.placeholderVariant]}`}
        />
      )}

      {overlayCount !== undefined && overlayCount > 0 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70">
          <span className="font-ibm text-[36px] font-semibold leading-[1.45] tracking-[-0.72px] text-white">
            +{overlayCount}
          </span>
        </div>
      )}
    </div>
  );
}

export default function GalleryPhotoStrip({
  item,
  href,
}: {
  item: GalleryItem;
  href?: string;
}) {
  const visiblePhotos = item.photos.slice(0, 5);
  const hiddenCount = Math.max(item.totalPhotos - visiblePhotos.length, 0);

  const content = (
    <article className="flex w-full flex-col gap-10">
      <div className="flex flex-col gap-[10px]">
        <p className="font-ibm text-[20px] leading-[1.45] tracking-[-0.4px] text-cursor-secondary">
          {item.date}
        </p>
        <h3 className="max-w-[307px] font-sans text-[32px] font-medium leading-[1.2] tracking-[-1.28px] text-cursor-primary transition-colors group-hover:text-white">
          {item.title}
        </h3>
      </div>

      <div className="flex w-full items-center justify-center gap-5">
        {visiblePhotos.map((photo, index) => (
          <GalleryPhotoTile
            key={photo.id}
            photo={photo}
            overlayCount={index === visiblePhotos.length - 1 ? hiddenCount : undefined}
          />
        ))}
      </div>
    </article>
  );

  if (!href) {
    return content;
  }

  return (
    <Link
      href={href}
      aria-label={`Open ${item.title} gallery`}
      className="group block w-full"
    >
      {content}
    </Link>
  );
}
