export type GalleryPlaceholderVariant =
  | "audience"
  | "workshop"
  | "presentation"
  | "speaker"
  | "coding";

export interface GalleryPhoto {
  id: string;
  alt: string;
  imageUrl?: string;
  placeholderVariant: GalleryPlaceholderVariant;
}

export interface GalleryItem {
  id: string;
  date: string;
  title: string;
  photos: GalleryPhoto[];
  totalPhotos: number;
}

export function getGalleryItemHref(id: string) {
  return `/gallery/${id}`;
}

const coffeeMeetPhotos: GalleryPhoto[] = [
  {
    id: "coffee-meet-hero",
    alt: "Audience at a Cursor Baku meetup",
    placeholderVariant: "audience",
  },
  {
    id: "coffee-meet-workshop",
    alt: "Workshop attendees around a table",
    placeholderVariant: "workshop",
  },
  {
    id: "coffee-meet-presentation",
    alt: "Presentation room with attendees",
    placeholderVariant: "presentation",
  },
  {
    id: "coffee-meet-speaker",
    alt: "Speaker presenting to the community",
    placeholderVariant: "speaker",
  },
  {
    id: "coffee-meet-group",
    alt: "Community members at an event",
    placeholderVariant: "audience",
  },
];

const vibeCodingPhotos: GalleryPhoto[] = [
  {
    id: "vibe-coding-laptops",
    alt: "Developers coding together",
    placeholderVariant: "coding",
  },
  {
    id: "vibe-coding-demo",
    alt: "Live coding demo at Cursor Baku",
    placeholderVariant: "presentation",
  },
  {
    id: "vibe-coding-talk",
    alt: "Speaker leading a technical session",
    placeholderVariant: "speaker",
  },
  {
    id: "vibe-coding-table",
    alt: "Participants working with laptops",
    placeholderVariant: "workshop",
  },
  {
    id: "vibe-coding-team",
    alt: "Team collaboration during a coding event",
    placeholderVariant: "coding",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "pixels-processes-coffee-meet",
    date: "Dec 12, 2025",
    title: "Pixels and Processes Coffee Meet",
    photos: coffeeMeetPhotos,
    totalPhotos: 17,
  },
  {
    id: "vibe-coding-with-cursor",
    date: "Feb 9, 2026",
    title: "Vibe Coding with Cursor",
    photos: vibeCodingPhotos,
    totalPhotos: 14,
  },
];

export function getGalleryItem(id: string) {
  return GALLERY_ITEMS.find((item) => item.id === id);
}
