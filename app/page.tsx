import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Sobre from "@/components/Sobre";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Fachadas e Letreiros em Mogi Guaçu | Jack Designer",
  description:
    "Fachadas em ACM, letras caixa e luminosos com execução premium em Mogi Guaçu. Projeto, fabricação e instalação.",
  keywords: [
    "fachadas Mogi Guaçu",
    "ACM Mogi Guaçu",
    "letras caixa",
    "luminosos",
    "comunicação visual",
  ],
  openGraph: {
    title: "Fachadas e Letreiros em Mogi Guaçu | Jack Designer",
    description:
      "Projeto, fabricação e instalação de fachadas em ACM, letras caixa e luminosos em Mogi Guaçu e região.",
    url: "https://jackdesigner.com.br",
    siteName: "Jack Designer",
    images: [
      {
        url: "https://jackdesigner.com.br/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Jack Designer — Fachadas e letreiros",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fachadas e Letreiros em Mogi Guaçu | Jack Designer",
    description:
      "Execução premium em ACM, letras caixa e luminosos. Solicite um orçamento.",
    images: ["https://jackdesigner.com.br/og-cover.jpg"],
  },
  alternates: {
    canonical: "https://jackdesigner.com.br/",
  },
};

export default function Page() {
  return (
    <div id="top">
      <Header />
      <main className="pt-36 md:pt-40 lg:pt-44">
        <Hero />
        <Sobre />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}
