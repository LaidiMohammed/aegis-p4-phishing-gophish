"""Tests unitaires — P4 Phishing/Gophish (mocks — sans shell).

- check_gophish : mock requests.get — status 200 → ok True
- check_mailhog : mock requests.get — status 200 → ok True
- get_results : mock requests.get — 200 + 3 results → ok True, clicked
- main : smoke — exit 0
- generate_report : md + pdf
"""
from __future__ import annotations

import sys
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src import phishing_gophish_main as m
from src import generate_report as rep


def fake_get(status=200, text="", url=""):
    return SimpleNamespace(status_code=status, text=text, url=url)


def test_check_gophish_ok():
    with patch.object(m.requests, "get", return_value=fake_get(200)):
        r = m.check_gophish()
    assert r["ok"] is True and r["status"] == 200


def test_check_gophish_error():
    with patch.object(m.requests, "get", side_effect=Exception("refused")):
        r = m.check_gophish()
    assert r["ok"] is False and r["status"] == 0


def test_check_mailhog_ok():
    with patch.object(m.requests, "get", return_value=fake_get(200)):
        r = m.check_mailhog()
    assert r["ok"] is True and r["status"] == 200


def test_get_results_ok():
    rr = fake_get(200)
    rr.json = lambda: [{"status": "Clicked Link"}] * 3
    with patch.object(m.requests, "get", return_value=rr):
        out = m.get_results(42)
    assert out["ok"] is True and out["total"] == 3 and out["clicked"] == 3


def test_launch_campaign_mock():
    rr = fake_get(201)
    rr.json = lambda: {"id": 99}
    with patch.object(m.requests, "post", return_value=rr):
        out = m.launch_campaign({"name": "test"})
    assert out["ok"] is True and out["campaign_id"] == 99


def test_generate_report_produces_files(tmp_path):
    data = {"services": {"gophish": {"ok": True, "status": 200}, "mailhog": {"ok": True, "status": 200}},
            "run_at": "2026-11-21T10:00:00", "campaign_id": 42, "total": 3, "clicked": 3}
    md = rep.build_markdown(data)
    assert "Gophish" in md and "MailHog" in md
    out = tmp_path / "r.pdf"
    rep.build_pdf(md, out)
    assert out.exists() and out.stat().st_size > 400


def test_main_smoke():
    assert m.main([]) == 0


if __name__ == "__main__":
    pytest.main([__file__, "-q"])
