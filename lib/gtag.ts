// lib/gtag.ts
export const GA_ID = "G-YH3XZBMVL7";

export function gtagEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", action, params);
}

export const track = {
  /** Clique para contato (WhatsApp) */
  contactWhatsApp: (params: { location: string }) =>
    gtagEvent("contact", { method: "whatsapp", ...params }),

  /** Lead gerado (ex.: submit do form final) */
  generateLead: (params?: Record<string, unknown>) =>
    gtagEvent("generate_lead", { value: 1, ...params }),

  /** Clique em item do portfólio (recomendado no GA4: select_item) */
  selectPortfolioItem: (item: {
    item_id: string; // ex.: "14.jpeg"
    item_name: string; // ex.: "Clinica Diegues"
    item_category: string; // ex.: "luminoso"
    location?: string; // "grid" | "lightbox"
  }) =>
    gtagEvent("select_item", {
      item_list_name: "portfolio",
      items: [
        {
          item_id: item.item_id,
          item_name: item.item_name,
          item_category: item.item_category,
          item_brand: "Jack Design",
        },
      ] as Array<Record<string, unknown>>,
      location_id: item.location ?? "grid",
    }),
};
