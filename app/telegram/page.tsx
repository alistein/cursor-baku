import TelegramWaitlistPage from "@/components/TelegramWaitlistPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Telegram Waitlist",
  description:
    "Join the Cursor Baku Telegram waitlist to get the community invite first and stay close to local AI coding events, meetups, and updates.",
  path: "/telegram",
  keywords: [
    "Cursor Baku Telegram",
    "Cursor Azerbaijan Telegram",
    "Baku developer chat",
    "AI coding community Telegram",
  ],
  imageAlt: "Cursor Baku Telegram community waitlist",
});

export default function TelegramPage() {
  return <TelegramWaitlistPage />;
}
