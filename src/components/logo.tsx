import Image from "next/image";

export function Logo({
  className = "",
  showWord = true,
}: {
  className?: string;
  showWord?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo.svg"
        alt="Legal Defense"
        width={32}
        height={32}
        className="h-8 w-8"
        priority
      />
      {showWord && (
        <span className="flex flex-col leading-none">
          <span className="text-[15px] font-semibold tracking-tight text-ink dark:text-white">
            Legal<span className="text-green dark:text-green-bright">Defense</span>
          </span>
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted dark:text-white/50">
            Investigação defensiva
          </span>
        </span>
      )}
    </span>
  );
}
