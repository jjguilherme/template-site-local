import { dados } from "@/lib/site";
import { BotaoWhatsApp } from "./BotaoWhatsApp";
import { Campo } from "./Campo";
import { Secao } from "./Secao";

export function ComoReservar() {
  return (
    <Secao id="como-reservar" titulo="Como reservar">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <ol className="space-y-6">
          {dados.secoes.reservar.map((passo, i) => (
            <li key={passo} className="flex gap-5">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secundaria font-semibold text-white"
              >
                {i + 1}
              </span>
              <p className="pt-1.5 text-lg">{passo}</p>
            </li>
          ))}
        </ol>
        <div className="rounded-xl border border-linha bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-suave">Valores</p>
          <p className="mt-2 font-[family-name:var(--font-titulo)] text-2xl font-semibold text-primaria">
            <Campo texto={dados.secoes.valores} />
          </p>
          <p className="mt-2 text-suave">Capacidade: até {dados.negocio.capacidade} pessoas.</p>
          <div className="mt-6">
            <BotaoWhatsApp />
          </div>
        </div>
      </div>
    </Secao>
  );
}
