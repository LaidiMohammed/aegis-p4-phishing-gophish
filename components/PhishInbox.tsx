"use client";
import { useState } from "react";

const FLAGS = [
  "Expéditeur : security@paypa1.com (typosquatting)",
  "Objet : « ACTION REQUISE - compte suspendu » (urgence)",
  "Lien : http://paypa1-secure.verify-login.tk (domaine suspect)",
  "Pièce jointe : facture_urgente.zip (non sollicitée)",
];

export default function PhishInbox() {
  const [analyzed, setAnalyzed] = useState(false);
  const [check, setCheck] = useState(false);

  return (
    <div className="app-window">
      {/* window bar */}
      <div className="window-bar flex items-center gap-2 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-warn/70" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-emerald-500" />
        <span className="ml-3 text-xs font-semibold text-slate-600">MailHog · http://127.0.0.1:8025</span>
        <span className="ml-auto pill bg-emerald-100 text-emerald-700">● SMTP 1025</span>
      </div>

      <div className="grid md:grid-cols-[190px_1fr]">
        {/* sidebar */}
        <aside className="hidden border-r border-line bg-slate-50/60 p-3 md:block">
          <div className="nav-item bg-brand px-3 py-2 text-sm font-semibold text-white">📥 Boîte de réception</div>
          {["⭐ Favoris","📤 Envoyés","📋 Brouillons","🗑 Corbeille"].map(x=><div key={x} className="nav-item px-3 py-2 text-sm text-slate-600">{x}</div>)}
          <div className="mt-4 border-t border-line pt-3 coord text-slate-400">Campagne P4</div>
          <div className="mt-2 text-xs text-slate-500">3 emails fictifs<br/>test1/2/3@localhost</div>
        </aside>

        {/* message */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 border-b border-line pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-brand/10 text-brand font-bold text-sm">S</span>
                <div>
                  <div className="text-sm font-semibold">Service Sécurité</div>
                  <div className="font-mono text-[11px] text-slate-500">security@paypa1.com</div>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-bold">ACTION REQUISE — votre compte sera suspendu</h3>
            </div>
            <span className="pill bg-slate-100 text-slate-500">10:42</span>
          </div>

          <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
            <p>Bonjour,</p>
            <p>Nous avons détecté une activité inhabituelle sur votre compte. Confirmez vos informations immédiatement :</p>
            <p className="font-mono text-xs text-brand underline">http://paypa1-secure.verify-login.tk/confirm</p>
            <p>Cordialement,<br/>L'équipe de sécurité</p>
          </div>

          {analyzed && (
            <div className="mt-5 rounded-lg border border-warn/30 bg-warn/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-warn">
                <span>⚑</span> 4 signaux de phishing détectés
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {FLAGS.map((f,i)=><li key={f}><span className="mr-2 font-mono text-warn">0{i+1}</span>{f}</li>)}
              </ul>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={()=>setAnalyzed(!analyzed)} className="rounded-lg bg-brand px-5 py-2.5 text-xs font-bold text-white hover:bg-brand2">
              {analyzed ? "Masquer l'analyse" : "⚑ Détecter les signaux"}
            </button>
            <button onClick={()=>setCheck(!check)} className="rounded-lg border border-line px-5 py-2.5 text-xs font-semibold text-slate-600 hover:border-brand hover:text-brand">
              {check ? "✓ Gophish 200 · MailHog 200" : "Vérifier les services"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
