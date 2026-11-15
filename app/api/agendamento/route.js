import { validar } from "../../../lib/validar.mjs";

// shortcut: sem limite de envios por IP; se chegar spam, adicione rate limit ou um captcha.
export async function POST(req) {
  let d;
  try {
    d = await req.json();
  } catch {
    return Response.json({ erros: {} }, { status: 400 });
  }
  if (d?.site) return Response.json({ ok: true }); // isca preenchida: robô, descarta em silêncio

  const erros = validar(d ?? {});
  if (Object.keys(erros).length) return Response.json({ erros }, { status: 400 });

  const pedido = {
    nome: d.nome.trim(),
    telefone: d.telefone.trim(),
    email: (d.email ?? "").trim(),
    servico: d.servico,
    atendimento: d.atendimento,
    data: d.data ?? "",
    mensagem: (d.mensagem ?? "").trim(),
    recebidoEm: new Date().toISOString(),
  };

  const url = process.env.AGENDAMENTO_WEBHOOK_URL;
  if (!url) {
    // Em produção, sem destino configurado o pedido se perderia: melhor avisar o paciente.
    if (process.env.NODE_ENV === "production") return Response.json({ ok: false }, { status: 503 });
    console.log("[agendamento] (dev, sem webhook)", pedido);
    return Response.json({ ok: true });
  }

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) throw new Error(`webhook respondeu ${r.status}`);
  } catch (e) {
    console.error("[agendamento] falha no envio:", e.message);
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
