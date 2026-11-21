"use client";
import { useState } from "react";

interface Report {
  project: string;
  gophish: { service: string; status: number; ok: boolean; body_len: number; error?: string };
  mailhog: { service: string; status: number; ok: boolean; body_len: number; error?: string };
  method: string;
}

export default function Console() {
  const [gophishUrl, setGophishUrl] = useState("http://127.0.0.1:3333");
  const [mailhogUrl, setMailhogUrl] = useState("http://127.0.0.1:8025");
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);

  async function launch() {
    setLoading(true); setReport(null);
    try {
      const res = await fetch("/api/services", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gophishUrl, mailhogUrl }),
      });
      setReport(await res.json());
    } catch { setReport(null); } finally { setLoading(false); }
  }

  return (
    <div className="bracket cut-card scanlines overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-700/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-signal" /><span className="h-2.5 w-2.5 rounded-full bg-amber" /><span className="h-2.5 w-2.5 rounded-full bg-cyan" />
          <span className="ml-3 font-mono text-xs text-mist">POST /api/services — vérification HTTP réelle</span>
        </div>
        <span className="tag text-slate-500">P4 engine</span>
      </div>
      <div className="p-5">
        <label className="tag mb-2 block text-cyan">URL Gophish</label>
        <input value={gophishUrl} onChange={(e) => setGophishUrl(e.target.value)}
          className="w-full border border-slate-700 bg-black/40 p-3 font-mono text-[12px] text-slate-200 outline-none focus:border-cyan" />
        <label className="tag mb-2 mt-3 block text-cyan">URL MailHog</label>
        <input value={mailhogUrl} onChange={(e) => setMailhogUrl(e.target.value)}
          className="w-full border border-slate-700 bg-black/40 p-3 font-mono text-[12px] text-slate-200 outline-none focus:border-cyan" />

        <button onClick={launch} disabled={loading}
          className="mt-5 w-full bg-signal px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-ink disabled:opacity-50"
          style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}>
          {loading ? "Vérification…" : "▶ Vérifier les services"}
        </button>

        {report && (
          <div className="mt-5 border-t border-slate-700/50 pt-4 font-mono text-[11px]">
            {[report.gophish, report.mailhog].map((s) => (
              <div key={s.service} className={`mb-1 flex flex-wrap items-center gap-x-3 border-l-2 px-3 py-1.5 ${s.ok ? "border-emerald-400 bg-emerald-500/5" : "border-signal bg-signal/5"}`}>
                <span className="text-slate-300">{s.service}</span>
                <span className={s.ok ? "text-emerald-400" : "text-signal"}>{s.ok ? "OK" : "INJOIGNABLE"}</span>
                <span className="text-slate-500">HTTP {s.status}</span>
                {s.error && <span className="text-slate-500">{s.error}</span>}
              </div>
            ))}
            <p className="mt-3 text-[10px] text-slate-600">
              Note : Gophish/MailHog sont des services <b className="text-slate-400">locaux</b>. Depuis le cloud Vercel,
              127.0.0.1 désigne le serveur Vercel, pas votre machine — d'où « injoignable » si rien n'y tourne.
              Lancez-les localement et utilisez une URL publique (tunnel) pour un test réel.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
