// app/page.tsx
import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Sobre from "@/components/Sobre";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import Videos from "@/components/Videos";
import FecharOrcamento from "@/components/FecharOrcamento";

export const metadata: Metadata = {
  title: "Fachadas e Letreiros em Mogi Guaçu | Jack Designer",
  description:
    "Fachadas em ACM, letras caixa e letreiros luminosos com execução premium em Mogi Guaçu. Projeto, fabricação e instalação completas.",
  keywords: [
    // termos principais
    "fachadas Mogi Guaçu",
    "fachadas em ACM",
    "ACM Mogi Guaçu",
    "letras caixa",
    "letreiros luminosos",
    "comunicação visual",
    "letreiros Mogi Guaçu",
    // long-tail locais + variações
    "fachada ACM Mogi Mirim",
    "letra caixa inox Mogi Guaçu",
    "letra caixa PVC Mogi Guaçu",
    "letreiro luminoso Mogi Guaçu",
    "fachada ACM preço Mogi Guaçu",
    "comunicação visual Mogi Mirim",
    "fachadas comerciais Mogi Guaçu",
    "letras caixa em ACM",
  ],
  alternates: { canonical: "https://jackdesign.com.br/" },
  openGraph: {
    type: "website",
    url: "https://jackdesign.com.br/",
    siteName: "Jack Designer",
    title: "Fachadas e Letreiros em Mogi Guaçu | Jack Designer",
    description:
      "Projeto, fabricação e instalação de fachadas em ACM, letras caixa e letreiros luminosos em Mogi Guaçu e região.",
    images: [
      {
        url: "https://jackdesign.com.br/og.jpg",
        width: 1120,
        height: 630,
        alt: "Jack Designer — Fachadas e letreiros em Mogi Guaçu",
      },
    ],
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fachadas e Letreiros em Mogi Guaçu | Jack Designer",
    description:
      "Execução premium em ACM, letras caixa e luminosos. Solicite um orçamento.",
    images: ["https://jackdesign.com.br/og.jpg"],
  },
};

// FAQ estruturado para SEO (sem alterar o layout)
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quanto custa uma fachada em ACM?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O valor depende de medidas, recortes, acabamento e instalação. Fazemos orçamento gratuito: envie largura/altura aproximadas e referências no WhatsApp.",
      },
    },
    {
      "@type": "Question",
      name: "Em quanto tempo a fachada fica pronta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Projetos comuns de ACM e letras caixa levam em média de 7 a 15 dias após a aprovação do layout, dependendo da complexidade e agenda de instalação.",
      },
    },
    {
      "@type": "Question",
      name: "Vocês atendem só Mogi Guaçu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Atendemos Mogi Guaçu e região — incluindo Mogi Mirim, Estiva Gerbi e Itapira. Consulte disponibilidade para outras cidades.",
      },
    },
    {
      "@type": "Question",
      name: "Vocês fazem projeto, fabricação e instalação?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. Cuidamos do projeto (arte), fabricação com materiais premium e instalação profissional, com garantia de acabamento.",
      },
    },
    {
      "@type": "Question",
      name: "Há garantia nos serviços?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oferecemos garantia de instalação e materiais conforme especificação do projeto. Os termos variam por peça e acabamento.",
      },
    },
  ],
};

export default function Page() {
  return (
    <div id="top">
      <Header />
      <main className="pt-36 md:pt-40 lg:pt-44">
        <Hero />
        <Videos />
        <Sobre />
        <Portfolio />

        {/* CTA final: fecha-orçamento antes do footer */}
        <FecharOrcamento />
      </main>

      <Footer />

      {/* JSON-LD: FAQPage para resultado rico no Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  );
}
