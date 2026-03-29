const styles: Record<string, string> = {
  draft: "border-cursor-border text-cursor-secondary",
  published: "border-cursor-orange/50 text-cursor-primary bg-cursor-orange/10",
  active: "border-cursor-border text-cursor-primary",
  cancelled: "border-cursor-border/50 text-cursor-secondary",
};

export function StatusPill({ value }: { value: string }) {
  const c = styles[value] ?? "border-cursor-border text-cursor-secondary";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-ibm text-[12px] font-medium uppercase tracking-wide ${c}`}
    >
      {value}
    </span>
  );
}
