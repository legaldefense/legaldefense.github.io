"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { MoonIcon, SunIcon } from "./icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink-soft transition-colors hover:border-navy/30 hover:text-navy dark:border-white/15 dark:text-white/70 dark:hover:border-white/30 dark:hover:text-white"
    >
      {/* renderiza só após montar para evitar mismatch de hidratação */}
      <span className="sr-only">Alternar tema</span>
      {mounted ? (
        isDark ? (
          <SunIcon className="h-[18px] w-[18px]" />
        ) : (
          <MoonIcon className="h-[18px] w-[18px]" />
        )
      ) : (
        <MoonIcon className="h-[18px] w-[18px] opacity-0" />
      )}
    </button>
  );
}
