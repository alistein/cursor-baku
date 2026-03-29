import { AdminError } from "@/components/admin/AdminError";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { adminButtonAccentClass } from "@/components/admin/ui";
import { listEvents } from "@/lib/admin/events";
import type { EventRow } from "@/lib/admin/types";
import { DeleteEventButton } from "./delete-event-button";
import { EventsToast } from "./events-toast";
import Link from "next/link";

type PageProps = {
  searchParams?: Promise<{ toast?: string | string[] }>;
};

function todayYmd() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatEventDate(value: string | null) {
  if (!value) {
    return "No date set";
  }
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) {
    return value;
  }
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function getToastValue(toast: string | string[] | undefined) {
  return Array.isArray(toast) ? toast[0] : toast;
}

export default async function AdminEventsPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};
  const toast = getToastValue(params.toast);
  const today = todayYmd();
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
      <EventsToast value={toast} />
      <AdminPageHeader
        eyebrow="Content"
        title="Events"
        description="Manage dated event cards, registration links, and covers for the public events section."
      />
      <div className="mb-8 flex justify-end">
        <Link className={adminButtonAccentClass} href="/admin/events/new">
          Add event
        </Link>
      </div>
      {error ? <AdminError message={error} /> : null}
      {error ? <div className="h-4" /> : null}

      <h2 className="mb-4 font-sans text-[22px] font-medium tracking-[-0.5px]">All events</h2>
      <div className="space-y-3">
        {events.length === 0 && !error ? (
          <p className="font-ibm text-[15px] text-cursor-secondary">No events yet.</p>
        ) : null}
        {events.map((e) => (
          <div
            key={e.id}
            className="flex flex-col gap-4 rounded-[20px] border border-cursor-border bg-cursor-bg/40 p-4 md:flex-row md:items-center md:justify-between"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-sans text-[20px] font-medium tracking-[-0.4px]">{e.title}</p>
                {e.event_date && e.event_date < today ? (
                  <span className="rounded-full border border-cursor-border px-2.5 py-0.5 font-ibm text-[12px] font-medium uppercase tracking-wide text-cursor-secondary">
                    Past
                  </span>
                ) : null}
              </div>
              <p className="mt-1 line-clamp-2 font-ibm text-[14px] text-cursor-secondary">{e.description || "No description"}</p>
              <div className="mt-3 flex flex-wrap gap-2 font-ibm text-[13px] text-cursor-secondary">
                <span className="rounded-full border border-cursor-border px-3 py-1 text-cursor-primary">
                  {formatEventDate(e.event_date)}
                </span>
                <span className="rounded-full border border-cursor-border px-3 py-1">
                  {e.registration_url ? "Registration open" : "No registration link"}
                </span>
                <span className="rounded-full border border-cursor-border px-3 py-1">/{e.slug}</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                className="inline-flex rounded-full border border-cursor-border bg-cursor-card px-4 py-2 font-ibm text-[14px] text-cursor-primary transition-colors hover:border-cursor-secondary"
                href={`/admin/events/${e.id}`}
              >
                Edit
              </Link>
              <DeleteEventButton eventId={e.id} title={e.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
