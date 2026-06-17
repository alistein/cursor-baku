"use client";

import Image from "next/image";
import FooterLink from "./FooterLink";
import { footerConfig, type FooterConfig, type FooterNavItem } from "./footerConfig";
import { SubscribeFormPill } from "../SubscribeFormPill";

export type FooterProps = Partial<
  Pick<
    FooterConfig,
    | "newsletterTitle"
    | "newsletterDescription"
    | "emailContact"
    | "year"
    | "orgName"
    | "privacyHref"
    | "rightsLine"
    | "brandWordmark"
    | "creditsAliHref"
    | "creditsNilufarHref"
  >
> & {
  explore?: FooterNavItem[];
  joinUs?: FooterNavItem[];
  cursor?: FooterNavItem[];
};

function NavColumn({ title, items }: { title: string; items: FooterNavItem[] }) {
  return (
    <div className="flex min-w-0 flex-col items-start gap-6">
      <p className="w-full font-sans text-[24px] font-medium leading-[1.5] tracking-[-0.48px] text-cursor-primary">
        {title}
      </p>
      <nav
        className="flex flex-col items-start gap-3 font-ibm not-italic"
        aria-label={title}
      >
        {items.map((item) => (
          <FooterLink
            key={`${title}-${item.label}`}
            item={item}
            className="text-[24px] tracking-[-0.48px]"
          />
        ))}
      </nav>
    </div>
  );
}

function FooterLegalDesktop({ cfg }: { cfg: FooterConfig }) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-[14px]">
        <p className="whitespace-nowrap font-ibm text-[20px] leading-[1.5] tracking-[-0.4px] text-cursor-secondary">
          Ⓒ {cfg.orgName} {cfg.year}
        </p>
        <div className="h-6 w-0.5 shrink-0 bg-cursor-secondary" aria-hidden />
        <a
          href={`mailto:${cfg.emailContact}`}
          className="whitespace-nowrap font-ibm text-[20px] leading-[1.5] tracking-[-0.4px] text-cursor-secondary transition-colors hover:text-cursor-primary"
        >
          {cfg.emailContact}
        </a>
      </div>
      <div className="flex items-center gap-6 font-ibm text-[20px] leading-[1.5] tracking-[-0.4px] text-cursor-secondary">
        <a
          href={cfg.privacyHref}
          className="whitespace-nowrap underline decoration-solid transition-colors hover:text-cursor-primary"
        >
          Privacy Policy
        </a>
        <span className="whitespace-nowrap">{cfg.rightsLine}</span>
      </div>
    </div>
  );
}

function FooterLegalMobile({ cfg }: { cfg: FooterConfig }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-[30px] font-ibm text-[14px] font-medium leading-[1.5] tracking-[-0.28px] text-cursor-secondary">
        {cfg.explore.map((item) => (
          <FooterLink key={`m-${item.label}`} item={item} />
        ))}
      </div>
      <div className="flex items-center gap-[10px] font-ibm text-[12px] leading-[1.5] tracking-[-0.24px] text-cursor-secondary">
        <span className="whitespace-nowrap">
          Ⓒ {cfg.orgName} {cfg.year}
        </span>
        <div className="h-3.5 w-px shrink-0 bg-cursor-secondary" aria-hidden />
        <a
          href={`mailto:${cfg.emailContact}`}
          className="whitespace-nowrap transition-colors hover:text-cursor-primary"
        >
          {cfg.emailContact}
        </a>
      </div>
    </div>
  );
}

const wordmarkGradient =
  "bg-gradient-to-b from-[#707070] to-[#080808] bg-clip-text text-transparent";

