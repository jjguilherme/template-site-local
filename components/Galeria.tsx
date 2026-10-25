"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { foto, type FotoGaleria } from "@/lib/site";

export function Galeria({ fotos }: { fotos: FotoGaleria[] }) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const [aberta, setAberta] = useState<FotoGaleria | null>(null);

  function abrir(f: FotoGaleria) {
    setAberta(f);
    dialogo.current?.showModal();
  }

  return (
    <>
      <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3">
        {fotos.map((f, i) => (
          <li key={f.arquivo} className="mb-3 break-inside-avoid sm:mb-4">
            <button
              type="button"
              onClick={() => abrir(f)}
              aria-label={`Ampliar foto: ${f.alt}`}
              className="block w-full overflow-hidden rounded-lg"
            >
              <Image
                src={foto(f.arquivo)}
                alt={f.alt}
                width={f.largura}
                height={f.altura}
                sizes="(min-width: 1024px) 380px, 50vw"
                loading={i < 2 ? "eager" : "lazy"}
                className="h-auto w-full transition-transform duration-300 hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogo}
        onClose={() => setAberta(null)}
        onClick={(e) => e.target === dialogo.current && dialogo.current?.close()}
        aria-label="Foto ampliada"
        className="m-auto max-h-[92svh] w-[min(96vw,1100px)] rounded-lg bg-black p-0 backdrop:bg-black/80"
      >
        {aberta && (
          <div className="relative">
            <Image
              src={foto(aberta.arquivo)}
              alt={aberta.alt}
              width={aberta.largura}
              height={aberta.altura}
              sizes="96vw"
              className="max-h-[88svh] w-full object-contain"
            />
            <button
              type="button"
              onClick={() => dialogo.current?.close()}
              className="absolute right-2 top-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-tinta"
            >
              Fechar
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
