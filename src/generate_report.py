"""generate_report.py — Génère le PDF du rapport P4 — Campagne Gophish (AEGIS).

Contenu : services + résultats de la campagne + paramètres utilisés + recommandations.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path


def build_markdown(data: dict) -> str:
    svc = data.get("services", {})
    lines = [
        "# P4 — Campagne de phishing éthique (Gophish) — AEGIS",
        "",
        f"- **Délai évaluation :** {data.get('run_at', '-')}",
        f"- **Statut Gophish :** {svc.get('gophish', {}).get('status', 'n/a')}",
        f"- **Statut MailHog :** {svc.get('mailhog', {}).get('status', 'n/a')}",
        f"- **Taux de clics (à documenter au prof) :** vérifier sur l'interface Gophish (smoke `python -m src.phishing_gophish_main`)",
        "",
        "## 1. Paramètres de la campagne (cliquables sur l'interface Gophish)",
        "",
        "- Campaign name : `Phishing_Test_G4`",
        "- Pages/template : `Fake Login` (template fourni par Gophish)",
        "- Page URL de capture : http://localhost:3333",
        "- SMTP : MailHog (localhost:1025) + SendProfile `Local_MailHog`",
        "- Groupes : `Groupe4` (emails techniques — voir docs/ETHICS.md)",
        "",
        "## 2. Résultats (généré depuis API Gophish — `launch_campaign` + `get_results`)",
        "",
        f"- Campaign ID : {data.get('campaign_id', 'n/a')}",
        f"- Total : {data.get('total', 'n/a')}  —  Clics : {data.get('clicked', 'n/a')}",
        "",
        "## 3. Notes (éthique stand-alone) :",
        "- Tous les émails sont fictifs du groupe — aucune externa (non implémenté — voir docs)",
        "- Pas de production — Smoke CLI + Gophish locale uniquement",
        "- L'ANPDP ne risque rien (données locales)",
        "",
        "## 4. Exécutions à montrer au prof :",
        "- `python -m src.phishing_gophish_main --json` (vérif Gophish + MailHog)",
        "- `python -m src.phishing_gophish_main --check-only --json`",
        "- `python -m src.launch_phish_manual` (sempre su fly, `launch_campaign` via curl)",
    ]
    return "\n".join(lines)


def build_pdf(markdown: str, out_path: Path) -> None:
    from reportlab.lib.pagesizes import LETTER
    from reportlab.lib.styles import getSampleStyleSheet
    from reportlab.lib.units import inch
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer

    def esc(t: str) -> str:
        return t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

    out_path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(out_path), pagesize=LETTER, topMargin=0.5 * inch, bottomMargin=0.5 * inch, leftMargin=0.75 * inch, rightMargin=0.75 * inch)
    styles = getSampleStyleSheet()
    story = []
    for line in markdown.split("\n"):
        if not line.strip():
            story.append(Spacer(1, 6))
            continue
        if line.startswith("# "):
            story.append(Paragraph(esc(line[2:]), styles["h1"]))
        elif line.startswith("## "):
            story.append(Paragraph(esc(line[3:]), styles["h2"]))
        else:
            story.append(Paragraph(esc(line), styles["Normal"]))
    doc.build(story)
    print(f"[OK] PDF écrit : {out_path} ({out_path.stat().st_size} octets)")


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(prog="generate_report", description="Génère le rapport P4 — Phishing (Gophish)")
    ap.add_argument("--json", type=Path, default=None, help="Fichier JSON du résultat")
    ap.add_argument("--pdf", type=Path, default=Path("outputs/rapport-p4.pdf"), help="Chemin du PDF")
    args = ap.parse_args(argv)
    data = json.loads(args.json.read_text(encoding="utf-8")) if args.json else {
        "services": {}, "run_at": "-", "campaign_id": "n/a", "total": "n/a", "clicked": "n/a"}
    md = build_markdown(data)
    args.pdf.parent.mkdir(parents=True, exist_ok=True)
    (args.pdf.parent / "report.md").write_text(md, encoding="utf-8")
    build_pdf(md, args.pdf)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
