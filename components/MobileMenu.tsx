"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
];

interface MobileMenuProps {
  onClose: () => void;
}

/**
 * Mobile menu overlay — nav + CTA + footer block matches Figma `Menu` / `Footer` (e.g. 88:3242).
 */
export default function MobileMenu({ onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-cursor-bg">
      {/* Top bar — Figma: px 20, top 30, matches mobile navbar */}
      <div className="flex shrink-0 items-center justify-between px-5 pt-[30px]">
        <div className="flex items-center gap-3">
          <div className="relative size-10 shrink-0 overflow-hidden rounded-[12px] border-2 border-cursor-border">
            <Image
              src="/cursor-baku-logo.png"
              alt="Cursor Baku Logo"
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <span className="whitespace-nowrap font-sans text-[20px] font-medium tracking-[-0.6px] text-cursor-primary">
            Cursor Baku
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="text-cursor-primary transition-colors hover:text-cursor-secondary"
        >
          <X size={24} strokeWidth={2} />
        </button>
      </div>

      {/* Nav — Figma: left 20, top 171, gap 40 between rows */}
      <nav className="mt-[71px] flex flex-col gap-10 px-5">
        {NAV_LINKS.map(({ label, href }) => {
          const isActive = href.startsWith("/")
            && !href.includes("#")
            && pathname === href;
          return (
            <Link
              key={label}
              href={href}
              onClick={onClose}
              className={`flex items-center justify-between font-sans text-[36px] font-medium leading-none tracking-[-1.44px] transition-colors hover:text-cursor-secondary ${
                isActive ? "text-cursor-orange" : "text-cursor-primary"
              }`}
            >
              <span>{label}</span>
              <ChevronRight size={24} className="shrink-0 text-cursor-secondary" strokeWidth={2} />
            </Link>
          );
        })}
      </nav>

      {/* Spacer pushes CTA + footer to bottom */}
      <div className="min-h-8 flex-1" />

      {/* Get Updates — Figma: w 353, h 56, top 459 in full menu; here full width with px-5 */}
      <div className="shrink-0 px-5 pb-6">
        <Link
          href="/#updates"
          onClick={onClose}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-cursor-border bg-cursor-card px-5 py-3 transition-colors hover:border-cursor-secondary"
        >
          <span className="size-3 shrink-0 rounded-full bg-cursor-orange" />
          <span className="whitespace-nowrap font-ibm text-[18px] font-normal leading-normal tracking-[-0.36px] text-cursor-primary">
            Get Updates
          </span>
        </Link>
      </div>

      {/* Footer — Figma node 88:3242: h 189, overflow clip, bg #161312 */}
      <footer className="relative h-[189px] w-full shrink-0 overflow-hidden bg-cursor-bg">
        {/* Large “Cursor” — 88:3243: bottom 123px, 132.637px, gradient, translate-y-full, w 393 */}
        <p
          className="pointer-events-none absolute bottom-[140px] left-0 w-full translate-y-full select-none bg-linear-to-b from-cursor-secondary to-[#080808] bg-clip-text text-center font-sans text-[132.637px] font-medium leading-normal tracking-[-5.3055px] text-transparent"
          aria-hidden
        >
          Cursor
        </p>

        {/* Meta row — 88:3247: top 70px, above watermark */}
        <div className="absolute left-[calc(50%+12.5px)] top-[70px] z-10 flex -translate-x-1/2 items-center gap-[10px]">
          <span className="whitespace-nowrap font-ibm text-[12px] font-normal leading-normal tracking-[-0.24px] text-cursor-secondary">
            © Cursor Baku 2026
          </span>
          <div className="h-[14px] w-px shrink-0 bg-cursor-secondary" />
          <span className="whitespace-nowrap font-ibm text-[12px] font-normal leading-normal tracking-[-0.24px] text-cursor-secondary">
            hello@cursorbaku.com
          </span>
        </div>
      </footer>
    </div>
  );
}
