import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollToTop from "@/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fachadas e Letreiros em Mogi Guaçu | Jack Designer",
  description:
    "Fachadas em ACM, letras caixa e luminosos com execução premium em Mogi Guaçu. Projeto, fabricação e instalação.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* Botões globais */}
        <FloatingWhatsApp
          phone="5519996565458"
          message="Olá! Vim pelo site da Jack Designer e gostaria de um orçamento para letreiros e fachadas. Pode me ajudar?"
        />
        <ScrollToTop />
      </body>
    </html>
  );
}
