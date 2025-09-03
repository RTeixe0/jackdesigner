"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const WHATSAPP = "5519996565458";

export default function Hero() {
  // Certifique-se de ter esses arquivos em /public
  const images = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg", "/hero4.jpg"];

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Troca automática (incremento circular)
  useEffect(() => {
    if (images.length <= 1 || paused) return;

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images.length, paused]);

  // Handlers para pausar SOMENTE quando pressiona (mouse ou toque)
  const handlePointerDown = () => setPaused(true);
  const handlePointerUp = () => setPaused(false);
  const handlePointerCancel = () => setPaused(false);
  const handlePointerLeave = () => setPaused(false);

  return (
    <section id="hero" aria-label="Destaque Jack Designer">
      {/* Hero com crossfade */}
      <div
        className="relative w-full h-[36vh] sm:h-[46vh] md:h-[66vh] lg:h-[76vh] overflow-hidden select-none touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerLeave}
        role="region"
        aria-roledescription="carrossel"
        aria-live="polite"
      >
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt="Fachada da Jack Designer com letras em ACM e iluminação"
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-contain md:object-cover absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Vinheta sutil no rodapé */}
        <div className="hidden md:block absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />

        {/* Indicadores (bolinhas) */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir para imagem ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[--color-brand-yellow] ${
                i === current
                  ? "scale-110 bg-white"
                  : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Conteúdo e CTAs */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <header className="mx-auto text-center">
          <h1
            className="
              text-3xl sm:text-4xl md:text-5xl font-semibold
              leading-[1.15] tracking-tight text-slate-100
              [text-wrap:balance] max-w-[22ch] sm:max-w-[24ch] md:max-w-[26ch] mx-auto
            "
          >
            Fachadas em ACM e letreiros que{" "}
            <span className="text-[--color-brand-yellow]">
              destacam a sua marca em Mogi Guaçu e região
            </span>
            <br className="hidden md:block" />
          </h1>

          <p
            className="
              mt-3 sm:mt-4 text-base md:text-lg text-slate-300
              [text-wrap:pretty] max-w-[60ch] mx-auto
            "
          >
            Projetos e execução de <strong>fachadas em ACM</strong>,{" "}
            <strong>letras caixa</strong> e{" "}
            <strong>letreiros luminosos em LED</strong>. Atendemos{" "}
            <strong>Mogi Guaçu e cidades da região</strong> com detalhe,
            precisão e instalação segura para valorizar o seu negócio.
          </p>
        </header>

        <div className="cta mt-5 md:mt-6 flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center">
          <a
            href={`https://wa.me/${WHATSAPP}?text=Olá!%20Quero%20um%20orçamento%20de%20fachada%20em%20Mogi%20Guaçu.`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pedir orçamento pelo WhatsApp"
            className="relative inline-flex items-center justify-center h-12 px-7 rounded-full font-semibold tracking-tight shadow-[0_8px_24px_rgba(255,217,59,0.35)] hover:shadow-[0_12px_30px_rgba(255,217,59,0.5)] transition-all duration-300 hover:translate-y-[-1px] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-brand-yellow]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            style={{
              background:
                "linear-gradient(90deg, #FFD93B 0%, #FFE066 50%, #FFD93B 100%)",
              color: "#0a0a0a",
              WebkitTextFillColor: "#0a0a0a",
            }}
          >
            {/* Ícone WhatsApp */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-2 text-neutral-900"
              aria-hidden="true"
            >
              <path d="M12 0C5.371 0 0 5.373 0 12c0 2.117.551 4.188 1.596 6.016L0 24l6.211-1.627A11.94 11.94 0 0 0 12 24c6.629 0 12-5.373 12-12S18.629 0 12 0zm0 21.75c-1.789 0-3.527-.465-5.047-1.344l-.363-.211-3.691.967.985-3.594-.235-.379A9.711 9.711 0 0 1 2.25 12c0-5.375 4.375-9.75 9.75-9.75S21.75 6.625 21.75 12s-4.375 9.75-9.75 9.75z" />
              <path d="M17.066 14.734c-.285-.141-1.68-.828-1.941-.922-.262-.098-.453-.141-.641.141-.191.281-.738.922-.902 1.109-.164.188-.336.211-.621.07-.285-.141-1.199-.441-2.285-1.406-.844-.75-1.41-1.676-1.574-1.961-.164-.281-.018-.434.123-.574.127-.127.285-.332.426-.496.141-.164.188-.281.285-.469.094-.188.047-.352-.023-.492-.07-.141-.641-1.547-.879-2.121-.234-.562-.469-.484-.641-.492l-.547-.012c-.188 0-.492.07-.75.352s-.984.961-.984 2.344c0 1.383 1.008 2.719 1.148 2.906.141.188 1.98 3.02 4.801 4.23.672.289 1.195.461 1.605.59.674.215 1.285.184 1.77.113.539-.08 1.68-.688 1.918-1.352.238-.664.238-1.234.168-1.352-.07-.117-.258-.188-.543-.328z" />
            </svg>
            Pedir orçamento no WhatsApp
          </a>

          <a
            href="#portfolio"
            aria-label="Ver portfólio de fachadas"
            className="inline-flex items-center justify-center h-12 px-7 rounded-full font-medium text-white/90 border border-white/25 backdrop-blur-sm bg-white/5 hover:border-[--color-brand-yellow] hover:text-[--color-brand-yellow] hover:bg-[--color-brand-yellow]/5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-brand-yellow] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Ver portfólio de fachadas
          </a>
        </div>

        <p className="mt-2 text-center text-xs text-white/60">
          Resposta rápida • Sem compromisso
        </p>
      </div>
    </section>
  );
}
