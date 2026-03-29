"use client";

import Image from "next/image";
import Navbar from "./Navbar";
import { useSubscribeForm } from "./useSubscribeForm";

export default function Hero() {
  const { email, handleEmailChange, handleSubmit, isSubmitting, message, status } =
    useSubscribeForm();

  return (
    <section className="relative min-h-screen overflow-hidden bg-cursor-bg">
      {/* ── Map: desktop ── */}
      <div
        className="hidden md:block absolute pointer-events-none select-none"
        style={{
          top: 60,
          left: "max(0px, calc(50% - 640px))",
          width: 1120,
          height: 900,
        }}
      >
        <Image
          src="/azerbaijan-dotted-map.webp"
          alt=""
          fill
          sizes="1120px"
          className="object-fill"
          priority
        />
      </div>

      {/* ── Map: mobile — centered vertically in upper half, not stretched ── */}
      <div
        className="md:hidden absolute pointer-events-none select-none"
        style={{ top: "18vh", left: "-40vw", width: "170vw", height: "105vw" }}
      >
        <Image
          src="/azerbaijan-dotted-map.webp"
          alt=""
          fill
          sizes="170vw"
          className="object-contain object-top-left"
          priority
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col min-h-screen max-w-[1440px] mx-auto px-5 md:px-[80px]">
        {/* Navbar */}
        <div className="pt-[30px] md:pt-[28px] shrink-0">
          <Navbar />
        </div>

        {/* Hero content — pushed to bottom on mobile via mt-auto, fixed offset on desktop */}
        <div className="mt-auto md:mt-[280px] mb-[8vh] md:mb-0 pb-[60px] md:pb-20">
          {/* Headings — left-aligned, scaled up on mobile to fill width */}
          <div className="flex flex-col font-sans font-medium w-full">
            <h1 className="text-[15vw] md:text-[130px] text-cursor-primary tracking-[-0.04em] md:tracking-[-5.2px] leading-[0.88]">
              Cursor Baku
            </h1>
            <h2 className="md:-mt-[0.12em] text-[16vw] md:text-[137px] text-cursor-secondary tracking-[-0.04em] md:tracking-[-5.48px] leading-[0.88]">
              Community
            </h2>
          </div>

          {/* Subtitle — mobile: "Perks Included." on its own line (matches Figma) */}
          <p className="mt-3 md:mt-[10px] font-ibm text-[16px] md:text-[24px] text-cursor-secondary tracking-[-0.32px] md:tracking-[-0.48px] leading-[1.44] md:leading-normal w-full md:max-w-[534px]">
            Events. Hackathons. Build in Public. Cursor Cafe.
            <span className="hidden md:inline"> </span>
            <br className="md:hidden" aria-hidden />
            <span>Perks Included.</span>
          </p>

          {/* Email sign-up — full width on mobile */}
          <form
            id="updates"
            onSubmit={handleSubmit}
            className="mt-10 md:mt-[50px] flex items-center justify-between w-full md:max-w-[500px] h-[62px] md:h-[64px] bg-cursor-card border border-cursor-border rounded-[1000px] pl-5 md:pl-6 pr-[6px] md:pr-2 py-[6px] md:py-2"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              disabled={isSubmitting}
              required
              className="flex-1 min-w-0 bg-transparent font-ibm text-[14px] md:text-[18px] text-cursor-primary placeholder:text-cursor-secondary tracking-[-0.28px] md:tracking-[-0.36px] leading-normal outline-none disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-[10px] md:gap-3 shrink-0 h-full px-5 rounded-[50px] bg-cursor-bg hover:bg-cursor-card transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-cursor-orange shrink-0" />
              <span className="font-ibm font-medium text-[14px] md:text-[16px] text-cursor-primary tracking-[-0.28px] md:tracking-[-0.32px] leading-normal whitespace-nowrap">
                {isSubmitting ? "Sending..." : status === "success" ? "Done!" : "Get Updates"}
              </span>
            </button>
          </form>
          {message ? (
            <p
              aria-live="polite"
              className={`mt-3 font-ibm text-[14px] tracking-[-0.28px] ${status === "success" ? "text-green-400" : "text-red-400"}`}
            >
              {message}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
