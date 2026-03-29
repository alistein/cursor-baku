"use client";

import { usePathname } from "next/navigation";
import { AdminNavDesktop, AdminNavMobile } from "./AdminNav";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/admin";

  return (
    <div className="flex min-h-screen flex-col bg-cursor-bg text-cursor-primary md:flex-row">
      <AdminNavMobile pathname={pathname} />
      <AdminNavDesktop pathname={pathname} />
      <div className="min-h-screen min-w-0 flex-1 px-5 py-8 md:px-10 md:py-12">
        <div className="mx-auto max-w-[1200px]">{children}</div>
      </div>
    </div>
  );
}
