import type { NextRequest } from "next/server";
import { instrucoesDoBot, limites, MAX_MENSAGENS_HISTORICO, type Mensagem } from "@/lib/chat";
import { dados } from "@/lib/site";

const UMA_HORA = 60 * 60 * 1000;
const MAX_IPS_NA_MEMORIA = 5000;

// Contadores em memória: valem por instância do servidor e zeram quando ela reinicia.
// O teto de gasto de verdade fica no painel da API (veja docs/CHATBOT.md).
const acessosPorIp = new Map<string, number[]>();
let mesAtual = "";
let pedidosNoMes = 0;

function erro(mensagem: string, status: number, extra?: HeadersInit) {
  return Response.json({ erro: mensagem }, { status, headers: extra });
}

function ipDoVisitante(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "desconhecido";
}

function dentroDoLimitePorHora(ip: string): boolean {
  const agora = Date.now();
  const recentes = (acessosPorIp.get(ip) ?? []).filter((t) => agora - t < UMA_HORA);
  if (recentes.length >= limites.porHora()) {
    acessosPorIp.set(ip, recentes);
    return false;
  }
  recentes.push(agora);
  acessosPorIp.set(ip, recentes);

  if (acessosPorIp.size > MAX_IPS_NA_MEMORIA) {
    for (const [chave, tempos] of acessosPorIp) {
      if (tempos.every((t) => agora - t >= UMA_HORA)) acessosPorIp.delete(chave);
    }
  }
  return true;
}

function dentroDoTetoMensal(): boolean {
  const mes = new Date().toISOString().slice(0, 7);
  if (mes !== mesAtual) {
    mesAtual = mes;
    pedidosNoMes = 0;
  }
  if (pedidosNoMes >= limites.porMes()) return false;
  pedidosNoMes += 1;
  return true;
}

function lerMensagens(corpo: unknown): Mensagem[] | null {
  if (!corpo || typeof corpo !== "object" || !("mensagens" in corpo)) return null;
  const bruto = (corpo as { mensagens: unknown }).mensagens;
  if (!Array.isArray(bruto) || bruto.length === 0) return null;

  const mensagens: Mensagem[] = [];
  for (const item of bruto.slice(-MAX_MENSAGENS_HISTORICO)) {
    if (!item || typeof item !== "object") return null;
    const { role, content } = item as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const texto = content.trim();
    if (!texto || texto.length > limites.entrada()) return null;
    mensagens.push({ role, content: texto });
  }
  // A API exige começar e terminar com a fala do visitante.
  while (mensagens.length && mensagens[0].role !== "user") mensagens.shift();
  if (mensagens.length === 0 || mensagens[mensagens.length - 1].role !== "user") return null;
  return mensagens;
}

export async function POST(req: NextRequest) {
  if (!dados.chatbot.ativo) return erro("Chat desativado.", 404);

  const chave = process.env.ANTHROPIC_API_KEY;
  if (!chave) return erro("Chat indisponível no momento. Use o WhatsApp.", 503);

  let corpo: unknown;
  try {
    corpo = await req.json();
  } catch {
    return erro("Pedido inválido.", 400);
  }
  const mensagens = lerMensagens(corpo);
  if (!mensagens) {
    return erro(`Mensagem inválida. Use até ${limites.entrada()} caracteres.`, 400);
  }

  if (!dentroDoLimitePorHora(ipDoVisitante(req))) {
    return erro("Muitas mensagens por hora. Chame no WhatsApp.", 429, { "Retry-After": "3600" });
  }
  if (!dentroDoTetoMensal()) {
    return erro("Chat indisponível no momento. Use o WhatsApp.", 503);
  }

  try {
    const resposta = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": chave,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.CHAT_MODEL || "claude-haiku-5-5",
        max_tokens: 300,
        system: instrucoesDoBot(),
        messages: mensagens,
      }),
      signal: AbortSignal.timeout(20_000),
    });

    if (!resposta.ok) return erro("Não consegui responder agora. Use o WhatsApp.", 502);

    const json = (await resposta.json()) as { content?: { type: string; text?: string }[] };
    const texto = json.content?.find((c) => c.type === "text")?.text?.trim();
    if (!texto) return erro("Não consegui responder agora. Use o WhatsApp.", 502);

    return Response.json({ resposta: texto });
  } catch {
    return erro("Não consegui responder agora. Use o WhatsApp.", 502);
  }
}
