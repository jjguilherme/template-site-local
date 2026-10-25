import { dados } from "@/lib/site";
import { Campo } from "./Campo";
import { Secao } from "./Secao";

export function Faq() {
  return (
    <Secao id="faq" titulo="Perguntas frequentes" fundo>
      <div className="max-w-3xl divide-y divide-linha border-y border-linha">
        {dados.secoes.faq.map((item) => (
          <details key={item.pergunta} className="group py-1">
            <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-4 py-3 text-lg font-semibold">
              {item.pergunta}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                className="seta h-5 w-5 shrink-0 transition-transform"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <p className="pb-4 text-suave">
              <Campo texto={item.resposta} />
            </p>
          </details>
        ))}
      </div>
    </Secao>
  );
}
