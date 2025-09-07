// types/gtag.d.ts
export {};

declare global {
  /** Assinatura do gtag.js (GA4) com overloads principais */
  type Gtag = {
    (command: "js", date: Date): void;
    (command: "config", targetId: string, config?: Gtag.Config): void;
    (command: "event", action: string, params?: Gtag.EventParams): void;
  };

  namespace Gtag {
    interface Config {
      send_page_view?: boolean;
      // permite chaves extras sem usar `any`
      [key: string]: unknown;
    }

    interface EventParams {
      [key: string]: unknown;
    }
  }

  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}
