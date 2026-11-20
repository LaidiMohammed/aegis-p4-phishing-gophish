"""Module principal — P4 Campagne de phishing éthique (Gophish — AEGIS).

Fonctions :
  - check_gophish(url=http://127.0.0.1:3333, timeout) -> HTTP status (verificationadmin)
  - check_mailhog(url=http://127.0.0.1:8025, timeout) -> HTTP status
  - launch_campaign(campaign) -> id (via Gophish API)
  - get_results(campaign_id) -> list de résultats Gophish
  - main() -> summary + JSON

Où la usage est accepté (P4, éthique stand-alone) :
  - Campagne local sur emails du groupe (emails fictifs — par ex test1/test2/test3@localhost).
  - Localhost uniquement (no Internet during demo).
"""
from __future__ import annotations

import argparse
import json
import time
from typing import Any

import requests

USER_AGENT = "aegis-p4-phishing-gophish/1.0.0 (+https://aegis-p4-phishing-gophish.vercel.app)"
GOPHISH_URL = "http://127.0.0.1:3333"
MAILHOG_URL = "http://127.0.0.1:8025"
DEFAULT_API_KEY = "e9cfc4b3-b7c3-4a1b-8a01-7f1a4c5e1a23"  # sample — caractères et arbitraires


def check_gophish(url: str = GOPHISH_URL, timeout: float = 5.0) -> dict[str, Any]:
    """Vérifie que Gophish est accessible (GET /api/settings)."""
    try:
        r = requests.get(f"{url}/api/settings", timeout=timeout, headers={"User-Agent": USER_AGENT})
        return {"service": "gophish", "status": r.status_code, "ok": r.status_code in (200, 404),
                "body_len": len(r.text)}
    except Exception as e:  # noqa: BLE001
        return {"service": "gophish", "status": 0, "ok": False, "error": str(e)}


def check_mailhog(url: str = MAILHOG_URL, timeout: float = 5.0) -> dict[str, Any]:
    """Vérifie que MailHog est accessible (GET /)."""
    try:
        r = requests.get(url, timeout=timeout, headers={"User-Agent": USER_AGENT})
        return {"service": "mailhog", "status": r.status_code, "ok": r.status_code == 200,
                "body_len": len(r.text)}
    except Exception as e:  # noqa: BLE001
        return {"service": "mailhog", "status": 0, "ok": False, "error": str(e)}


def launch_campaign(campaign: dict[str, Any], api_key: str = DEFAULT_API_KEY, gophish_url: str = GOPHISH_URL, timeout: float = 10.0) -> dict[str, Any]:
    """POST /api/campaigns/ — retourne campaign_id (documenté dans demo) : ids soit affichés sur l'API (Gophish API)."""
    try:
        headers = {"User-Agent": USER_AGENT, "Content-Type": "application/json", "Authorization": f"Bearer {api_key}"}
        r = requests.post(f"{gophish_url}/api/campaigns/", json=campaign, timeout=timeout, headers=headers)
        if r.status_code == 201:
            return {"ok": True, "campaign_id": r.json().get("id"), "status": r.status_code}
        return {"ok": False, "status": r.status_code, "error": r.text[:200] if r.text else None}
    except Exception as e:  # noqa: BLE001
        return {"ok": False, "status": 0, "error": str(e)}


def get_results(campaign_id: int, api_key: str = DEFAULT_API_KEY, gophish_url: str = GOPHISH_URL, timeout: float = 10.0) -> dict[str, Any]:
    """GET /api/campaigns/{id}/results — résumé : clics + nb total (ajout élect)."""
    try:
        headers = {"User-Agent": USER_AGENT, "Authorization": f"Bearer {api_key}"}
        r = requests.get(f"{gophish_url}/api/campaigns/{campaign_id}/results", timeout=timeout, headers=headers)
        if r.status_code == 200:
            results = r.json()
            total = len(results)
            clicked = sum(1 for x in results if x.get("status") == "Clicked Link")
            return {"ok": True, "total": total, "clicked": clicked, "campaign_id": campaign_id,
                    "results": results[:50]}
        return {"ok": False, "status": r.status_code, "error": None}
    except Exception as e:  # noqa: BLE001
        return {"ok": False, "status": 0, "error": str(e)}


def check_services(timeout: float = 5.0) -> dict[str, Any]:
    return {"gophish": check_gophish(timeout=timeout), "mailhog": check_mailhog(timeout=timeout)}


def _setup_utf8_stdout() -> None:
    import sys
    if hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        except Exception:  # noqa: BLE001
            pass

def main(argv: list[str] | None = None) -> int:
    _setup_utf8_stdout()
    ap = argparse.ArgumentParser(prog="phishing_gophish", description="AEGIS — P4 — Campagne de phishing (Gophish)")
    ap.add_argument("--check-only", action="store_true", help="Vérifier l'accès aux services Gophish + MailHog")
    ap.add_argument("--json", action="store_true", help="Sortir en JSON")
    args = ap.parse_args(argv)
    out = check_services()
    if args.json:
        print(json.dumps(out, indent=2, ensure_ascii=False))
    else:
        print(f"[CHECK] Gophish: ok={out['gophish']['ok']} (HTTP {out['gophish']['status']})")
        print(f"[CHECK] MailHog: ok={out['mailhog']['ok']} (HTTP {out['mailhog']['status']})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
