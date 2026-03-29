import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { previewKeyUrl } from "@/lib/admin/media";
import { getEventById } from "@/lib/admin/events";
import { notFound } from "next/navigation";
import { EditEventForm } from "../edit-event-form";
import type { EventRow } from "@/lib/admin/types";
import Image from "next/image";

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminEventEditPage({ params }: PageProps) {
  const { id } = await params;
  const event: EventRow | null = await getEventById(id);
  if (!event) {
    notFound();
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="Edit event"
        title={event.title}
        description="Update the date, title, description, square cover, and registration link."
      />

      <div className="mb-8 rounded-[20px] border border-cursor-border bg-cursor-card p-6 md:p-8">
        <h2 className="mb-1 font-sans text-[20px] font-medium tracking-[-0.4px]">Details</h2>
        <EditEventForm event={event} />
      </div>

      {event.cover_image_key ? (
        <div className="mb-8">
          <h3 className="mb-2 font-ibm text-[12px] uppercase tracking-wider text-cursor-secondary">Current cover</h3>
          <div className="relative aspect-square max-w-[320px] overflow-hidden rounded-[16px] border border-cursor-border">
            <Image
              src={previewKeyUrl(event.cover_image_key)}
              alt="Cover"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
