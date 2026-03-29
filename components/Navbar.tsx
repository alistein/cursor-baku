"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="flex items-center justify-between h-10 md:h-[52px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative w-10 h-10 md:w-[52px] md:h-[52px] rounded-[12px] border-2 border-cursor-border overflow-hidden shrink-0">
            <Image
              src="/cursor-baku-logo.png"
              alt="Cursor Baku Logo"
              fill
              sizes="(max-width: 768px) 40px, 52px"
              className="object-cover"
            />
          </div>
          <span className="font-sans font-medium text-[20px] md:text-[28px] text-cursor-primary leading-normal tracking-[-0.6px] md:tracking-[-0.84px] whitespace-nowrap">
            Cursor Baku
          </span>
        </Link>

        {/* Desktop: nav links + controls */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-6">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = href.startsWith("/")
                && !href.includes("#")
                && pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  className={`font-ibm font-medium text-[18px] leading-normal tracking-[-0.36px] whitespace-nowrap transition-colors duration-200 ${
                    isActive
                      ? "text-cursor-orange"
                      : "text-cursor-secondary hover:text-cursor-primary"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-[10px]">
            <button className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-cursor-card border border-cursor-border hover:border-cursor-secondary transition-colors duration-200">
              <span className="font-ibm text-[18px] text-cursor-primary leading-normal tracking-[-0.36px]">
                En
              </span>
            </button>
            <Link
              href="/#updates"
              className="flex items-center gap-3 h-[52px] px-5 rounded-full bg-cursor-card border border-cursor-border hover:border-cursor-secondary transition-colors duration-200"
            >
              <span className="w-3 h-3 rounded-full bg-cursor-orange shrink-0" />
              <span className="font-ibm text-[18px] text-cursor-primary leading-normal tracking-[-0.36px] whitespace-nowrap">
                Get Updates
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile: hamburger button */}
        <button
          className="md:hidden text-cursor-primary hover:text-cursor-secondary transition-colors"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </>
  );
}
