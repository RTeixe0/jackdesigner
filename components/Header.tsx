"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const WHATSAPP = "5519996565458";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all header-appear",
        "bg-[color-mix(in_srgb,var(--color-background)_80%,transparent)] backdrop-blur-md",
        scrolled ? "py-3 shadow-[0_2px_20px_rgba(0,0,0,.15)]" : "py-7", // ↑ mais alto parado
      ].join(" ")}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Logo desktop / mobile */}
          <Link
            href="#top"
            className="flex items-center"
            aria-label="Ir para o topo"
          >
            {/* Desktop */}
            <Image
              src="/logo-horizontal.png"
              alt="Jack Designer"
              width={340}
              height={80}
              className="hidden md:block h-auto w-[280px] lg:w-[340px] drop-shadow-[0_0_12px_rgba(255,212,59,.25)] transition-transform duration-300 will-change-transform"
              sizes="(min-width:1024px) 340px, (min-width:768px) 280px, 0px"
            />
            {/* Mobile */}
            <Image
              src="/logo-stacked.png"
              alt="Jack Designer"
              width={150}
              height={110}
              className="md:hidden h-auto w-[132px] sm:w-[150px] drop-shadow-[0_0_10px_rgba(255,212,59,.25)]"
              sizes="(max-width:767px) 150px, 0px"
            />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-9 text-[15px] font-medium tracking-wide">
            {[
              ["Sobre", "#sobre"],
              ["Portfólio", "#portfolio"],
              ["Contato", "#contato"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className={[
                  "transition-colors hover:text-[--color-brand-yellow]",
                  "[background-image:linear-gradient(to_right,var(--color-brand-yellow),var(--color-brand-yellow))]",
                  "[background-position:0_100%] [background-repeat:no-repeat]",
                  "[background-size:0%_2px] hover:[background-size:100%_2px]",
                  "transition-[background-size] duration-300 pb-1",
                ].join(" ")}
              >
                {label}
              </a>
            ))}

            <a
              href={`https://wa.me/${WHATSAPP}?text=Olá!%20Quero%20um%20orçamento%20de%20fachada%20em%20Mogi%20Guaçu.`}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "btn-shine inline-flex h-12 items-center rounded-full px-7 font-semibold",
                "bg-[--color-brand-yellow] text-[--color-brand-black]",
                "shadow-[0_0_20px_rgba(255,212,59,.35)] hover:shadow-[0_0_30px_rgba(255,212,59,.55)]",
                "transition-[transform,box-shadow] duration-300 hover:scale-[1.02] active:scale-[0.99]",
              ].join(" ")}
            >
              WhatsApp
            </a>
          </nav>

          {/* Menu mobile */}
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label="Abrir menu"
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-md border border-black/10 dark:border-white/15"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d={open ? "M6 6l12 12M18 6L6 18" : "M3 6h18M3 12h18M3 18h18"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Menu mobile aberto */}
        {open && (
          <div className="md:hidden pb-3 animate-[fadeDown_.3s_ease_both]">
            <nav className="mt-3 flex flex-col gap-3 text-base font-medium">
              {[
                ["Sobre", "#sobre"],
                ["Portfólio", "#portfolio"],
                ["Processo", "#processo"],
                ["Depoimentos", "#depoimentos"],
                ["Contato", "#contato"],
              ].map(([label, href]) => (
                <a key={href} onClick={() => setOpen(false)} href={href}>
                  {label}
                </a>
              ))}
              <a
                href={`https://wa.me/${WHATSAPP}?text=Olá!%20Quero%20um%20orçamento%20de%20fachada%20em%20Mogi%20Guaçu.`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 btn-shine inline-flex h-12 items-center justify-center rounded-full px-6 font-semibold bg-[--color-brand-yellow] text-[--color-brand-black] shadow-[0_0_20px_rgba(255,212,59,.35)]"
              >
                WhatsApp
              </a>
            </nav>
          </div>
        )}
      </div>
      {/* Divisor dourado animado */}
      <div className="pointer-events-none h-[2px] w-full header-line mt-8 shadow-[0_0_12px_rgba(255,212,59,0.45)]" />
    </header>
  );
}
