import { servicos } from "./site.mjs";

export const atendimentos = ["Convênio", "Particular", "Ainda não sei"];

// Usada no navegador e no servidor. Devolve { campo: mensagem } — vazio se tudo certo.
export function validar(d) {
  const e = {};
  const nome = String(d.nome ?? "").trim();
  const fone = String(d.telefone ?? "").replace(/\D/g, "");
  const email = String(d.email ?? "").trim();

  if (nome.length < 3 || nome.length > 120) e.nome = "Informe seu nome completo.";
  if (fone.length < 10 || fone.length > 11) e.telefone = "Informe um telefone com DDD, por exemplo (11) 91234-5678.";
  if (email && (email.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) e.email = "Confira o e-mail informado.";
  if (!servicos.includes(d.servico)) e.servico = "Escolha o serviço de interesse.";
  if (!atendimentos.includes(d.atendimento)) e.atendimento = "Escolha a forma de atendimento.";
  // Compara com "ontem" em UTC para não recusar o dia de hoje por diferença de fuso entre navegador e servidor.
  const ontem = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  if (d.data && (!/^\d{4}-\d{2}-\d{2}$/.test(d.data) || isNaN(Date.parse(d.data)) || d.data < ontem))
    e.data = "Escolha uma data a partir de hoje.";
  if (String(d.mensagem ?? "").length > 1000) e.mensagem = "A mensagem pode ter até 1000 caracteres.";
  if (d.consentimento !== true) e.consentimento = "Precisamos da sua autorização para entrar em contato.";
  return e;
}
