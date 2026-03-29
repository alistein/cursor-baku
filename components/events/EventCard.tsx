import { ArrowUpRight } from "lucide-react";
import type { EventItem } from "./eventsData";

const placeholderStyles: Record<EventItem["placeholderVariant"], string> = {
  wireframe:
    "bg-[linear-gradient(135deg,#f4f4f4_0%,#d9d9d9_45%,#ffffff_100%)] before:absolute before:left-[12%] before:top-[22%] before:h-[2px] before:w-[78%] before:-rotate-[18deg] before:bg-[#707070]/45 after:absolute after:left-[6%] after:top-[54%] after:h-[2px] after:w-[86%] after:-rotate-[18deg] after:bg-[#707070]/35",
  desk:
    "bg-[radial-gradient(circle_at_63%_42%,#f2f2f2_0_8%,transparent_9%),linear-gradient(90deg,#151515_0_28%,#eeeeee_29%_100%)] before:absolute before:bottom-[23%] before:left-[14%] before:h-[32%] before:w-[70%] before:rounded-[6px] before:bg-[#101010]/85 after:absolute after:bottom-[17%] after:left-0 after:h-[20%] after:w-full after:bg-[#1f1f1f]",
  coding:
    "bg-[linear-gradient(90deg,#f2f2f2_0_48%,#d9d9d9_49%_100%)] before:absolute before:bottom-[12%] before:left-[12%] before:h-[50%] before:w-[38%] before:rounded-t-full before:bg-[#252525]/80 after:absolute after:right-[12%] after:top-[20%] after:h-[54%] after:w-[36%] after:rounded-[8px] after:bg-[#111]/90",
};

function EventMedia({
  title,
  imageUrl,
  placeholderVariant,
}: Pick<EventItem, "title" | "imageUrl" | "placeholderVariant">) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={title}
        className="size-full rounded-[20px] object-cover object-center"
      />
    );
  }

  return (
    <div
      aria-hidden
      className={`relative size-full overflow-hidden rounded-[20px] opacity-95 grayscale ${placeholderStyles[placeholderVariant]}`}
    />
  );
}

export default function EventCard({
  title,
  date,
  ctaLabel,
  href,
  imageUrl,
  placeholderVariant,
}: EventItem) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group mx-auto flex w-full max-w-[300px] flex-col gap-[30px]"
    >
      <div className="aspect-square w-full overflow-hidden rounded-[20px] bg-cursor-card">
        <EventMedia
          title={title}
          imageUrl={imageUrl}
          placeholderVariant={placeholderVariant}
        />
      </div>

      <div className="flex flex-col gap-[10px]">
        {date && (
          <p className="font-ibm text-[16px] leading-[1.45] tracking-[-0.32px] text-cursor-secondary md:text-[18px] md:tracking-[-0.36px]">
            {date}
          </p>
        )}
        <h3 className="font-sans text-[28px] font-medium leading-[1.12] tracking-[-1.12px] text-cursor-primary md:text-[32px] md:leading-[1.2] md:tracking-[-1.28px]">
          {title}
        </h3>
        <span className="inline-flex w-fit items-center gap-[10px] font-ibm text-[18px] leading-[1.45] tracking-[-0.36px] text-cursor-secondary transition-colors group-hover:text-cursor-primary md:text-[20px] md:tracking-[-0.4px]">
          <span>{ctaLabel}</span>
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:size-6"
            strokeWidth={1.5}
          />
        </span>
      </div>
    </a>
  );
}
