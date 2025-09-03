// app/viewport.ts
import type { Viewport } from "next";

/**
 * Como seu site é escuro fixo (globals.css força dark),
 * podemos usar uma única cor aqui.
 */
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};
