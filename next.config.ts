import type { NextConfig } from "next";

// Prévia no GitHub Pages: exportação estática numa subpasta, sem a rota do chatbot.
// O build normal (Vercel) não usa nada disso.
const previa = process.env.GITHUB_PAGES === "true";
const basePath = previa ? "/template-site-local" : "";

const nextConfig: NextConfig = {
  // Cache Components não funciona com exportação estática.
  cacheComponents: !previa,
  partialPrefetching: !previa,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { formats: ["image/avif", "image/webp"] },
  ...(previa && {
    output: "export",
    basePath,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
