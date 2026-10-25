import { pendente } from "@/lib/site";

/** Mostra o texto; se ainda for [PREENCHER], destaca como pendência. */
export function Campo({ texto }: { texto: string }) {
  if (pendente(texto)) return <span className="pendente">{texto}</span>;
  return <>{texto}</>;
}
