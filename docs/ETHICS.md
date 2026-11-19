# ETHICS — P4 — Campagne phishing Gophish (Gophish + MailHog) (AEGIS)

Engagements éthiques du projet — stand-alone, labo local, GPU refused, anti-cloud.

- **Cible** : [AEGIS Campagne phishing Gophish (Gophish + MailHog)](https://github.com/LaidiMohammed/aegis-p4-phishing-gophish)
- **Périmètre** : [AEGIS Campagne phishing Gophish (Gophish + MailHog)](https://aegis-p4-phishing-gophish.vercel.app) — smoke + fonctions CLI.
- **GPU refused** : implementation uniquement CPU/pure Python.
- **Données locales** : sources acceptées : labo local (localhost, Juice Shop, DVWA, etc.).
- **Smoke au prof** : cmds à exécuter — voir README/scripts/run_smoke.sh.
- **Smoke clé de validation** : voir `smoke()` dans `src/phishing_gophish_main.py` — doit retourner `{"ok": true, ...}`.
- **Site statique Vercel** : disponible pour la démo statique (smoke uniquement).

See SPEC.md (avec use cases + tableaux attendus).
