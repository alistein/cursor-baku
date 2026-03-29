import Image from "next/image";
import Navbar from "./Navbar";

const INTRO =
  "We started with a simple goal: bringing Baku's builders together.";

const MISSION_TITLE = "From Local Code to Global Impact";

const MISSION_BODY =
  "Cursor Baku is a community-driven hub for developers, founders, and students in Azerbaijan mastering the future of software. We move beyond traditional coding by leveraging AI to build faster and smarter. Through meetups and shared knowledge, we're turning Baku into a leading destination for AI-native engineering in the Caspian region.";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cursor-bg">
      <div className="max-w-[1440px] mx-auto px-5 md:px-[80px]">
        <div className="pt-[30px] md:pt-[28px]">
          <Navbar />
        </div>

        {/* Hero — Figma 80:3171 */}
        <div className="mt-10 flex flex-col gap-10 md:mt-[60px] md:flex-row md:items-start md:justify-between md:gap-8">
          <h1 className="font-sans text-[48px] font-medium leading-none tracking-[-1.92px] text-cursor-primary md:text-[72px] md:tracking-[-2.88px]">
            About
          </h1>
          <p className="max-w-[360px] font-ibm text-[18px] leading-[1.4] text-cursor-secondary tracking-[-0.36px] md:text-[24px] md:tracking-[-0.48px]">
            {INTRO}
          </p>
        </div>

        {/* Image + story — Figma 80:3174 */}
        <div className="mt-10 flex flex-col gap-10 md:mt-[100px] md:gap-[60px]">
          {/* Taller than Figma 1280/600 so less vertical crop; object-bottom keeps subjects (lower in frame) in view */}
          <div className="relative aspect-video w-full overflow-hidden rounded-[24px] md:rounded-[36px]">
            <Image
              src="/about-hero.jpeg"
              alt="Cursor Baku community"
              fill
              className="object-cover object-bottom"
              priority
              sizes="(max-width: 768px) 100vw, 1280px"
            />
          </div>

          <div className="flex flex-col gap-8 md:gap-10">
            <h2 className="font-sans text-[32px] font-medium leading-[1.2] tracking-[-1.28px] text-cursor-primary md:text-[44px] md:tracking-[-1.76px]">
              {MISSION_TITLE}
            </h2>
            <p className="max-w-full font-ibm text-[18px] leading-[1.45] text-cursor-secondary tracking-[-0.36px] md:max-w-[900px] md:text-[24px] md:tracking-[-0.96px]">
              {MISSION_BODY}
            </p>
          </div>
        </div>

        <div className="h-20 md:h-[120px]" aria-hidden />
      </div>
    </main>
  );
}
