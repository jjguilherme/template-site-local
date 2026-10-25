import { dados } from "@/lib/site";
import { Campo } from "./Campo";
import { FormularioReserva } from "./FormularioReserva";
import { Secao } from "./Secao";

export function ComoReservar() {
  return (
    <Secao id="como-reservar" titulo="Como reservar" eyebrow="Reserva pelo WhatsApp" tom="azul">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
        <div>
          <ol className="space-y-7">
            {dados.secoes.reservar.map((passo, i) => (
              <li key={passo} className="revela flex gap-5">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white font-[family-name:var(--font-titulo)] text-xl font-semibold text-primaria"
                >
                  {i + 1}
                </span>
                <p className="pt-2 text-lg sm:text-xl">{passo}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 border-t border-white/25 pt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f3d9c8]">Valores</p>
            <p className="mt-2 font-[family-name:var(--font-titulo)] text-2xl font-semibold sm:text-3xl">
              <Campo texto={dados.secoes.valores} />
            </p>
            <p className="mt-2 text-white/90">Capacidade: até {dados.negocio.capacidade} pessoas.</p>
          </div>
        </div>
        <div className="revela">
          <FormularioReserva />
        </div>
      </div>
    </Secao>
  );
}
