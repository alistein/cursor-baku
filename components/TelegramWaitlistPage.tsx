"use client";

import Navbar from "./Navbar";
import { useSubscribeForm } from "./useSubscribeForm";

const processSteps = [
  "Opening the first invite list.",
  "Preparing useful updates and community notes.",
  "Sending the Telegram link to subscribers first.",
];

function TelegramIcon() {
  return (
    <div className="flex size-16 items-center justify-center rounded-full bg-[#2AABEE] text-white shadow-[0px_0px_32px_0px_rgba(42,171,238,0.28)]">
      <svg
        viewBox="0 0 24 24"
        aria-label="Telegram"
        className="size-8"
        fill="currentColor"
      >
        <path d="M21.94 4.66 18.63 20.3c-.25 1.1-.9 1.37-1.83.85l-5.05-3.72-2.43 2.34c-.27.27-.5.5-1.02.5l.36-5.14 9.36-8.45c.4-.36-.09-.56-.63-.2L5.83 13.76.85 12.2c-1.08-.34-1.1-1.08.23-1.6L20.55 3.1c.9-.34 1.69.2 1.39 1.56Z" />
      </svg>
    </div>
  );
}

function TelegramSubscribeForm() {
  const { email, handleEmailChange, handleSubmit, isSubmitting, message, status } =
    useSubscribeForm("You're on the early Telegram list. We'll send the invite first.");

  return (
    <div className="flex w-full flex-col gap-3">
      <form
        onSubmit={handleSubmit}
        className="flex h-16 w-full items-center justify-between rounded-[1000px] border border-cursor-border bg-cursor-card py-2 pl-6 pr-2"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          disabled={isSubmitting}
          required
          className="min-w-0 flex-1 bg-transparent font-ibm text-[18px] leading-normal tracking-[-0.36px] text-cursor-primary outline-none placeholder:text-cursor-secondary disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-full shrink-0 items-center justify-center gap-3 rounded-[50px] bg-cursor-bg px-5 py-3 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="size-3 rounded-full bg-cursor-orange" aria-hidden />
          <span className="whitespace-nowrap font-ibm text-[16px] font-medium leading-normal tracking-[-0.32px] text-cursor-primary">
            {isSubmitting ? "Sending..." : status === "success" ? "Done!" : "Get Updates"}
          </span>
        </button>
      </form>
      {message ? (
        <p
          aria-live="polite"
          className={`font-ibm text-[14px] tracking-[-0.28px] ${status === "success" ? "text-green-400" : "text-red-400"}`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}

export default function TelegramWaitlistPage() {
  return (
    <main className="min-h-screen bg-cursor-bg">
      <div className="mx-auto max-w-[1440px] px-5 md:px-[80px]">
        <div className="pt-[30px] md:pt-[28px]">
          <Navbar />
        </div>

        <section className="flex max-w-[760px] flex-col gap-14 py-[70px] md:py-[120px]">
          <div className="flex flex-col gap-8">
            <TelegramIcon />
            <div className="flex flex-col gap-5">
              <p className="font-ibm text-[16px] leading-none tracking-[-0.32px] text-cursor-secondary md:text-[20px] md:tracking-[-0.4px]">
                Telegram group is in progress
              </p>
              <h1 className="font-sans text-[48px] font-medium leading-none tracking-[-1.92px] text-cursor-primary md:text-[82px] md:tracking-[-3.28px]">
                Be first in the group.
              </h1>
              <p className="max-w-[560px] font-ibm text-[18px] leading-[1.45] tracking-[-0.36px] text-cursor-secondary md:text-[24px] md:tracking-[-0.48px]">
                We are preparing the Cursor Baku Telegram. Get updates and we
                will send you the invite first.
              </p>
            </div>
            <div className="max-w-[540px]">
              <TelegramSubscribeForm />
            </div>
          </div>

          <aside className="flex max-w-[560px] flex-col gap-5">
            <p className="font-sans text-[28px] font-medium leading-[1.1] tracking-[-1.12px] text-cursor-primary md:text-[36px] md:tracking-[-1.44px]">
              What we are setting up
            </p>
            <div className="flex flex-col gap-3">
              {processSteps.map((step) => (
                <p
                  key={step}
                  className="font-ibm text-[16px] leading-[1.45] tracking-[-0.32px] text-cursor-secondary md:text-[18px] md:tracking-[-0.36px]"
                >
                  {step}
                </p>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
