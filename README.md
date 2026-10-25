# template-site-local

Modelo de site de uma página para negócio local (Next.js, TypeScript, Tailwind, App Router).

## Para cada cliente
1. Copie esta pasta.
2. Edite `content/site.json` (nome, textos, cores, WhatsApp, fotos, chatbot). `content/site.example.json` é a cópia de referência.
3. Ponha as fotos tratadas em `public/fotos/` (JPG, sem metadados) e liste cada uma em `secoes.galeria`, com `categoria` (veja `secoes.categorias`) e texto alternativo descritivo.
4. Gere `public/og.jpg` (1200x630) a partir da foto de capa: é a imagem que aparece quando o link é compartilhado. Preencha `negocio.url` com o endereço público.
5. Tudo que ainda estiver como `[PREENCHER]` aparece destacado em amarelo no site. Resolva todos antes de publicar.

## Comandos
```bash
npm run dev     # desenvolvimento
npm run lint
npm run build
npm run start   # servir o build
```

## Chatbot
Desligado por padrão (`chatbot.ativo: false` em `content/site.json`). Com ele desligado, a rota `/api/chat` responde 404 e o widget não é carregado.

Para ligar:
1. Copie `.env.example` para `.env.local` e preencha `ANTHROPIC_API_KEY`. Esse arquivo fica fora do git.
2. Confirme valores, regras e capacidade no `site.json`.
3. Configure o teto de gasto mensal no painel da API. Os limites da rota (por hora e por mês) ficam em memória e zeram quando o servidor reinicia, então não substituem o teto do painel.
4. Faça a revisão de segurança descrita em `docs/CHATBOT.md` antes de publicar.

## Antes de publicar
- Para esconder um site em construção do Google, adicione `robots: { index: false, follow: false }` em `metadata` no `app/layout.tsx`.
- Informar o WhatsApp real. Enquanto for `[PREENCHER]`, os botões levam para a seção "Como reservar".
