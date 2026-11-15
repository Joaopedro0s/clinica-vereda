import Link from "next/link";
import { site } from "../../lib/site.mjs";

export const metadata = { title: `Política de privacidade | ${site.nome}`, alternates: { canonical: "/privacidade" } };

// MODELO: revise com o jurídico/contador do consultório antes de publicar.
export default function Privacidade() {
  return (
    <main id="conteudo" className="wrap estreito privacidade">
      <p><Link href="/">← Voltar para a página inicial</Link></p>
      <h1>Política de privacidade</h1>
      <p className="aviso" role="note"><strong>Modelo a revisar:</strong> texto-base para adequação à LGPD (Lei 13.709/2018). Ajuste à rotina real do consultório antes de publicar.</p>

      <h2>Quem é o responsável pelos dados</h2>
      <p>{site.razaoSocial}, CNPJ {site.cnpj}, com endereço em {site.endereco.rua}, {site.endereco.bairro}, {site.cidade}/{site.uf}.</p>

      <h2>Quais dados coletamos</h2>
      <p>Pelo formulário de agendamento: nome, telefone, e-mail (se informado), serviço de interesse, forma de atendimento e a mensagem que você escrever. Pedimos que não envie informações de saúde detalhadas pelo formulário.</p>

      <h2>Para que usamos</h2>
      <p>Somente para entrar em contato e organizar o seu agendamento, com base no seu consentimento. Não vendemos nem cedemos seus dados para fins de publicidade de terceiros.</p>

      <h2>Com quem compartilhamos</h2>
      <p>Com os prestadores de tecnologia necessários para receber o formulário e nos comunicarmos com você: [listar — hospedagem, ferramenta de formulários/e-mail, WhatsApp]. A página inicial também exibe um mapa do Google Maps, que pode registrar dados de navegação conforme a política do Google.</p>

      <h2>Por quanto tempo guardamos</h2>
      <p>Pedidos de agendamento que não resultarem em atendimento são excluídos em até [prazo]. Dados de pacientes atendidos seguem os prazos legais de guarda de prontuário.</p>

      <h2>Seus direitos</h2>
      <p>Você pode pedir acesso, correção ou exclusão dos seus dados e retirar o consentimento a qualquer momento. Fale com {site.encarregadoDados} pelo e-mail <a href={`mailto:${site.email}`}>{site.email}</a>.</p>

      <p className="nota">Última atualização: [data].</p>
    </main>
  );
}
