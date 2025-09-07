// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollToTop from "@/components/ScrollToTop";
import Script from "next/script";
import GA from "@/components/GA";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jackdesign.com.br"),
  title: "Fachadas e Letreiros em Mogi Guaçu | Jack Designer",
  description:
    "Fachadas em ACM, letras caixa e luminosos com execução premium em Mogi Guaçu. Projeto, fabricação e instalação.",
  alternates: { canonical: "https://jackdesign.com.br/" },
  openGraph: {
    type: "website",
    url: "https://jackdesign.com.br/",
    siteName: "Jack Designer",
    title: "Fachadas e Letreiros em Mogi Guaçu | Jack Designer",
    description:
      "Fachadas em ACM, letras caixa e luminosos com execução premium em Mogi Guaçu. Projeto, fabricação e instalação.",
    images: [
      {
        url: "/og.jpg",
        width: 1120,
        height: 630,
        alt: "Jack Designer — letreiros e fachadas em Mogi Guaçu",
      },
    ],
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fachadas e Letreiros em Mogi Guaçu | Jack Designer",
    description:
      "Fachadas em ACM, letras caixa e luminosos com execução premium.",
    images: ["/og.jpg"],
  },
  robots: "index, follow, max-image-preview:large",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const GA_ID = "G-YH3XZBMVL7"; // sem .env, hardcoded

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Jack Designer",
    url: "https://jackdesign.com.br/",
    description:
      "Fachadas em ACM, letras caixa e luminosos com execução premium em Mogi Guaçu.",
    image: ["https://jackdesign.com.br/logo-horizontal.png"],
    telephone: "+55 19 99656-5458",
    address: {
      "@type": "PostalAddress",
      streetAddress: "R. Antônio Alves Bueno, 35 - Jardim Suecia",
      addressLocality: "Mogi Guaçu",
      addressRegion: "SP",
      postalCode: "13848-498",
      addressCountry: "BR",
    },
    priceRange: "$$",
    areaServed: "Mogi Guaçu e região",
  };

  return (
    <html lang="pt-BR">
      <head>
        {/* GA4 otimizado */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            // desabilita o page_view automático — controlaremos via <GA />
            gtag('config', '${GA_ID}', { send_page_view: false });
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* page_view em cada navegação */}
        <GA />

        {children}

        {/* Globais */}
        <FloatingWhatsApp
          phone="5519996565458"
          message="Olá! Vim pelo site da Jack Designer e gostaria de um orçamento para letreiros e fachadas. Pode me ajudar?"
        />
        <ScrollToTop />

        {/* JSON-LD para SEO Local */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
