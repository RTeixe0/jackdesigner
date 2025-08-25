"use client";

import React from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Voltar ao topo"
      className={`
        fixed z-50 right-5 md:right-6 bottom-[5.5rem] md:bottom-[6.5rem]
        h-14 w-14 md:h-[3.5rem] md:w-[3.5rem]
        rounded-full flex items-center justify-center
        shadow-[0_6px_14px_rgba(0,0,0,0.55),inset_0_2px_3px_rgba(255,255,255,0.25)]
        transition-all duration-200
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none"
        }
      `}
      style={{
        background:
          "radial-gradient(circle at 30% 30%, var(--brand-black) 0%, #1a1a1a 95%)",
        border: "1px solid var(--brand-yellow)",
      }}
    >
      {/* Brilho topo */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0) 60%)",
        }}
      />
      {/* seta */}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-7 w-7"
        fill="none"
        stroke="url(#metalYellow)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <linearGradient id="metalYellow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--brand-yellow)" />
            <stop offset="50%" stopColor="var(--brand-gold)" />
            <stop offset="100%" stopColor="var(--brand-yellow)" />
          </linearGradient>
        </defs>
        <path d="M6 12l6-6 6 6" />
      </svg>
    </button>
  );
}
