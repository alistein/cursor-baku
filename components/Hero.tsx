"use client";

import Image from "next/image";
import Navbar from "./Navbar";
import { SubscribeFormPill } from "./SubscribeFormPill";

export default function Hero() {
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
          sizes="(max-width: 1280px) 100vw, 1120px"
          quality={80}
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
          quality={70}
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
          <SubscribeFormPill
            formId="updates"
            className="mt-10 md:mt-[50px] w-full md:max-w-[500px]"
            pillClassName="h-[62px] md:h-[64px] pl-5 md:pl-6 pr-[6px] md:pr-2 py-[6px] md:py-2"
          />
        </div>
      </div>
    </section>
  );
}
