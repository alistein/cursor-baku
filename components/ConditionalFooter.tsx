"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";

/**
 * Renders the marketing footer on public pages only; admin routes use their own layout.
 */
export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return <Footer />;
}
