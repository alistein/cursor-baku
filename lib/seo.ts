import type { Metadata } from "next";

export const SITE_NAME = "Cursor Baku";
export const DEFAULT_SITE_URL = "https://cursorbaku.com";
export const DEFAULT_OG_IMAGE = "/CursoBakuOGImage.png";
export const DEFAULT_OG_IMAGE_ALT =
  "Cursor Baku community events, hackathons, and developer meetups";
export const DEFAULT_DESCRIPTION =
  "Cursor Baku is the Azerbaijan community for developers, founders, students, and builders using Cursor and AI coding tools.";

export const DEFAULT_KEYWORDS = [
  "Cursor Baku",
  "Cursor Azerbaijan",
  "AI coding Baku",
  "developer community Azerbaijan",
  "Baku hackathons",
  "Cursor events",
  "AI developer tools",
  "build in public Baku",
];

export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : DEFAULT_SITE_URL);

  return url.replace(/\/$/, "");
}

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return new URL(path, getSiteUrl()).toString();
}

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  titleAbsolute?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
  titleAbsolute = false,
}: PageMetadataInput): Metadata {
  const pageUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const socialTitle = titleAbsolute ? title : `${title} | ${SITE_NAME}`;

  return {
    title: titleAbsolute ? { absolute: title } : title,
    description,
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: pageUrl,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [imageUrl],
    },
  };
}
