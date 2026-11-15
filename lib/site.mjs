// TODOS OS DADOS DA CLÍNICA FICAM AQUI.
// CONTEÚDO FICTÍCIO, apenas para demonstração: nomes, CRO, contatos, convênios e depoimentos não são reais.

const equipe = [
  {
    nome: "Dra. Helena Prado Antunes",
    foto: "helena", // public/fotos/photo-helena.webp e photo-helena-500.webp (retrato 4:5)
    area: "Clínica geral e endodontia",
    cro: "CRO-SP 999.101",
    bio: "Responsável técnica da clínica. Formada há 18 anos, cuida das consultas de rotina e dos tratamentos de canal, sempre explicando cada etapa antes de começar.",
  },
  {
    nome: "Dr. Rafael Nogueira Lins",
    foto: "rafael", // public/fotos/photo-rafael.webp e photo-rafael-500.webp (retrato 4:5)
    area: "Ortodontia",
    cro: "CRO-SP 999.102",
    bio: "Especialista em ortodontia, acompanha crianças, adolescentes e adultos em tratamentos com aparelhos fixos e alinhadores transparentes.",
  },
  {
    nome: "Dra. Camila Duarte Sato",
    foto: "camila", // public/fotos/photo-camila.webp e photo-camila-500.webp (retrato 4:5)
    area: "Implantodontia e prótese",
    cro: "CRO-SP 999.103",
    bio: "Dedica-se à reabilitação oral com implantes, coroas e próteses, planejando cada caso com exames de imagem e muita conversa.",
  },
  {
    nome: "Dra. Beatriz Moura Teles",
    foto: "beatriz", // public/fotos/photo-beatriz.webp e photo-beatriz-500.webp (retrato 4:5)
    area: "Odontopediatria",
    cro: "CRO-SP 999.104",
    bio: "Atende bebês, crianças e adolescentes com paciência e linguagem lúdica, orientando os pais sobre prevenção em cada fase.",
  },
];

export const site = {
  nome: "Clínica Veredas Odontologia",
  cidade: "São Paulo",
  uf: "SP",
  url: "https://clinicaveredas.example", // domínio final, sem barra no fim
  fundacao: 2012,

  sobre: [
    "Desde 2012, a Clínica Veredas cuida do sorriso de famílias do Jardim das Acácias. Começamos com um consultório e hoje reunimos quatro dentistas de especialidades diferentes, para que adultos e crianças sejam acompanhados no mesmo lugar.",
    "Acreditamos em consultas sem pressa: ouvir, examinar, explicar as opções e só então decidir o tratamento junto com você.",
  ],

  equipe,
  responsavel: equipe[0], // responsável técnico(a)
  croClinica: "EPAO-SP 99.901",

  endereco: {
    rua: "Rua das Acácias, 1200 — sala 34",
    bairro: "Jardim das Acácias",
    cep: "04599-000",
    referencia: "Prédio com estacionamento conveniado e acesso por elevador.",
  },
  // Mapa incorporado do Google Maps (sem chave de API).
  // O endereço é fictício: buscando por ele, o Google fixava o pin num prédio real de nome parecido.
  // Por isso `q` usa coordenadas de um ponto de rua na região (zona sul de São Paulo), só para posicionar o pin.
  // Numa clínica real, troque por `q=<endereço completo>`.
  mapaEmbedUrl: "https://www.google.com/maps?q=-23.6245,-46.6865&z=16&output=embed",

  telefone: "(12) 99102-6455",
  telefoneHref: "+5512991026455",
  whatsapp: "5512991026455", // só dígitos: 55 + DDD + número
  whatsappExibicao: "(12) 99102-6455",
  email: "contato@clinicaveredas.example",

  horarios: [
    { dias: "Segunda a sexta", horas: "8h às 19h" },
    { dias: "Sábado", horas: "8h às 13h" },
    { dias: "Domingo e feriados", horas: "Fechado" },
  ],
  // Mesmo horário, no formato do schema.org (usado pelo Google).
  horariosSchema: ["Mo-Fr 08:00-19:00", "Sa 08:00-13:00"],

  convenios: ["Sorria+ Dental", "DentalVida", "Odonto União", "Bem Bucal"],
  pagamentos: ["Pix", "cartão de débito", "cartão de crédito em até 10x", "dinheiro"],
  idadeMinimaInfantil: "o nascimento dos primeiros dentes",

  depoimentos: [
    {
      nome: "Mariana T.",
      perfil: "Paciente desde 2019",
      nota: 5,
      texto: "Sempre tive medo de dentista. Aqui me explicaram tudo com calma antes de cada procedimento e isso fez toda a diferença para mim.",
    },
    {
      nome: "Carlos e Júlia M.",
      perfil: "Pais do Pedro, 6 anos",
      nota: 5,
      texto: "A Dra. Beatriz conquistou nosso filho na primeira consulta. Hoje é ele quem lembra a gente do dia de ir ao dentista.",
    },
    {
      nome: "Sônia R.",
      perfil: "Paciente de implante",
      nota: 4,
      texto: "Recebi o plano de tratamento por escrito, com etapas e valores, e pude decidir sem pressão. O atendimento da recepção também é muito atencioso.",
    },
  ],

  // Links fictícios.
  redes: { instagram: "#", facebook: "#" },

  razaoSocial: "Veredas Odontologia Ltda.",
  cnpj: "00.000.000/0001-00",
  encarregadoDados: "Dra. Helena Prado Antunes",
};

site.mapaLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.endereco.bairro}, ${site.cidade} - ${site.uf}`)}`;

export const servicos = [
  "Primeira consulta / avaliação",
  "Odontologia geral (limpeza, restauração, canal, extração)",
  "Clareamento dental",
  "Ortodontia (aparelhos e alinhadores)",
  "Harmonização do sorriso (lentes e facetas)",
  "Implantes e prótese dentária",
  "Odontopediatria",
  "Ainda não sei — quero orientação",
];

export const whatsappLink = (texto = `Olá! Gostaria de agendar uma consulta.`) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`;
