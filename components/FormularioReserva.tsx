"use client";

import { useId, useState } from "react";
import { dados, linkWhatsapp } from "@/lib/site";
import { IconeWhatsapp } from "./Icones";

const MAX_PESSOAS = dados.negocio.capacidade;

const campo =
  "mt-1.5 block min-h-12 w-full rounded-lg border border-suave/60 bg-white px-3.5 text-base text-tinta aria-[invalid=true]:border-[#b3261e]";

function formatarData(iso: string): string {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

function hojeIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

type Erros = Partial<Record<"entrada" | "saida" | "pessoas" | "animais", string>>;

/** Monta a mensagem e abre o WhatsApp. Nada é enviado nem guardado por este site. */
export function FormularioReserva() {
  const id = useId();
  const [entrada, setEntrada] = useState("");
  const [saida, setSaida] = useState("");
  const [pessoas, setPessoas] = useState("");
  const [animais, setAnimais] = useState("");
  const [tentou, setTentou] = useState(false);

  const total = Number(pessoas);
  const passouDoLimite = pessoas !== "" && total > MAX_PESSOAS;

  function validar(): Erros {
    const erros: Erros = {};
    if (!entrada) erros.entrada = "Informe a data de entrada.";
    else if (entrada < hojeIso()) erros.entrada = "A data de entrada já passou.";
    if (!saida) erros.saida = "Informe a data de saída.";
    else if (entrada && saida < entrada) erros.saida = "A saída não pode ser antes da entrada.";
    if (!Number.isInteger(total) || total < 1) erros.pessoas = "Informe quantas pessoas vão.";
    else if (total > MAX_PESSOAS) erros.pessoas = `A chácara comporta até ${MAX_PESSOAS} pessoas.`;
    if (!animais) erros.animais = "Diga se vai levar animais.";
    return erros;
  }

  const erros = tentou ? validar() : {};
  // O aviso de limite aparece assim que o número passa de 18, sem esperar o envio.
  if (passouDoLimite) erros.pessoas = `A chácara comporta até ${MAX_PESSOAS} pessoas.`;

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    setTentou(true);
    if (Object.keys(validar()).length > 0) return;

    const mensagem = [
      `Oi! Vi o site da ${dados.negocio.nome} e queria saber a disponibilidade.`,
      `Entrada: ${formatarData(entrada)}`,
      `Saída: ${formatarData(saida)}`,
      `Pessoas: ${total}`,
      `Animais: ${animais === "sim" ? "sim" : "não"}`,
    ].join("\n");

    // Um link clicado no mesmo gesto do envio não é barrado pelo bloqueador de pop-ups.
    const a = document.createElement("a");
    a.href = linkWhatsapp(mensagem);
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  }

  const erro = (nome: keyof Erros) => (
    erros[nome] ? (
      <p id={`${id}-${nome}`} className="mt-1.5 text-sm font-semibold text-[#b3261e]">
        {erros[nome]}
      </p>
    ) : null
  );
  const liga = (nome: keyof Erros) => ({
    "aria-invalid": erros[nome] ? true : undefined,
    "aria-describedby": erros[nome] ? `${id}-${nome}` : undefined,
  });

  return (
    <form onSubmit={enviar} noValidate className="space-y-5 rounded-lg bg-white p-5 text-tinta shadow-cartao sm:p-7">
      <div>
        <h3 className="text-2xl font-semibold text-primaria">Monte sua mensagem</h3>
        <p className="mt-1 text-sm text-suave">Ao enviar, abre o WhatsApp com a mensagem pronta. Nada é guardado por este site.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-entrada`} className="text-sm font-semibold">Data de entrada</label>
          <input id={`${id}-entrada`} type="date" value={entrada} onChange={(e) => setEntrada(e.target.value)} required className={campo} {...liga("entrada")} />
          {erro("entrada")}
        </div>
        <div>
          <label htmlFor={`${id}-saida`} className="text-sm font-semibold">Data de saída</label>
          <input id={`${id}-saida`} type="date" value={saida} min={entrada || undefined} onChange={(e) => setSaida(e.target.value)} required className={campo} {...liga("saida")} />
          {erro("saida")}
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-pessoas`} className="text-sm font-semibold">Número de pessoas (máximo {MAX_PESSOAS})</label>
        <input
          id={`${id}-pessoas`}
          type="number"
          inputMode="numeric"
          min={1}
          value={pessoas}
          onChange={(e) => setPessoas(e.target.value)}
          required
          className={campo}
          {...liga("pessoas")}
        />
        {erro("pessoas")}
      </div>

      <fieldset aria-describedby={erros.animais ? `${id}-animais` : undefined}>
        <legend className="text-sm font-semibold">Vai levar animais?</legend>
        <div className="mt-1.5 flex gap-3">
          {[
            ["sim", "Sim"],
            ["nao", "Não"],
          ].map(([valor, rotulo]) => (
            <label key={valor} className="flex min-h-12 flex-1 cursor-pointer items-center justify-center rounded-lg border border-suave/60 px-4 font-semibold has-[:checked]:border-primaria has-[:checked]:bg-primaria has-[:checked]:text-white has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-secundaria">
              <input type="radio" name={`${id}-animais`} value={valor} checked={animais === valor} onChange={() => setAnimais(valor)} className="sr-only" />
              {rotulo}
            </label>
          ))}
        </div>
        {erro("animais")}
      </fieldset>

      <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#117a3d] px-6 text-base font-semibold text-white hover:bg-[#0d6532]">
        <IconeWhatsapp />
        Enviar pelo WhatsApp
      </button>
    </form>
  );
}
