import React from 'react';
import {
  FileSignature,
  HeartHandshake,
  CheckCircle2,
  Calendar,
  Coins,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Milestone
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdoptionsView: React.FC = () => {
  const { families, mentors, t, handleViewTimeline, setActiveNav, handleSelectHousehold } = useApp();

  const adoptedFamilies = families.filter((f) => f.mentorId !== null);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <FileSignature className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{t('nav.adoptions')}</h1>
              <p className="text-xs text-slate-500">
                Digital P4 Adoption Agreements • Non-Commercial Mentorship Governance
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
            {adoptedFamilies.length} Active Adoption Charters
          </span>
        </div>
      </div>

      {/* Adoption Model Explanation Card */}
      <div className="p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 space-y-3">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-amber-400">
          The Non-Commercial P4 Mentorship Model
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
          The platform explicitly rejects commercial marketplace dynamics. P4 Adoptions operate under a strict civic covenant:
          <span className="text-white font-bold"> Mentor ➔ Family Adoption ➔ 12-Month Support Plan ➔ Milestone Verification ➔ Direct-to-Vendor Payout ➔ Impact Graduation.</span>
        </p>
      </div>

      {/* Adoptions Agreements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {adoptedFamilies.map((fam) => (
          <div
            key={fam.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                    Agreement #{fam.id}-ADOPT
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900 mt-1">{fam.familyName}</h3>
                  <p className="text-[11px] text-slate-500">Beneficiary: {fam.headOfHousehold} • {fam.village}</p>
                </div>

                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Legally Executed
                </span>
              </div>

              {/* Mentor Box */}
              <div className="mt-4 p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Margadarsi Mentor</span>
                    <span className="font-extrabold text-xs text-slate-900">{fam.mentorName}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Committed Grant</span>
                  <span className="font-black text-xs text-emerald-700">₹{fam.mentorGrantTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Covenant Terms */}
              <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Duration: <strong className="text-slate-800">12 Months Graduation Term</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Target Income: <strong className="text-slate-800">₹{fam.targetIncome.toLocaleString()}/month</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Citizen Consent: <strong className="text-emerald-700">Digital Aadhaar e-Sign Confirmed</strong></span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => handleViewTimeline(fam.id)}
                className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Milestone className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('action.view_timeline')}</span>
              </button>

              <button
                onClick={() => handleSelectHousehold(fam.id)}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition"
              >
                Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
