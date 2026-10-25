"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { foto, type FotoGaleria } from "@/lib/site";

const botaoSeta =
  "absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-primaria shadow-md hover:bg-white disabled:opacity-0 sm:flex";

function Seta({ lado }: { lado: "esq" | "dir" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true" className="h-6 w-6">
      <path d={lado === "esq" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

export function Carrossel({
  fotos,
  onAbrir,
}: {
  fotos: FotoGaleria[];
  onAbrir: (indice: number) => void;
}) {
  const trilho = useRef<HTMLUListElement>(null);
  const [atual, setAtual] = useState(0);

  const ir = useCallback((indice: number) => {
    const el = trilho.current;
    const slide = el?.children[indice] as HTMLElement | undefined;
    if (!el || !slide) return;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({
      left: slide.offsetLeft - (el.clientWidth - slide.clientWidth) / 2,
      behavior: reduzir ? "auto" : "smooth",
    });
  }, []);

  // O slide atual é o mais perto do centro do trilho.
  useEffect(() => {
    const el = trilho.current;
    if (!el) return;
    let quadro = 0;
    const medir = () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        const centro = el.scrollLeft + el.clientWidth / 2;
        let melhor = 0;
        let menor = Infinity;
        Array.from(el.children).forEach((c, i) => {
          const s = c as HTMLElement;
          const distancia = Math.abs(s.offsetLeft + s.clientWidth / 2 - centro);
          if (distancia < menor) {
            menor = distancia;
            melhor = i;
          }
        });
        setAtual(melhor);
      });
    };
    el.addEventListener("scroll", medir, { passive: true });
    return () => {
      el.removeEventListener("scroll", medir);
      cancelAnimationFrame(quadro);
    };
  }, []);

  function aoTeclar(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight" && atual < fotos.length - 1) {
      e.preventDefault();
      ir(atual + 1);
    } else if (e.key === "ArrowLeft" && atual > 0) {
      e.preventDefault();
      ir(atual - 1);
    }
  }

  return (
    <div role="group" aria-roledescription="carrossel" aria-label="Fotos da chácara">
      <div className="relative">
        <button type="button" onClick={() => ir(atual - 1)} disabled={atual === 0} aria-label="Foto anterior" className={`${botaoSeta} left-3`}>
          <Seta lado="esq" />
        </button>
        <button type="button" onClick={() => ir(atual + 1)} disabled={atual === fotos.length - 1} aria-label="Próxima foto" className={`${botaoSeta} right-3`}>
          <Seta lado="dir" />
        </button>

        <ul
          ref={trilho}
          tabIndex={0}
          onKeyDown={aoTeclar}
          aria-label="Use as setas do teclado para trocar de foto"
          className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth rounded-lg pb-1 [scrollbar-width:none] sm:gap-4 [&::-webkit-scrollbar]:hidden"
        >
          {fotos.map((f, i) => (
            <li
              key={f.arquivo}
              aria-roledescription="slide"
              aria-label={`Foto ${i + 1} de ${fotos.length}`}
              className="h-[250px] shrink-0 snap-center sm:h-[360px] lg:h-[460px]"
            >
              <button type="button" onClick={() => onAbrir(i)} aria-label={`Ampliar: ${f.alt}`} className="block h-full overflow-hidden rounded-lg">
                <Image
                  src={foto(f.arquivo)}
                  alt={f.alt}
                  width={f.largura}
                  height={f.altura}
                  sizes="(min-width: 1024px) 820px, (min-width: 640px) 640px, 90vw"
                  loading={i === 0 ? "eager" : "lazy"}
                  className="h-full w-auto max-w-none object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="sr-only" aria-live="polite">
        Foto {atual + 1} de {fotos.length}
      </p>

      <div className="mt-4 flex items-center justify-between gap-4">
        <ol className="flex flex-wrap items-center" aria-label="Indicadores">
          {fotos.map((f, i) => (
            <li key={f.arquivo}>
              <button
                type="button"
                onClick={() => ir(i)}
                aria-label={`Ir para a foto ${i + 1}`}
                aria-current={i === atual}
                className="flex h-8 w-6 items-center justify-center"
              >
                <span className={`block h-2.5 rounded-full transition-all ${i === atual ? "w-6 bg-secundaria" : "w-2.5 bg-primaria/30"}`} />
              </button>
            </li>
          ))}
        </ol>
        <p className="text-sm text-suave" aria-hidden="true">
          {atual + 1} / {fotos.length}
        </p>
      </div>

      <ul className="mt-3 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]" aria-label="Miniaturas">
        {fotos.map((f, i) => (
          <li key={f.arquivo} className="shrink-0">
            <button
              type="button"
              onClick={() => ir(i)}
              aria-label={`Ver foto ${i + 1}: ${f.alt}`}
              aria-current={i === atual}
              className={`block overflow-hidden rounded-md border-2 ${i === atual ? "border-secundaria" : "border-transparent opacity-80 hover:opacity-100"}`}
            >
              <Image src={foto(f.arquivo)} alt="" width={96} height={64} sizes="96px" loading="lazy" className="h-16 w-24 object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
