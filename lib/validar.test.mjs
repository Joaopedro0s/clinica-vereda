import test from "node:test";
import assert from "node:assert/strict";
import { validar } from "./validar.mjs";
import { servicos } from "./site.mjs";

const ok = { nome: "Maria Silva", telefone: "(11) 91234-5678", servico: servicos[0], atendimento: "Convênio", consentimento: true };

test("pedido válido passa", () => assert.deepEqual(validar(ok), {}));
test("formulário vazio acusa os obrigatórios", () =>
  assert.deepEqual(Object.keys(validar({})).sort(), ["atendimento", "consentimento", "nome", "servico", "telefone"]));
test("data preferida: futura passa, passada ou malformada é recusada", () => {
  assert.deepEqual(validar({ ...ok, data: "2999-01-15" }), {});
  assert.ok(validar({ ...ok, data: "2020-01-15" }).data);
  assert.ok(validar({ ...ok, data: "15/01/2999" }).data);
});
test("telefone curto, e-mail ruim e serviço fora da lista são recusados", () => {
  const e = validar({ ...ok, telefone: "1234", email: "a@b", servico: "x" });
  assert.ok(e.telefone && e.email && e.servico);
});
