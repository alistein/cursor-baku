-- Initial D1 schema for Cursor Baku.
-- Apply with:
-- npx wrangler d1 execute cusor-community-baku --remote --file=./d1/0001_schema.sql

CREATE TABLE IF NOT EXISTS subscribers (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_subscribers_created_at
  ON subscribers (created_at DESC);

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  event_date TEXT,
  registration_url TEXT,
  cover_image_key TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_events_event_date
  ON events (event_date);

CREATE INDEX IF NOT EXISTS idx_events_updated_at
  ON events (updated_at DESC);

CREATE TABLE IF NOT EXISTS gallery_albums (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  cover_image_key TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  event_id TEXT REFERENCES events(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_gallery_albums_status_updated_at
  ON gallery_albums (status, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_gallery_albums_event_id
  ON gallery_albums (event_id);

CREATE TABLE IF NOT EXISTS gallery_images (
  id TEXT PRIMARY KEY,
  album_id TEXT NOT NULL REFERENCES gallery_albums(id) ON DELETE CASCADE,
  image_key TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_gallery_images_album_sort
  ON gallery_images (album_id, sort_order, created_at);

CREATE UNIQUE INDEX IF NOT EXISTS idx_gallery_images_image_key
  ON gallery_images (image_key);
