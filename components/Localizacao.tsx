import Image from "next/image";
import { dados, foto } from "@/lib/site";
import { Secao } from "./Secao";

export function Localizacao() {
  const { localizacao } = dados.secoes;
  const { mapa } = dados.negocio;
  const f = localizacao.foto;

  return (
    <Secao id="localizacao" titulo="Localização" eyebrow="Onde fica">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <p className="font-[family-name:var(--font-titulo)] text-2xl leading-snug sm:text-3xl">
            {localizacao.texto}
          </p>
          <p className="text-lg text-suave">{localizacao.acesso}</p>
          <a
            href={mapa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-primaria px-6 py-3.5 text-base font-semibold text-white hover:bg-[#093d6c]"
          >
            Abrir no Google Maps
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>
        <Image
          src={foto(f.arquivo)}
          alt={f.alt}
          width={f.largura}
          height={f.altura}
          sizes="(min-width: 768px) 480px, 100vw"
          className="revela mx-auto h-auto max-h-[560px] w-auto rounded-lg object-cover shadow-cartao"
        />
      </div>
    </Secao>
  );
}
