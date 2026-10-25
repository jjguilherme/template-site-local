"use client";

import { useEffect, useRef, useState } from "react";
import { dados, linkWhatsapp, whatsappPronto } from "@/lib/site";
import { IconeWhatsapp } from "./Icones";

const links = [
  { id: "galeria", nome: "Fotos" },
  { id: "estrutura", nome: "Estrutura" },
  { id: "como-reservar", nome: "Reservar" },
  { id: "localizacao", nome: "Localização" },
  { id: "regras", nome: "Regras" },
  { id: "faq", nome: "Perguntas" },
];

export function Cabecalho() {
  const [aberto, setAberto] = useState(false);
  const [ativo, setAtivo] = useState("");
  const botaoMenu = useRef<HTMLButtonElement>(null);

  // Destaca a seção que está cruzando o meio da tela.
  useEffect(() => {
    const ids = ["topo", ...links.map((l) => l.id)];
    const elementos = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) setAtivo(e.target.id === "topo" ? "" : e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elementos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, []);

  function aoTeclar(e: React.KeyboardEvent) {
    if (e.key === "Escape" && aberto) {
      setAberto(false);
      botaoMenu.current?.focus();
    }
  }

  const pronto = whatsappPronto(dados.negocio.whatsapp);

  return (
    <header onKeyDown={aoTeclar} className="sticky top-0 z-30 border-b border-linha bg-fundo/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#topo" className="min-w-0 truncate font-[family-name:var(--font-titulo)] text-xl font-semibold text-primaria">
          {dados.negocio.nome}
        </a>

        <nav aria-label="Seções da página" className="hidden lg:block">
          <ul className="flex gap-1 text-sm font-semibold">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={ativo === l.id ? "location" : undefined}
                  className="block rounded-full px-3.5 py-2 text-tinta hover:text-primaria aria-[current=location]:bg-primaria/10 aria-[current=location]:text-primaria"
                >
                  {l.nome}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={linkWhatsapp()}
            {...(pronto ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="hidden items-center gap-2 rounded-full bg-[#117a3d] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0d6532] md:inline-flex"
          >
            <IconeWhatsapp className="h-5 w-5" />
            WhatsApp
          </a>
          <button
            ref={botaoMenu}
            type="button"
            onClick={() => setAberto(!aberto)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-linha text-primaria lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="h-6 w-6">
              <path d={aberto ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} />
            </svg>
          </button>
        </div>
      </div>

      {aberto && (
        <nav id="menu-mobile" aria-label="Seções da página" className="border-t border-linha bg-fundo lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {links.map((l) => (
              <li key={l.id} className="border-b border-linha last:border-0">
                <a
                  href={`#${l.id}`}
                  onClick={() => setAberto(false)}
                  aria-current={ativo === l.id ? "location" : undefined}
                  className="flex min-h-12 items-center text-lg font-semibold aria-[current=location]:text-secundaria"
                >
                  {l.nome}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
