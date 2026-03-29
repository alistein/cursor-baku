import Image from "next/image";
import JoinCommunityCard from "./JoinCommunityCard";
import { JOIN_CARDS } from "./joinCommunityData";

export default function JoinCommunity() {
  return (
    <section className="relative overflow-hidden bg-cursor-bg py-[80px] md:py-[120px]">
      {/* Wireframe globe — simplified asset (full Figma mesh is 80+ slices); replace with export if needed */}
      <div
        className="pointer-events-none absolute -right-[10%] top-1/2 hidden w-[min(90vw,820px)] max-w-none -translate-y-1/2 select-none md:block md:opacity-50"
        aria-hidden
      >
        <Image
          src="/join-globe-decoration.svg"
          alt=""
          width={800}
          height={800}
          className="h-auto w-full object-contain object-right"
        />
      </div>
      <div className="pointer-events-none absolute -right-[25%] top-[8%] w-[120vw] select-none opacity-40 md:hidden" aria-hidden>
        <Image
          src="/join-globe-decoration.svg"
          alt=""
          width={800}
          height={800}
          className="h-auto w-full object-contain object-right"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-[80px]">
        {/* Heading: mobile 22:13118 / desktop 17:2843 */}
        {/* Same heading → content gap as WhoItsFor (50px mobile, 60px desktop) */}
        <div className="mb-[50px] flex max-w-[720px] flex-col gap-[10px] md:mb-[60px] md:gap-5">
          <p className="font-ibm text-[14px] leading-none text-cursor-secondary tracking-[-0.28px] md:text-[24px] md:tracking-[-0.48px]">
            Join Our Community
          </p>
          <h2 className="font-sans text-[36px] font-medium leading-none tracking-[-1.44px] text-cursor-primary md:text-[72px] md:tracking-[-2.88px]">
            <span className="text-cursor-primary">From Baku </span>
            <span className="text-cursor-secondary">to the Global Stage</span>
          </h2>
        </div>

        <div className="flex flex-col gap-[6px] md:flex-row md:gap-[6px]">
          {JOIN_CARDS.map((card) => (
            <JoinCommunityCard key={card.platform} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
