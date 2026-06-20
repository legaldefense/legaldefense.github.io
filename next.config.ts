import type { NextConfig } from "next";

// Static export: gera `out/` (HTML/CSS/JS estáticos) — hospedado no Amplify como
// site estático (sem compute SSR). Landing institucional não precisa de servidor.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
