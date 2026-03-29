import { AdminError } from "@/components/admin/AdminError";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { adminButtonPrimaryClass } from "@/components/admin/ui";
import { listEvents } from "@/lib/admin/events";
import type { EventRow } from "@/lib/admin/types";
import Link from "next/link";
import { GalleryUploadForm } from "../gallery-upload-form";

export default async function AdminGalleryNewPage() {
  let events: EventRow[] = [];
  let error: string | null = null;
  try {
    events = await listEvents(200);
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load events";
    events = [];
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="New gallery"
        title="Add gallery"
        description="Create a gallery album from a set of photos and optionally connect it to an event."
      />

      <div className="mb-8">
        <Link className={adminButtonPrimaryClass} href="/admin/gallery">
          Back to galleries
        </Link>
      </div>

      {error ? <AdminError message={error} /> : null}
      {error ? <div className="h-4" /> : null}

      <div className="rounded-[20px] border border-cursor-border bg-cursor-card p-6 md:p-8">
        <h2 className="font-sans text-[24px] font-medium tracking-[-0.6px] md:text-[28px] md:tracking-[-0.7px]">
          Gallery photos
        </h2>
        <GalleryUploadForm events={events} />
      </div>
    </div>
  );
}
