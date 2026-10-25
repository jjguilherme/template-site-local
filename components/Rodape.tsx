import { dados } from "@/lib/site";
import { Campo } from "./Campo";

export function Rodape() {
  return (
    <footer className="bg-primaria px-4 pb-28 pt-10 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="font-[family-name:var(--font-titulo)] text-xl font-semibold">
          <Campo texto={dados.negocio.nome} />
        </p>
        <p className="mt-1 text-white/90">
          Chácara para alugar em <Campo texto={dados.negocio.cidade} />. Até {dados.negocio.capacidade} pessoas.
        </p>
      </div>
    </footer>
  );
}
