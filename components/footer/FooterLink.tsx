import Link from "next/link";
import type { FooterNavItem } from "./footerConfig";

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export default function FooterLink({
  item,
  className,
}: {
  item: FooterNavItem;
  className?: string;
}) {
  const base =
    "font-ibm leading-[1.5] text-cursor-secondary transition-colors hover:text-cursor-primary";
  const merged = className ? `${base} ${className}` : base;

  if (isExternal(item.href)) {
    return (
      <a
        href={item.href}
        className={merged}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={merged}>
      {item.label}
    </Link>
  );
}
