import React from 'react';
import {
  X,
  Users,
  ShieldCheck,
  HeartHandshake,
  Milestone,
  HelpCircle,
  FileCheck2,
  MapPin,
  Home,
  CheckCircle2,
  Calendar,
  Camera
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Family } from '../../data/mockData';

export const HouseholdDetailModal: React.FC = () => {
  const {
    selectedFamilyForModal,
    setSelectedFamilyForModal,
    handleAdoptFamily,
    handleSubmitEvidence,
    handleViewTimeline,
    t
  } = useApp();

  if (!selectedFamilyForModal) return null;
  const fam = selectedFamilyForModal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm text-white ${
                fam.povertyScore >= 80
                  ? 'bg-rose-600'
                  : fam.povertyScore >= 60
                  ? 'bg-amber-500'
                  : 'bg-emerald-600'
              }`}
            >
              {fam.povertyScore}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">{fam.familyName}</h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/20 text-white">
                  {fam.id}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Head: {fam.headOfHousehold} • {fam.village}, {fam.mandal}, {fam.district}
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedFamilyForModal(null)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Monthly Income</span>
              <span className="text-base font-black text-slate-900">₹{fam.monthlyIncome.toLocaleString()}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Target: ₹{fam.targetIncome.toLocaleString()}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Poverty Status</span>
              <span className="text-base font-black text-amber-600">{fam.povertyCategory}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">{fam.povertyStatus}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">e-KYC Status</span>
              <span className="text-sm font-black text-emerald-700 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
                Verified
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">{fam.aadhaarMasked}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Margadarsi Mentor</span>
              <span className="text-xs font-black text-slate-800 truncate block mt-0.5">
                {fam.mentorName || 'Awaiting Adoption'}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                Grant: ₹{fam.mentorGrantTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Household Members Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Household Members Roster ({fam.members.length} Members)
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 uppercase font-extrabold text-[10px] border-b border-slate-200">
                    <th className="p-3">Name</th>
                    <th className="p-3">Relation</th>
                    <th className="p-3">Age / Gender</th>
                    <th className="p-3">Education</th>
                    <th className="p-3">Occupation</th>
                    <th className="p-3 text-right">Income</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fam.members.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">{m.name}</td>
                      <td className="p-3 text-slate-600">{m.relation}</td>
                      <td className="p-3 text-slate-600">{m.age} yrs • {m.gender}</td>
                      <td className="p-3 text-slate-600">{m.education}</td>
                      <td className="p-3 text-slate-700 font-medium">
                        {m.occupation}
                        {m.healthCondition && (
                          <span className="text-[10px] text-rose-600 font-bold block">
                            Condition: {m.healthCondition}
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right font-bold text-slate-900">
                        ₹{m.income.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Housing & Assets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Housing & Landholdings</span>
              <div>Type: <strong className="text-slate-800">{fam.housingType}</strong></div>
              <div>Land: <strong className="text-slate-800">{fam.landHoldings}</strong></div>
              <div>Ration Card: <strong className="font-mono text-slate-800">{fam.rationCardNo}</strong></div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Identified Assets & Entitlements</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {fam.assets.map((asset, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-lg bg-white border border-slate-200 font-bold text-slate-700 text-[11px]">
                    {asset}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {!fam.mentorId ? (
              <button
                onClick={() => {
                  setSelectedFamilyForModal(null);
                  handleAdoptFamily(fam.id);
                }}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-slate-950 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Adopt this Family</span>
              </button>
            ) : (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Mentored by {fam.mentorName}
              </span>
            )}

            <button
              onClick={() => {
                setSelectedFamilyForModal(null);
                handleViewTimeline(fam.id);
              }}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <Milestone className="w-4 h-4 text-amber-600" />
              <span>View Timeline</span>
            </button>

            <button
              onClick={() => {
                setSelectedFamilyForModal(null);
                handleSubmitEvidence(fam.id, 5);
              }}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <Camera className="w-4 h-4 text-sky-600" />
              <span>Submit Evidence</span>
            </button>
          </div>

          <button
            onClick={() => setSelectedFamilyForModal(null)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
