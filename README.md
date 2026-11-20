# AEGIS — P4 — Campagne de phishing (Gophish)

P4 — **Campagne de phishing éthique avec Gophish** (PFE P13 style AEGIS).

## Objectif

Simuler (en local, autorisé) une campagne de phishing pour mesurer le taux de clics sur une simulation d'emails ciblés — dessous le cadre éthique (emails fictifs du groupe).

## Architecture

```
AEGIS P4 (phishing-gophish)
├── src/
│   ├── phishing_gophish_main.py   # CLI — check_gophish / check_mailhog / launch_campaign / get_results
│   └── generate_report.py         # PDF via reportlab
└── tests/
    └── test_phishing.py           # 7 tests mocks — pass
```

## Fonctions à exécuter — démo à la prof

```bash
python -m src.phishing_gophish_main --json                 # smoke — vérif Gophish (http://127.0.0.1:3333) + MailHog (http://127.0.0.1:8025)
python -m src.phishing_gophish_main --check-only --json    # affiche JSON des statuts
python -m src.generate_report --pdf outputs/rapport-p4.pdf
```

- **Gophish** (local, [github/gophish](https://github.com/gophish/gophish) v0.12) — admin `admin/gophish`.
- **MailHog** ([github/MailHog](https://github.com/mailhog/MailHog)) — SMTP local http://127.0.0.1:1025 + Web UI 8025.
- **Fakes** : page Fake Login, 3 emails du groupe, Webhook API script.

##Install

```bash
pip install -r requirements.txt
```

## Sites

- **GitHub** : https://github.com/LaidiMohammed/aegis-p4-phishing-gophish
- **Vercel** : https://aegis-p4-phishing-gophish.vercel.app

## Éthique

- Campagne local, seulement emails du groupe (test1/test2/test3@localhost) — Smoke et Fake Login — aucune donnée réelle.
- Pas de production —localhost — done.
- Un déploiement Vercel statique (site statique) - disponible.

See `docs/ETHICS.md`.
