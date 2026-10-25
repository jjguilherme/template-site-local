import { dados } from "@/lib/site";

const { negocio, secoes } = dados;

export const urlDoSite = negocio.url.replace(/\/$/, "");
export const imagemDeCompartilhamento = `${urlDoSite}/og.jpg`;
export const descricao = `${secoes.hero.subtitulo} Espaço para até ${negocio.capacidade} pessoas, em ${negocio.cidade}.`;

/** Dados estruturados (schema.org). Só entra o que está confirmado: sem preço, nota, avaliações ou telefone. */
export function dadosEstruturados() {
  const [localidade, regiao] = negocio.cidade.replace(")", "").split(" (");
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: negocio.nome,
    description: descricao,
    url: `${urlDoSite}/`,
    image: imagemDeCompartilhamento,
    address: {
      "@type": "PostalAddress",
      addressLocality: localidade,
      addressRegion: regiao,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: negocio.latitude,
      longitude: negocio.longitude,
    },
    hasMap: negocio.mapa,
    petsAllowed: true,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Piscina", value: true },
      { "@type": "LocationFeatureSpecification", name: "Churrasqueira", value: true },
      { "@type": "LocationFeatureSpecification", name: "Mesa de sinuca", value: true },
    ],
  };
}
