"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteEvent, getEventById, insertEvent, setEventCoverImageKey, updateEvent } from "@/lib/admin/events";
import {
  deleteGalleryImageRow,
  galleryAlbumExists,
  getGalleryImageForDelete,
  insertGalleryAlbum,
  insertGalleryImageRow,
} from "@/lib/admin/gallery-list";
import { deleteMediaObject, putAlbumGalleryObject, putEventCoverObject } from "@/lib/admin/media";

export type ActionState = { error?: string } | null;

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function optStr(formData: FormData, key: string): string | null {
  const s = str(formData, key);
  return s === "" ? null : s;
}

function parseEventDate(formData: FormData): { value: string } | { error: string } {
  const value = str(formData, "event_date");
  if (!value) {
    return { error: "Event date is required" };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return { error: "Use a valid event date" };
  }
  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) {
    return { error: "Use a valid event date" };
  }
  return { value };
}

function revalidateEventPages(eventId?: string) {
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin");
  revalidatePath("/admin/events");
  if (eventId) {
    revalidatePath(`/admin/events/${eventId}`);
  }
}

function isImageFile(file: File): boolean {
  return file.type === "" || file.type.startsWith("image/");
}

function galleryUploadTitle(eventTitle: string | null): string {
  if (eventTitle) {
    return eventTitle;
  }
  return `Gallery upload ${new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date())}`;
}

function revalidateGalleryPages(albumId?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  if (albumId) {
    revalidatePath(`/admin/gallery/${albumId}`);
    revalidatePath(`/gallery/${albumId}`);
  }
}

export async function createEventAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const title = str(formData, "title");
  if (!title) {
    return { error: "Title is required" };
  }
  const eventDate = parseEventDate(formData);
  if ("error" in eventDate) {
    return { error: eventDate.error };
  }
  const description = str(formData, "description");
  const coverFile = formData.get("cover");
  let id: string;
  try {
    const created = await insertEvent({
      title,
      description,
      event_date: eventDate.value,
      registration_url: optStr(formData, "registration_url"),
    });
    id = created.id;
    if (coverFile instanceof File && coverFile.size > 0) {
      const key = await putEventCoverObject(id, coverFile);
      await setEventCoverImageKey(id, key);
    }
    revalidateEventPages(id);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not create event" };
  }
  redirect("/admin/events?toast=created");
}

export async function updateEventAction(
  eventId: string,
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const title = str(formData, "title");
  if (!title) {
    return { error: "Title is required" };
  }
  const eventDate = parseEventDate(formData);
  if ("error" in eventDate) {
    return { error: eventDate.error };
  }
  const description = str(formData, "description");
  const coverFile = formData.get("cover");
  try {
    await updateEvent(eventId, {
      title,
      description,
      event_date: eventDate.value,
      registration_url: optStr(formData, "registration_url"),
    });
    if (coverFile instanceof File && coverFile.size > 0) {
      const key = await putEventCoverObject(eventId, coverFile);
      await setEventCoverImageKey(eventId, key);
    }
    revalidateEventPages(eventId);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not update event" };
  }
  redirect("/admin/events?toast=updated");
}

export async function deleteEventAction(eventId: string): Promise<void> {
  await deleteEvent(eventId);
  revalidateEventPages(eventId);
  redirect("/admin/events?toast=deleted");
}

export async function uploadGalleryImageAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const files = formData
    .getAll("files")
    .filter((file): file is File => file instanceof File && file.size > 0);
  if (files.length === 0) {
    return { error: "Choose at least one photo" };
  }
  if (files.some((file) => !isImageFile(file))) {
    return { error: "Only image files can be uploaded" };
  }
  const existingAlbumId = optStr(formData, "album_id");
  const eventId = optStr(formData, "event_id");
  const caption = optStr(formData, "caption");
  let createdAlbumId: string | null = null;
  try {
    let albumId = existingAlbumId;
    if (albumId) {
      const exists = await galleryAlbumExists(albumId);
      if (!exists) {
        return { error: "Choose a valid gallery" };
      }
    } else {
      const event = eventId ? await getEventById(eventId) : null;
      if (eventId && !event) {
        return { error: "Choose a valid event" };
      }
      const album = await insertGalleryAlbum({
        title: galleryUploadTitle(event?.title ?? null),
        eventId,
        status: "published",
      });
      albumId = album.id;
      createdAlbumId = album.id;
    }
    for (const file of files) {
      const key = await putAlbumGalleryObject(albumId, file);
      await insertGalleryImageRow({
        albumId,
        imageKey: key,
        alt: caption,
        caption,
      });
    }
    revalidateGalleryPages(albumId);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Upload failed" };
  }
  if (createdAlbumId) {
    redirect(`/admin/gallery/${createdAlbumId}`);
  }
  return null;
}

export async function deleteGalleryPhotoAction(photoId: string): Promise<void> {
  const image = await getGalleryImageForDelete(photoId);
  if (!image) {
    return;
  }
  await deleteGalleryImageRow(photoId);
  await deleteMediaObject(image.imageKey);
  revalidateGalleryPages(image.albumId);
  redirect(`/admin/gallery/${image.albumId}`);
}
