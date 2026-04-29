export type JoinPlatform = "luma" | "telegram" | "luhive";

export interface JoinCardConfig {
  platform: JoinPlatform;
  iconSrc: string;
  description: string;
  ctaLabel: string;
  href: string;
}

/** Replace hrefs with real community URLs when available */
export const JOIN_CARDS: JoinCardConfig[] = [
  {
    platform: "luma",
    iconSrc: "/join-icon-luma.svg",
    description:
      "Subscribe to our Luma calendar to stay informed about upcoming meetups, events, and hackathons in Baku.",
    ctaLabel: "Join on Luma",
    href: "https://luma.com/cursor-azerbaijan",
  },
  {
    platform: "telegram",
    iconSrc: "/telegram-logo.png",
    description:
      "Connect with other Cursor users in Baku on Telegram. Share hints, ask what you want, and stay informed on upcoming events.",
    ctaLabel: "Join on Telegram",
    href: "/telegram",
  },
  {
    platform: "luhive",
    iconSrc: "/join-icon-luhive.svg",
    description:
      "Connect with the Luhive network and join a collective where you can stay updated on workshops.",
    ctaLabel: "Join on Luhive",
    href: "https://luhive.com/c/cursor-baku",
  },
];
