import type { JoinPlatform } from "./joinCommunityData";

const buttonBase =
  "inline-flex shrink-0 items-center justify-center rounded-[16px] px-[10px] py-[14px] font-ibm font-medium text-cursor-primary leading-[1.45] transition-opacity hover:opacity-90";

const shadows: Record<JoinPlatform, string> = {
  luma: "shadow-[0px_0px_24px_0px_rgba(65,64,62,0.8)]",
  telegram: "shadow-[0px_0px_24px_0px_rgba(42,171,238,0.8)]",
  luhive: "shadow-[0px_0px_24px_0px_rgba(255,128,64,0.8)]",
};

const btnBg: Record<JoinPlatform, string> = {
  luma: "bg-cursor-border",
  telegram: "bg-[#2AABEE]",
  luhive: "bg-[#ff8040]",
};

export interface JoinCommunityCardProps {
  platform: JoinPlatform;
  iconSrc: string;
  description: string;
  ctaLabel: string;
  href: string;
}

function MobileIcon({ platform, src }: { platform: JoinPlatform; src: string }) {
  return (
    <div className="relative size-[60px] shrink-0">
      {platform === "luma" && (
        <img src={src} alt="" aria-hidden className="size-[60px] object-contain object-left" />
      )}
      {platform === "telegram" && (
        <img
          src={src}
          alt=""
          aria-hidden
          className="size-[60px] object-contain object-left"
        />
      )}
      {platform === "luhive" && (
        <img
          src={src}
          alt=""
          aria-hidden
          className="absolute left-0 top-1/2 size-10 -translate-y-1/2 object-contain object-left"
        />
      )}
    </div>
  );
}

export default function JoinCommunityCard({
  platform,
  iconSrc,
  description,
  ctaLabel,
  href,
}: JoinCommunityCardProps) {
  const btnClass = `${buttonBase} ${btnBg[platform]} ${shadows[platform]}`;

  return (
    <div className="bg-cursor-card rounded-[20px] md:flex md:min-h-[500px] md:flex-1 md:flex-col md:overflow-hidden">
      {/* Mobile — Figma 22:13118 */}
      <div className="flex flex-col gap-[50px] p-[30px] md:hidden">
        <div className="flex items-center justify-between">
          <MobileIcon platform={platform} src={iconSrc} />
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnClass} w-[170px] text-[20px] tracking-[-0.4px]`}
          >
            {ctaLabel}
          </a>
        </div>
        <p className="font-ibm text-[14px] leading-[1.45] text-cursor-secondary tracking-[-0.28px]">
          {description}
        </p>
      </div>

      {/* Desktop — Figma 17:2761 */}
      {platform === "luma" ? (
        <div className="hidden h-full min-h-[500px] flex-col gap-[98px] p-10 md:flex">
          <div className="relative size-[72px] shrink-0">
            <img
              src={iconSrc}
              alt=""
              aria-hidden
              className="absolute size-full object-contain object-left"
            />
          </div>
          <p className="font-ibm text-[20px] leading-[1.45] text-cursor-secondary tracking-[-0.4px]">
            {description}
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnClass} w-full text-[26px] tracking-[-0.52px]`}
          >
            {ctaLabel}
          </a>
        </div>
      ) : (
        <div className="relative hidden min-h-[500px] w-full md:block">
          <div
            className={
              platform === "telegram"
                ? "absolute left-[50px] top-[50px] size-[72px]"
                : "absolute left-[50px] top-[50px] size-[52px]"
            }
          >
            <img src={iconSrc} alt="" aria-hidden className="size-full object-contain object-left" />
          </div>
          <p className="absolute left-1/2 top-1/2 w-[342px] -translate-x-1/2 -translate-y-1/2 font-ibm text-[20px] leading-[1.45] text-cursor-secondary tracking-[-0.4px]">
            {description}
          </p>
          <div className="absolute bottom-10 left-1/2 w-[342px] -translate-x-1/2">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnClass} w-full text-[26px] tracking-[-0.52px]`}
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
