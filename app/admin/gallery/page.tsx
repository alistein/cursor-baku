import { AdminError } from "@/components/admin/AdminError";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { adminButtonAccentClass, adminButtonPrimaryClass } from "@/components/admin/ui";
import { type AdminGalleryAlbum, listAdminGalleryAlbums } from "@/lib/admin/gallery-list";
import Image from "next/image";
import Link from "next/link";

export default async function AdminGalleryPage() {
  let albums: AdminGalleryAlbum[] = [];
  let error: string | null = null;
  try {
    albums = await listAdminGalleryAlbums(100);
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load gallery";
    albums = [];
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="Media"
        title="Gallery & uploads"
        description="Create albums, upload photo sets, and connect them to events."
      />
      <div className="mb-8 flex justify-end">
        <Link className={adminButtonAccentClass} href="/admin/gallery/new">
          Add gallery
        </Link>
      </div>
      {error ? <AdminError message={error} /> : null}
      {error ? <div className="h-4" /> : null}

      <h2 className="mb-4 font-sans text-[22px] font-medium tracking-[-0.5px]">All galleries</h2>
      {albums.length === 0 && !error ? (
        <p className="font-ibm text-[15px] text-cursor-secondary">No galleries yet. Add your first gallery.</p>
      ) : null}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <div key={album.id} className="overflow-hidden rounded-[20px] border border-cursor-border bg-cursor-bg/40">
            <div className="relative aspect-4/3 w-full">
              {album.previewUrl ? (
                <Image
                  src={album.previewUrl}
                  alt={album.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-cursor-card font-ibm text-[14px] text-cursor-secondary">
                  No photos yet
                </div>
              )}
            </div>
            <div className="p-3">
              <p className="mt-0.5 font-ibm text-[15px] text-cursor-primary">{album.title}</p>
              {album.eventTitle ? (
                <p className="mt-1 font-ibm text-[12px] text-cursor-secondary">Event: {album.eventTitle}</p>
              ) : null}
              <p className="mt-1 font-ibm text-[12px] text-cursor-secondary/90">
                {album.photoCount} photo{album.photoCount === 1 ? "" : "s"}
              </p>
              <p className="mt-1 font-ibm text-[11px] text-cursor-secondary/80">{album.updatedAt}</p>
              <div className="mt-4">
                <Link className={adminButtonPrimaryClass + " px-4 py-2 text-[14px]"} href={`/admin/gallery/${album.id}`}>
                  Manage
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
