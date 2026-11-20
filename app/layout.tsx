import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
const displayFont = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-display", display: "swap" });
const monoFont = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-mono", display: "swap" });
import "./globals.css";
export const metadata: Metadata = {
  title: "P4 / PHISHING LAB — Campagne éthique Gophish + MailHog",
  description: "P4 — Simulation locale autorisée d'une campagne de phishing (Gophish + MailHog). Taux de clics, 7 tests mocks.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr" className={`${displayFont.variable} ${monoFont.variable}`}><body>{children}</body></html>;
}
