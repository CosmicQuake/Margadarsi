import React, { useState } from 'react';
import {
  LineChart,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Clock,
  CheckCircle2,
  Users,
  ShieldCheck,
  RefreshCw,
  Play
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AnalyticsView: React.FC = () => {
  const {
    predictiveRisks,
    inactivityAlerts,
    families,
    activeFamily,
    t,
    handleRunPrediction,
    showToast,
    playAudioChime
  } = useApp();

  const [selectedFamilyId, setSelectedFamilyId] = useState(activeFamily.id);
  const currentRisk = predictiveRisks.find((r) => r.familyId === selectedFamilyId) || predictiveRisks[0];

  const handleTriggerAutonomousCheck = () => {
    playAudioChime('click');
    showToast({
      type: 'info',
      title: 'Autonomous Monitoring Cycle Complete',
      message: 'Scanned 25 household trajectories. Flagged 2 cases with >30 days inactivity for field re-audit.',
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <LineChart className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{t('nav.analytics')}</h1>
              <p className="text-xs text-slate-500">
                Predictive Poverty Risk Analytics (scikit-learn) & Autonomous Inactivity Radar
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTriggerAutonomousCheck}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Run Autonomous Cycle</span>
          </button>
        </div>
      </div>

      {/* Poverty Exit Trajectory Funnel (Section 20) */}
      <div className="p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-amber-400">
            Poverty Exit Trajectory Funnel (Statewide Aggregate)
          </h2>
          <span className="text-xs font-bold text-slate-400">25 Benchmark Households</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-rose-300 block">Stage 1</span>
            <div className="text-xl font-black text-rose-400 mt-1">Critical</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Score 80-100 • 3 Families</p>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-amber-300 block">Stage 2</span>
            <div className="text-xl font-black text-amber-400 mt-1">Vulnerable</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Score 60-79 • 8 Families</p>
          </div>

          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-blue-300 block">Stage 3</span>
            <div className="text-xl font-black text-blue-400 mt-1">Stabilizing</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Score 40-59 • 7 Families</p>
          </div>

          <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-teal-300 block">Stage 4</span>
            <div className="text-xl font-black text-teal-400 mt-1">Self-Reliant</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Score 20-39 • 5 Families</p>
          </div>

          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-emerald-300 block">Stage 5</span>
            <div className="text-xl font-black text-emerald-400 mt-1">Poverty Exit</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Score &lt;20 • 2 Graduated</p>
          </div>
        </div>
      </div>

      {/* Predictive Poverty Risk Service (Section 21) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              Predictive 6-Month Poverty Regression Risk (ML Service)
            </h2>
            <p className="text-xs text-slate-500">
              Scikit-learn random forest classifier evaluating debt volatility, health shocks & labor seasonality
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedFamilyId}
              onChange={(e) => setSelectedFamilyId(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
            >
              {families.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.id} - {f.familyName}
                </option>
              ))}
            </select>

            <button
              onClick={() => handleRunPrediction(selectedFamilyId)}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{t('action.run_prediction')}</span>
            </button>
          </div>
        </div>

        {currentRisk && (
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-slate-900">{currentRisk.familyName}</span>
                <span className="text-[11px] text-slate-500 block">ID: {currentRisk.familyId}</span>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Predicted Risk Level</span>
                <span
                  className={`text-xl font-black ${
                    currentRisk.predictedRisk >= 70
                      ? 'text-rose-600'
                      : currentRisk.predictedRisk >= 40
                      ? 'text-amber-600'
                      : 'text-emerald-600'
                  }`}
                >
                  {currentRisk.predictedRisk}% (Trend: {currentRisk.trend})
                </span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
              <div>
                <span className="font-bold text-slate-700">Root Cause Driver: </span>
                <span className="text-slate-600">{currentRisk.reason}</span>
              </div>
              <div>
                <span className="font-bold text-emerald-700">Early Intervention Recommended: </span>
                <span className="text-slate-700 font-medium">{currentRisk.recommendedAction}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Autonomous Monitoring & Inactivity Tracker (Section 22) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              Autonomous Inactivity Surveillance Radar
            </h2>
            <p className="text-xs text-slate-500">
              Auto-escalates households without field visit or survey update for &gt;30 days
            </p>
          </div>
          <span className="text-xs font-black px-3 py-1 rounded-full bg-rose-100 text-rose-800">
            {inactivityAlerts.length} Inactivity Flags
          </span>
        </div>

        <div className="space-y-3">
          {inactivityAlerts.map((act) => (
            <div
              key={act.id}
              className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <Clock className="w-5 h-5 animate-spin" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-900">{act.familyName}</span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                      Inactive for {act.lastUpdateDays} days
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Village: {act.village} • Assigned Worker: {act.assignedVolunteer}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="text-[11px] font-bold text-rose-600">Follow-up Required</span>
                <button
                  onClick={() => {
                    playAudioChime('success');
                    showToast({
                      type: 'success',
                      title: 'Household Re-Assigned',
                      message: `Case ${act.familyId} reassigned to Field Worker VOL-01 for immediate doorstep visit.`,
                    });
                  }}
                  className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
                >
                  Reassign Field Worker
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
