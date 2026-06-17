"use client";

import { useSubscribeForm } from "./useSubscribeForm";

function cx(...parts: (string | undefined | false)[]) {
  return parts.filter(Boolean).join(" ");
}

interface SubscribeFormPillProps {
  /** Passed through to useSubscribeForm */
  successMessage?: string;
  /** HTML id on the <form> element */
  formId?: string;
  /** Classes applied to the outer flex-col wrapper (use for margins, width constraints) */
  className?: string;
  /** Classes applied to the pill <form> itself (use for height and padding) */
  pillClassName?: string;
}

export function SubscribeFormPill({
  successMessage,
  formId,
  className,
  pillClassName,
}: SubscribeFormPillProps) {
  const { formRef, action, status, message, isPending } =
    useSubscribeForm(successMessage);

  return (
    <div className={cx("flex flex-col gap-3", className)}>
      <form
        ref={formRef}
        id={formId}
        action={action}
        className={cx(
          "flex items-center justify-between rounded-[1000px] border border-cursor-border bg-cursor-card focus-within:border-cursor-primary/40 transition-colors duration-200",
          pillClassName,
        )}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          disabled={isPending}
          required
          className="flex-1 min-w-0 bg-transparent font-ibm text-[16px] md:text-[18px] text-cursor-primary placeholder:text-cursor-secondary tracking-[-0.36px] leading-normal outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-[10px] md:gap-3 shrink-0 h-full px-5 rounded-[50px] bg-cursor-bg cursor-pointer hover:opacity-80 active:scale-[0.97] transition-[transform,opacity] duration-200 motion-reduce:transition-none disabled:cursor-not-allowed"
        >
          <span
            className={cx(
              "w-2 h-2 md:w-3 md:h-3 rounded-full bg-cursor-orange shrink-0",
              isPending && "animate-pulse",
            )}
          />
          <span className="font-ibm font-medium text-[14px] md:text-[16px] text-cursor-primary tracking-[-0.28px] md:tracking-[-0.32px] leading-normal whitespace-nowrap">
            {isPending
              ? "Sending..."
              : status === "success"
                ? "Done!"
                : status === "error"
                  ? "Try again"
                  : "Get Updates"}
          </span>
        </button>
      </form>
      {message ? (
        <p
          aria-live="polite"
          className={`font-ibm text-[14px] tracking-[-0.28px] ${
            status === "success" ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
