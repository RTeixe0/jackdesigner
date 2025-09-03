// app/page.tsx
import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Sobre from "@/components/Sobre";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import Videos from "@/components/Videos";

export const metadata: Metadata = {
  title: "Fachadas e Letreiros em Mogi Guaçu | Jack Designer",
  description:
    "Fachadas em ACM, letras caixa e luminosos com execução premium em Mogi Guaçu. Projeto, fabricação e instalação.",
  keywords: [
    "fachadas Mogi Guaçu",
    "fachadas em ACM",
    "ACM Mogi Guaçu",
    "letras caixa",
    "letreiros luminosos",
    "comunicação visual",
    "letreiros Mogi Guaçu",
  ],
  alternates: {
    canonical: "https://jackdesign.com.br/",
  },
  openGraph: {
    type: "website",
    url: "https://jackdesign.com.br/",
    siteName: "Jack Designer",
    title: "Fachadas e Letreiros em Mogi Guaçu | Jack Designer",
    description:
      "Projeto, fabricação e instalação de fachadas em ACM, letras caixa e luminosos em Mogi Guaçu e região.",
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

export default function Page() {
  return (
    <div id="top">
      <Header />
      <main className="pt-36 md:pt-40 lg:pt-44">
        <Hero />
        <Videos />
        <Sobre />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}
