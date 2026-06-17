"use server";

import { insertSubscriber } from "@/lib/admin/subscribers";

export type SubscribeState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function subscribeAction(
  _prev: SubscribeState,
  formData: FormData,
  successMessage = "You're in! We'll keep you posted.",
): Promise<SubscribeState> {
  const raw = formData.get("email");
  const email = typeof raw === "string" ? raw.trim().toLowerCase() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  try {
    await insertSubscriber(email);
    return { status: "success", message: successMessage };
  } catch {
    return { status: "error", message: "Something went wrong. Please try again." };
  }
}
