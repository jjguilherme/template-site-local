import Image from "next/image";
import { dados, foto } from "@/lib/site";
import { BotaoWhatsApp } from "./BotaoWhatsApp";
import { Campo } from "./Campo";

export function Hero() {
  const { hero } = dados.secoes;
  const capa = dados.secoes.galeria.find((f) => f.arquivo === hero.foto);

  return (
    <section id="topo" className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-primaria sm:min-h-[85svh]">
      <Image
        src={foto(hero.foto)}
        alt={capa?.alt ?? ""}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[50%_65%]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      <div className="mx-auto w-full max-w-6xl px-4 pb-14 pt-24 sm:px-6 sm:pb-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/90">
          Chácara para alugar · <Campo texto={dados.negocio.cidade} />
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
          <Campo texto={hero.titulo} />
        </h1>
        <p className="mt-4 max-w-xl text-lg text-white/95">
          {hero.subtitulo} Espaço para até {dados.negocio.capacidade} pessoas.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <BotaoWhatsApp rotulo="Consultar datas no WhatsApp" />
          <a href="#galeria" className="font-semibold text-white underline underline-offset-4 hover:text-white/80">
            Ver fotos
          </a>
        </div>
      </div>
    </section>
  );
}
