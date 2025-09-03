// app/image-sitemap.xml/route.ts
import { NextResponse } from "next/server";
import portfolio from "../../data/portfolio.json";

export const dynamic = "force-static";

const SITE = "https://jackdesign.com.br";

/** Tipagem do JSON do portfólio */
type PortfolioItem = {
  file_name: string;
  category?:
    | "acm"
    | "letra_caixa"
    | "luminoso"
    | "painel_impresso"
    | string
    | null;
  client?: string | null;
  ordem?: number | null;
};

/** Tradução de categorias para títulos mais amigáveis */
const CATEGORY_LABEL: Record<string, string> = {
  acm: "Fachada em ACM",
  letra_caixa: "Letras caixa",
  luminoso: "Luminoso",
  painel_impresso: "Painel impresso",
};

/** Itens fixos do site (opcional, pode remover se quiser só o portfólio) */
const staticImages = [
  {
    loc: `${SITE}/hero1.jpg`,
    title: "Letreiro luminoso",
    caption: "Projeto de letreiro luminoso — Jack Designer",
  },
  {
    loc: `${SITE}/hero2.jpg`,
    title: "Iluminação LED",
    caption: "Exemplo de aplicação com LED",
  },
  {
    loc: `${SITE}/hero3.jpg`,
    title: "Fachada em ACM",
    caption: "Fachada em ACM — execução premium",
  },
  {
    loc: `${SITE}/hero4.jpg`,
    title: "Faixa e banner",
    caption: "Faixa promocional impressa — comunicação visual",
  },
  {
    loc: `${SITE}/logo-horizontal.png`,
    title: "Logotipo Jack Designer",
    caption: "Marca oficial Jack Designer",
  },
];

/** Converte o portfolio.json em imagens para o sitemap */
function portfolioToImages() {
  const items = portfolio as PortfolioItem[];

  return items.map((item) => {
    const loc = `${SITE}/portfolio/${item.file_name}`;
    const label = CATEGORY_LABEL[item.category ?? ""] ?? "Portfólio";
    const client = item.client ? ` — ${item.client}` : "";
    const title = `${label} | Jack Designer`;
    const caption = `${label}${client}`;
    return { loc, title, caption };
  });
}

/** Deduplica por URL para evitar itens repetidos */
function dedupeByLoc<T extends { loc: string }>(arr: T[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const it of arr) {
    if (!seen.has(it.loc)) {
      seen.add(it.loc);
      out.push(it);
    }
  }
  return out;
}

function buildXml() {
  const dynamicImages = portfolioToImages();
  const all = dedupeByLoc([...staticImages, ...dynamicImages]);
  const lastmod = new Date().toISOString();

  const imagesXml = all
    .map(
      (img) => `
    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title><![CDATA[${img.title}]]></image:title>
      <image:caption><![CDATA[${img.caption}]]></image:caption>
    </image:image>`
    )
    .join("");

  // Como o site (por enquanto) tem página única, colocamos todas as imagens dentro da URL da home
  // (o padrão do Google permite até 1000 <image:image> por <url>).
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE}/</loc>
    ${imagesXml}
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;
}

export async function GET() {
  const xml = buildXml();
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}
