import Link from "next/link";
import EventCard from "./EventCard";
import { EVENTS, type EventItem } from "./eventsData";

interface EventsSectionProps {
  events?: EventItem[];
  maxItems?: number;
  seeMoreHref?: string;
  showDescription?: boolean;
  showSeeMore?: boolean;
}

export default function EventsSection({
  events = EVENTS,
  maxItems,
  seeMoreHref = "/events",
  showDescription = true,
  showSeeMore = true,
}: EventsSectionProps) {
  const visibleEvents = typeof maxItems === "number" ? events.slice(0, maxItems) : events;

  return (
    <section id="events" className="bg-cursor-bg py-[80px] md:py-[120px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[80px] px-5 md:gap-[100px] md:px-[80px]">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <h2 className="font-sans text-[48px] font-medium leading-none tracking-[-1.92px] text-cursor-primary md:text-[72px] md:tracking-[-2.88px]">
            Events
          </h2>
          {showDescription && (
            <p className="w-full max-w-[350px] text-left font-ibm text-[18px] leading-[1.4] tracking-[-0.36px] text-cursor-secondary md:text-right md:text-[24px] md:tracking-[-0.48px]">
              Participate in our meetups, sprint hackathons, and AI deep-dives.
            </p>
          )}
        </div>

        <div className="flex flex-col items-center gap-[80px] md:gap-[100px]">
          <div className="grid w-full max-w-[1280px] grid-cols-1 justify-items-center gap-y-[70px] sm:grid-cols-2 sm:gap-x-[26.666px] md:gap-y-[100px] lg:grid-cols-4">
            {visibleEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>

          {showSeeMore && (
            <Link
              href={seeMoreHref}
              className="flex h-[52px] items-center rounded-[50px] border border-cursor-border bg-cursor-card px-[30px] py-3 font-ibm text-[18px] leading-[1.5] tracking-[-0.36px] text-cursor-primary transition-colors hover:border-cursor-secondary"
            >
              See more
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
