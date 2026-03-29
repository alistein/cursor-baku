export function AdminPageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 max-w-[720px]">
      {eyebrow ? (
        <p className="mb-2 font-ibm text-[14px] leading-none text-cursor-secondary tracking-[-0.28px] md:text-[16px] md:tracking-[-0.32px]">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-sans text-[32px] font-medium leading-[1.05] tracking-[-1.28px] text-cursor-primary md:text-[48px] md:tracking-[-1.92px]">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 font-ibm text-[15px] leading-[1.5] text-cursor-secondary tracking-[-0.3px] md:text-[16px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
