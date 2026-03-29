export function AdminError({ message }: { message: string }) {
  return (
    <div
      className="rounded-[16px] border border-red-500/30 bg-red-500/10 px-4 py-3 font-ibm text-[14px] leading-[1.45] text-cursor-primary tracking-[-0.28px]"
      role="alert"
    >
      {message}
    </div>
  );
}
