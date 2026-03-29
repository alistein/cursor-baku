"use client";

import { startTransition, useActionState, useState } from "react";
import { type ActionState, updateEventAction } from "../actions";
import { AdminError } from "@/components/admin/AdminError";
import { adminInputClass, adminLabelClass, adminButtonAccentClass } from "@/components/admin/ui";
import { compressImageFile } from "@/lib/admin/image-compression";
import type { EventRow } from "@/lib/admin/types";

export function EditEventForm({ event }: { event: EventRow }) {
  const update = updateEventAction.bind(null, event.id);
  const [state, action, isPending] = useActionState(update, null as ActionState);
  const [compressionError, setCompressionError] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const isSubmitting = isPending || isCompressing;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const coverFile = formData.get("cover");
    setCompressionError(null);

    try {
      if (coverFile instanceof File && coverFile.size > 0) {
        setIsCompressing(true);
        formData.set("cover", await compressImageFile(coverFile));
      }
      startTransition(() => {
        action(formData);
      });
    } catch {
      setCompressionError("Could not compress the cover image. Try a smaller file or a different image format.");
    } finally {
      setIsCompressing(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex max-w-[640px] flex-col gap-4">
      {compressionError ? <AdminError message={compressionError} /> : state?.error ? <AdminError message={state.error} /> : null}
      <div>
        <label className={adminLabelClass} htmlFor="title">
          Title
        </label>
        <input
          className={adminInputClass}
          id="title"
          name="title"
          type="text"
          required
          defaultValue={event.title}
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className={adminLabelClass} htmlFor="event_date">
          Event date
        </label>
        <input
          className={adminInputClass}
          id="event_date"
          name="event_date"
          type="date"
          required
          defaultValue={event.event_date ?? ""}
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className={adminLabelClass} htmlFor="description">
          Description
        </label>
        <textarea
          className={adminInputClass + " min-h-[120px] resize-y py-3"}
          id="description"
          name="description"
          rows={5}
          defaultValue={event.description ?? ""}
          disabled={isSubmitting}
        />
      </div>
      <p className="font-ibm text-[13px] text-cursor-secondary">
        Slug (read-only): <span className="text-cursor-primary">{event.slug}</span>
      </p>
      <div>
        <label className={adminLabelClass} htmlFor="cover">
          Event cover (square)
        </label>
        <input
          className={adminInputClass + " file:mr-3 file:rounded-full file:border-0 file:bg-cursor-card file:px-3 file:py-1.5 file:font-ibm file:text-[13px] file:text-cursor-primary"}
          id="cover"
          name="cover"
          type="file"
          accept="image/*"
          disabled={isSubmitting}
        />
        <p className="mt-1 font-ibm text-[12px] text-cursor-secondary">Upload a new square image to replace the current cover.</p>
      </div>
      <div>
        <label className={adminLabelClass} htmlFor="registration_url">
          Registration URL
        </label>
        <input
          className={adminInputClass}
          id="registration_url"
          name="registration_url"
          type="url"
          defaultValue={event.registration_url ?? ""}
          disabled={isSubmitting}
        />
      </div>
      <div>
        <button className={adminButtonAccentClass} type="submit" disabled={isSubmitting}>
          {isCompressing ? "Compressing…" : isPending ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
