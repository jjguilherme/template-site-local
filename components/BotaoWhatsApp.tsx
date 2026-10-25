import { dados, linkWhatsapp, whatsappPronto } from "@/lib/site";
import { IconeWhatsapp } from "./Icones";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[#117a3d] font-semibold text-white transition-colors hover:bg-[#0d6532]";

function propsDoLink() {
  const pronto = whatsappPronto(dados.negocio.whatsapp);
  return {
    href: linkWhatsapp(),
    ...(pronto ? { target: "_blank", rel: "noopener noreferrer" } : {}),
    aviso: !pronto,
  };
}

/** Botão para o meio da página. */
export function BotaoWhatsApp({ rotulo = "Chamar no WhatsApp" }: { rotulo?: string }) {
  const { aviso, ...link } = propsDoLink();
  return (
    <a {...link} className={`${base} px-6 py-3.5 text-base`}>
      <IconeWhatsapp />
      {rotulo}
      {aviso && <span className="sr-only"> (número ainda não informado)</span>}
    </a>
  );
}

/** Barra fixa no rodapé da tela, só no celular. No computador o botão fica no cabeçalho, sem cobrir o conteúdo. */
export function BarraWhatsAppMovel() {
  const { aviso, ...link } = propsDoLink();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-linha bg-fundo/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <a {...link} className={`${base} min-h-12 w-full px-6 text-base`}>
        <IconeWhatsapp />
        Chamar no WhatsApp
        {aviso && <span className="sr-only"> (número ainda não informado)</span>}
      </a>
    </div>
  );
}
