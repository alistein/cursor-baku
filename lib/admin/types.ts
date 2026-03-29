export interface SubscriberRow {
  id: string;
  email: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface EventRow {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  event_date: string | null;
  registration_url: string | null;
  cover_image_key: string | null;
  created_at: string;
  updated_at: string;
}

export interface GalleryImageRow {
  id: string;
  album_id: string;
  image_key: string;
  alt_text: string | null;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

export interface GalleryAlbumRow {
  id: string;
  title: string;
  slug: string;
  event_id: string | null;
  cover_image_key: string | null;
  status: string;
}
