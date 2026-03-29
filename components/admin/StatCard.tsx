import type { LucideIcon } from "lucide-react";

export function StatCard({
  title,
  value,
  hint,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  hint?: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-[20px] border border-cursor-border bg-cursor-card p-6 transition-colors duration-200 hover:border-cursor-secondary">
      <div className="mb-4 flex items-start justify-between gap-3">
        <p className="font-ibm text-[14px] leading-none text-cursor-secondary tracking-[-0.28px]">{title}</p>
        <div className="flex size-10 items-center justify-center rounded-full border border-cursor-border bg-cursor-bg">
          <Icon className="size-5 text-cursor-orange" strokeWidth={1.75} />
        </div>
      </div>
      <p className="font-sans text-[36px] font-medium leading-none tracking-[-1.44px] text-cursor-primary md:text-[42px] md:tracking-[-1.68px]">
        {value}
      </p>
      {hint ? (
        <p className="mt-3 font-ibm text-[13px] leading-[1.4] text-cursor-secondary tracking-[-0.26px]">{hint}</p>
      ) : null}
    </div>
  );
}
