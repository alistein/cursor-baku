export interface EventItem {
  id: string;
  title: string;
  date?: string;
  ctaLabel: string;
  href: string;
  imageUrl?: string;
  placeholderVariant: "wireframe" | "desk" | "coding";
}

export const EVENTS: EventItem[] = [
  {
    id: "pixels-processes-coffee-meet-1",
    title: "Pixels and Processes Coffee Meet",
    ctaLabel: "Join on Luma",
    href: "https://lu.ma/",
    placeholderVariant: "wireframe",
  },
  {
    id: "vibe-coding-cursor-1",
    title: "Vibe Coding with Cursor",
    ctaLabel: "Join on Luma",
    href: "https://lu.ma/",
    placeholderVariant: "desk",
  },
  {
    id: "ai-driven-coding-hackathon-1",
    title: "AI-Driven Coding Hackathon",
    ctaLabel: "Join on Luma",
    href: "https://lu.ma/",
    placeholderVariant: "coding",
  },
  {
    id: "ai-driven-coding-hackathon-2",
    title: "AI-Driven Coding Hackathon",
    ctaLabel: "Join on Luma",
    href: "https://lu.ma/",
    placeholderVariant: "coding",
  },
  {
    id: "pixels-processes-coffee-meet-2",
    title: "Pixels and Processes Coffee Meet",
    ctaLabel: "Join on Luma",
    href: "https://lu.ma/",
    placeholderVariant: "wireframe",
  },
  {
    id: "vibe-coding-cursor-2",
    title: "Vibe Coding with Cursor",
    ctaLabel: "Join on Luma",
    href: "https://lu.ma/",
    placeholderVariant: "desk",
  },
  {
    id: "ai-driven-coding-hackathon-3",
    title: "AI-Driven Coding Hackathon",
    ctaLabel: "Join on Luma",
    href: "https://lu.ma/",
    placeholderVariant: "coding",
  },
  {
    id: "ai-driven-coding-hackathon-4",
    title: "AI-Driven Coding Hackathon",
    ctaLabel: "Join on Luma",
    href: "https://lu.ma/",
    placeholderVariant: "coding",
  },
];
