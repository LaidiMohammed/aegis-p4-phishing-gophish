/**
 * P4 — Vérification RÉELLE des services Gophish / MailHog.
 * Effectue de vraies requêtes HTTP vers les URLs fournies.
 */

async function check(url: string, timeoutMs = 5000): Promise<{ service: string; status: number; ok: boolean; body_len: number; error?: string }> {
  const name = url.includes("3333") ? "gophish" : url.includes("8025") ? "mailhog" : "service";
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(timeoutMs), headers: { "User-Agent": "aegis-p4-check/1.0" } });
    const text = await r.text();
    return { service: name, status: r.status, ok: r.status === 200, body_len: text.length };
  } catch (e: any) {
    return { service: name, status: 0, ok: false, body_len: 0, error: e?.message || "connexion impossible" };
  }
}

export async function checkServices(body: { gophishUrl?: string; mailhogUrl?: string; seed?: string }) {
  const gophishUrl = body.gophishUrl || "http://127.0.0.1:3333";
  const mailhogUrl = body.mailhogUrl || "http://127.0.0.1:8025";
  const [gophish, mailhog] = await Promise.all([check(gophishUrl), check(mailhogUrl)]);
  return {
    project: "P4",
    gophish,
    mailhog,
    method: "Vérification HTTP RÉELLE — les services doivent être accessibles depuis l'extérieur",
  };
}

export async function launchCampaign(campaignName: string, gophishUrl = "http://127.0.0.1:3333") {
  try {
    const r = await fetch(gophishUrl + "/api/campaigns/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: campaignName }),
      signal: AbortSignal.timeout(5000),
    });
    return { project: "P4", ok: r.status === 201, status: r.status, name: campaignName };
  } catch (e: any) {
    return { project: "P4", ok: false, status: 0, error: e?.message };
  }
}
