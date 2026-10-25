"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { foto, type FotoGaleria } from "@/lib/site";

const botao =
  "flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-tinta shadow-md hover:bg-white disabled:opacity-40";

export function Lightbox({
  fotos,
  indice,
  onMudar,
  onFechar,
}: {
  fotos: FotoGaleria[];
  indice: number | null;
  onMudar: (indice: number) => void;
  onFechar: () => void;
}) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const inicioToque = useRef<number | null>(null);
  const aberto = indice !== null;
  const f = indice !== null ? fotos[indice] : null;

  // <dialog> com showModal prende o foco, bloqueia o resto da página e fecha com Esc.
  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (aberto && !d.open) {
      d.showModal();
      d.querySelector<HTMLElement>("[data-fechar]")?.focus();
    }
    if (!aberto && d.open) d.close();
  }, [aberto]);

  function aoTeclar(e: React.KeyboardEvent) {
    if (indice === null) return;
    if (e.key === "ArrowRight" && indice < fotos.length - 1) onMudar(indice + 1);
    if (e.key === "ArrowLeft" && indice > 0) onMudar(indice - 1);
  }

  function aoSoltar(e: React.PointerEvent) {
    if (inicioToque.current === null || indice === null) return;
    const deslocamento = e.clientX - inicioToque.current;
    inicioToque.current = null;
    if (deslocamento < -50 && indice < fotos.length - 1) onMudar(indice + 1);
    if (deslocamento > 50 && indice > 0) onMudar(indice - 1);
  }

  return (
    <dialog
      ref={dialogo}
      onClose={onFechar}
      onKeyDown={aoTeclar}
      onClick={(e) => e.target === dialogo.current && onFechar()}
      aria-label="Foto ampliada"
      className="m-0 h-[100svh] max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-black/90"
    >
      {f && indice !== null && (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-3 p-3 sm:p-6"
          onClick={(e) => e.target === e.currentTarget && onFechar()}
          onPointerDown={(e) => (inicioToque.current = e.clientX)}
          onPointerUp={aoSoltar}
        >
          <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
            <Image src={foto(f.arquivo)} alt={f.alt} fill sizes="100vw" className="object-contain" />
          </div>
          <p className="max-w-2xl text-center text-sm text-white">
            {f.alt} ({indice + 1} de {fotos.length})
          </p>
          <div className="flex items-center gap-4">
            <button type="button" className={botao} disabled={indice === 0} onClick={() => onMudar(indice - 1)} aria-label="Foto anterior">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true" className="h-6 w-6">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button type="button" data-fechar onClick={onFechar} className="h-12 rounded-full bg-white px-6 font-semibold text-tinta hover:bg-white/90">
              Fechar
            </button>
            <button type="button" className={botao} disabled={indice === fotos.length - 1} onClick={() => onMudar(indice + 1)} aria-label="Próxima foto">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true" className="h-6 w-6">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
