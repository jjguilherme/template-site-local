import { dados } from "@/lib/site";
import { Campo } from "./Campo";

const links = [
  ["#galeria", "Fotos"],
  ["#estrutura", "Estrutura"],
  ["#como-reservar", "Reservar"],
  ["#localizacao", "Localização"],
  ["#regras", "Regras"],
  ["#faq", "Perguntas"],
];

export function Cabecalho() {
  return (
    <header className="sticky top-0 z-30 border-b border-linha bg-fundo/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#topo" className="min-w-0 truncate font-[family-name:var(--font-titulo)] text-lg font-semibold text-primaria">
          <Campo texto={dados.negocio.nome} />
        </a>
        <nav aria-label="Seções da página" className="hidden lg:block">
          <ul className="flex gap-6 text-sm font-medium">
            {links.map(([href, nome]) => (
              <li key={href}>
                <a href={href} className="py-2 hover:text-primaria hover:underline underline-offset-4">
                  {nome}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
