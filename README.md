# Landing page — Clínica Veredas Odontologia

Landing page de uma clínica odontológica **fictícia**, feita com React e Next.js. O objetivo da página é levar o visitante a agendar uma consulta, pelo formulário ou pelo WhatsApp.

> Todo o conteúdo (clínica, dentistas, CRO, contatos, convênios e depoimentos) é inventado e serve apenas como demonstração.

## O que a página tem

- Cabeçalho fixo com menu e botão de agendamento
- Hero com proposta de valor e chamadas para ação
- Sobre a clínica e diferenciais do atendimento
- Serviços: odontologia geral, ortodontia, clareamento, harmonização do sorriso, implantes, prótese e odontopediatria
- Equipe, com especialidade, CRO e biografia
- Depoimentos com avaliação em estrelas
- Perguntas frequentes
- Formulário de agendamento com validação
- Localização, horários e contatos
- Rodapé com dados legais e página de política de privacidade
- Barra fixa de WhatsApp e agendamento no celular

Também inclui metatags de SEO local e dados estruturados `Dentist` (schema.org).

## Como rodar

Requer Node.js 20.9 ou mais recente.

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm start` | Serve o build de produção |
| `npm test` | Testes da validação do formulário |

## Estrutura

```
app/
  layout.js              metatags, fonte, dados estruturados e aviso de demonstração
  page.js                a landing page inteira, seção por seção
  AgendamentoForm.js     formulário (componente de cliente)
  globals.css            todos os estilos
  api/agendamento/       rota que recebe o formulário
  privacidade/           política de privacidade
lib/
  site.mjs               TODOS os dados da clínica
  validar.mjs            validação usada no navegador e no servidor
  validar.test.mjs       testes da validação
public/fotos/            fotos em três tamanhos (500, 960 e 1280 px)
```

Não há biblioteca de UI nem de CSS: só Next.js, React e CSS puro.

## Como personalizar

**Dados da clínica.** Quase tudo fica em [`lib/site.mjs`](lib/site.mjs): nome, texto "sobre", equipe, endereço, telefone, WhatsApp, e-mail, horários, convênios, formas de pagamento, depoimentos e dados legais. A página, as metatags e os dados estruturados leem desse arquivo.

**Textos de serviços, diferenciais e FAQ.** Estão no topo de [`app/page.js`](app/page.js).

**Cores.** São variáveis no início de [`app/globals.css`](app/globals.css) (`--brand`, `--verde`, `--ink` etc.).

**Fotos.** Salve cada foto em `public/fotos` nos três tamanhos, seguindo o padrão `photo-<id>-500.webp`, `photo-<id>-960.webp` e `photo-<id>.webp`, e troque o `id` no componente `<Foto>` em `app/page.js`. Ao trocar todas, remova a linha de créditos do rodapé.

**Mapa.** Preencha `mapaEmbedUrl` em `lib/site.mjs` com o link de incorporação do Google Maps. Sem ele, a página mostra um mapa ilustrativo.

## Formulário de agendamento

O formulário valida os campos no navegador e de novo no servidor, com a mesma função (`lib/validar.mjs`). Obrigatórios: nome, telefone, serviço, forma de atendimento e o consentimento de uso dos dados. E-mail e data preferida são opcionais.

O envio vai para `POST /api/agendamento`, que repassa o pedido em JSON para um webhook. Copie `.env.example` para `.env.local` e preencha:

```
AGENDAMENTO_WEBHOOK_URL=https://...
```

Serve qualquer serviço que aceite um POST em JSON (Make, Zapier, n8n, Formspree, Google Apps Script).

- **Em desenvolvimento, sem a variável:** o pedido aparece no terminal e o formulário mostra sucesso.
- **Em produção, sem a variável:** o formulário mostra erro e oferece o WhatsApp, para o pedido não se perder em silêncio.

Não há limite de envios por IP nem captcha; a única proteção contra robôs é um campo-isca oculto.

## Publicação

O projeto precisa de um servidor Node por causa da rota do formulário. Na **Vercel** ele roda como está: importe o repositório e cadastre `AGENDAMENTO_WEBHOOK_URL` nas variáveis de ambiente.

No **GitHub Pages** ele não funciona sem adaptação, porque lá só rodam arquivos estáticos. Seria preciso exportar o site como estático, ajustar o caminho base e fazer o formulário enviar direto para um serviço externo.

## Antes de usar para uma clínica real

- Substitua todos os dados fictícios em `lib/site.mjs` e remova o aviso de demonstração em `app/layout.js`.
- Use apenas depoimentos reais, com autorização do paciente e dentro das regras de publicidade do CFO/CRO.
- Confirme que os diferenciais descritos correspondem à rotina da clínica.
- Revise a política de privacidade com um profissional; o texto atual é um modelo para adequação à LGPD.
- Troque as fotos por imagens da própria clínica.

## Créditos das fotos

Fotos do Wikimedia Commons, redimensionadas:

- [Dentist adjusting braces to patient](https://commons.wikimedia.org/wiki/File:Dentist_adjusting_braces_to_patient.jpg) — Shixart1985, CC BY 2.0
- [Dental office](https://commons.wikimedia.org/wiki/File:Dental_office.jpg) — Wikimedia Commons, CC BY-SA 4.0
- [Child receives dental care in a clinic with a smiling dentist](https://commons.wikimedia.org/wiki/File:Child_receives_dental_care_in_a_clinic_with_a_smiling_dentist.jpg) — Shixart1985, CC BY 2.0
