// components/Sobre.tsx
"use client";

import { useEffect, useRef, useState } from "react";

function Counter({ end, duration = 2500 }: { end: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const increment = end / (duration / 16); // ~60fps
          const step = () => {
            start += increment;
            if (start < end) {
              setValue(Math.floor(start));
              requestAnimationFrame(step);
            } else {
              setValue(end);
            }
          };
          step();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{value}</span>;
}

export default function Sobre() {
  // ⭐ controle das estrelas (0 -> 5) aparecendo uma a uma
  const [stars, setStars] = useState(0);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = starsRef.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (prefersReduced) {
            setStars(5);
            io.disconnect();
            return;
          }
          let current = 0;
          const tick = () => {
            current += 1;
            setStars(current);
            if (current < 5) {
              setTimeout(tick, 450); // velocidade da aparição (ajuste fino)
            } else {
              io.disconnect();
            }
          };
          tick();
        }
      },
      { threshold: 0.35 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section id="sobre" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        {/* título */}
        <header className="fade-up text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white [text-wrap:balance]">
            Sobre a{" "}
            <span className="text-[--color-brand-yellow]">Jack Designer</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-white/80 max-w-[65ch] mx-auto [text-wrap:pretty]">
            Comunicação visual com acabamento premium em{" "}
            <strong>Mogi Guaçu e região</strong>.
          </p>
        </header>

        {/* grid */}
        <div className="mt-10 grid gap-8 md:grid-cols-2 fade-up">
          {/* texto */}
          <div className="space-y-4 text-white/85 max-w-prose mx-auto md:mx-0">
            <p>
              Atuamos em <strong className="text-white">fachadas em ACM</strong>
              , <strong className="text-white">letras caixa</strong> e{" "}
              <strong className="text-white">letreiros em LED</strong> — unindo
              design, tecnologia e execução de alto padrão.
            </p>
            <p>
              Do projeto à instalação: medidas, 3D de aprovação, fabricação
              precisa e montagem segura no local.
            </p>

            {/* métricas com contador animado */}
            <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                <dt className="text-xs text-white/60">Projetos</dt>
                <dd className="text-lg font-semibold text-white">
                  <Counter end={300} />+
                </dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                <dt className="text-xs text-white/60">Experiência</dt>
                <dd className="text-lg font-semibold text-white">
                  <Counter end={8} />+ anos
                </dd>
              </div>

              {/* ⭐ Avaliação com estrelas amarelas aparecendo uma a uma */}
              <div
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-3"
                ref={starsRef}
              >
                <dt className="text-xs text-white/60">Avaliação</dt>
                <dd className="mt-1 flex items-center justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const active = i < stars;
                    return (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className={[
                          "h-5 w-5 transition-all duration-300",
                          active
                            ? "scale-100 opacity-100"
                            : "scale-75 opacity-20",
                        ].join(" ")}
                        fill={active ? "var(--color-brand-yellow)" : "none"}
                        stroke="var(--color-brand-yellow)"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path d="M12 .587l3.668 7.425 8.2 1.192-5.934 5.782 1.4 8.164L12 18.896l-7.334 3.854 1.4-8.164L.132 9.204l8.2-1.192z" />
                      </svg>
                    );
                  })}
                </dd>
              </div>
            </dl>
          </div>

          {/* bullets */}
          <ul className="grid content-start gap-3 max-w-xl mx-auto md:mx-0">
            {[
              "Projeto • Fabricação • Instalação",
              "Materiais premium (ACM, acrílico, inox)",
              "Iluminação em LED econômica e durável",
              "Atendimento em Mogi Guaçu e região",
            ].map((item) => (
              <li
                key={item}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm sm:text-base text-white/90 transition-all duration-300 hover:border-[--color-brand-yellow]/60 hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(255,217,59,0.25)] active:translate-y-0"
              >
                <span
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[--color-brand-yellow]/15 ring-1 ring-[--color-brand-yellow]/40 transition-all duration-300 group-hover:bg-[--color-brand-yellow]/30 group-hover:scale-110"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 transition-colors duration-300 group-hover:text-[--color-brand-yellow]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      className="text-[--color-brand-yellow]"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="transition-colors duration-300 group-hover:text-white">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* linha sutil de separação */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
