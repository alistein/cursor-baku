export interface FooterNavItem {
  label: string;
  href: string;
}

export interface FooterConfig {
  newsletterTitle: string;
  newsletterDescription: string;
  explore: FooterNavItem[];
  joinUs: FooterNavItem[];
  cursor: FooterNavItem[];
  emailContact: string;
  year: number;
  orgName: string;
  privacyHref: string;
  rightsLine: string;
  /** Large wordmark behind the footer (desktop + mobile) */
  brandWordmark: string;
  /** Credits under the wordmark — “Ali” / “Nilufar” link out */
  creditsAliHref: string;
  creditsNilufarHref: string;
}

export const defaultFooterConfig: FooterConfig = {
  newsletterTitle: "Subscribe for Updates",
  newsletterDescription:
    "Be the first to see our upcoming events and latest community updates.",
  explore: [
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
  ],
  joinUs: [
    { label: "Telegram", href: "/telegram" },
    { label: "Luma", href: "https://luma.com/cursor-azerbaijan" },
    { label: "Luhive", href: "https://luhive.com/c/cursor-baku" },
  ],
  cursor: [
    { label: "cursor.com", href: "https://cursor.com" },
    {
      label: "About Cursor",
      href: "https://en.wikipedia.org/wiki/Cursor_(code_editor)",
    },
    { label: "Global Community", href: "https://cursor.com/community" },
  ],
  emailContact: "hello@cursorbaku.com",
  year: 2026,
  orgName: "Cursor Baku",
  privacyHref: "#",
  rightsLine: "All rights reserved.",
  brandWordmark: "Cursor",
  creditsAliHref: "https://www.linkedin.com/in/alyaliyev/",
  creditsNilufarHref: "https://www.linkedin.com/in/nilufarsafarli/",
};

/** Merge overrides for use from other pages / layouts (undefined keys are ignored) */
export function footerConfig(
  partial?: Partial<FooterConfig> & {
    explore?: FooterNavItem[];
    joinUs?: FooterNavItem[];
    cursor?: FooterNavItem[];
  },
): FooterConfig {
  if (!partial) return defaultFooterConfig;
  const cleaned = Object.fromEntries(
    Object.entries(partial).filter(([, v]) => v !== undefined),
  ) as Partial<FooterConfig>;
  return {
    ...defaultFooterConfig,
    ...cleaned,
    explore: cleaned.explore ?? defaultFooterConfig.explore,
    joinUs: cleaned.joinUs ?? defaultFooterConfig.joinUs,
    cursor: cleaned.cursor ?? defaultFooterConfig.cursor,
  };
}
