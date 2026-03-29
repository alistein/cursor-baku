import { AdminError } from "@/components/admin/AdminError";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StatusPill } from "@/components/admin/StatusPill";
import { listSubscribers } from "@/lib/admin/subscribers";
import type { SubscriberRow } from "@/lib/admin/types";

export default async function AdminSubscribersPage() {
  let rows: SubscriberRow[] = [];
  let error: string | null = null;
  try {
    rows = await listSubscribers(500);
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load subscribers";
    rows = [];
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="Data"
        title="Subscribers"
        description="Latest emails from the hero and future sign-up forms."
      />
      {error ? <AdminError message={error} /> : null}
      {error ? <div className="h-4" /> : null}

      <div className="overflow-x-auto rounded-[20px] border border-cursor-border">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-cursor-border bg-cursor-card/50">
              <th className="px-4 py-3 font-ibm text-[12px] font-medium uppercase tracking-wider text-cursor-secondary">Email</th>
              <th className="px-4 py-3 font-ibm text-[12px] font-medium uppercase tracking-wider text-cursor-secondary">Status</th>
              <th className="px-4 py-3 font-ibm text-[12px] font-medium uppercase tracking-wider text-cursor-secondary">Created</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && !error ? (
              <tr>
                <td colSpan={3} className="px-4 py-10 text-center font-ibm text-[15px] text-cursor-secondary">
                  No subscribers yet.
                </td>
              </tr>
            ) : null}
            {rows.map((s) => (
              <tr key={s.id} className="border-b border-cursor-border/60 bg-cursor-bg/40">
                <td className="px-4 py-3 font-ibm text-[15px] text-cursor-primary">{s.email}</td>
                <td className="px-4 py-3">
                  <StatusPill value={s.status} />
                </td>
                <td className="px-4 py-3 font-ibm text-[14px] text-cursor-secondary">{s.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
