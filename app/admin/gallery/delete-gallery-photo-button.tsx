"use client";

import { useFormStatus } from "react-dom";
import { deleteGalleryPhotoAction } from "../actions";

function DeleteSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="inline-flex items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 font-ibm text-[14px] text-cursor-primary transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
      type="submit"
      disabled={pending}
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}

export function DeleteGalleryPhotoButton({ photoId }: { photoId: string }) {
  const action = deleteGalleryPhotoAction.bind(null, photoId);

  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm("Delete this photo? This cannot be undone.")) {
          event.preventDefault();
        }
      }}
    >
      <DeleteSubmitButton />
    </form>
  );
}
