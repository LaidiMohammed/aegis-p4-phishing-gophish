import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "P4 / PHISHING LAB — Campagne éthique Gophish + MailHog",
  description: "P4 — Simulation locale autorisée d'une campagne de phishing (Gophish + MailHog). Taux de clics, 7 tests mocks.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr"><body>{children}</body></html>;
}
