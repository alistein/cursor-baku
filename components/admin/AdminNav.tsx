import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, Users, Calendar, Images, ExternalLink } from "lucide-react";

const LINKS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users, exact: false },
  { href: "/admin/events", label: "Events", icon: Calendar, exact: false },
  { href: "/admin/gallery", label: "Gallery", icon: Images, exact: false },
] as const;

function NavList({ pathname }: { pathname: string }) {
  return (
    <nav className="flex flex-col gap-1">
      {LINKS.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-[14px] px-4 py-3 font-ibm text-[15px] tracking-[-0.3px] transition-colors duration-200 ${
              active
                ? "bg-cursor-border/40 text-cursor-primary"
                : "text-cursor-secondary hover:bg-cursor-border/20 hover:text-cursor-primary"
            }`}
          >
            <Icon className="size-5 shrink-0 opacity-80" strokeWidth={1.75} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminNavDesktop({ pathname }: { pathname: string }) {
  return (
    <div className="hidden w-[260px] shrink-0 flex-col border-r border-cursor-border bg-cursor-bg/80 px-5 py-8 md:flex">
      <div className="mb-10 flex items-center gap-3">
        <div className="relative size-10 shrink-0 overflow-hidden rounded-[10px] border-2 border-cursor-border">
          <Image
            src="/cursor-baku-logo.png"
            alt="Cursor Baku"
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-sans text-[12px] font-medium uppercase tracking-[0.08em] text-cursor-secondary">Admin</p>
          <p className="font-sans text-[20px] font-medium tracking-[-0.4px] text-cursor-primary">Cursor Baku</p>
        </div>
      </div>
      <NavList pathname={pathname} />
      <div className="mt-auto pt-10">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-[14px] px-4 py-3 font-ibm text-[15px] text-cursor-secondary transition-colors duration-200 hover:text-cursor-primary"
        >
          <ExternalLink className="size-4" strokeWidth={1.75} />
          Public site
        </Link>
      </div>
    </div>
  );
}

export function AdminNavMobile({ pathname }: { pathname: string }) {
  return (
    <div className="border-b border-cursor-border bg-cursor-bg/95 p-4 md:hidden">
      <div className="mb-4 flex items-center gap-2">
        <div className="relative size-9 overflow-hidden rounded-[8px] border border-cursor-border">
          <Image
            src="/cursor-baku-logo.png"
            alt="Cursor Baku"
            width={36}
            height={36}
            className="object-cover"
          />
        </div>
        <span className="font-sans text-[18px] font-medium tracking-[-0.36px]">Admin</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {LINKS.map(({ href, label }) => {
          const isOverview = href === "/admin";
          const active = isOverview ? pathname === "/admin" : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={`rounded-full px-3 py-1.5 font-ibm text-[13px] tracking-[-0.26px] ${
                active
                  ? "bg-cursor-orange/20 text-cursor-primary"
                  : "bg-cursor-card text-cursor-secondary"
              }`}
            >
              {label}
            </Link>
          );
        })}
        <Link
          href="/"
          className="rounded-full border border-cursor-border px-3 py-1.5 font-ibm text-[13px] text-cursor-secondary"
        >
          Site
        </Link>
      </div>
    </div>
  );
}
