function hashStr(s: string): number { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); }
export function checkServices(seedStr: string = "gophish") {
  const seed = hashStr(seedStr);
  return {
    project: "P4",
    gophish: { service: "gophish", status: 200, ok: true, body_len: 1200 + (seed % 500) },
    mailhog: { service: "mailhog", status: 200, ok: true, body_len: 800 + (seed % 300) },
    method: "Vérification locale déterministe — pas d'appel réseau",
  };
}
export function launchCampaign(campaignName: string) {
  const seed = hashStr(campaignName);
  return { project: "P4", ok: true, campaign_id: seed % 10000, status: 201, name: campaignName, method: "Campagne locale simulée" };
}