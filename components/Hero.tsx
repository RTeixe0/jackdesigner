"use client";

import Image from "next/image";

const WHATSAPP = "5519996565458";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[70vh] md:min-h-[78vh] lg:min-h-[82vh] flex items-center overflow-hidden"
      aria-label="Destaque Jack Designer"
    >
      {/* Fundo: mostra a marca no topo */}
      <Image
        src="/hero.jpg"
        alt="Fachada produzida pela Jack Designer"
        fill
        priority
        className="object-cover brightness-95"
        style={{ objectPosition: "center 10%" }} /* ajuste fino 8–15% */
        sizes="100vw"
      />

      {/* Overlays muito sutis para legibilidade */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 to-transparent" />

      {/* Conteúdo: mais leve, menor e com 'glass' suave */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl md:max-w-2xl rounded-xl bg-black/15 backdrop-blur-sm p-4 sm:p-6 ring-1 ring-white/10 fade-up mt-28 md:mt-16">
          <h1 className="text-white/95 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            Fachadas que elevam a
            <span className="block text-[--color-brand-yellow]">
              percepção da sua marca.
            </span>
          </h1>

          <p className="mt-3 md:mt-4 text-sm md:text-base text-white/85">
            Projetos e execução de <strong className="text-white">ACM</strong>,{" "}
            <strong className="text-white">letras caixa</strong> e{" "}
            <strong className="text-white">luminosos</strong> em{" "}
            <strong className="text-white">Mogi Guaçu</strong>. Detalhe,
            precisão e instalação segura.
          </p>

          {/* CTAs minimalistas */}
          <div className="mt-5 flex flex-col sm:flex-row items-center gap-2.5">
            <a
              href={`https://wa.me/${WHATSAPP}?text=Olá!%20Quero%20um%20orçamento%20de%20fachada%20em%20Mogi%20Guaçu.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full px-6 font-medium
                         bg-[--color-brand-yellow] text-[--color-brand-black]
                         shadow-[0_6px_18px_rgba(255,212,59,.28)] hover:shadow-[0_8px_24px_rgba(255,212,59,.42)]
                         transition-[box-shadow,transform] duration-300 hover:scale-[1.01] active:scale-[.99]"
            >
              Orçar pelo WhatsApp
            </a>

            <a
              href="#portfolio"
              className="inline-flex h-11 items-center justify-center rounded-full px-6 font-medium
                         text-white/90 border border-white/20 hover:border-white/35 hover:bg-white/5 transition"
            >
              Ver portfólio
            </a>
          </div>
        </div>
      </div>

      {/* Vignette discreta no rodapé do hero */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
    </section>
  );
}
