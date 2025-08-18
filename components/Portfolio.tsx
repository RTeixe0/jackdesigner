// components/Portfolio.tsx
"use client";

import Image from "next/image";
import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import portfolioRaw from "@/data/portfolio.json";

/* =========================================================
   Tipos
   ========================================================= */
type MediaBase = {
  src: string;
  alt: string;
  w: number;
  h: number;
};
type MediaImage = MediaBase & { type: "image" };
type MediaVideo = MediaBase & { type: "video"; poster?: string };
type Media = MediaImage | MediaVideo;

type ItemJSON = {
  file_name: string;
  category: string;
  client: string;
};

type Item = {
  id: string;
  media: MediaImage;
  category: string;
  client: string;
};

type Group = {
  key: string;
  title: string;
  description?: string;
  items: Media[];
};

/* =========================================================
   Hook de largura container
   ========================================================= */
function useContainerWidth<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  return { ref, width };
}

/* =========================================================
   Galeria Masonry (mosaico)
   ========================================================= */
function MasonryGallery({
  items,
  onOpen,
  minColumnWidth = 260,
  gap = 12,
}: {
  items: Media[];
  onOpen: (idx: number) => void;
  minColumnWidth?: number;
  gap?: number;
}) {
  const { ref, width } = useContainerWidth<HTMLDivElement>();

  const columns = useMemo(() => {
    if (width <= 0) return 1;
    const count = Math.max(1, Math.floor(width / (minColumnWidth + gap)));
    return count;
  }, [width, minColumnWidth, gap]);

  const columnWidth = useMemo(() => {
    if (columns <= 0) return minColumnWidth;
    const totalGaps = (columns - 1) * gap;
    return Math.floor((width - totalGaps) / columns);
  }, [width, columns, gap, minColumnWidth]);

  return (
    <div
      ref={ref}
      className="w-full transition-opacity duration-500"
      style={{ opacity: width ? 1 : 0 }}
      aria-busy={!width}
    >
      <div
        style={{
          columnCount: columns,
          columnGap: gap,
        }}
      >
        {items.map((m, idx) => (
          <button
            key={`${m.src}-${idx}`}
            onClick={() => onOpen(idx)}
            className="group mb-3 w-full break-inside-avoid rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 block"
            aria-label={m.alt}
          >
            {m.type === "image" ? (
              <Image
                src={m.src}
                alt={m.alt}
                width={m.w}
                height={m.h}
                sizes={`${columnWidth}px`}
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            ) : (
              <video
                muted
                playsInline
                loop
                autoPlay
                poster={(m as MediaVideo).poster}
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              >
                <source src={(m as MediaVideo).src} type="video/mp4" />
              </video>
            )}
            <div className="pointer-events-none -mt-6 h-6 w-full bg-gradient-to-t from-black/30 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   Rótulos & Ordem
   ========================================================= */
const CATEGORY_LABELS: Record<string, string> = {
  acm: "ACM",
  letra_caixa: "Letra caixa",
  luminoso: "Luminoso",
  painel_impresso: "Painel impresso",
};
const CATEGORIES_ORDER = ["acm", "letra_caixa", "luminoso", "painel_impresso"];

/* =========================================================
   Ícones inline
   ========================================================= */
const IconGrid = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 8v-8h8v8h-8z"
    />
  </svg>
);
const IconUsers = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5S5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5C19 14.17 14.33 13 12 13m8 1c-.29 0-.62.02-.97.05c1.16.84 1.97 1.93 1.97 3.45V20h3v-3.5c0-2.33-4.67-3.5-7-3.5z"
    />
  </svg>
);

/* =========================================================
   Componente principal
   ========================================================= */
export default function Portfolio() {
  const [mode, setMode] = useState<"categoria" | "cliente">("categoria");

  const DEFAULT_W = 1600;
  const DEFAULT_H = 1200;

  const items: Item[] = useMemo(() => {
    return (portfolioRaw as ItemJSON[]).map((d, i) => ({
      id: `${i}-${d.file_name}`,
      category: d.category,
      client: d.client,
      media: {
        type: "image",
        src: `/portfolio/${d.file_name}`,
        alt: `${CATEGORY_LABELS[d.category] ?? d.category} — ${d.client}`,
        w: DEFAULT_W,
        h: DEFAULT_H,
      },
    }));
  }, []);

  const groupsByCategory: Group[] = useMemo(() => {
    const map = new Map<string, Media[]>();
    for (const it of items) {
      if (!map.has(it.category)) map.set(it.category, []);
      map.get(it.category)!.push(it.media);
    }
    const orderedKeys = [
      ...CATEGORIES_ORDER.filter((k) => map.has(k)),
      ...Array.from(map.keys()).filter((k) => !CATEGORIES_ORDER.includes(k)),
    ];
    return orderedKeys.map((key) => ({
      key,
      title: CATEGORY_LABELS[key] ?? key,
      description:
        key === "acm"
          ? "Fachadas em ACM, acabamento premium e durável."
          : key === "letra_caixa"
          ? "Letras caixa para presença de marca com relevo."
          : key === "luminoso"
          ? "Luminosos com alta visibilidade noturna."
          : key === "painel_impresso"
          ? "Painéis impressos para comunicação visual ágil."
          : undefined,
      items: map.get(key)!,
    }));
  }, [items]);

  const groupsByClient: Group[] = useMemo(() => {
    const map = new Map<string, Media[]>();
    for (const it of items) {
      if (!map.has(it.client)) map.set(it.client, []);
      map.get(it.client)!.push(it.media);
    }
    const sorted = Array.from(map.keys()).sort((a, b) =>
      a.localeCompare(b, "pt-BR", { sensitivity: "base" })
    );
    return sorted.map((key) => ({ key, title: key, items: map.get(key)! }));
  }, [items]);

  const currentGroups =
    mode === "categoria" ? groupsByCategory : groupsByClient;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItems, setLightboxItems] = useState<Media[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((groupItems: Media[], idx: number) => {
    setLightboxItems(groupItems);
    setLightboxIndex(idx);
    setLightboxOpen(true);
    document.documentElement.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.documentElement.style.overflow = "";
  }, []);

  const prev = useCallback(() => {
    setLightboxIndex(
      (i) => (i - 1 + lightboxItems.length) % lightboxItems.length
    );
  }, [lightboxItems.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % lightboxItems.length);
  }, [lightboxItems.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, closeLightbox, prev, next]);

  return (
    <section id="portfolio" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
            Trabalhos{" "}
            <span className="text-[--color-brand-yellow]">realizados</span>
          </h2>
        </header>

        {/* Tabs */}
        <div className="mt-6 flex items-center justify-center">
          <div className="inline-flex rounded-full bg-white/5 p-1 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <button
              className={`px-4 py-2 rounded-full text-sm transition flex items-center gap-2 ${
                mode === "categoria"
                  ? "text-black"
                  : "text-white/85 hover:text-white"
              }`}
              style={
                mode === "categoria"
                  ? { backgroundColor: "var(--color-brand-yellow)" }
                  : undefined
              }
              onClick={() => setMode("categoria")}
              aria-pressed={mode === "categoria"}
            >
              <IconGrid /> Categoria
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm transition flex items-center gap-2 ${
                mode === "cliente"
                  ? "text-black"
                  : "text-white/85 hover:text-white"
              }`}
              style={
                mode === "cliente"
                  ? { backgroundColor: "var(--color-brand-yellow)" }
                  : undefined
              }
              onClick={() => setMode("cliente")}
              aria-pressed={mode === "cliente"}
            >
              <IconUsers /> Cliente
            </button>
          </div>
        </div>

        {/* Grupos */}
        <div className="mt-10 space-y-16">
          {currentGroups.map((group) => (
            <section
              key={group.key}
              className="rounded-2xl border border-white/10 from-white/5 to-white/[0.03] p-5 sm:p-6 shadow-[0_6px_30px_-12px_rgba(0,0,0,0.5)]"
            >
              <div className="mb-4 text-center">
                <h3 className="text-xl sm:text-2xl text-white font-medium tracking-tight">
                  {group.title}
                </h3>
                {group.description && (
                  <p className="text-white/70 text-sm mt-1">
                    {group.description}
                  </p>
                )}
              </div>

              <MasonryGallery
                items={group.items}
                onOpen={(idx) => openLightbox(group.items, idx)}
                minColumnWidth={160}
                gap={16}
              />
            </section>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && lightboxItems.length > 0 && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-[92vw] max-h-[86vh] select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const item = lightboxItems[lightboxIndex] as
                | MediaImage
                | MediaVideo;
              if (item.type === "image") {
                return (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.w}
                    height={item.h}
                    className="max-h-[86vh] max-w-[92vw] rounded-2xl object-contain shadow-[0_20px_80px_-20px_rgba(0,0,0,0.7)]"
                    priority
                  />
                );
              }
              return (
                <video
                  controls
                  playsInline
                  poster={(item as MediaVideo).poster}
                  className="max-h-[86vh] max-w-[92vw] rounded-2xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.7)]"
                >
                  <source src={(item as MediaVideo).src} type="video/mp4" />
                </video>
              );
            })()}

            {/* Controles */}
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 p-2 text-white/90"
              aria-label="Anterior"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 p-2 text-white/90"
              aria-label="Próxima"
            >
              ›
            </button>
            <button
              onClick={closeLightbox}
              className="absolute -top-3 -right-3 rounded-full bg-black/70 hover:bg-black/80 border border-white/20 p-2 text-white/90"
              aria-label="Fechar"
              title="Esc para fechar"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
