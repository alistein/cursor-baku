import Navbar from "@/components/Navbar";
import { EventsSection } from "@/components/events";
import type { EventItem } from "@/components/events/eventsData";
import { listEvents } from "@/lib/admin/events";
import { publicMediaUrl } from "@/lib/admin/media";
import type { EventRow } from "@/lib/admin/types";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Events",
  description:
    "Discover Cursor Baku meetups, hackathons, Cursor Cafe sessions, and AI coding events for developers and builders in Azerbaijan.",
  path: "/events",
  keywords: [
    "Cursor Baku events",
    "Baku hackathons",
    "AI coding events Azerbaijan",
    "developer meetups Baku",
  ],
  imageAlt: "Cursor Baku events and hackathons",
});

const EVENT_PLACEHOLDERS = ["wireframe", "desk", "coding"] as const satisfies readonly EventItem["placeholderVariant"][];

function formatEventDate(date: string | null): string | undefined {
  if (!date) {
    return undefined;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function rowToEventItem(row: EventRow, index: number): EventItem {
  return {
    id: row.id,
    title: row.title,
    date: formatEventDate(row.event_date),
    ctaLabel: row.registration_url ? "Show Event" : "Coming soon",
    href: row.registration_url ?? "#",
    imageUrl: row.cover_image_key ? publicMediaUrl(row.cover_image_key) : undefined,
    placeholderVariant: EVENT_PLACEHOLDERS[index % EVENT_PLACEHOLDERS.length]!,
  };
}

export default async function EventsPage() {
  const rawEvents = await listEvents(100).catch(() => [] as EventRow[]);
  const events = rawEvents.map(rowToEventItem);

  return (
    <main className="min-h-screen bg-cursor-bg">
      <div className="mx-auto max-w-[1440px] px-5 pt-[30px] md:px-[80px] md:pt-[28px]">
        <Navbar />
      </div>
      <EventsSection events={events} showSeeMore={false} />
    </main>
  );
}
