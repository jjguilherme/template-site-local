import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { Figtree, Fraunces } from "next/font/google";
import { dados } from "@/lib/site";
import "./globals.css";

const titulo = Fraunces({
  variable: "--font-titulo",
  subsets: ["latin"],
});

const texto = Figtree({
  variable: "--font-texto",
  subsets: ["latin"],
});

const { negocio, secoes, visual } = dados;

export const metadata: Metadata = {
  title: `${negocio.nome} | Chácara para alugar`,
  description: `${secoes.hero.subtitulo} Até ${negocio.capacidade} pessoas.`,
};

export const viewport: Viewport = {
  themeColor: visual.corPrimaria,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const cores = {
    "--primaria": visual.corPrimaria,
    "--secundaria": visual.corSecundaria,
  } as CSSProperties;

  return (
    <html
      lang="pt-BR"
      className={`${titulo.variable} ${texto.variable} antialiased`}
      style={cores}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
