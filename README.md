# AEGIS — P4 — Campagne phishing Gophish (Gophish + MailHog)

[![Vercel](https://img.shields.io/badge/Vercel-aegis-p4--blue?logo=vercel)](https://aegis-p4-phishing-gophish.vercel.app)
[![Tests](https://img.shields.io/badge/Tests-passing-brightgreen)]

Campagne phishing Gophish (Gophish + MailHog) — PFE P13 style AEGIS (Master 1 Sécurité informatique).

## Infos rapides

| Élément | Valeur |
|---|---|
| **GitHub** | https://github.com/LaidiMohammed/aegis-p4-phishing-gophish |
| **Vercel** | https://aegis-p4-phishing-gophish.vercel.app |
| **Stacks** | gophish, requests |
| **Type** | pse |
| **Ethique** | Labo local, anti-GPU, anti-cloud, stand-alone |

## Install

```bash
pip install -r requirements.txt
make install  # (venv)
```

## Smoke & tests (démo à la prof)

```bash
make smoke   # ou: scripts/run_smoke.sh
make test
```

## Fonctions à exécuter à la démo

Voir [`docs/ETHICS.md`](docs/ETHICS.md), [`docs/SPEC.md`](docs/SPEC.md).
