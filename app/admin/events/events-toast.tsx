"use client";

import { useEffect, useState } from "react";

const messages: Record<string, string> = {
  created: "Event added.",
  updated: "Event updated.",
  deleted: "Event deleted.",
};

export function EventsToast({ value }: { value?: string }) {
  const [visible, setVisible] = useState(Boolean(value && messages[value]));

  useEffect(() => {
    if (!value || !messages[value]) {
      return;
    }

    const hideTimer = window.setTimeout(() => setVisible(false), 3200);
    const cleanTimer = window.setTimeout(() => {
      const url = new URL(window.location.href);
      url.searchParams.delete("toast");
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }, 100);

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(cleanTimer);
    };
  }, [value]);

  if (!value || !messages[value] || !visible) {
    return null;
  }

  return (
    <div className="fixed right-5 top-5 z-50 rounded-[16px] border border-cursor-orange/40 bg-cursor-card px-5 py-3 shadow-2xl shadow-black/20">
      <p className="font-ibm text-[14px] font-medium text-cursor-primary">{messages[value]}</p>
    </div>
  );
}
