// components/Footer.tsx
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-10">
      {/* divisor sutil */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-6 text-center">
        <p className="text-[11px] text-white/55">
          © {year} Jack Designer — Mogi Guaçu e região. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
