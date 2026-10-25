import { dados, linkWhatsapp, whatsappPronto } from "@/lib/site";
import { IconeWhatsapp } from "./Icones";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors";

/** Botão de uso no meio da página. */
export function BotaoWhatsApp({ rotulo = "Chamar no WhatsApp" }: { rotulo?: string }) {
  const pronto = whatsappPronto(dados.negocio.whatsapp);
  return (
    <a
      href={linkWhatsapp()}
      {...(pronto ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} bg-[#117a3d] px-6 py-3.5 text-base text-white hover:bg-[#0d6532]`}
    >
      <IconeWhatsapp />
      {rotulo}
      {!pronto && <span className="sr-only"> (número ainda não informado)</span>}
    </a>
  );
}

/** Botão fixo, sempre visível. No celular fica no rodapé da tela. */
export function BotaoWhatsAppFixo() {
  const pronto = whatsappPronto(dados.negocio.whatsapp);
  return (
    <a
      href={linkWhatsapp()}
      {...(pronto ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} fixed bottom-4 right-4 z-40 bg-[#117a3d] px-5 py-3.5 text-base text-white shadow-lg shadow-black/25 hover:bg-[#0d6532]`}
    >
      <IconeWhatsapp />
      WhatsApp
      {!pronto && <span className="sr-only"> (número ainda não informado)</span>}
    </a>
  );
}
