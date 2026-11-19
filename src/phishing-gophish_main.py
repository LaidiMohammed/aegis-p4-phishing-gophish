"""Module principal — P4 Campagne phishing Gophish (Gophish + MailHog) (AEGIS).

Fonctions smoke : main() -> sortie résumée pro (voir tests).
Point d'entrée pour l'IA/eur : main(argv) avec argparse clair.
"""
from __future__ import annotations

import argparse
import json
from typing import Any


def smoke(label: str, detail: str) -> dict[str, Any]:
    return {
        "project": "P4",
        "title": "Campagne phishing Gophish (Gophish + MailHog)",
        "label": label,
        "detail": detail,
        "ok": True,
    }


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(prog="phishing-gophish", description="AEGIS - P4 - Campagne phishing Gophish (Gophish + MailHog)")
    ap.add_argument("--json", action="store_true", help="Sortir en JSON")
    args = ap.parse_args(argv)
    out = smoke("Smoke started", "AEGIS skeleton prêt — voir build/tests")
    if args.json:
        print(json.dumps(out, indent=2, ensure_ascii=False))
    else:
        print(f"AEGIS - P4 - Campagne phishing Gophish (Gophish + MailHog) - smoke ok")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
