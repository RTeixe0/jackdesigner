// components/Sobre.tsx
export default function Sobre() {
  return (
    <section id="sobre" className="relative py-20">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        {/* título */}
        <header className="fade-up text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">
            Sobre a{" "}
            <span className="text-[--color-brand-yellow]">Jack Designer</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/70">
            Comunicação visual com acabamento premium para marcas em{" "}
            <strong className="text-white">Mogi Guaçu</strong>.
          </p>
        </header>

        {/* grid */}
        <div className="mt-10 grid gap-8 md:grid-cols-2 fade-up">
          {/* texto curto e direto (SEO) */}
          <div className="space-y-4 text-white/85">
            <p>
              Atuamos em <strong className="text-white">fachadas em ACM</strong>
              , <strong className="text-white">letras caixa</strong> e{" "}
              <strong className="text-white">luminosos em LED</strong>, unindo
              design e execução para resultados duráveis e elegantes.
            </p>
            <p>
              Do projeto à instalação, nossa equipe cuida de cada detalhe:
              medidas, 3D de aprovação, fabricação precisa e montagem segura no
              local — tudo com prazos claros.
            </p>
            <p>
              Se você busca uma fachada que valorize sua vitrine e reforce sua
              marca, a gente entrega.
            </p>
          </div>

          {/* bullets minimalistas */}
          <ul className="grid content-start gap-3">
            {[
              "Projeto + Fabricação + Instalação",
              "Materiais premium (ACM, acrílico, inox)",
              "Iluminação em LED econômica e durável",
              "Atendimento local em Mogi Guaçu e região",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90"
              >
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[--color-brand-yellow] shadow-[0_0_10px_rgba(255,212,59,.5)]" />
                {item}
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
