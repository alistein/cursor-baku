"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type SubscribeStatus = "idle" | "loading" | "success" | "error";

export function useSubscribeForm(successMessage = "You're in! We'll keep you posted.") {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubscribeStatus>("idle");
  const [message, setMessage] = useState("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (response.ok) {
        setStatus("success");
        setMessage(successMessage);
        setEmail("");
        return;
      }

      setStatus("error");
      setMessage(data.error ?? "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return {
    email,
    handleEmailChange,
    handleSubmit,
    isSubmitting: status === "loading",
    message,
    status,
  };
}
