import { createPageMetadata } from "@/lib/seo";
import Hero from "@/components/Hero";
import JoinCommunity from "@/components/JoinCommunity";
import WhoItsFor from "@/components/WhoItsFor";
import { EventsSection } from "@/components/events";
import type { EventItem } from "@/components/events/eventsData";
import { GallerySection } from "@/components/gallery";
import { listEvents } from "@/lib/admin/events";
import { listPublicAlbums } from "@/lib/admin/gallery-list";
import { publicMediaUrl } from "@/lib/admin/media";
import type { EventRow } from "@/lib/admin/types";

export const metadata = createPageMetadata({
  title: "Cursor Baku | AI Developer Community in Azerbaijan",
  titleAbsolute: true,
  description:
    "Join Cursor Baku for AI coding meetups, hackathons, build-in-public sessions, Cursor Cafe gatherings, and developer community events in Azerbaijan.",
  path: "/",
  keywords: [
    "AI developer community Baku",
    "Cursor Baku community",
    "Azerbaijan developers",
    "Baku tech events",
  ],
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

export default async function Home() {
  const [rawEvents, albums] = await Promise.all([
    listEvents(8).catch(() => [] as EventRow[]),
    listPublicAlbums(3).catch(() => []),
  ]);

  const events = rawEvents.map(rowToEventItem);

  return (
    <main>
      <Hero />
      <WhoItsFor />
      <EventsSection events={events} maxItems={4} showDescription={false} />
      <GallerySection items={albums} maxItems={3} showDescription={false} />
      <JoinCommunity />
    </main>
  );
}
