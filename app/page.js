import Link from "next/link";
import {
  ArrowRight, Baby, BadgeCheck, CalendarClock, Check, ClipboardList, Clock, Handshake, Mail, MapPin,
  MessageCircle, Phone, Puzzle, Quote, ShieldCheck, Smile, Star, Stethoscope, Wallet,
} from "lucide-react";
import { site, whatsappLink } from "../lib/site.mjs";
import AgendamentoForm from "./AgendamentoForm";
import Acordeao from "./Acordeao";
import MenuCelular from "./MenuCelular";

// Fotos de licença livre, já em WebP em public/fotos. Créditos no rodapé.
// Para usar fotos próprias: salve com o mesmo padrão de nome e troque o id.
const creditos = [
  ["Shixart1985 (CC BY 2.0)", "https://commons.wikimedia.org/wiki/File:Dentist_adjusting_braces_to_patient.jpg"],
  ["Shixart1985 (CC BY 2.0)", "https://commons.wikimedia.org/wiki/File:Child_receives_dental_care_in_a_clinic_with_a_smiling_dentist.jpg"],
  ["@karibjorn (Unsplash)", "https://unsplash.com/photos/Fdku_oMrDvk"],
  ["@karibjorn (Unsplash)", "https://unsplash.com/photos/yJsMOVwazRU"],
  ["@beatrizmendez (Unsplash)", "https://unsplash.com/photos/_4xStiTXY1o"],
  ["@laurentyasiel (Unsplash)", "https://unsplash.com/photos/607-cXjrge4"],
  ["@ikemotret20 (Unsplash)", "https://unsplash.com/photos/1KK4zX7g5XE"],
  ["@othmanelmarzak (Unsplash)", "https://unsplash.com/photos/P4VXFXKyOQM"],
];

// `retrato`: arquivos em 500 e 960 px. Demais fotos: 500, 960 e 1280 px.
function Foto({ id, alt, w, h, ratio, retrato, prioridade, sizes = "(max-width: 767px) 100vw, 50vw", className = "" }) {
  const f = `/fotos/photo-${id}`;
  return (
    <img
      className={`foto ${className}`}
      src={`${f}.webp`}
      srcSet={retrato ? `${f}-500.webp 500w, ${f}.webp 960w` : `${f}-500.webp 500w, ${f}-960.webp 960w, ${f}.webp 1280w`}
      sizes={sizes}
      width={w}
      height={h}
      alt={alt}
      loading={prioridade ? "eager" : "lazy"}
      fetchPriority={prioridade ? "high" : undefined}
      decoding="async"
      style={ratio && { aspectRatio: ratio }}
    />
  );
}

// Símbolo da marca: um dente atravessado por uma trilha ("vereda") que termina num ponto.
const Logo = ({ className = "" }) => (
  <svg className={`logo ${className}`} viewBox="0 0 48 48" aria-hidden="true">
    <path fill="currentColor" d="M24 11.500c-2.600-1.900-6.200-3.600-9.900-2.900C9.600 9.500 7 13.800 7 18.500c0 4.200 1.600 7.300 2.800 11.200 1.200 4 1.500 12.300 5.200 12.300 4 0 2.800-10 9-10s5 10 9 10c3.700 0 4-8.300 5.200-12.300C39.400 25.800 41 22.700 41 18.500c0-4.700-2.600-9-7.100-9.900-3.700-.7-7.300 1-9.900 2.900z" />
    <path className="logo-trilha" fill="none" strokeWidth="2.800" strokeLinecap="round" d="M14.500 26.500c5 .5 6.500-3 9.500-5.500s5.500-2.500 8-5" />
    <circle className="logo-ponto" cx="33" cy="15" r="2.600" />
  </svg>
);

// O mesmo traço curvo do logo, usado como detalhe decorativo de fundo.
// `vectorEffect` mantém os pontos redondos mesmo quando o SVG é esticado (como no hero).
const Trilha = ({ className = "", ...props }) => (
  <svg className={`trilha ${className}`} viewBox="0 0 600 200" aria-hidden="true" {...props}>
    <path d="M4 170C120 170 150 50 290 66s170 110 306 20" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="1 13" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
  </svg>
);

const Ic = ({ i: Icone, className = "" }) => (
  <span className={`ic ${className}`} aria-hidden="true"><Icone size={22} strokeWidth={1.9} /></span>
);

const BotaoWhats = ({ children = "Chamar no WhatsApp", className = "" }) => (
  <a className={`btn btn-whats ${className}`} href={whatsappLink()} target="_blank" rel="noopener noreferrer">
    <MessageCircle size={20} aria-hidden="true" />
    {children}
  </a>
);

