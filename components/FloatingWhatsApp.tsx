"use client";

import React from "react";

type Props = {
  phone?: string;
  message?: string;
};

const DEFAULT_PHONE = "5519996565458";
const DEFAULT_MESSAGE =
  "Olá! Vim pelo site da Jack Designer e gostaria de um orçamento para letreiros e fachadas. Pode me ajudar?";

export default function FloatingWhatsApp({
  phone = DEFAULT_PHONE,
  message = DEFAULT_MESSAGE,
}: Props) {
  const href = React.useMemo(() => {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encoded}`;
  }, [phone, message]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed z-50 bottom-5 right-5 md:bottom-6 md:right-6 focus:outline-none"
    >
      <span
        className="
          relative flex items-center justify-center
          h-14 w-14 md:h-[3.5rem] md:w-[3.5rem]
          rounded-full
          shadow-[0_6px_14px_rgba(0,0,0,0.55),inset_0_2px_3px_rgba(255,255,255,0.25)]
          transition-transform duration-200
          hover:scale-105 active:scale-95
        "
        style={{
          background:
            "radial-gradient(circle at 30% 30%, var(--brand-yellow) 0%, var(--brand-gold) 95%)",
          border: "1px solid rgba(0,0,0,0.25)",
        }}
      >
        {/* Brilho superior */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.25), rgba(255,255,255,0) 60%)",
          }}
        />
        {/* Ícone WhatsApp */}
        <svg
          aria-hidden
          viewBox="0 0 32 32"
          className="h-7 w-7 text-[var(--brand-black)]"
          fill="currentColor"
        >
          <path d="M19.11 17.22c-.27-.14-1.62-.79-1.87-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.13-.41-2.16-1.31-.8-.71-1.33-1.58-1.49-1.85-.16-.27-.02-.41.12-.54.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.46-.16 0-.34-.02-.52-.02-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.36.99 2.67 1.13 2.85.14.18 1.95 2.98 4.74 4.17.66.28 1.17.45 1.57.58.66.21 1.26.18 1.73.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.52-.32zM16 3C8.82 3 3 8.69 3 15.74c0 2.52.79 4.86 2.15 6.78L4 29l6.65-1.74c1.85 1.02 3.98 1.6 6.35 1.6 7.18 0 13-5.69 13-12.74S23.18 3 16 3zm0 22.93c-2.15 0-4.15-.61-5.84-1.65l-.42-.25-3.89 1.02 1.04-3.77-.27-.39a9.91 9.91 0 0 1-1.58-5.54C5.04 9.53 10 4.9 16 4.9c5.99 0 10.96 4.63 10.96 10.35 0 5.72-4.97 10.35-10.96 10.35z" />
        </svg>
      </span>
    </a>
  );
}
