/** Shared Tailwind classes for admin form controls (matches landing “pill + card” look). */
export const adminInputClass =
  "w-full rounded-[14px] border border-cursor-border bg-cursor-bg px-4 py-3 font-ibm text-[15px] text-cursor-primary tracking-[-0.3px] outline-none transition-colors duration-200 placeholder:text-cursor-secondary/70 focus:border-cursor-secondary";

export const adminLabelClass = "mb-1.5 block font-ibm text-[13px] text-cursor-secondary tracking-[-0.26px]";

export const adminButtonPrimaryClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-cursor-border bg-cursor-bg px-6 py-2.5 font-ibm text-[15px] font-medium tracking-[-0.3px] text-cursor-primary transition-colors duration-200 hover:border-cursor-secondary";

export const adminButtonAccentClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-cursor-orange/50 bg-cursor-orange/10 px-6 py-2.5 font-ibm text-[15px] font-medium tracking-[-0.3px] text-cursor-primary transition-opacity hover:opacity-90";

export const adminSelectClass = adminInputClass + " appearance-none pr-10";
