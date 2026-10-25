import { BotaoWhatsAppFixo } from "@/components/BotaoWhatsApp";
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

export default function Home() {
  return (
    <>
      <Cabecalho />
      <main>
        <Hero />
        <Secao id="galeria" titulo="Fotos" intro="Fotos reais da chácara.">
          <Galeria fotos={dados.secoes.galeria} categorias={dados.secoes.categorias} />
        </Secao>
        <Estrutura />
        <ComoReservar />
        <Localizacao />
        <Regras />
        <Faq />
      </main>
      <Rodape />
      <BotaoWhatsAppFixo />
      {dados.chatbot.ativo && <ChatWidget nome={dados.chatbot.nomeAssistente} />}
    </>
  );
}
