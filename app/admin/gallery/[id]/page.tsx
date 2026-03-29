import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { adminButtonPrimaryClass } from "@/components/admin/ui";
import { getAdminGalleryAlbum } from "@/lib/admin/gallery-list";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteGalleryPhotoButton } from "../delete-gallery-photo-button";
import { GalleryUploadForm } from "../gallery-upload-form";

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminGalleryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const album = await getAdminGalleryAlbum(id);
  if (!album) {
    notFound();
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="Manage gallery"
        title={album.title}
        description="Add more photos to this gallery or delete photos that should no longer appear."
      />

      <div className="mb-8 flex flex-wrap gap-3">
        <Link className={adminButtonPrimaryClass} href="/admin/gallery">
          Back to galleries
        </Link>
        <Link className={adminButtonPrimaryClass} href={`/gallery/${album.id}`} target="_blank">
          View public gallery
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-[18px] border border-cursor-border bg-cursor-card p-4">
          <p className="font-ibm text-[12px] uppercase tracking-wider text-cursor-secondary">Photos</p>
          <p className="mt-1 font-sans text-[28px] font-medium text-cursor-primary">{album.photoCount}</p>
        </div>
        <div className="rounded-[18px] border border-cursor-border bg-cursor-card p-4 sm:col-span-2">
          <p className="font-ibm text-[12px] uppercase tracking-wider text-cursor-secondary">Event</p>
          <p className="mt-1 font-ibm text-[15px] text-cursor-primary">{album.eventTitle ?? "No event attached"}</p>
        </div>
      </div>

      <div className="mb-10 rounded-[20px] border border-cursor-border bg-cursor-card p-6 md:p-8">
        <h2 className="font-sans text-[24px] font-medium tracking-[-0.5px]">Add photos</h2>
        <GalleryUploadForm
          albumId={album.id}
          helperText="Add more photos to this existing gallery. The caption will be used for every selected photo."
        />
      </div>

      <h2 className="mb-4 font-sans text-[22px] font-medium tracking-[-0.5px]">Photos</h2>
      {album.photos.length === 0 ? (
        <p className="font-ibm text-[15px] text-cursor-secondary">No photos in this gallery yet.</p>
      ) : null}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {album.photos.map((photo) => (
          <div key={photo.id} className="overflow-hidden rounded-[20px] border border-cursor-border bg-cursor-bg/40">
            <div className="relative aspect-4/3 w-full">
              <Image
                src={photo.previewUrl}
                alt={photo.alt ?? album.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
              />
            </div>
            <div className="p-3">
              <p className="font-ibm text-[13px] text-cursor-secondary">{photo.caption ?? "No caption"}</p>
              <p className="mt-1 break-all font-ibm text-[11px] leading-snug text-cursor-secondary/90">{photo.key}</p>
              <div className="mt-4">
                <DeleteGalleryPhotoButton photoId={photo.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
