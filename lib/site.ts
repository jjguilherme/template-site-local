import site from "@/content/site.json";

export type Site = typeof site;
export type FotoGaleria = Site["secoes"]["galeria"][number];

export const dados: Site = site;

/** Campo ainda não confirmado pelo dono. Aparece destacado no site. */
export function pendente(texto: string): boolean {
  return texto.includes("[PREENCHER");
}

export function whatsappPronto(numero: string): boolean {
  return /^\d{12,13}$/.test(numero);
}

/** Link do WhatsApp com mensagem pré-preenchida. Sem número válido, leva para a seção de reserva. */
export function linkWhatsapp(mensagem?: string): string {
  const { whatsapp, mensagemWhatsapp } = dados.negocio;
  if (!whatsappPronto(whatsapp)) return "#como-reservar";
  const texto = encodeURIComponent(mensagem ?? mensagemWhatsapp);
  return `https://wa.me/${whatsapp}?text=${texto}`;
}

export function foto(arquivo: string): string {
  return `/fotos/${arquivo}.jpg`;
}
