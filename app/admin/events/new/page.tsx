import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { adminButtonPrimaryClass } from "@/components/admin/ui";
import Link from "next/link";
import { CreateEventForm } from "../create-event-form";

export default function AdminEventNewPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="New event"
        title="Add event"
        description="Create a dated event card with a title, description, square cover, and registration link."
      />

      <div className="mb-8">
        <Link className={adminButtonPrimaryClass} href="/admin/events">
          Back to events
        </Link>
      </div>

      <div className="rounded-[20px] border border-cursor-border bg-cursor-card p-6 md:p-8">
        <h2 className="font-sans text-[24px] font-medium tracking-[-0.6px] md:text-[28px] md:tracking-[-0.7px]">
          Event details
        </h2>
        <p className="mb-2 mt-1 font-ibm text-[15px] text-cursor-secondary">
          Slug is generated from the title. After creation, you will return to the events list.
        </p>
        <CreateEventForm />
      </div>
    </div>
  );
}
