import { BarraWhatsAppMovel } from "@/components/BotaoWhatsApp";
import { Cabecalho } from "@/components/Cabecalho";
import { ChatWidget } from "@/components/ChatWidget";
import { ComoReservar } from "@/components/ComoReservar";
import { Estrutura } from "@/components/Estrutura";
import { Faq } from "@/components/Faq";
import { Galeria } from "@/components/Galeria";
import { Hero } from "@/components/Hero";
import { Localizacao } from "@/components/Localizacao";
import { Regras } from "@/components/Regras";
import { Rodape } from "@/components/Rodape";
import { Secao } from "@/components/Secao";
import { dados } from "@/lib/site";
import { dadosEstruturados } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // O conteúdo vem de content/site.json; "<" é escapado para não fechar a tag por engano.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados()).replace(/</g, "\\u003c") }}
      />
      <Cabecalho />
      <main>
        <Hero />
        <Secao id="galeria" titulo="Fotos" eyebrow="Conheça a chácara" intro="Fotos reais do lugar. Toque numa foto para ampliar.">
          <Galeria fotos={dados.secoes.galeria} categorias={dados.secoes.categorias} />
        </Secao>
        <Estrutura />
        <ComoReservar />
        <Localizacao />
        <Regras />
        <Faq />
      </main>
      <Rodape />
      <BarraWhatsAppMovel />
      {dados.chatbot.ativo && <ChatWidget nome={dados.chatbot.nomeAssistente} />}
    </>
  );
}
