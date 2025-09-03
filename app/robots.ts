// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    host: "https://jackdesign.com.br",
    sitemap: [
      "https://jackdesign.com.br/sitemap.xml",
      "https://jackdesign.com.br/image-sitemap.xml",
    ],
  };
}
