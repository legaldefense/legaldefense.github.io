"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

// Cor da barra do navegador (address bar no mobile) precisa seguir o tema ATIVO
// (escolhido no toggle), e não o `prefers-color-scheme` do SO. As metas estáticas
// em `viewport.themeColor` cobrem só a 1ª pintura (sem JS); aqui assumimos depois.
const THEME_COLOR = { dark: "#0a1024", light: "#ffffff" } as const;

export function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const color =
      resolvedTheme === "dark" ? THEME_COLOR.dark : THEME_COLOR.light;
    // remove as metas baseadas em media (prefers-color-scheme) e mantém uma única
    // controlada por JS, que acompanha o tema realmente aplicado.
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((m) => m.remove());
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = color;
    document.head.appendChild(meta);
  }, [resolvedTheme]);

  return null;
}
