// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://jackdesign.com.br/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    // Quando novas páginas existirem, adicione aqui
    // { url: "https://jackdesign.com.br/sobre", lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];
}
