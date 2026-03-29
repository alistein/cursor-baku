"use client";

import { useFormStatus } from "react-dom";
import { deleteEventAction } from "../actions";

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

export function DeleteEventButton({ eventId, title }: { eventId: string; title: string }) {
  const action = deleteEventAction.bind(null, eventId);

  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) {
          event.preventDefault();
        }
      }}
    >
      <DeleteSubmitButton />
    </form>
  );
}
