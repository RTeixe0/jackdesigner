// components/Footer.tsx
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-10">
      {/* divisor sutil */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-6 text-center space-y-1">
        <p className="text-[11px] text-white/55">
          © {year} Jack Designer — Mogi Guaçu e região. Todos os direitos
          reservados.
        </p>

        <p className="text-[11px] text-white/55">
          Desenvolvido por{" "}
          <a
            href="https://github.com/RTeixe0"
            target="_blank"
            rel="noopener"
            className="font-semibold underline decoration-dotted underline-offset-2 transition-all duration-200 hover:text-[var(--brand-yellow)] hover:drop-shadow-[0_0_6px_var(--brand-yellow)]"
          >
            Renan Teixeira
          </a>
        </p>
      </div>
    </footer>
  );
}
