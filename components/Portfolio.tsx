// components/Portfolio.tsx
"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Media =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; alt: string };

const TOTAL_IMAGES = 60;
const TOTAL_VIDEOS = 8;
const IMAGE_EXT = "jpeg";

function useMedia(): Media[] {
  return useMemo(() => {
    const imgs: Media[] = Array.from({ length: TOTAL_IMAGES }, (_, i) => {
      const n = i + 1;
      return {
        type: "image" as const,
        src: `/portfolio/${n}.${IMAGE_EXT}`,
        alt: `Projeto ${n} — Fachadas e letreiros Jack Designer`,
      };
    });

    const vids: Media[] = Array.from({ length: TOTAL_VIDEOS }, (_, i) => {
      const n = i + 1;
      return {
        type: "video" as const,
        src: `/portfolio/v${n}.mp4`,
        poster: `/portfolio/posters/v${n}.jpg`,
        alt: `Vídeo de projeto Jack Designer v${n}`,
      };
    });

    // mistura leve: primeiro vídeo cedo para quebrar padrão
    return [...imgs.slice(0, 12), vids[0], ...imgs.slice(12), ...vids.slice(1)];
  }, []);
}

export default function Portfolio() {
  const media = useMedia();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
    document.documentElement.style.overflow = "hidden";
  };

  const close = useCallback(() => {
    setOpen(false);
    document.documentElement.style.overflow = "";
  }, []);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + media.length) % media.length),
    [media.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % media.length),
    [media.length]
  );

  // teclado
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  // swipe no mobile
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const delta = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(delta) > 40) (delta > 0 ? prev : next)();
    startX.current = null;
  };

  return (
    <section id="portfolio" className="relative py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center fade-up">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Nossos <span className="text-[--color-brand-yellow]">projetos</span>
          </h2>

          <div className="mx-auto mt-3 flex items-center justify-center gap-3 text-white/70">
            <p className="text-sm sm:text-base">
              Fachadas em ACM, letras caixa e luminosos em Mogi Guaçu e região
            </p>
            <span className="hidden sm:inline-block h-3 w-px bg-white/15" />
            <span className="hidden sm:inline-block text-xs bg-white/5 border border-white/10 rounded-full px-2 py-0.5">
              {media.length} itens
            </span>
          </div>

          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[--color-brand-yellow] to-transparent opacity-70" />
        </header>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {media.map((m, i) => (
            <button
              key={m.type + m.src}
              onClick={() => openAt(i)}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5 ring-0 transition
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-brand-yellow]/70
                         hover:shadow-[0_0_0_1px_rgba(255,255,255,.08)]
                         hover:border-white/20"
              aria-label={`Abrir ${
                m.type === "image" ? "imagem" : "vídeo"
              } do portfólio`}
            >
              {m.type === "image" ? (
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              ) : (
                <video
                  muted
                  playsInline
                  loop
                  autoPlay
                  poster={m.poster}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                >
                  <source src={m.src} type="video/mp4" />
                </video>
              )}

              {/* halo/overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition duration-300" />

              {/* selo de vídeo */}
              {m.type === "video" && (
                <div
                  className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/60 backdrop-blur px-2 py-1
                             text-[10px] uppercase tracking-wide text-white/90 border border-white/10"
                >
                  vídeo
                </div>
              )}
            </button>
          ))}
        </div>

        {/* CTA discreto 
        <div className="mt-10 flex justify-center">
          <a
            href="https://wa.me/5519996565458"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition"
          >
            Precisa de um projeto assim? Fale com a gente
            <span className="text-[--color-brand-yellow]">→</span>
          </a>
        </div> */}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
        >
          <div
            className="relative max-w-[92vw] max-h-[86vh]"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {(() => {
              const item = media[index];
              if (item.type === "image") {
                return (
                  <div
                    className="relative rounded-2xl shadow-2xl ring-1 ring-white/10"
                    style={{ width: "92vw", height: "86vh" }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="92vw"
                      className="object-contain rounded-2xl"
                    />
                  </div>
                );
              }
              return (
                <video
                  controls
                  playsInline
                  className="max-h-[86vh] max-w-[92vw] rounded-2xl shadow-2xl ring-1 ring-white/10"
                  poster={item.poster}
                  autoFocus
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              );
            })()}

            {/* Top bar */}
            <div className="absolute -top-10 right-0 left-0 flex items-center justify-between text-sm">
              <span className="text-white/70">
                {index + 1} / {media.length}
              </span>
              <button
                onClick={close}
                aria-label="Fechar"
                className="rounded-full bg-white/10 px-3 py-1 text-white hover:bg-white/20"
              >
                Fechar
              </button>
            </div>

            {/* Arrows */}
            <button
              onClick={prev}
              aria-label="Anterior"
              className="absolute left-[-18px] top-1/2 -translate-y-1/2 hidden sm:flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Próximo"
              className="absolute right-[-18px] top-1/2 -translate-y-1/2 hidden sm:flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              ›
            </button>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
