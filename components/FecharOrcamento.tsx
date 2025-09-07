// components/FecharOrcamento.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Phone, CheckCircle2, Shield, Timer, Sparkles } from "lucide-react";
import { track, gtagEvent } from "@/lib/gtag";

const WHATSAPP_NUMBER = "5519996565458"; // número do WhatsApp da Jack Designer
const SERVICES = [
  "Fachada em ACM",
  "Letra Caixa",
  "Letreiro Luminoso",
  "Painel Impresso",
  "Projeto/Arte",
];

type UTM = Partial<{
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
}>;

export default function FecharOrcamento() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); // WhatsApp
  const [service, setService] = useState<string>(SERVICES[0]);
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);
  const [utm, setUtm] = useState<UTM>({});
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Captura UTM da URL para levar para o atendimento e relatórios
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const current: UTM = {};
    (
      [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
      ] as const
    ).forEach((k) => {
      const v = params.get(k);
      if (v) current[k] = v;
    });
    setUtm(current);
  }, []);

  const formattedPhone = useMemo(() => formatBRPhone(phone), [phone]);

  const waMessage = useMemo(() => {
    const lines = [
      `Olá, Jack Designer! Quero um orçamento.`,
      `• Nome: ${name || "-"}`,
      `• WhatsApp: ${formattedPhone || "-"}`,
      `• Serviço: ${service}`,
      message.trim() ? `• Detalhes: ${message.trim()}` : "",
      utmString(utm),
      `— Enviado pelo site jackdesign.com.br`,
    ].filter(Boolean);
    return encodeURIComponent(lines.join("\n"));
  }, [name, formattedPhone, service, message, utm]);

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;
  const telLink = `tel:+${WHATSAPP_NUMBER}`;

  const isValid =
    name.trim().length >= 2 && cleanDigits(phone).length >= 10 && agree;

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);

      if (!isValid) {
        setError(
          "Preencha nome, WhatsApp válido e aceite a política de contato."
        );
        return;
      }

      setSending(true);

      // GA4: lead + contato whatsapp
      track.generateLead({
        form: "fechar_orcamento",
        service,
        ...(utm.utm_source ? { utm_source: utm.utm_source } : {}),
        ...(utm.utm_medium ? { utm_medium: utm.utm_medium } : {}),
        ...(utm.utm_campaign ? { utm_campaign: utm.utm_campaign } : {}),
      });
      track.contactWhatsApp({ location: "fechar_orcamento" });

      // Abre WhatsApp
      window.open(waLink, "_blank", "noopener,noreferrer");
      setSending(false);
    },
    [isValid, service, utm, waLink]
  );

  return (
    <section
      id="orcamento"
      aria-label="Fechar orçamento"
      className="relative mx-auto mt-16 w-full max-w-[1200px] px-4 sm:px-6 lg:px-8"
    >
      {/* linha luminosa superior */}
      <div className="header-line pointer-events-none absolute inset-x-0 -top-4 h-px" />

      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        {/* Carta – Promessa de valor */}
        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,#111,transparent)] p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,.35)]">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-300/20 bg-yellow-300/10 px-3 py-1 text-xs text-[var(--brand-yellow)]">
            <Sparkles className="h-4 w-4" />
            <span>Resposta rápida • Projeto sob medida</span>
          </div>

          <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
            Feche seu orçamento{" "}
            <span className="text-[var(--brand-yellow)]">agora</span>
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Fachadas em ACM, letras caixa e letreiros profissionais em{" "}
            <strong>Mogi Guaçu</strong> e região. Envie seus dados e comece a
            transformar a frente do seu negócio ainda hoje.
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            <Benefit icon={Timer} text="Orçamento em até 72h" />
            <Benefit
              icon={CheckCircle2}
              text="Entrega e instalação profissional"
            />
            <Benefit icon={Shield} text="Materiais premium e garantia" />
          </ul>

          <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/60">
            <span className="rounded-full border border-white/10 px-3 py-1">
              ACM
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1">
              Letra Caixa
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1">
              Luminosos
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1">
              Projeto & Arte
            </span>
          </div>
        </div>

        {/* Formulário – curto e objetivo */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8 backdrop-blur"
        >
          <div className="grid gap-4">
            <Field label="Seu nome" htmlFor="name">
              <input
                id="name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex.: Ana Silva"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 md:px-3.5 md:py-3 outline-none ring-0 placeholder:text-white/30 focus:border-[var(--brand-yellow)]"
              />
            </Field>

            <Field
              label="WhatsApp"
              htmlFor="phone"
              hint="Somente números (incluir DDD)"
            >
              <input
                id="phone"
                name="phone"
                inputMode="numeric"
                value={formattedPhone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(19) 99999-9999"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 md:px-3.5 md:py-3 outline-none ring-0 placeholder:text-white/30 focus:border-[var(--brand-yellow)]"
              />
            </Field>

            <Field label="Serviço de interesse" htmlFor="service">
              <select
                id="service"
                name="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full appearance-none rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 md:px-3.5 md:py-3 outline-none focus:border-[var(--brand-yellow)]"
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Detalhes (opcional)" htmlFor="message">
              <textarea
                id="message"
                name="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ex.: Largura 6m, altura 1,2m, cor preta com destaque dourado…"
                className="w-full resize-y rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 md:px-3.5 md:py-3 outline-none placeholder:text-white/30 focus:border-[var(--brand-yellow)]"
              />
            </Field>

            <label className="mt-1 flex cursor-pointer items-start gap-3 text-xs text-white/70">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1"
                aria-label="Aceito ser contatado"
              />
              <span>
                Autorizo contato por WhatsApp/telefone com base nos dados
                preenchidos. Não compartilhamos suas informações com terceiros.
              </span>
            </label>

            {error && (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            )}

            {/* BOTÕES – versão bonita e responsiva */}
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {/* WhatsApp */}
              <button
                type="submit"
                disabled={sending || !isValid}
                className="group relative inline-flex items-center justify-center gap-2 md:gap-2.5 rounded-2xl px-4 py-3.5 md:px-6 md:py-4 font-semibold tracking-tight text-black bg-gradient-to-b from-[var(--brand-yellow)] to-[var(--brand-gold)] shadow-[0_8px_24px_rgba(201,162,39,.25)] hover:shadow-[0_10px_30px_rgba(201,162,39,.35)] active:scale-[.99] transition will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Pedir orçamento no WhatsApp"
              >
                <span className="inline-flex h-5 w-5 md:h-6 md:w-6 items-center justify-center shrink-0">
                  <WhatsIcon />
                </span>
                <span className="text-base md:text-lg">
                  {sending
                    ? "Abrindo WhatsApp…"
                    : "Pedir orçamento no WhatsApp"}
                </span>
                {/* brilho suave opcional */}
                <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
              </button>

              {/* Telefone */}
              <a
                href={telLink}
                onClick={() =>
                  gtagEvent("contact", {
                    method: "phone",
                    location: "fechar_orcamento",
                  })
                }
                className="inline-flex items-center justify-center gap-2 md:gap-2.5 rounded-2xl border border-white/15 bg-white/[.06] px-4 py-3.5 md:px-6 md:py-4 font-semibold text-white/90 transition hover:bg-white/[.1] hover:border-white/25 active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="Ligar agora"
              >
                <Phone className="h-5 w-5 md:h-6 md:w-6 shrink-0" />
                <span className="text-base md:text-lg">Ligar agora</span>
              </a>
            </div>

            <p className="mt-3 text-center text-xs text-white/60">
              Sem compromisso • Horário comercial (seg–sex)
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ---------- Subcomponentes e helpers ---------- */

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && <span className="text-xs text-white/40">{hint}</span>}
    </div>
  );
}

