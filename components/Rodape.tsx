import { dados } from "@/lib/site";
import { BotaoWhatsApp } from "./BotaoWhatsApp";

export function Rodape() {
  const { nome, cidade, mapa } = dados.negocio;
  return (
    <footer className="sobre-azul bg-[#0a2540] px-4 pb-28 pt-14 text-white sm:px-6 md:pb-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-[family-name:var(--font-titulo)] text-3xl font-semibold">{nome}</p>
          <p className="mt-2 text-white/90">Chácara para alugar em {cidade}.</p>
          <p className="mt-6 text-sm text-white/80">
            © {process.env.NEXT_PUBLIC_ANO} {nome}
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <BotaoWhatsApp />
          <a href={mapa} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4 hover:text-white/80">
            Ver no Google Maps
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
