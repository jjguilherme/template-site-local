import type { ReactNode } from "react";

export function Secao({
  id,
  titulo,
  intro,
  children,
  fundo = false,
}: {
  id: string;
  titulo: string;
  intro?: ReactNode;
  children: ReactNode;
  fundo?: boolean;
}) {
  return (
    <section id={id} className={fundo ? "bg-[#f1e9da]" : ""}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-3xl font-semibold text-primaria sm:text-4xl">{titulo}</h2>
        {intro && <p className="mt-3 max-w-2xl text-lg text-suave">{intro}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
