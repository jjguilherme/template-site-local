"use client";

import { useState } from "react";
import type { FotoGaleria } from "@/lib/site";
import { Carrossel } from "./Carrossel";
import { Lightbox } from "./Lightbox";

type Categoria = { id: string; nome: string };

export function Galeria({ fotos, categorias }: { fotos: FotoGaleria[]; categorias: Categoria[] }) {
  const [filtro, setFiltro] = useState("todas");
  const [aberta, setAberta] = useState<number | null>(null);

  const visiveis = filtro === "todas" ? fotos : fotos.filter((f) => f.categoria === filtro);
  const filtros = [{ id: "todas", nome: "Todas" }, ...categorias];

  return (
    <div>
      <div role="group" aria-label="Filtrar fotos por ambiente" className="mb-6 flex flex-wrap gap-2">
        {filtros.map((c) => {
          const total = c.id === "todas" ? fotos.length : fotos.filter((f) => f.categoria === c.id).length;
          const ativo = filtro === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={ativo}
              onClick={() => setFiltro(c.id)}
              className={`min-h-11 rounded-full border px-4 text-sm font-semibold ${
                ativo ? "border-primaria bg-primaria text-white" : "border-linha bg-white text-tinta hover:border-primaria"
              }`}
            >
              {c.nome} <span className={ativo ? "text-white/80" : "text-suave"}>({total})</span>
            </button>
          );
        })}
      </div>

      <Carrossel key={filtro} fotos={visiveis} onAbrir={setAberta} />
      <Lightbox fotos={visiveis} indice={aberta} onMudar={setAberta} onFechar={() => setAberta(null)} />
    </div>
  );
}
