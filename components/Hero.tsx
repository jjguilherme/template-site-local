import Image from "next/image";
import { dados, fotoDaGaleria, foto } from "@/lib/site";
import { BotaoWhatsApp } from "./BotaoWhatsApp";

export function Hero() {
  const { hero } = dados.secoes;
  const capa = fotoDaGaleria(hero.foto);

  return (
    <section id="topo" className="relative isolate flex min-h-[82svh] items-end overflow-hidden bg-[#0a2540] sm:min-h-[88svh]">
      <Image
        src={foto(hero.foto)}
        alt={capa?.alt ?? ""}
        fill
        priority
        sizes="100vw"
        style={{ objectPosition: hero.enquadramento }}
        className="-z-20 object-cover"
      />
      {/* Escurece a base com o azul da marca para o texto manter contraste sobre a foto. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0a2540]/90 via-[#0a2540]/45 to-[#0a2540]/5" />
      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pb-24">
        <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-white">
          <span aria-hidden="true" className="h-px w-8 bg-white" />
          Chácara para alugar · {dados.negocio.cidade}
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold text-white [text-shadow:0_2px_18px_rgb(0_0_0/0.35)] sm:text-7xl">
          {hero.titulo}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white sm:text-xl">
          {hero.subtitulo} Espaço para até {dados.negocio.capacidade} pessoas.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
          <BotaoWhatsApp rotulo="Consultar datas no WhatsApp" />
          <a href="#galeria" className="font-semibold text-white underline underline-offset-4 hover:text-white/80">
            Ver fotos
          </a>
        </div>
      </div>
    </section>
  );
}