function Benefit({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}) {
  return (
    <li className="flex items-center gap-3">
      <Icon className="h-5 w-5 text-[var(--brand-yellow)]" />
      <span className="text-white/80">{text}</span>
    </li>
  );
}

/** Ícone WhatsApp em SVG — escala perfeita e sem “bug” de alinhamento */
function WhatsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      className="h-full w-full"
      fill="currentColor"
    >
      <path d="M20.52 3.48A11.89 11.89 0 0 0 12.06 0C5.56.03.3 5.28.32 11.79c0 2.09.55 4.14 1.6 5.95L0 24l6.43-1.86c1.76.96 3.74 1.47 5.75 1.47h.01c6.49 0 11.76-5.26 11.79-11.76.01-3.15-1.22-6.11-3.46-8.37ZM12.19 21.3h-.01a9.38 9.38 0 0 1-4.78-1.31l-.34-.2-3.81 1.11 1.08-3.72-.22-.38A9.37 9.37 0 1 1 21.56 12c-.02 5.17-4.21 9.36-9.37 9.3Z" />
      <path d="M17.31 14.26c-.29-.15-1.71-.84-1.97-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.21-.63.08-.29-.15-1.23-.45-2.34-1.44-.86-.76-1.43-1.7-1.6-1.99-.17-.29 0-.45.13-.59.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.12-.23-.56-.47-.49-.64-.49h-.55c-.19 0-.51.07-.78.36-.26.29-1 1-1 2.43 0 1.43 1.02 2.81 1.16 3 .14.19 2.01 3.2 4.86 4.49.68.29 1.2.46 1.61.59.68.22 1.29.19 1.77.12.54-.08 1.71-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34Z" />
    </svg>
  );
}

function cleanDigits(v: string) {
  return (v || "").replace(/\D+/g, "");
}

function formatBRPhone(v: string) {
  const d = cleanDigits(v).slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function utmString(u: UTM) {
  const entries = Object.entries(u).filter(([, v]) => v);
  if (!entries.length) return "";
  return (
    "\n• Origem: " +
    entries
      .map(([k, v]) => `${k.replace("utm_", "")}=${v as string}`)
      .join(" | ")
  );
}