function FooterBrandBlock({ label }: { label: string }) {
  return (
    <div className="pointer-events-none relative w-full overflow-hidden">
      {/* Bottom “tucked under” the viewport: clip + slight downward bleed */}
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center overflow-hidden pb-[max(0.75rem,env(safe-area-inset-bottom))] md:pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="flex w-full flex-col items-center">
          {/* Credits above the large “Cursor” wordmark */}
          <div className="pointer-events-auto relative z-10 mx-auto mb-4 w-full max-w-[min(100%,36rem)] shrink-0 px-[max(1rem,4vw)] text-center md:mb-6 md:px-[80px]">
            <a
              href="https://luhive.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 font-ibm text-[14px] leading-normal tracking-[-0.32px] text-cursor-secondary transition-colors hover:text-cursor-primary focus-visible:text-cursor-primary focus-visible:outline-none md:tracking-[-0.36px]"
            >
              <span>Powered by</span>
              <Image
                src="/DesktopLogo.svg"
                alt="Luhive"
                width={94}
                height={19}
                className="h-[15px] w-auto opacity-90 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              />
            </a>
          </div>

          {/* Wordmark: clipped at bottom — full width left-aligned on mobile, centered on desktop */}
          <div
            className="relative w-full overflow-hidden max-h-[100px] sm:max-h-[140px] md:max-h-[280px] lg:max-h-[380px]"
            aria-hidden
          >
            {/* Desktop */}
            <p
              className={`pointer-events-none relative z-0 hidden w-full max-w-[1440px] select-none text-center font-sans font-medium leading-none ${wordmarkGradient} md:block md:text-[min(33.75vw,486px)] md:tracking-[-0.04em]`}
            >
              {label}
            </p>
            {/* Mobile — full width, centered */}
            <p
              className={`pointer-events-none relative z-0 w-full select-none text-center font-sans font-medium leading-[0.85] ${wordmarkGradient} text-[132px] tracking-[-5.3px] md:hidden`}
            >
              {label}
            </p>
          </div>
        </div>

        <div className="pointer-events-none h-0 w-full shrink-0" aria-hidden />
      </div>
    </div>
  );
}

export default function Footer(props: FooterProps) {
  const cfg = footerConfig({
    newsletterTitle: props.newsletterTitle,
    newsletterDescription: props.newsletterDescription,
    emailContact: props.emailContact,
    year: props.year,
    orgName: props.orgName,
    privacyHref: props.privacyHref,
    rightsLine: props.rightsLine,
    brandWordmark: props.brandWordmark,
    creditsAliHref: props.creditsAliHref,
    creditsNilufarHref: props.creditsNilufarHref,
    explore: props.explore,
    joinUs: props.joinUs,
    cursor: props.cursor,
  });

  return (
    <footer className="relative overflow-x-hidden overflow-y-visible bg-cursor-bg pt-[60px] pb-0">
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 pb-[70px] md:px-[80px]">
        {/* Desktop — Figma 17:3007 */}
        <div className="mb-[90px] hidden flex-col gap-[90px] md:flex">
          <div className="flex w-full flex-col items-start justify-between gap-16 lg:flex-row lg:gap-8">
            <div className="flex w-full max-w-[450px] flex-col gap-[60px]">
              <div className="flex flex-col gap-3 leading-[1.5]">
                <p className="font-sans text-[32px] font-medium tracking-[-0.64px] text-cursor-primary">
                  {cfg.newsletterTitle}
                </p>
                <p className="font-ibm text-[24px] tracking-[-0.48px] text-cursor-secondary">
                  {cfg.newsletterDescription}
                </p>
              </div>
              <SubscribeFormPill
                formId="footer-updates"
                pillClassName="h-16 w-full py-2 pl-6 pr-2"
              />
            </div>

            <div className="flex w-full flex-wrap items-start justify-start gap-x-[74px] gap-y-10 lg:w-auto lg:flex-nowrap lg:justify-end">
              <NavColumn title="Explore" items={cfg.explore} />
              <NavColumn title="Join Us" items={cfg.joinUs} />
              <NavColumn title="Cursor" items={cfg.cursor} />
            </div>
          </div>

          <FooterLegalDesktop cfg={cfg} />
        </div>

        {/* Mobile — Figma 26:13257 */}
        <div className="mb-12 md:hidden">
          <FooterLegalMobile cfg={cfg} />
        </div>
      </div>

      <div className="relative z-20 -mt-4 overflow-hidden md:-mt-24">
        <FooterBrandBlock label={cfg.brandWordmark} />
      </div>
    </footer>
  );
}
