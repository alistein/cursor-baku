"use client";

import { startTransition, useActionState, useState } from "react";
import { type ActionState, createEventAction } from "../actions";
import { AdminError } from "@/components/admin/AdminError";
import { adminInputClass, adminLabelClass, adminButtonAccentClass } from "@/components/admin/ui";
import { compressImageFile } from "@/lib/admin/image-compression";

export function CreateEventForm() {
  const [state, action, isPending] = useActionState(createEventAction, null as ActionState);
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
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-2 flex max-w-[640px] flex-col gap-4">
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
          autoComplete="off"
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
          disabled={isSubmitting}
        />
      </div>
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
        <p className="mt-1 font-ibm text-[12px] text-cursor-secondary">Use a square image for the cleanest crop.</p>
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
          placeholder="https://"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <button className={adminButtonAccentClass} type="submit" disabled={isSubmitting}>
          {isCompressing ? "Compressing…" : isPending ? "Creating…" : "Create event"}
        </button>
      </div>
    </form>
  );
}
