import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#eef2f7",
        brand: "#2563eb",
        brand2: "#0f172a",
        warn: "#dc2626",
        line: "#dbe3ee",
      },
      fontFamily: {
        display: ["var(--font-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "Consolas", "monospace"],
      },
      boxShadow: { mail: "0 18px 50px rgba(15,23,42,.12)" },
    },
  },
  plugins: [],
};
export default config;