const Estrelas = ({ nota }) => (
  <p className="estrelas" role="img" aria-label={`Avaliação: ${nota} de 5 estrelas`}>
    {"★".repeat(nota)}<span>{"★".repeat(5 - nota)}</span>
  </p>
);

const iniciais = (nome) => nome.replace(/^Dra?\.\s*/, "").split(/\s+(?:e\s+)?/).map((p) => p[0]).slice(0, 2).join("");

const media = (site.depoimentos.reduce((s, d) => s + d.nota, 0) / site.depoimentos.length).toFixed(1).replace(".", ",");

const tratamentos = [
  {
    icone: Stethoscope,
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
    icone: Smile,
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
    icone: Puzzle,
    titulo: "Implantes e prótese dentária",
    texto: "Opções para repor dentes perdidos e voltar a mastigar com conforto.",
    itens: [
      ["Implantes", "pinos fixados no osso que servem de base para um novo dente."],
      ["Coroas e pontes", "próteses fixas para um ou mais dentes."],
      ["Próteses removíveis", "parciais ou totais (dentaduras), planejadas para cada boca."],
    ],
  },
  {
    icone: Baby,
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
  [CalendarClock, "Hora marcada", "Consultas agendadas, com o tempo necessário para ouvir e explicar."],
  [ClipboardList, "Plano explicado antes de começar", "Você entende as opções de tratamento, as etapas e os valores antes de decidir."],
  [ShieldCheck, "Biossegurança", "Instrumentais esterilizados e materiais descartáveis em todos os atendimentos."],
  [Handshake, "Convênio e particular", "As duas formas de atendimento seguem o mesmo cuidado e os mesmos protocolos."],
];

const passos = [
  ["Você envia o pedido", "Pelo formulário, em menos de um minuto."],
  ["A recepção entra em contato", "Para combinar o melhor dia e horário."],
  ["Consulta confirmada", "Você recebe a confirmação e é só vir."],
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

const secoes = [
  ["#sobre", "Sobre"],
  ["#tratamentos", "Serviços"],
  ["#equipe", "Equipe"],
  ["#depoimentos", "Depoimentos"],
  ["#duvidas", "Dúvidas"],
  ["#contato", "Contato"],
];

export default function Pagina() {
  const { responsavel: r, endereco: end } = site;
  const [destaque, ...outros] = site.depoimentos;
  return (
    <>
      <header className="topo">
        <div className="wrap topo-in">
          <a className="marca" href="#inicio">
            <Logo />
            {site.nome}
          </a>
          <nav className="nav-topo" aria-label="Seções da página">
            {secoes.map(([href, nome]) => <a key={href} href={href}>{nome}</a>)}
          </nav>
          <a className="btn btn-pri btn-p" href="#agendamento">Agendar consulta</a>
          <MenuCelular links={secoes} />
        </div>
      </header>

      <main id="conteudo">
        <section id="inicio" className="hero">
          <Trilha className="trilha-hero" preserveAspectRatio="none" />
          <div className="wrap hero-in">
            <div>
              <p className="sobre-titulo">Clínica odontológica no {end.bairro}, {site.cidade}/{site.uf}</p>
              <h1>Dentista para adultos e crianças, por convênio ou particular</h1>
              <p className="lead">
                Da limpeza de rotina aos implantes, passando pelo aparelho e pela primeira consulta dos
                pequenos: a família toda é cuidada no mesmo lugar, com hora marcada e explicações claras.
              </p>
              <ul className="fatos">
                {["Convênios e particular", "Adultos e crianças", `${site.horarios[0].dias}, ${site.horarios[0].horas}`].map((f) => (
                  <li key={f}><Check size={16} strokeWidth={3} aria-hidden="true" />{f}</li>
                ))}
              </ul>
              <div className="acoes">
                <a className="btn btn-pri" href="#agendamento">Agendar consulta</a>
                <BotaoWhats />
              </div>
              <ul className="numeros">
                <li><strong>Desde {site.fundacao}</strong><span>no {end.bairro}</span></li>
                <li><strong>{site.equipe.length} especialistas</strong><span>em áreas diferentes</span></li>
                <li><strong>Convênios</strong><span>e particular</span></li>
              </ul>
            </div>
            <div className="hero-foto">
              <Foto id="f194219223" w={1280} h={1910} ratio="4 / 5" prioridade alt="Dentista de luvas examinando os dentes de uma paciente com espelho clínico" />
              <p className="selo">
                <Star size={22} fill="currentColor" aria-hidden="true" />
                <span><strong>{media}</strong> de 5<br />avaliação dos pacientes</span>
              </p>
            </div>
          </div>
        </section>

        <section id="sobre" className="areia">
          <div className="wrap">
            <div className="duas revela">
              <div>
                <h2>Sobre a clínica</h2>
                {site.sobre.map((p) => <p key={p}>{p}</p>)}
              </div>
              <Foto id="sala" w={1280} h={853} ratio="3 / 2" alt="Sala de atendimento clara, com cadeira odontológica, armários brancos e piso de madeira" />
            </div>
            <ul className="grade grade-4 difs">
              {diferenciais.map(([icone, t, d]) => (
                <li className="revela" key={t}>
                  <Ic i={icone} />
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
            <div className="grade grade-2 servicos">
              {tratamentos.map((t) => (
                <article className="cartao cartao-hover revela" key={t.titulo}>
                  <Ic i={t.icone} className="ic-azul" />
                  <h3>{t.titulo}</h3>
                  <p>{t.texto}</p>
                  <Acordeao rotulo={<>Ver detalhes<span className="sr"> de {t.titulo}</span></>}>
                    <ul className="lista">
                      {t.itens.map(([nome, desc]) => (
                        <li key={nome}><strong>{nome}:</strong> {desc}</li>
                      ))}
                    </ul>
                  </Acordeao>
                </article>
              ))}
            </div>
            <div className="duas infantil revela">
              <Foto id="f197684384" w={1280} h={853} ratio="3 / 2" alt="Profissional sorridente, abaixada na altura de um menino sentado, conversando com ele" />
              <div>
                <h3 className="h3-grande">Convênio ou particular: o cuidado é o mesmo</h3>
                <div className="grade grade-2 formas">
                  <div className="cartao">
                    <Ic i={BadgeCheck} />
                    <h4>Pelo convênio</h4>
                    <p>Conferimos a cobertura do seu plano antes da consulta e avisamos o que está incluído.</p>
                  </div>
                  <div className="cartao">
                    <Ic i={Wallet} />
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
            <ul className="grade grade-4 equipe" tabIndex={0} aria-label="Dentistas da equipe">
              {site.equipe.map((p) => (
                <li className="cartao cartao-hover pessoa revela" key={p.nome}>
                  <Foto
                    id={p.foto}
                    retrato
                    w={960}
                    h={1200}
                    ratio="4 / 5"
                    sizes="(max-width: 639px) 100vw, (max-width: 1199px) 50vw, 25vw"
                    alt={`Retrato de ${p.nome}, sorrindo`}
                  />
                  <div>
                    <h3>{p.nome}</h3>
                    <p className="badge">{p.area}</p>
                    <p className="cro">{p.cro}</p>
                    <p>{p.bio}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="banda">
          <Foto id="clinica" w={1280} h={853} sizes="100vw" alt="Consultório da clínica, com cadeira odontológica e bancada de atendimento" />
          <div className="wrap revela">
            <h2>Consultas sem pressa, com tudo explicado antes de começar</h2>
            <a className="btn btn-claro-cheio" href="#agendamento">Agende sua avaliação <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </section>

        <section id="depoimentos">
          <div className="wrap">
            <div className="cabeca">
              <h2>O que dizem os pacientes</h2>
              <p className="media">
                <Star size={18} fill="currentColor" aria-hidden="true" />
                <strong>{media} de média</strong>
              </p>
            </div>
            <div className="depos">
              <figure className="depo depo-destaque revela">
                <Quote className="aspas" size={56} aria-hidden="true" />
                <Estrelas nota={destaque.nota} />
                <blockquote>{destaque.texto}</blockquote>
                <figcaption>
                  <span className="avatar" aria-hidden="true">{iniciais(destaque.nome)}</span>
                  <span><strong>{destaque.nome}</strong><br />{destaque.perfil}</span>
                </figcaption>
              </figure>
              {outros.map((d, i) => (
                <figure className="cartao depo revela" key={d.nome}>
                  <Estrelas nota={d.nota} />
                  <blockquote>“{d.texto}”</blockquote>
                  <figcaption>
                    <span className={`avatar avatar-${i + 1}`} aria-hidden="true">{iniciais(d.nome)}</span>
                    <span><strong>{d.nome}</strong><br />{d.perfil}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="nota">Depoimentos fictícios, usados apenas para demonstração.</p>
          </div>
        </section>

        <section id="duvidas" className="areia">
          <div className="wrap duas duas-faq">
            <div>
              <h2>Perguntas frequentes</h2>
              <p className="lead">Ficou outra dúvida? Nossa recepção responde pelo WhatsApp.</p>
              <div className="acoes">
                <a className="btn btn-whats" href={whatsappLink("Olá! Tenho uma dúvida.")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={20} aria-hidden="true" />
                  Pergunte pelo WhatsApp
                </a>
              </div>
              <Trilha className="trilha-faq" />
            </div>
            <div className="faq-lista revela">
              {faq.map(([p, resp]) => (
                <Acordeao key={p} rotulo={p}>
                  <p>{resp}</p>
                </Acordeao>
              ))}
            </div>
          </div>
        </section>

        <section id="agendamento" className="faixa-escura">
          <Trilha className="trilha-agenda" />
          <div className="wrap duas">
            <div>
              <h2>Agende sua consulta</h2>
              <p className="lead">Preencha o formulário e nossa equipe entra em contato para combinar o melhor dia e horário.</p>
              <h3 className="sub">Como funciona</h3>
              <ol className="passos">
                {passos.map(([t, d]) => (
                  <li key={t}><div><strong>{t}</strong><span>{d}</span></div></li>
                ))}
              </ol>
              <p className="prefere">Prefere falar agora?</p>
              <div className="acoes">
                <BotaoWhats>WhatsApp {site.whatsappExibicao}</BotaoWhats>
                <a className="btn btn-claro" href={`tel:${site.telefoneHref}`}><Phone size={18} aria-hidden="true" />Ligar {site.telefone}</a>
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
                <ul className="contatos">
                  <li>
                    <Ic i={MapPin} />
                    <span><strong>{site.nome}</strong><br />{end.rua}<br />{end.bairro} · {site.cidade}/{site.uf} · CEP {end.cep}<br />{end.referencia}</span>
                  </li>
                  <li><Ic i={Phone} /><span>Telefone<br /><a href={`tel:${site.telefoneHref}`}>{site.telefone}</a></span></li>
                  <li><Ic i={MessageCircle} /><span>WhatsApp<br /><a href={whatsappLink()} target="_blank" rel="noopener noreferrer">{site.whatsappExibicao}</a></span></li>
                  <li><Ic i={Mail} /><span>E-mail<br /><a href={`mailto:${site.email}`}>{site.email}</a></span></li>
                </ul>
              </address>
              <table className="horarios">
                <caption><Clock size={18} aria-hidden="true" /> Horário de atendimento</caption>
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
            <iframe className="mapa" src={site.mapaEmbedUrl} title={`Mapa da região da ${site.nome}, no ${end.bairro}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </section>
      </main>

      <footer className="rodape">
        <div className="wrap">
          <div className="rodape-cols">
            <div>
              <p className="marca"><Logo />{site.nome}</p>
              <p>{site.razaoSocial}<br />CNPJ {site.cnpj}</p>
              <p>Responsável técnica: {r.nome}<br />{r.cro} · {site.croClinica}</p>
              <ul className="redes">
                <li>
                  <a href={site.redes.instagram} aria-label="Instagram da clínica (link fictício)">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.500" cy="6.500" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href={site.redes.facebook} aria-label="Facebook da clínica (link fictício)">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2>Contato</h2>
              <p>{end.rua}<br />{end.bairro} · {site.cidade}/{site.uf}</p>
              <p>
                <a href={`tel:${site.telefoneHref}`}>{site.telefone}</a><br />
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp {site.whatsappExibicao}</a><br />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
            <div>
              <h2>Horários</h2>
              <ul>
                {site.horarios.map((h) => <li key={h.dias}>{h.dias}: {h.horas}</li>)}
              </ul>
            </div>
            <nav aria-label="Links rápidos">
              <h2>Links rápidos</h2>
              <ul>
                {secoes.map(([href, nome]) => <li key={href}><a href={href}>{nome}</a></li>)}
                <li><a href="#agendamento">Agendamento</a></li>
                <li><Link href="/privacidade">Política de privacidade</Link></li>
              </ul>
            </nav>
          </div>
          <div className="rodape-fim">
            <p>As informações desta página têm caráter educativo e não substituem a consulta. A indicação de qualquer tratamento depende de avaliação individual, e os resultados variam de pessoa para pessoa.</p>
            <p>
              Fotos ilustrativas, redimensionadas:{" "}
              {creditos.map(([nome, url], i) => (
                <span key={url}>{i > 0 && " · "}<a href={url} target="_blank" rel="noopener noreferrer">{nome}</a></span>
              ))}
            </p>
            <p>© {new Date().getFullYear()} {site.nome}</p>
          </div>
        </div>
      </footer>

      <a className="fab" href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Conversar pelo WhatsApp">
        <MessageCircle size={28} aria-hidden="true" />
      </a>

      <div className="barra-celular">
        <BotaoWhats>WhatsApp</BotaoWhats>
        <a className="btn btn-pri" href="#agendamento">Agendar</a>
      </div>
    </>
  );
}
