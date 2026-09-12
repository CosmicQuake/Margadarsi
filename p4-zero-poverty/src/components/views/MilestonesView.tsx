import React, { useState } from 'react';
import {
  Milestone,
  CheckCircle2,
  Clock,
  Upload,
  Camera,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  Coins,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MilestonesView: React.FC = () => {
  const {
    activeFamily,
    families,
    t,
    handleSubmitEvidence,
    handleVerifyEvidence,
    setActiveFamilyId
  } = useApp();

  const [selectedFamId, setSelectedFamId] = useState(activeFamily.id);
  const currentFam = families.find((f) => f.id === selectedFamId) || activeFamily;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Milestone className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{t('nav.milestones')}</h1>
              <p className="text-xs text-slate-500">
                P4 9-Stage Support Journey Timeline • Verifiable Evidence & Controlled Escrow Release
              </p>
            </div>
          </div>
        </div>

        {/* Family Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Select Family:</span>
          <select
            value={selectedFamId}
            onChange={(e) => {
              setSelectedFamId(e.target.value);
              setActiveFamilyId(e.target.value);
            }}
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

      {/* Progress Journey Cards */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">{currentFam.familyName}</h2>
            <p className="text-xs text-slate-500">
              Mentor: <span className="font-bold text-slate-700">{currentFam.mentorName || 'Awaiting Adoption'}</span> • Current Phase: <span className="font-bold text-amber-600">{currentFam.povertyStatus}</span>
            </p>
          </div>

          <button
            onClick={() => handleSubmitEvidence(currentFam.id, 5)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
          >
            <Camera className="w-4 h-4 text-amber-400" />
            <span>{t('action.submit_evidence')}</span>
          </button>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {currentFam.journeyMilestones.map((ms, idx) => {
            const isCompleted = ms.status === 'completed';
            const isCurrent = ms.status === 'current';

            return (
              <div key={ms.id} className="relative group">
                {/* Node Icon */}
                <div
                  className={`absolute -left-6 top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ring-4 ring-white shadow ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-amber-500 text-white animate-pulse'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                </div>

                {/* Content Box */}
                <div
                  className={`p-5 rounded-2xl border transition ${
                    isCurrent
                      ? 'bg-amber-50/40 border-amber-300 shadow-sm'
                      : isCompleted
                      ? 'bg-slate-50/70 border-slate-200'
                      : 'bg-white border-slate-100 text-slate-400'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Milestone #{idx + 1}
                        </span>
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800'
                              : isCurrent
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {ms.status}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-sm text-slate-900 mt-1">{ms.title}</h3>
                    </div>

                    {ms.date && (
                      <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {ms.date}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{ms.description}</p>

                  <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2">
                    <div className="text-[11px] text-slate-500">
                      <span>Verifier: </span>
                      <strong className="text-slate-700">{ms.verifiedBy || 'Pending Verification'}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSubmitEvidence(currentFam.id, ms.id)}
                        className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold transition flex items-center gap-1"
                      >
                        <Upload className="w-3 h-3 text-slate-500" />
                        <span>Upload Proof</span>
                      </button>

                      <button
                        onClick={() => handleVerifyEvidence(currentFam.id, ms.id)}
                        className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Verify Proof</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
