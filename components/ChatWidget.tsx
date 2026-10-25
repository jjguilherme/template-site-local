"use client";

import { useEffect, useRef, useState } from "react";
import { dados, linkWhatsapp } from "@/lib/site";

type Fala = { role: "user" | "assistant"; content: string };

const MAX_CARACTERES = 500;

export function ChatWidget({ nome }: { nome: string }) {
  const [aberto, setAberto] = useState(false);
  const [falas, setFalas] = useState<Fala[]>([]);
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [aviso, setAviso] = useState("");
  const fim = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fim.current?.scrollIntoView({ block: "end" });
  }, [falas, aberto]);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    const pergunta = texto.trim();
    if (!pergunta || enviando) return;

    const novas: Fala[] = [...falas, { role: "user", content: pergunta }];
    setFalas(novas);
    setTexto("");
    setAviso("");
    setEnviando(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mensagens: novas }),
      });
      const json = (await r.json()) as { resposta?: string; erro?: string };
      if (!r.ok || !json.resposta) throw new Error(json.erro ?? "Falha");
      setFalas([...novas, { role: "assistant", content: json.resposta }]);
    } catch (err) {
      setAviso(err instanceof Error && err.message !== "Falha" ? err.message : "Não consegui responder. Use o WhatsApp.");
    } finally {
      setEnviando(false);
    }
  }

  const ultimaPergunta = [...falas].reverse().find((f) => f.role === "user")?.content;
  const mensagemZap = ultimaPergunta
    ? `${dados.negocio.mensagemWhatsapp}\n(Conversei com o assistente do site: "${ultimaPergunta}")`
    : undefined;

  return (
    <div className="fixed bottom-20 left-4 z-40 md:bottom-4">
      {aberto && (
        <section
          aria-label={nome}
          className="mb-3 flex max-h-[70svh] w-[min(92vw,22rem)] flex-col overflow-hidden rounded-xl border border-linha bg-white shadow-xl"
        >
          <header className="bg-primaria px-4 py-3 text-white">
            <p className="font-semibold">{nome}</p>
            <p className="text-sm text-white/90">Assistente virtual. Não confirma reservas.</p>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            <p className="rounded-lg bg-fundo p-3 text-sm">
              Oi! Sou o assistente virtual do site. Posso tirar dúvidas sobre a chácara. Para reservar, é pelo WhatsApp.
            </p>
            {falas.map((f, i) => (
              <p
                key={i}
                className={
                  f.role === "user"
                    ? "ml-8 rounded-lg bg-primaria p-3 text-sm text-white"
                    : "mr-8 rounded-lg bg-fundo p-3 text-sm"
                }
              >
                {f.content}
              </p>
            ))}
            {enviando && <p className="text-sm text-suave">Digitando…</p>}
            {aviso && <p className="text-sm font-semibold text-secundaria">{aviso}</p>}
            <div ref={fim} />
          </div>
          <div className="border-t border-linha p-3">
            <a
              href={linkWhatsapp(mensagemZap)}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 block rounded-full bg-[#117a3d] px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Continuar no WhatsApp
            </a>
            <form onSubmit={enviar} className="flex gap-2">
              <label htmlFor="chat-texto" className="sr-only">
                Sua mensagem
              </label>
              <input
                id="chat-texto"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                maxLength={MAX_CARACTERES}
                autoComplete="off"
                placeholder="Digite sua dúvida"
                className="min-w-0 flex-1 rounded-lg border border-suave px-3 py-2 text-sm"
              />
              <button
                type="submit"
                disabled={enviando || !texto.trim()}
                className="rounded-lg bg-secundaria px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                Enviar
              </button>
            </form>
          </div>
        </section>
      )}
      <button
        type="button"
        onClick={() => setAberto(!aberto)}
        aria-expanded={aberto}
        className="rounded-full bg-primaria px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-black/25"
      >
        {aberto ? "Fechar chat" : "Tirar dúvidas"}
      </button>
    </div>
  );
}
