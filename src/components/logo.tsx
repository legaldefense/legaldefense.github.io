import Image from "next/image";

export function Logo({
  className = "",
  variant = "dark",
  showWord = true,
}: {
  className?: string;
  variant?: "dark" | "light";
  showWord?: boolean;
}) {
  const word = variant === "light" ? "text-white" : "text-ink";
  const accent = variant === "light" ? "text-white/55" : "text-muted";
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
          <span className={`text-[15px] font-semibold tracking-tight ${word}`}>
            Legal<span className="text-green">Defense</span>
          </span>
          <span
            className={`mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] ${accent}`}
          >
            Investigação defensiva
          </span>
        </span>
      )}
    </span>
  );
}
