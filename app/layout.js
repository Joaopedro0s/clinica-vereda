import { Figtree, Fraunces } from "next/font/google";
import { site } from "../lib/site.mjs";
import "./globals.css";

const fonte = Figtree({ subsets: ["latin"], display: "swap" });
// Serifada suave, só para títulos (via var(--font-titulo) no CSS).
const fonteTitulo = Fraunces({ subsets: ["latin"], display: "swap", variable: "--font-titulo" });

const titulo = `${site.nome} | Dentista em ${site.cidade} — convênios e particular`;
const descricao = `Consultório odontológico em ${site.cidade}/${site.uf} para adultos e crianças: limpeza, restaurações, canal, aparelhos, implantes, próteses e odontopediatria. Atendimento por convênio e particular. Agende sua consulta.`;

export const metadata = {
  metadataBase: new URL(site.url),
  title: titulo,
  description: descricao,
  alternates: { canonical: "/" },
  openGraph: { title: titulo, description: descricao, url: "/", siteName: site.nome, locale: "pt_BR", type: "website" },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: "#1558a6" };

// Dados estruturados para busca local. Não inclua aggregateRating sem avaliações reais.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: site.nome,
  url: site.url,
  telephone: site.telefoneHref,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.endereco.rua,
    addressLocality: site.cidade,
    addressRegion: site.uf,
    postalCode: site.endereco.cep,
    addressCountry: "BR",
  },
  openingHours: site.horariosSchema,
  medicalSpecialty: "Dentistry",
  paymentAccepted: site.pagamentos.join(", "),
  availableService: ["Odontologia geral", "Ortodontia", "Implantes dentários", "Prótese dentária", "Odontopediatria"].map(
    (name) => ({ "@type": "MedicalProcedure", name })
  ),
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${fonte.className} ${fonteTitulo.variable}`}>
        <a className="pular" href="#conteudo">Pular para o conteúdo</a>
        <p className="demo">Demonstração: clínica, profissionais, contatos e depoimentos desta página são fictícios.</p>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
