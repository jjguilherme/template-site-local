import type { ReactNode } from "react";

const tons = {
  claro: "bg-fundo",
  areia: "bg-areia",
  azul: "bg-primaria text-white sobre-azul",
};

export function Secao({
  id,
  titulo,
  eyebrow,
  intro,
  children,
  tom = "claro",
}: {
  id: string;
  titulo: string;
  eyebrow?: string;
  intro?: ReactNode;
  children: ReactNode;
  tom?: keyof typeof tons;
}) {
  const azul = tom === "azul";
  return (
    <section id={id} className={tons[tom]}>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <header className="revela max-w-2xl">
          {eyebrow && (
            <p className={`mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] ${azul ? "text-[#f3d9c8]" : "text-secundaria"}`}>
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {eyebrow}
            </p>
          )}
          <h2 className={`text-3xl font-semibold sm:text-5xl ${azul ? "text-white" : "text-primaria"}`}>{titulo}</h2>
          {intro && <p className={`mt-4 text-lg ${azul ? "text-white/90" : "text-suave"}`}>{intro}</p>}
        </header>
        <div className="mt-12 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}
