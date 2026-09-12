import React from 'react';
import {
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  X,
  Layers,
  ArrowRight,
  TrendingUp,
  Brain,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Family } from '../../data/mockData';

interface FAISSMatchmakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  family: Family;
  onAdoptSelect: (mentorId: string) => void;
}

export const FAISSMatchmakerModal: React.FC<FAISSMatchmakerModalProps> = ({
  isOpen,
  onClose,
  family,
  onAdoptSelect,
}) => {
  const { mentors } = useApp();

  if (!isOpen) return null;

  const topMentor = mentors[0]; // Dr. K. R. Rao

  const alternativeMatches = [
    { mentorId: 'M-102', name: 'Smt. Vani Mohan', score: 87, focus: 'Traditional Weaving & Artisan Skilling' },
    { mentorId: 'M-103', name: 'Sri S. Chandrasekhar (Diaspora Fund)', score: 84, focus: 'Solar Irrigation & Agri-Tech' },
    { mentorId: 'M-106', name: 'Smt. Deepa Nair', score: 79, focus: 'SHG Micro-Finance & Retail' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 text-white flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400">
              <Brain className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">
                  FAISS AI Vector Matchmaker
                </h3>
                <span className="text-[10px] font-bold bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  Cosine Similarity 0.92
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Vector space alignment: Family Need Vector + Mentor Profile Vector
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Top Matched Mentor Hero Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-500 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-emerald-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                  Highest Ranked Mentor Match
                </span>
                <h4 className="text-xl font-black text-slate-900 mt-0.5">
                  {topMentor.name}
                </h4>
                <p className="text-xs text-slate-600">
                  {topMentor.title} • {topMentor.organization}
                </p>
              </div>

              <div className="text-right">
                <div className="text-3xl font-black text-emerald-700">
                  92%
                </div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  Compatibility Score
                </span>
              </div>
            </div>

            {/* Matching Reasons (As required in Section 12) */}
            <div>
              <span className="text-xs font-bold text-slate-800 block mb-2">
                Algorithmic Vector Alignment Reasons:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="p-2.5 bg-white rounded-xl border border-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Interested in girl child education & scholarships</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Preferred intervention division ({family.district})</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Suitable funding range (₹15,000–₹50,000)</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Relevant expertise in garment & micro-enterprise</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onAdoptSelect(topMentor.id);
                onClose();
              }}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md transition flex items-center justify-center gap-2"
            >
              <HeartHandshake className="w-4 h-4" />
              Generate P4 Adoption Agreement with {topMentor.name}
            </button>
          </div>

          {/* Alternative Matches */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Alternative High-Score Vector Matches:
            </h4>

            <div className="space-y-2">
              {alternativeMatches.map((alt) => (
                <div
                  key={alt.mentorId}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 hover:border-slate-300 transition"
                >
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">{alt.name}</h5>
                    <p className="text-xs text-slate-500">Focus: {alt.focus}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-slate-800 font-mono">
                      {alt.score}%
                    </span>
                    <button
                      onClick={() => {
                        onAdoptSelect(alt.mentorId);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-white hover:bg-emerald-600 hover:text-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 transition"
                    >
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
