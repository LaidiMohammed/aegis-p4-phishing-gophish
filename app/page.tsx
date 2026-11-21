import Console from "@/components/Console";
import Reveal from "@/components/Reveal";

const FUNCS = [
  ["check_gophish", "GET /api/settings — disponibilité Gophish (:3333)"],
  ["check_mailhog", "GET / — disponibilité MailHog (:8025)"],
  ["launch_campaign", "POST /api/campaigns/ — campagne fictive (id retourné)"],
  ["get_results", "GET /api/campaigns/{id}/results — clics + total"],
];

export default function Page() {
  return (
    <main className="min-h-screen bg-canvas">
      <nav className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand font-mono text-xs font-bold text-white">P4</span>
            <span className="coord text-slate-600">PHISHING LAB · GOPHISH + MAILHOG</span>
          </a>
          <div className="hidden gap-7 md:flex">
            {[["#sim","Simulation"],["#fonctions","Fonctions"],["#demo","Démo"],["#ethique","Éthique"]].map(([h,l])=><a key={h} href={h} className="coord text-slate-500 hover:text-brand">{l}</a>)}
          </div>
          <a href="https://github.com/LaidiMohammed/aegis-p4-phishing-gophish" target="_blank" rel="noreferrer" className="rounded-lg border border-line px-3 py-1.5 font-mono text-[11px] hover:border-brand hover:text-brand">GitHub ↗</a>
        </div>
      </nav>

      <section id="top" className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-20">
        <div>
          <Reveal><div className="mb-5 flex items-center gap-3"><span className="h-px w-12 bg-brand"/><span className="coord text-brand">Fiche technique · P4</span></div></Reveal>
          <Reveal delay={70}><h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">Campagne de<br/><span className="text-brand">phishing</span><br/>éthique</h1></Reveal>
          <Reveal delay={140}><p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600">Simulation <b className="text-slate-900">locale et autorisée</b> d'une campagne de phishing pour mesurer le taux de clics sur des emails fictifs du groupe.</p></Reveal>
          <Reveal delay={210}><div className="mt-8 flex flex-wrap gap-3"><a href="#sim" className="rounded-lg bg-brand px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-brand2">Voir la simulation ↓</a><a href="#fonctions" className="rounded-lg border border-line px-6 py-3 text-xs font-semibold uppercase tracking-widest text-slate-600 hover:border-brand">Les fonctions</a></div></Reveal>
          <Reveal delay={280}><div className="mt-10 grid grid-cols-4 gap-4 border-t border-line pt-6">{[["02","services"],["07","tests mocks"],["1","fake login"],["00","internet"]].map(([n,l])=><div key={l}><div className="text-2xl font-extrabold">{n}</div><div className="coord text-slate-400">{l}</div></div>)}</div></Reveal>
        </div>
        <Reveal delay={120}><Console /></Reveal>
      </section>

      <section id="sim" className="mx-auto max-w-7xl px-5 py-14">
        <Reveal><span className="coord text-brand">01 / Simulation</span><h2 className="mt-2 text-4xl font-bold sm:text-5xl">Laboratoire local</h2><p className="mt-3 max-w-2xl text-slate-600">Gophish v0.12 (admin/gophish) + MailHog (SMTP 1025, Web UI 8025). Page Fake Login et 3 emails fictifs.</p></Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[["Gophish","http://127.0.0.1:3333","Admin : admin/gophish"],["MailHog","http://127.0.0.1:8025","SMTP : 127.0.0.1:1025"],["Fakes","Fake Login + webhook","3 emails du groupe"]].map(([t,a,b])=>(
            <Reveal key={t}><div className="app-window p-5"><div className="text-sm font-bold text-brand">{t}</div><div className="mt-2 font-mono text-xs text-slate-700">{a}</div><div className="mt-1 text-xs text-slate-500">{b}</div></div></Reveal>
          ))}
        </div>
      </section>

      <section id="fonctions" className="mx-auto max-w-7xl px-5 py-14">
        <Reveal><span className="coord text-brand">02 / Fonctions</span><h2 className="mt-2 text-4xl font-bold sm:text-5xl">API & vérifications</h2></Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {FUNCS.map(([n,d],i)=><Reveal key={n} delay={i*70}><div className="flex gap-4 rounded-xl border border-line bg-white p-5"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/10 font-mono text-xs font-bold text-brand">0{i+1}</span><div><div className="font-mono text-sm font-semibold text-slate-900">{n}</div><p className="mt-1 text-xs text-slate-500">{d}</p></div></div></Reveal>)}
        </div>
      </section>

      <section id="demo" className="mx-auto max-w-7xl px-5 py-14">
        <Reveal><span className="coord text-brand">03 / Démonstration</span><h2 className="mt-2 text-4xl font-bold sm:text-5xl">Commandes</h2></Reveal>
        <div className="mt-8 space-y-2 rounded-xl border border-line bg-white p-5 font-mono text-[12px]">
          {["python -m src.phishing_gophish_main --json","python -m src.phishing_gophish_main --check-only --json","python -m src.generate_report --pdf outputs/rapport-p4.pdf"].map(c=><div key={c} className="rounded-md bg-slate-50 px-4 py-3 text-slate-800"><span className="text-brand">$</span> {c}</div>)}
        </div>
        <Reveal delay={100}><p className="mt-5 font-mono text-xs text-slate-500">[CHECK] Gophish: ok=… (HTTP …) · MailHog: ok=… (HTTP …) · 7/7 tests mocks</p></Reveal>
      </section>

      <section id="ethique" className="mx-auto max-w-7xl px-5 py-14">
        <Reveal><span className="coord text-brand">04 / Éthique</span><h2 className="mt-2 text-4xl font-bold sm:text-5xl">Cadre strictement local</h2></Reveal>
        <div className="mt-6 rounded-xl border-l-4 border-brand bg-white p-6">
          <p className="text-sm leading-relaxed text-slate-700">Campagne locale sur emails fictifs (test1/test2/test3@localhost). <b>Localhost uniquement</b> — aucun Internet pendant la démo, aucun vrai destinataire, stand-alone, anti-GPU.</p>
        </div>
      </section>

      <footer className="border-t border-navy bg-brand2 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 py-10">
          <div><div className="text-2xl font-extrabold">P4 <span className="text-blue-400">/ PHISHING LAB</span></div><div className="coord mt-1 text-white/50">Master 1 PFE · Laidi Mohammed · 2026</div></div>
          <div className="flex gap-5 font-mono text-xs text-white/70"><a href="https://github.com/LaidiMohammed/aegis-p4-phishing-gophish" target="_blank" rel="noreferrer" className="hover:text-blue-400">GitHub ↗</a><a href="https://aegis-p4-phishing-gophish.vercel.app" className="hover:text-blue-400">Vercel ↗</a></div>
        </div>
      </footer>
    </main>
  );
}
