// components/ContactSection.tsx
"use client";

import { useMemo } from "react";

export default function ContactSection() {
  const waLink = useMemo(
    () =>
      "https://wa.me/5519996565458?text=Ol%C3%A1%2C%20vi%20seus%20projetos%20e%20quero%20um%20or%C3%A7amento.%20Pode%20me%20ajudar%3F",
    []
  );

  return (
    <section id="contato" className="relative py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 text-center">
        {/* Título */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
          Fale <span className="text-[--color-brand-yellow]">com a gente</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-white/70">
          Vamos transformar sua ideia em realidade. Solicite um orçamento sem compromisso.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-base text-white/90 hover:bg-white/10 transition"
          >
            Falar no WhatsApp <span className="text-[--color-brand-yellow]">→</span>
          </a>

          <a
            href="https://www.instagram.com/jackdesigner/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-base text-white/90 hover:bg-white/10 transition"
            aria-label="Abrir Instagram Jack Designer"
          >
            Instagram <span className="text-[--color-brand-yellow]">@jackdesigner</span>
          </a>
        </div>

        {/* Infos rápidas */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">
            <div className="text-white">Atendimento</div>
            <div className="text-white/70 mt-1">Seg a Sáb • 9h — 18h</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">
            <div className="text-white">Região</div>
            <div className="text-white/70 mt-1">Mogi Guaçu e região</div>
          </div>
          <a
            href="mailto:contato@jackdesigner.com.br"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/80 hover:bg-white/10 transition"
          >
            <div className="text-white">Email</div>
            <div className="text-white/70 mt-1 break-all">contato@jackdesigner.com.br</div>
          </a>
        </div>

        {/* Linha informativa final da seção (não é footer) */}
        <p className="mt-10 text-xs text-white/50">
          Jack Designer • WhatsApp: +55 19 99656-5458
        </p>
      </div>

      {/* divisória sutil */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Jack Designer",
            image: "https://jackdesigner.com.br/og-cover.jpg",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Mogi Guaçu",
              addressCountry: "BR",
            },
            areaServed: "Mogi Guaçu e região",
            url: "https://jackdesigner.com.br",
            telephone: "+55 19 99656-5458",
            sameAs: ["https://www.instagram.com/jackdesigner/"],
          }),
        } as { __html: string }}
      />
    </section>
  );
}
