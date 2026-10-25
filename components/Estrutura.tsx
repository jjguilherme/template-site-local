import Image from "next/image";
import { dados, foto, fotoDaGaleria } from "@/lib/site";
import { Campo } from "./Campo";
import { Icone } from "./Icones";
import { Secao } from "./Secao";

// Larguras alternadas (7 e 5 de 12 colunas) para dar ritmo à grade no computador.
const larguras = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-7", "lg:col-span-5"];

export function Estrutura() {
  return (
    <Secao id="estrutura" titulo="Estrutura" eyebrow="O que tem na chácara" intro={dados.secoes.sobre} tom="areia">
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
        {dados.secoes.estrutura.map((item, i) => {
          const f = item.foto ? fotoDaGaleria(item.foto) : undefined;
          return (
            <li key={item.titulo} className={`revela group flex flex-col overflow-hidden rounded-lg bg-white shadow-cartao transition duration-300 motion-safe:hover:-translate-y-1 ${larguras[i % larguras.length]}`}>
              {f && item.foto ? (
                <div className="relative h-56 overflow-hidden sm:h-64">
                  <Image
                    src={foto(item.foto)}
                    alt={f.alt}
                    fill
                    sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                  />
                </div>
              ) : (
                <div aria-hidden="true" className="flex h-24 items-center justify-center bg-primaria/10 text-primaria">
                  <Icone nome={item.icone} className="h-10 w-10" />
                </div>
              )}
              <div className="flex flex-1 gap-4 p-5 sm:p-6">
                {f && (
                  <span className="mt-1 shrink-0 text-secundaria">
                    <Icone nome={item.icone} />
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-semibold sm:text-2xl">{item.titulo}</h3>
                  <p className="mt-2 text-suave">
                    <Campo texto={item.texto} />
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Secao>
  );
}
