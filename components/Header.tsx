"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { Share2, Film, User, Layers, Home, Handshake } from "lucide-react";

const WHATSAPP = "5519996565458";
const IG_URL = "https://www.instagram.com/jackdesigner/";

/* Ícones sociais leves (SVG) */
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}
function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20.5 11.5a8.5 8.5 0 0 1-12.1 7.6L4 20l.9-3.9A8.5 8.5 0 1 1 20.5 11.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.7 9.4c.2-.4.4-.4.7-.4h.5c.1 0 .3 0 .4.3.2.6.7 1.5.7 1.6 0 .1 0 .2-.1.3l-.4.5c-.1.1-.2.2 0 .4.2.3.9 1.4 2.1 2.1 1 .6 1.4.5 1.6.4l.6-.3c.1 0 .2 0 .3.1l1 .5c.2.1.2.2.2.3 0 .3-.2 1.1-.7 1.3-.4.2-1 .3-1.7.2-1.4-.2-3.1-1-4.5-2.5-1.4-1.6-2.1-3.1-2.3-4.4-.1-.8 0-1.4.3-1.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* Seções existentes */
const NAV = [
  { label: "Início", href: "#hero", icon: Home },
  { label: "Vídeos", href: "#videos", icon: Film },
  { label: "Sobre", href: "#sobre", icon: User },
  { label: "Portfólio", href: "#portfolio", icon: Layers },
  { label: "Orçamento", href: "#orcamento", icon: Handshake },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [collapseMobileNav, setCollapseMobileNav] = useState(false);

  // sombra/altura do header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const goingDown = y > last;
        if (y > 80 && goingDown) setCollapseMobileNav(true);
        if (!goingDown) setCollapseMobileNav(false);
        last = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const smoothToTop = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: "Jack Designer — Fachadas, ACM e letreiros",
      text: "Conheça a Jack Designer em Mogi Guaçu. Orçamentos rápidos!",
      url:
        typeof window !== "undefined"
          ? window.location.href
          : "https://www.jackdesign.com.br/",
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copiado! ✅");
      }
    } catch {}
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all header-appear",
        "bg-[color-mix(in_srgb,var(--color-background)_78%,transparent)] backdrop-blur-md",
        "shadow-[0_2px_20px_rgba(0,0,0,.15)]",
        scrolled ? "py-[clamp(6px,1.2vh,14px)]" : "py-[clamp(10px,1.8vh,18px)]",
      ].join(" ")}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Logo central — clique rola pro topo */}
        <div className="flex items-center justify-center">
          <a
            href="#top"
            aria-label="Ir para o topo"
            onClick={smoothToTop}
            className="block"
          >
            <Image
              src="/logo-horizontal.png"
              alt="Jack Designer"
              width={360}
              height={90}
              priority
              className="h-auto w-[clamp(170px,22vw,320px)] md:w-[clamp(220px,20vw,340px)] lg:w-[clamp(240px,18vw,360px)]
                         drop-shadow-[0_0_10px_rgba(255,212,59,.22)] transition-transform duration-300 will-change-transform hover:scale-[1.01] active:scale-[0.99]"
              sizes="(min-width:1024px) 360px, (min-width:768px) 320px, (min-width:640px) 260px, 200px"
            />
          </a>
        </div>

        {/* Ícones sociais (sem texto) */}
        <div className="mt-[clamp(6px,1vh,10px)] flex justify-center gap-2 md:gap-3">
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
            className="group inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full ring-1 ring-white/10 hover:ring-white/20 hover:bg-white/5 transition hover:shadow-[0_0_14px_rgba(255,212,59,0.22)]"
          >
            <InstagramIcon className="size-4 sm:size-5 text-white/90 group-hover:text-[--color-brand-yellow]" />
            <span className="sr-only">Instagram</span>
          </a>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
              "Olá! Quero um orçamento de fachada/ACM em Mogi Guaçu."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            title="WhatsApp"
            className="group inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full ring-1 ring-white/10 hover:ring-white/20 hover:bg-white/5 transition hover:shadow-[0_0_14px_rgba(255,212,59,0.22)]"
          >
            <WhatsAppIcon className="size-4 sm:size-5 text-white/90 group-hover:text-[--color-brand-yellow]" />
            <span className="sr-only">WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={handleShare}
            aria-label="Compartilhar"
            title="Compartilhar"
            className="group inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full ring-1 ring-white/10 hover:ring-white/20 hover:bg-white/5 transition hover:shadow-[0_0_14px_rgba(255,212,59,0.22)]"
          >
            <Share2 className="size-4 sm:size-5 text-white/90 group-hover:text-[--color-brand-yellow]" />
            <span className="sr-only">Compartilhar</span>
          </button>
        </div>

        {/* NAV DESKTOP — ícone + texto */}
        <nav
          className="hidden md:flex justify-center gap-1.5 mt-[clamp(6px,1vh,10px)]"
          aria-label="Seções do site"
        >
          {NAV.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className="group inline-flex items-center justify-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold ring-1 ring-white/10 hover:ring-white/20 hover:bg-white/5 transition"
            >
              <Icon className="size-4 text-white/80 group-hover:text-[--color-brand-yellow]" />
              <span className="text-white/90 group-hover:text-[--color-brand-yellow]">
                {label}
              </span>
            </a>
          ))}
        </nav>

        {/* NAV MOBILE — com texto sempre visível + recolhe suave */}
        <nav
          aria-label="Seções (mobile)"
          className={[
            "md:hidden mt-[clamp(6px,1vh,10px)] px-2",
            "overflow-hidden will-change-[max-height,opacity,transform]",
            "transition-[max-height,opacity,transform] duration-500 ease-[cubic-bezier(.22,.61,.36,1)]",
            collapseMobileNav
              ? "max-h-0 opacity-0 -translate-y-2"
              : "max-h-[320px] opacity-100 translate-y-0",
          ].join(" ")}
        >
          <ul className="flex flex-wrap mt-2 mb-2 justify-center gap-2">
            {NAV.map(({ href, label, icon: Icon }) => (
              <li
                key={href}
                className="basis-[48%] sm:basis-[31%] flex justify-center"
              >
                <a
                  href={href}
                  className="group inline-flex w-full items-center justify-center gap-1.5 rounded-full
                     ring-1 ring-white/10 hover:ring-white/20 hover:bg-white/5 transition
                     h-8 sm:h-9 px-2 sm:px-3
                     text-[clamp(11px,3.2vw,13px)] font-semibold"
                >
                  <Icon className="size-4 text-white/85 group-hover:text-[--color-brand-yellow]" />
                  <span className="text-white/90 group-hover:text-[--color-brand-yellow]">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Linha dourada fininha */}
      <div className="pointer-events-none h-px w-full header-line mt-[clamp(6px,1vh,10px)] shadow-[0_0_10px_rgba(255,212,59,0.35)]" />
    </header>
  );
}
