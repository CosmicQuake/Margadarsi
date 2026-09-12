import React, { useState } from 'react';
import {
  X,
  HeartHandshake,
  CheckCircle2,
  ShieldCheck,
  Coins,
  FileSignature,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdoptFamilyModal: React.FC = () => {
  const {
    isAdoptModalOpen,
    setIsAdoptModalOpen,
    selectedFamilyForAdopt,
    mentors,
    confirmAdoption
  } = useApp();

  const [selectedMentorId, setSelectedMentorId] = useState(mentors[0]?.id || 'M-101');
  const [pledgedAmount, setPledgedAmount] = useState(75000);
  const [consentChecked, setConsentChecked] = useState(true);

  if (!isAdoptModalOpen || !selectedFamilyForAdopt) return null;
  const fam = selectedFamilyForAdopt;
  const currentMentor = mentors.find((m) => m.id === selectedMentorId) || mentors[0];

  const handleConfirm = () => {
    if (!consentChecked) return;
    confirmAdoption(fam.id, currentMentor.id, pledgedAmount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Execute Digital P4 Adoption</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Non-Commercial CSR Mentorship Covenant • Controlled Escrow Locking
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAdoptModalOpen(false)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Family Card Summary */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Target Beneficiary</span>
              <h4 className="font-extrabold text-sm text-slate-900">{fam.familyName}</h4>
              <p className="text-[11px] text-slate-500">{fam.village}, {fam.mandal} • Score: {fam.povertyScore}/100</p>
            </div>
            <span className="text-xs font-black px-2.5 py-1 rounded-full bg-amber-100 text-amber-900">
              {fam.povertyCategory}
            </span>
          </div>

          {/* Mentor Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Margadarsi Mentor</label>
            <select
              value={selectedMentorId}
              onChange={(e) => setSelectedMentorId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:outline-none"
            >
              {mentors.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.organization}) - Focus: {m.focusAreas.slice(0, 2).join(', ')}
                </option>
              ))}
            </select>
          </div>

          {/* Grant Amount Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Pledged Grant Capital (Locked in Controlled Escrow)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-500 text-xs">₹</span>
              <input
                type="number"
                value={pledgedAmount}
                onChange={(e) => setPledgedAmount(Number(e.target.value))}
                className="w-full pl-7 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-black text-slate-900 focus:outline-none"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Funds are held in controlled escrow and released directly to vendors as each milestone is verified.
            </p>
          </div>

          {/* Adoption Covenant Clauses */}
          <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 text-xs space-y-2 text-amber-950">
            <h5 className="font-extrabold uppercase text-[10px] text-amber-900">Digital Adoption Covenant Terms:</h5>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 mt-0.5" />
              <span>12-Month dedicated mentorship committed to graduate household to self-reliance.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 mt-0.5" />
              <span>Direct-to-Vendor equipment disbursement: zero cash handouts.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 mt-0.5" />
              <span>Monthly field worker progress audits and tamper-evident logging.</span>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="consent"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              className="rounded text-amber-600 focus:ring-amber-500"
            />
            <label htmlFor="consent" className="text-xs font-semibold text-slate-700">
              Beneficiary consent verified via Grama Sabha digital authorization token.
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setIsAdoptModalOpen(false)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={!consentChecked}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
          >
            <FileSignature className="w-4 h-4 text-amber-400" />
            <span>Ratify Agreement & Lock Escrow</span>
          </button>
        </div>
      </div>
    </div>
  );
};
