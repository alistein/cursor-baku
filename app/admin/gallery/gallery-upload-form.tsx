"use client";

import { startTransition, useActionState, useEffect, useMemo, useRef, useState } from "react";
import { type ActionState, uploadGalleryImageAction } from "../actions";
import { AdminError } from "@/components/admin/AdminError";
import {
  adminButtonAccentClass,
  adminButtonPrimaryClass,
  adminInputClass,
  adminLabelClass,
  adminSelectClass,
} from "@/components/admin/ui";
import { compressImageFiles } from "@/lib/admin/image-compression";
import type { EventRow } from "@/lib/admin/types";
import Image from "next/image";

type PreviewPhoto = {
  id: string;
  name: string;
  url: string;
};

type GalleryUploadFormProps = {
  events?: Pick<EventRow, "id" | "title" | "event_date">[];
  albumId?: string;
  helperText?: string;
};

export function GalleryUploadForm({
  events = [],
  albumId,
  helperText = "Create a gallery album from selected photos. Add a caption once and it will be used for every selected photo.",
}: GalleryUploadFormProps) {
  const [state, action, isPending] = useActionState(uploadGalleryImageAction, null as ActionState);
  const inputRef = useRef<HTMLInputElement>(null);
  const [compressionError, setCompressionError] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const previews = useMemo<PreviewPhoto[]>(
    () =>
      selectedFiles.map((file, index) => ({
        id: `${file.name}-${file.lastModified}-${index}`,
        name: file.name,
        url: URL.createObjectURL(file),
      })),
    [selectedFiles]
  );

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  const selectedCount = selectedFiles.length;
  const isSubmitting = isPending || isCompressing;
  const uploadLabel =
    selectedCount === 0
      ? albumId
        ? "Add photos"
        : "Upload photos"
      : selectedCount === 1
        ? albumId
          ? "Add 1 photo"
          : "Upload 1 photo"
        : albumId
          ? `Add ${selectedCount} photos`
          : `Upload ${selectedCount} photos`;

  function clearSelection() {
    setSelectedFiles([]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectedFiles.length === 0 || isSubmitting) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.delete("files");
    setCompressionError(null);
    setIsCompressing(true);

    try {
      const compressedFiles = await compressImageFiles(selectedFiles);
      compressedFiles.forEach((file) => formData.append("files", file));
      startTransition(() => {
        action(formData);
      });
    } catch {
      setCompressionError("Could not compress images. Try smaller files or a different image format.");
    } finally {
      setIsCompressing(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-4 flex max-w-[760px] flex-col gap-5">
      {compressionError ? <AdminError message={compressionError} /> : state?.error ? <AdminError message={state.error} /> : null}
      {albumId ? <input type="hidden" name="album_id" value={albumId} /> : null}
      <p className="font-ibm text-[14px] text-cursor-secondary">{helperText}</p>
      <div>
        <label className={adminLabelClass} htmlFor="gfiles">
          Photos
        </label>
        <div className="rounded-[18px] border border-dashed border-cursor-border bg-cursor-bg/50 p-4">
          <input
            ref={inputRef}
            className="sr-only"
            id="gfiles"
            name="files"
            type="file"
            accept="image/*"
            multiple
            required
            disabled={isSubmitting}
            onChange={(event) => setSelectedFiles(Array.from(event.currentTarget.files ?? []))}
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-ibm text-[15px] text-cursor-primary">
                {selectedCount > 0 ? `${selectedCount} photo${selectedCount === 1 ? "" : "s"} selected` : "Select photos"}
              </p>
              <p className="mt-1 font-ibm text-[12px] text-cursor-secondary">Choose multiple images for one gallery album.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <label className={adminButtonPrimaryClass + " cursor-pointer"} htmlFor="gfiles">
                Choose photos
              </label>
              {selectedCount > 0 ? (
                <button className={adminButtonPrimaryClass} type="button" onClick={clearSelection} disabled={isSubmitting}>
                  Clear
                </button>
              ) : null}
            </div>
          </div>
          {previews.length > 0 ? (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {previews.map((preview) => (
                <div key={preview.id} className="overflow-hidden rounded-[14px] border border-cursor-border bg-cursor-card">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={preview.url}
                      alt={preview.name}
                      fill
                      className="object-cover"
                      sizes="160px"
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <label className={adminLabelClass} htmlFor="gcaption">
          Caption
        </label>
        <input
          className={adminInputClass}
          id="gcaption"
          name="caption"
          type="text"
          placeholder="Short description for these photos"
          disabled={isSubmitting}
        />
        <p className="mt-1 font-ibm text-[12px] text-cursor-secondary">This caption is also used as the accessible image description.</p>
      </div>
      {!albumId ? (
        <div>
          <label className={adminLabelClass} htmlFor="gevent">
            Attach to event
          </label>
          <select className={adminSelectClass} id="gevent" name="event_id" defaultValue="" disabled={isSubmitting}>
            <option value="">No event selected</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
                {event.event_date ? ` (${event.event_date})` : ""}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      <div>
        <button className={adminButtonAccentClass} type="submit" disabled={isSubmitting || selectedCount === 0}>
          {isCompressing ? "Compressing photos..." : isPending ? "Uploading photos..." : uploadLabel}
        </button>
      </div>
    </form>
  );
}
