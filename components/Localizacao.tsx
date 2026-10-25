import Image from "next/image";
import { dados, foto } from "@/lib/site";
import { Campo } from "./Campo";
import { Secao } from "./Secao";

export function Localizacao() {
  const { localizacao } = dados.secoes;
  const { cidade, endereco } = dados.negocio;
  const f = localizacao.foto;

  return (
    <Secao id="localizacao" titulo="Localização" fundo>
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-5 text-lg">
          <p>
            <Campo texto={localizacao.texto} />
          </p>
          <p>
            <span className="font-semibold">Cidade:</span> <Campo texto={cidade} />
          </p>
          <p>
            <span className="font-semibold">Endereço ou ponto de referência:</span> <Campo texto={endereco} />
          </p>
          <p className="text-base text-suave">O mapa entra aqui quando o endereço for confirmado.</p>
        </div>
        <Image
          src={foto(f.arquivo)}
          alt={f.alt}
          width={f.largura}
          height={f.altura}
          sizes="(min-width: 768px) 480px, 100vw"
          className="mx-auto h-auto max-h-[560px] w-auto rounded-xl object-cover"
        />
      </div>
    </Secao>
  );
}
