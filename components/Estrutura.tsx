import { dados } from "@/lib/site";
import { Campo } from "./Campo";
import { Icone } from "./Icones";
import { Secao } from "./Secao";

export function Estrutura() {
  return (
    <Secao
      id="estrutura"
      titulo="Estrutura"
      intro={dados.secoes.sobre}
      fundo
    >
      <dl className="grid gap-x-12 md:grid-cols-2">
        {dados.secoes.estrutura.map((item) => (
          <div key={item.titulo} className="flex gap-4 border-t border-linha py-6">
            <span className="mt-1 text-secundaria">
              <Icone nome={item.icone} />
            </span>
            <div>
              <dt className="font-[family-name:var(--font-titulo)] text-xl font-semibold">{item.titulo}</dt>
              <dd className="mt-1 text-suave">
                <Campo texto={item.texto} />
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </Secao>
  );
}
