import { dados } from "@/lib/site";
import { Campo } from "./Campo";
import { Secao } from "./Secao";

export function Regras() {
  return (
    <Secao id="regras" titulo="Regras da casa">
      <dl className="max-w-2xl divide-y divide-linha border-y border-linha">
        {dados.secoes.regras.map((r) => (
          <div key={r.titulo} className="grid gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
            <dt className="font-semibold">{r.titulo}</dt>
            <dd className="text-suave">
              <Campo texto={r.texto} />
            </dd>
          </div>
        ))}
      </dl>
    </Secao>
  );
}
