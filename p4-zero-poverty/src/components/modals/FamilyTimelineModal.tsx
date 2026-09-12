import React from 'react';
import {
  X,
  Clock,
  CheckCircle2,
  Circle,
  ShieldCheck,
  TrendingUp,
  Award,
  ArrowRight,
  Sparkles,
  Camera,
  Coins,
  MapPin,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FamilyTimelineModal: React.FC = () => {
  const {
    isTimelineModalOpen,
    setIsTimelineModalOpen,
    activeFamily,
    handleSubmitEvidence,
    handleVerifyEvidence,
    handleRunPrediction
  } = useApp();

  if (!isTimelineModalOpen || !activeFamily) return null;

  const fam = activeFamily;
  const milestones = fam.journeyMilestones || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center font-black shadow-lg">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-indigo-500/30 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-500/40">
                  P4 Graduation Journey Timeline
                </span>
                <span className="text-xs text-slate-400 font-mono">{fam.id}</span>
              </div>
              <h3 className="text-xl font-black text-white">
                {fam.familyName} — Poverty Elimination Path
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsTimelineModalOpen(false)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Family Summary Strip */}
        <div className="bg-indigo-50/60 px-6 py-3 border-b border-indigo-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
              <span className="font-bold text-slate-800">{fam.village}, {fam.mandal}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Poverty Score</span>
              <span className="font-black text-amber-600">{fam.povertyScore}/100 ({fam.povertyCategory})</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Mentor Sponsor</span>
              <span className="font-bold text-emerald-700">{fam.mentorName || 'Matching in Progress'}</span>
            </div>
          </div>

          <button
            onClick={() => handleRunPrediction(fam.id)}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Run ML Risk Prediction
          </button>
        </div>

        {/* Timeline Sequence Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {milestones.map((ms, idx) => {
              const isCompleted = ms.status === 'completed';
              const isCurrent = ms.status === 'current';
              const isUpcoming = ms.status === 'upcoming';

              return (
                <div key={ms.id} className="relative group">
                  {/* Pin Dot */}
                  <div
                    className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                        : isCurrent
                        ? 'bg-amber-500 border-white ring-4 ring-amber-200 text-white animate-pulse'
                        : 'bg-white border-slate-300 text-slate-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : isCurrent ? (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    )}
                  </div>

                  {/* Card Content */}
                  <div
                    className={`p-4 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-amber-50/70 border-amber-300 shadow-md ring-1 ring-amber-200'
                        : isCompleted
                        ? 'bg-white border-slate-200 hover:border-slate-300'
                        : 'bg-slate-50/50 border-slate-200/60 opacity-75'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          Step {idx + 1}
                        </span>
                        <h4 className="text-sm font-black text-slate-900">{ms.title}</h4>
                      </div>

                      <span
                        className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : isCurrent
                            ? 'bg-amber-200 text-amber-900 font-extrabold'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {isCompleted ? 'Completed' : isCurrent ? 'Active Now' : 'Upcoming'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{ms.description}</p>

                    {/* Metadata Strip */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                      <div className="flex items-center gap-3 font-mono">
                        {ms.date && (
                          <span className="flex items-center gap-1 text-slate-700">
                            <Clock className="w-3 h-3 text-slate-400" /> {ms.date}
                          </span>
                        )}
                        {ms.verifiedBy && (
                          <span className="flex items-center gap-1 text-emerald-700 font-bold">
                            <ShieldCheck className="w-3.5 h-3.5" /> {ms.verifiedBy}
                          </span>
                        )}
                      </div>

                      {/* Action trigger for current milestone */}
                      {isCurrent && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSubmitEvidence(fam.id, ms.id)}
                            className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-sm"
                          >
                            <Camera className="w-3 h-3" />
                            Submit Evidence
                          </button>
                          <button
                            onClick={() => handleVerifyEvidence(fam.id, ms.id)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-sm"
                          >
                            <FileCheck className="w-3 h-3" />
                            Verify Milestone
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Immutable Blockchain-style Merkle Hash Audit Trail Backed
          </div>

          <button
            onClick={() => setIsTimelineModalOpen(false)}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition"
          >
            Close Timeline
          </button>
        </div>
      </div>
    </div>
  );
};
