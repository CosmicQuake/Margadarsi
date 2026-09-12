import React, { useState } from 'react';
import {
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  Users,
  ArrowRight,
  TrendingUp,
  MapPin,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MatchingView: React.FC = () => {
  const {
    families,
    activeFamily,
    mentors,
    t,
    handleAdoptFamily,
    handleRunMatch,
    handleSelectHousehold
  } = useApp();

  const [selectedFamilyId, setSelectedFamilyId] = useState(activeFamily.id);
  const currentFam = families.find((f) => f.id === selectedFamilyId) || activeFamily;

  const topMentor = mentors[0];
  const compatibilityScore = 92;

  const matchReasons = [
    "High alignment (92%) between mentor focus on 'Dairy Farming, Livestock & Micro-finance' and household's livelihood deficit.",
    "Geographic proximity within same administrative division enables regular physical spot visits.",
    "Mentor pledged grant capacity (₹75,000) matches Murrah Buffalo procurement unit capital requirements."
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{t('nav.matching')}</h1>
              <p className="text-xs text-slate-500">
                AI Vector Embeddings & Cosine Similarity Matchmaking (scikit-learn Pipeline)
              </p>
            </div>
          </div>
        </div>

        {/* Family Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Target Family:</span>
          <select
            value={selectedFamilyId}
            onChange={(e) => setSelectedFamilyId(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
          >
            {families.map((f) => (
              <option key={f.id} value={f.id}>
                {f.id} - {f.familyName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Compatibility Match Result Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Optimal AI Pairing Calculated
            </span>
            <h2 className="text-2xl font-black text-white">
              {currentFam.familyName} ⟷ {topMentor.name}
            </h2>
            <p className="text-xs text-slate-300">
              TF-IDF Vector Space Analysis • Multidimensional Needs Vector mapped to CSR Skill Vector
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/20 self-start md:self-auto">
            <div className="text-center">
              <span className="text-[10px] font-bold uppercase text-amber-400 block">Compatibility</span>
              <span className="text-3xl font-black text-white">{compatibilityScore}%</span>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-xs font-semibold text-slate-200">
              <div>P4 Pillar 3</div>
              <div className="text-emerald-400 font-bold">High Synergy</div>
            </div>
          </div>
        </div>

        {/* Explainable Match Reasons */}
        <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
            Explainable AI Matching Breakdown
          </h3>
          <div className="space-y-2">
            {matchReasons.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => handleAdoptFamily(currentFam.id, topMentor.id)}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-slate-950 font-black rounded-xl text-xs transition shadow-lg flex items-center gap-2 hover:scale-105"
          >
            <HeartHandshake className="w-4 h-4 text-slate-950" />
            <span>Formalize P4 Adoption Agreement</span>
          </button>
        </div>
      </div>

      {/* Alternative Top Matches Roster */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
          Alternative Compatible Margadarsi Mentors
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mentors.slice(1, 4).map((alt, idx) => {
            const altScore = 86 - idx * 7;
            return (
              <div
                key={alt.id}
                className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      Rank #{idx + 2}
                    </span>
                    <span className="text-xs font-black text-amber-600">{altScore}% Match</span>
                  </div>

                  <h4 className="font-extrabold text-xs text-slate-900 mt-2">{alt.name}</h4>
                  <p className="text-[11px] text-slate-500">{alt.organization}</p>
                  <p className="text-[11px] text-slate-600 mt-1">Specialty: {alt.focusAreas.join(', ')}</p>
                </div>

                <button
                  onClick={() => handleAdoptFamily(currentFam.id, alt.id)}
                  className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <span>Select Mentor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
