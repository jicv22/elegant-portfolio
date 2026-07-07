/**
 * Brand palette — single source of truth.
 * Experiment: dark neutrals + warm lights + gold accent.
 * Expand here; wire new tokens in globals.css @theme and consuming components.
 */
export const palette = {
  neutral: {
    950: "#09090b",
    900: "#18181b",
    800: "#27241f",
    700: "#3f3a33",
    600: "#57534e",
    500: "#78716c",
    400: "#a8a29e",
    300: "#d6d3d1",
    200: "#e7e5e4",
    100: "#f5f5f4",
    50: "#fafaf9",
  },
  gold: {
    DEFAULT: "#c9a227",
    strong: "#d4af37",
    muted: "#9a7b1f",
    soft: "rgb(201 162 39 / 14%)",
    glow: "rgb(212 175 55 / 24%)",
    on: "#1c1505",
  },
  surface: {
    base: "#09090b",
    raised: "#141210",
    overlay: "rgb(9 9 11 / 72%)",
  },
  text: {
    primary: "#fafaf9",
    secondary: "#d6d3d1",
    muted: "#a8a29e",
    faint: "#78716c",
  },
  border: {
    DEFAULT: "rgb(255 255 255 / 12%)",
    strong: "rgb(255 255 255 / 22%)",
    gold: "rgb(201 162 39 / 35%)",
  },
  hero: {
    /** Near-black with cool undertone — readable under lighting, not pure black */
    pin: "#0f1733",
    pinPressed: "#d4af37",
    sceneBackground: "#1e2433",
    scrim: "rgb(9 9 11 / 94%)",
    scrimMid: "rgb(9 9 11 / 72%)",
    scrimSoft: "rgb(9 9 11 / 24%)",
  },
  three: {
    sky: "#fafaf9",
    hemisphereGround: "#44403c",
    key: "#fff8eb",
    fill: "#fef3c7",
    rim: "#fde68a",
    accent: "#fafaf9",
    ground: "#e7e5e4",
  },
} as const;

export type Palette = typeof palette;
