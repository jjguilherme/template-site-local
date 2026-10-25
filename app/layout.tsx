import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { Figtree, Fraunces } from "next/font/google";
import { dados } from "@/lib/site";
import { descricao, imagemDeCompartilhamento, urlDoSite } from "@/lib/seo";
import "./globals.css";

const titulo = Fraunces({
  variable: "--font-titulo",
  subsets: ["latin"],
});

const texto = Figtree({
  variable: "--font-texto",
  subsets: ["latin"],
});

const { negocio, visual } = dados;
const tituloDaPagina = `${negocio.nome} | Chácara para alugar em ${negocio.cidade}`;

export const metadata: Metadata = {
  metadataBase: new URL(`${urlDoSite}/`),
  title: tituloDaPagina,
  description: descricao,
  alternates: { canonical: `${urlDoSite}/` },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${urlDoSite}/`,
    siteName: negocio.nome,
    title: tituloDaPagina,
    description: descricao,
    images: [
      {
        url: imagemDeCompartilhamento,
        width: 1200,
        height: 630,
        alt: "Piscina de pastilha azul com a casa de telhado colonial ao fundo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: tituloDaPagina,
    description: descricao,
    images: [imagemDeCompartilhamento],
  },
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
