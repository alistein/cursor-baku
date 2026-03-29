import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminError } from "@/components/admin/AdminError";
import { StatCard } from "@/components/admin/StatCard";
import { adminButtonAccentClass, adminButtonPrimaryClass } from "@/components/admin/ui";
import { type AdminGalleryAlbum, listAdminGalleryAlbums } from "@/lib/admin/gallery-list";
import { getAdminOverviewStats } from "@/lib/admin/stats";
import { Calendar, Users, Images } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function AdminHomePage() {
  let stats;
  let galleries: AdminGalleryAlbum[] = [];
  let error: string | null = null;
  try {
    const [overviewStats, galleryRows] = await Promise.all([getAdminOverviewStats(), listAdminGalleryAlbums(3)]);
    stats = overviewStats;
    galleries = galleryRows;
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not load stats";
    stats = { subscribers: 0, events: 0, galleryImages: 0 };
    galleries = [];
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="Dashboard"
        title="Overview"
        description="Quick counts for subscribers, events, and gallery activity."
      />
      {error ? <AdminError message={error} /> : null}
      {error ? <div className="h-6" /> : null}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard title="Subscribers" value={stats.subscribers} icon={Users} />
        <StatCard title="Events" value={stats.events} icon={Calendar} />
        <StatCard title="Gallery images" value={stats.galleryImages} icon={Images} />
      </div>
      <div className="mt-10 rounded-[20px] border border-cursor-border bg-cursor-card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-sans text-[20px] font-medium tracking-[-0.4px]">Recent galleries</h2>
            <p className="mt-1 font-ibm text-[14px] text-cursor-secondary">Manage photo albums from the dashboard.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link className={adminButtonPrimaryClass + " px-4 py-2 text-[14px]"} href="/admin/gallery">
              View all
            </Link>
            <Link className={adminButtonAccentClass + " px-4 py-2 text-[14px]"} href="/admin/gallery/new">
              Add gallery
            </Link>
          </div>
        </div>
        {galleries.length === 0 ? (
          <p className="mt-5 font-ibm text-[15px] text-cursor-secondary">No galleries yet.</p>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
            {galleries.map((gallery) => (
              <Link
                key={gallery.id}
                href={`/admin/gallery/${gallery.id}`}
                className="overflow-hidden rounded-[16px] border border-cursor-border bg-cursor-bg/60 transition-colors hover:border-cursor-secondary"
              >
                <div className="relative aspect-4/3 w-full">
                  {gallery.previewUrl ? (
                    <Image
                      src={gallery.previewUrl}
                      alt={gallery.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center font-ibm text-[13px] text-cursor-secondary">
                      No photos yet
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="font-ibm text-[14px] text-cursor-primary">{gallery.title}</p>
                  <p className="mt-1 font-ibm text-[12px] text-cursor-secondary">
                    {gallery.photoCount} photo{gallery.photoCount === 1 ? "" : "s"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="mt-10 rounded-[20px] border border-cursor-border bg-cursor-card p-6">
        <h2 className="font-sans text-[20px] font-medium tracking-[-0.4px]">System check</h2>
        <p className="mt-2 max-w-[560px] font-ibm text-[15px] leading-normal text-cursor-secondary tracking-[-0.3px]">
          Use the health route on the deployed site to confirm production services:{" "}
          <code className="text-cursor-primary">/api/health/cloudflare</code>
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/subscribers"
            className="inline-flex items-center justify-center rounded-full border border-cursor-border bg-cursor-bg px-5 py-2 font-ibm text-[14px] text-cursor-primary transition-colors hover:border-cursor-secondary"
          >
            View subscribers
          </Link>
          <Link
            href="/admin/events"
            className="inline-flex items-center justify-center rounded-full border border-cursor-border bg-cursor-bg px-5 py-2 font-ibm text-[14px] text-cursor-primary transition-colors hover:border-cursor-secondary"
          >
            Manage events
          </Link>
        </div>
      </div>
    </div>
  );
}
