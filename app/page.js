import Link from "next/link";
import { site, whatsappLink } from "../lib/site.mjs";
import AgendamentoForm from "./AgendamentoForm";

// Fotos de licença livre (Wikimedia Commons), já redimensionadas em public/fotos. Créditos no rodapé.
// Para usar fotos próprias: salve os três tamanhos com o mesmo padrão de nome e troque o id.
const creditos = [
  ["Shixart1985", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Dentist_adjusting_braces_to_patient.jpg"],
  ["Wikimedia Commons", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Dental_office.jpg"],
  ["Shixart1985", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Child_receives_dental_care_in_a_clinic_with_a_smiling_dentist.jpg"],
];

function Foto({ id, alt, w, h, ratio = "4 / 3", prioridade }) {
  const f = `/fotos/photo-${id}`;
  return (
    <img
      className="foto"
      src={`${f}.webp`}
      srcSet={`${f}-500.webp 500w, ${f}-960.webp 960w, ${f}.webp 1280w`}
      sizes="(max-width: 767px) 100vw, 50vw"
      width={w}
      height={h}
      alt={alt}
      loading={prioridade ? "eager" : "lazy"}
      fetchPriority={prioridade ? "high" : undefined}
      decoding="async"
      style={{ aspectRatio: ratio }}
    />
  );
}

const BotaoWhats = ({ children = "Chamar no WhatsApp", className = "" }) => (
  <a className={`btn btn-whats ${className}`} href={whatsappLink()} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const iniciais = (nome) => nome.replace(/^Dra?\.\s*/, "").split(" ").map((p) => p[0]).slice(0, 2).join("");

const tratamentos = [
  {
    titulo: "Odontologia geral",
    texto: "O cuidado do dia a dia, para prevenir problemas e tratar o que for preciso.",
    itens: [
      ["Limpeza", "remove placa e tártaro e ajuda a manter a gengiva saudável."],
      ["Restaurações", "recuperam o dente com cárie ou quebrado."],
      ["Tratamento de canal", "trata a parte interna do dente e busca aliviar a dor, preservando o dente sempre que possível."],
      ["Extração", "indicada quando o dente não pode ser mantido, como em alguns casos de siso."],
    ],
  },
  {
    titulo: "Ortodontia e harmonização do sorriso",
    texto: "Para alinhar os dentes e cuidar da aparência do sorriso, com indicação caso a caso.",
    itens: [
      ["Aparelhos", "fixos ou móveis, para crianças, adolescentes e adultos."],
      ["Alinhadores", "placas transparentes e removíveis, trocadas ao longo do tratamento."],
      ["Clareamento", "feito no consultório ou em casa com moldeiras, sempre com acompanhamento do dentista."],
      ["Lentes e facetas", "lâminas finas aplicadas sobre os dentes, quando há indicação após avaliação."],
    ],
  },
  {
    titulo: "Implantes e prótese dentária",
    texto: "Opções para repor dentes perdidos e voltar a mastigar com conforto.",
    itens: [
      ["Implantes", "pinos fixados no osso que servem de base para um novo dente."],
      ["Coroas e pontes", "próteses fixas para um ou mais dentes."],
      ["Próteses removíveis", "parciais ou totais (dentaduras), planejadas para cada boca."],
    ],
  },
  {
    titulo: "Odontopediatria",
    texto: "Consultas no ritmo da criança, com orientação para os pais em cada etapa.",
    itens: [
      ["Primeira consulta", "um primeiro contato tranquilo com o consultório."],
      ["Prevenção", "limpeza, flúor e selantes, conforme a necessidade."],
      ["Tratamento de cáries", "com explicações em linguagem que a criança entende."],
      ["Acompanhamento", "da troca dos dentes de leite e do crescimento."],
    ],
  },
];

const diferenciais = [
  ["Hora marcada", "Consultas agendadas, com o tempo necessário para ouvir e explicar."],
  ["Plano explicado antes de começar", "Você entende as opções de tratamento, as etapas e os valores antes de decidir."],
  ["Biossegurança", "Instrumentais esterilizados e materiais descartáveis em todos os atendimentos."],
  ["Convênio e particular", "As duas formas de atendimento seguem o mesmo cuidado e os mesmos protocolos."],
];

const faq = [
  [
    "Como funciona o primeiro atendimento?",
    <>Na primeira consulta conversamos sobre o que você sente e o que espera, fazemos o exame clínico e, se necessário, pedimos exames de imagem. Depois explicamos o que foi encontrado e as opções de tratamento. Você decide com calma como seguir.</>,
  ],
  [
    "Quais convênios vocês aceitam?",
    <>Atendemos os convênios {site.convenios.join(", ")}. A cobertura de cada procedimento depende do seu plano — fale com a gente e conferimos para você antes da consulta.</>,
  ],
  [
    "Vocês atendem particular?",
    <>Sim. No atendimento particular você recebe o plano de tratamento com os valores por escrito antes de começar, sem compromisso.</>,
  ],
  [
    "Quais são as formas de pagamento?",
    <>Aceitamos {site.pagamentos.join(", ")}.</>,
  ],
  [
    "A partir de que idade atendem crianças?",
    <>Atendemos crianças desde {site.idadeMinimaInfantil}. Um responsável acompanha a consulta.</>,
  ],
  [
    "O clareamento dental é indicado para todo mundo?",
    <>Nem sempre. Antes de clarear, avaliamos a saúde dos dentes e da gengiva e conversamos sobre sensibilidade e expectativas. O resultado varia de pessoa para pessoa.</>,
  ],
];

export default function Pagina() {
  const { responsavel: r, endereco: end } = site;
  return (
    <>
      <header className="topo">
        <div className="wrap topo-in">
          <a className="marca" href="#inicio">
            <span className="logo" aria-hidden="true">V</span>
            {site.nome}
          </a>
          <nav aria-label="Seções da página">
            <a href="#sobre">Sobre</a>
            <a href="#tratamentos">Serviços</a>
            <a href="#equipe">Equipe</a>
            <a href="#depoimentos">Depoimentos</a>
            <a href="#duvidas">Dúvidas</a>
            <a href="#contato">Contato</a>
          </nav>
          <a className="btn btn-pri btn-p" href="#agendamento">Agendar consulta</a>
        </div>
      </header>

      <main id="conteudo">
        <section id="inicio" className="hero">
          <div className="wrap hero-in">
            <div>
              <p className="sobre-titulo">Clínica odontológica no {end.bairro}, {site.cidade}/{site.uf}</p>
              <h1>Dentista para adultos e crianças, por convênio ou particular</h1>
              <p className="lead">
                Da limpeza de rotina aos implantes, passando pelo aparelho e pela primeira consulta dos
                pequenos: a família toda é cuidada no mesmo lugar, com hora marcada e explicações claras.
              </p>
              <div className="acoes">
                <a className="btn btn-pri" href="#agendamento">Agendar consulta</a>
                <BotaoWhats />
              </div>
              <ul className="fatos">
                <li>Convênios e particular</li>
                <li>Adultos e crianças</li>
                <li>{site.horarios[0].dias}, {site.horarios[0].horas}</li>
              </ul>
            </div>
            <Foto id="f194219223" w={1280} h={1910} ratio="4 / 5" prioridade alt="Dentista de luvas examinando os dentes de uma paciente com espelho clínico" />
          </div>
        </section>

        <section id="sobre" className="faixa">
          <div className="wrap">
            <div className="duas">
              <div>
                <h2>Sobre a clínica</h2>
                {site.sobre.map((p) => <p key={p}>{p}</p>)}
              </div>
              <Foto id="f12596893" w={1280} h={962} ratio="3 / 2" alt="Sala de atendimento com cadeira odontológica ao lado de uma janela" />
            </div>
            <ul className="grade grade-4 difs">
              {diferenciais.map(([t, d]) => (
                <li key={t}>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="tratamentos">
          <div className="wrap">
            <h2>Serviços e tratamentos</h2>
            <p className="lead">O que fazemos, em linguagem simples. A indicação de cada tratamento é sempre definida depois de uma avaliação.</p>
            <div className="grade grade-2">
              {tratamentos.map((t) => (
                <article className="cartao" key={t.titulo}>
                  <h3>{t.titulo}</h3>
                  <p>{t.texto}</p>
                  <ul className="lista">
                    {t.itens.map(([nome, desc]) => (
                      <li key={nome}><strong>{nome}:</strong> {desc}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="duas infantil">
              <Foto id="f197684384" w={1280} h={853} ratio="3 / 2" alt="Profissional sorridente, abaixada na altura de um menino sentado, conversando com ele" />
              <div>
                <h3>Convênio ou particular: o cuidado é o mesmo</h3>
                <div className="grade grade-2 formas">
                  <div>
                    <h4>Pelo convênio</h4>
                    <p>Conferimos a cobertura do seu plano antes da consulta e avisamos o que está incluído.</p>
                  </div>
                  <div>
                    <h4>Particular</h4>
                    <p>Você recebe o plano de tratamento e os valores por escrito antes de começar.</p>
                  </div>
                </div>
                <div className="acoes">
                  <a className="btn btn-pri" href="#agendamento">Agendar uma avaliação</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="equipe" className="faixa">
          <div className="wrap">
            <h2>Nossa equipe</h2>
            <p className="lead">Quatro dentistas, cada um na sua especialidade, trabalhando juntos no seu plano de tratamento.</p>
            <ul className="grade grade-2 equipe">
              {site.equipe.map((p) => (
                <li className="cartao" key={p.nome}>
                  <span className="avatar" aria-hidden="true">{iniciais(p.nome)}</span>
                  <div>
                    <h3>{p.nome}</h3>
                    <p className="cro">{p.area} · {p.cro}</p>
                    <p>{p.bio}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="depoimentos">
          <div className="wrap">
            <h2>O que dizem os pacientes</h2>
            <div className="grade grade-3">
              {site.depoimentos.map((d) => (
                <figure className="cartao depo" key={d.nome}>
                  <p className="estrelas" role="img" aria-label={`Avaliação: ${d.nota} de 5 estrelas`}>
                    {"★".repeat(d.nota)}<span>{"★".repeat(5 - d.nota)}</span>
                  </p>
                  <blockquote>“{d.texto}”</blockquote>
                  <figcaption><strong>{d.nome}</strong> · {d.perfil}</figcaption>
                </figure>
              ))}
            </div>
            <p className="nota">Depoimentos fictícios, usados apenas para demonstração.</p>
          </div>
        </section>

        <section id="duvidas" className="faixa">
          <div className="wrap estreito">
            <h2>Perguntas frequentes</h2>
            {faq.map(([p, resp]) => (
              <details key={p}>
                <summary>{p}</summary>
                <p>{resp}</p>
              </details>
            ))}
            <p className="nota">Ficou outra dúvida? <a href={whatsappLink("Olá! Tenho uma dúvida.")} target="_blank" rel="noopener noreferrer">Pergunte pelo WhatsApp</a>.</p>
          </div>
        </section>

        <section id="agendamento" className="faixa-escura">
          <div className="wrap duas">
            <div>
              <h2>Agende sua consulta</h2>
              <p className="lead">Preencha o formulário e nossa equipe entra em contato para combinar o melhor dia e horário.</p>
              <p>Prefere falar agora?</p>
              <div className="acoes">
                <BotaoWhats>WhatsApp {site.whatsappExibicao}</BotaoWhats>
                <a className="btn btn-claro" href={`tel:${site.telefoneHref}`}>Ligar {site.telefone}</a>
              </div>
              <p className="nota">Em caso de dor forte ou urgência, ligue ou chame no WhatsApp em vez de usar o formulário.</p>
            </div>
            <AgendamentoForm />
          </div>
        </section>

        <section id="contato">
          <div className="wrap duas">
            <div>
              <h2>Localização, horários e contatos</h2>
              <address>
                <p><strong>{site.nome}</strong><br />{end.rua}<br />{end.bairro} · {site.cidade}/{site.uf} · CEP {end.cep}<br />{end.referencia}</p>
                <p>
                  Telefone: <a href={`tel:${site.telefoneHref}`}>{site.telefone}</a><br />
                  WhatsApp: <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">{site.whatsappExibicao}</a><br />
                  E-mail: <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
              </address>
              <table className="horarios">
                <caption>Horário de atendimento</caption>
                <tbody>
                  {site.horarios.map((h) => (
                    <tr key={h.dias}><th scope="row">{h.dias}</th><td>{h.horas}</td></tr>
                  ))}
                </tbody>
              </table>
              <div className="acoes">
                <a className="btn btn-sec" href={site.mapaLink} target="_blank" rel="noopener noreferrer">Ver região no mapa</a>
              </div>
            </div>
            {site.mapaEmbedUrl ? (
              <iframe className="mapa" src={site.mapaEmbedUrl} title={`Mapa: ${site.nome}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            ) : (
              <div className="mapa mapa-demo" role="img" aria-label={`Ilustração de mapa indicando a clínica em ${end.rua}, ${end.bairro}`}>
                <span className="pino" />
                <strong>{end.rua}</strong>
                <span>{end.bairro} · {site.cidade}/{site.uf}</span>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="rodape">
        <div className="wrap">
          <p><strong>{site.nome}</strong> · {site.razaoSocial} · CNPJ {site.cnpj}</p>
          <p>{end.rua}, {end.bairro} · {site.cidade}/{site.uf} · <a href={`tel:${site.telefoneHref}`}>{site.telefone}</a> · <a href={`mailto:${site.email}`}>{site.email}</a></p>
          <p>Responsável técnica: {r.nome} · {r.cro} · {site.croClinica}</p>
          <p>As informações desta página têm caráter educativo e não substituem a consulta. A indicação de qualquer tratamento depende de avaliação individual, e os resultados variam de pessoa para pessoa.</p>
          <p className="creditos">
            Fotos ilustrativas, redimensionadas:{" "}
            {creditos.map(([autor, licenca, url], i) => (
              <span key={url}>{i > 0 && " · "}<a href={url} target="_blank" rel="noopener noreferrer">{autor} ({licenca})</a></span>
            ))}
          </p>
          <p><Link href="/privacidade">Política de privacidade</Link> · © {new Date().getFullYear()} {site.nome}</p>
        </div>
      </footer>

      <div className="barra-celular">
        <BotaoWhats>WhatsApp</BotaoWhats>
        <a className="btn btn-pri" href="#agendamento">Agendar</a>
      </div>
    </>
  );
}
