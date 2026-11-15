"use client";

import { useRef, useState } from "react";
import { servicos, whatsappLink } from "../lib/site.mjs";
import { validar, atendimentos } from "../lib/validar.mjs";

export default function AgendamentoForm() {
  const [erros, setErros] = useState({});
  const [estado, setEstado] = useState("parado"); // parado | enviando | ok | falha
  const form = useRef(null);

  async function enviar(ev) {
    ev.preventDefault();
    const dados = Object.fromEntries(new FormData(ev.currentTarget));
    dados.consentimento = dados.consentimento === "on";

    const e = validar(dados);
    setErros(e);
    const primeiro = Object.keys(e)[0];
    if (primeiro) {
      form.current.querySelector(`[name="${primeiro}"]`)?.focus();
      return;
    }

    setEstado("enviando");
    try {
      const r = await fetch("/api/agendamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      if (r.status === 400) setErros((await r.json()).erros ?? {});
      setEstado(r.ok ? "ok" : r.status === 400 ? "parado" : "falha");
    } catch {
      setEstado("falha");
    }
  }

  if (estado === "ok")
    return (
      <div className="form" role="status">
        <h3>Pedido recebido</h3>
        <p>Obrigado! Nossa equipe vai entrar em contato pelo telefone informado para confirmar o dia e o horário. O agendamento só vale após essa confirmação.</p>
      </div>
    );

  // Atributos comuns de cada campo: liga o erro ao campo para leitores de tela.
  const campo = (nome) => ({
    id: nome,
    name: nome,
    "aria-invalid": erros[nome] ? true : undefined,
    "aria-describedby": erros[nome] ? `${nome}-erro` : undefined,
  });
  const Erro = ({ nome }) => (erros[nome] ? <p className="erro" id={`${nome}-erro`}>{erros[nome]}</p> : null);

  return (
    <form className="form" ref={form} onSubmit={enviar} noValidate aria-labelledby="form-titulo">
      <h3 id="form-titulo">Pedido de agendamento</h3>
      <p className="nota">Campos com * são obrigatórios.</p>

      <label htmlFor="nome">Nome completo *</label>
      <input {...campo("nome")} type="text" autoComplete="name" required />
      <Erro nome="nome" />

      <label htmlFor="telefone">Telefone / WhatsApp com DDD *</label>
      <input {...campo("telefone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" required />
      <Erro nome="telefone" />

      <label htmlFor="email">E-mail (opcional)</label>
      <input {...campo("email")} type="email" autoComplete="email" />
      <Erro nome="email" />

      <label htmlFor="servico">Serviço de interesse *</label>
      <select {...campo("servico")} defaultValue="" required>
        <option value="" disabled>Selecione</option>
        {servicos.map((s) => <option key={s}>{s}</option>)}
      </select>
      <Erro nome="servico" />

      <label htmlFor="atendimento">Forma de atendimento *</label>
      <select {...campo("atendimento")} defaultValue="" required>
        <option value="" disabled>Selecione</option>
        {atendimentos.map((a) => <option key={a}>{a}</option>)}
      </select>
      <Erro nome="atendimento" />

      <label htmlFor="data">Data preferida (opcional)</label>
      <input {...campo("data")} type="date" />
      <Erro nome="data" />

      <label htmlFor="mensagem">Melhor horário ou observações (opcional)</label>
      <textarea {...campo("mensagem")} rows={3} maxLength={1000} />
      <Erro nome="mensagem" />

      {/* Isca para robôs: fica fora da tela e pessoas não preenchem. */}
      <div className="isca" aria-hidden="true">
        <label htmlFor="site">Não preencha este campo</label>
        <input id="site" name="site" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="check" htmlFor="consentimento">
        <input {...campo("consentimento")} type="checkbox" required />
        <span>Autorizo o uso dos meus dados para contato sobre o agendamento, conforme a <a href="/privacidade">Política de privacidade</a>. *</span>
      </label>
      <Erro nome="consentimento" />

      <button className="btn btn-pri" type="submit" disabled={estado === "enviando"}>
        {estado === "enviando" ? "Enviando…" : "Enviar pedido de agendamento"}
      </button>

      <div role="alert">
        {estado === "falha" && (
          <p className="erro">
            Não foi possível enviar agora. Tente de novo ou{" "}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">agende pelo WhatsApp</a>.
          </p>
        )}
      </div>
    </form>
  );
}
