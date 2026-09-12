import React from 'react';
import {
  AlertTriangle,
  Clock,
  TrendingUp,
  Brain,
  BellRing,
  UserCheck,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AgenticMonitoringView: React.FC = () => {
  const { inactivityAlerts, predictiveRisks, addAuditLogEntry, showToast } = useApp();

  const handleIntervene = (alertId: string, familyId: string) => {
    addAuditLogEntry(
      'AGENTIC_INACTIVITY_INTERVENTION',
      'Autonomous Agentic Monitor',
      'AI Agent',
      `Auto-dispatched follow-up inspection for ${familyId} due to >30 days inactivity.`
    );
    showToast({
      type: 'info',
      title: 'Intervention Dispatched by Agent',
      message: `Supervisor alerted for ${familyId}. Case re-prioritized on volunteer roster.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Agentic Monitoring Card (Section 22) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full border border-rose-200">
                Autonomous Sentinel Agent
              </span>
              <span className="text-xs text-slate-400">Rule: Inactivity &gt; 30 Days</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <BellRing className="w-5 h-5 text-rose-600" />
              Autonomous Agentic Inactivity Monitor
            </h3>
          </div>

          <span className="text-xs font-bold bg-rose-100 text-rose-900 px-3 py-1 rounded-full border border-rose-300">
            {inactivityAlerts.length} Cases Require Intervention
          </span>
        </div>

        <p className="text-xs text-slate-500">
          Autonomous background agents continuously monitor household update frequencies. When no field check or
          income report is logged within 30 days, the agent generates administrative warnings to prevent silent dropout.
        </p>

        <div className="space-y-3">
          {inactivityAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-2xl bg-rose-50/60 border border-rose-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-rose-900 bg-rose-200 px-2 py-0.5 rounded">
                    {alert.familyId}
                  </span>
                  <strong className="text-slate-900">{alert.familyName}</strong>
                  <span className="text-slate-500">• {alert.village}</span>
                </div>
                <div className="text-slate-600 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-rose-600" />
                  <span>
                    No updates for <strong className="text-rose-700">{alert.lastUpdateDays} days</strong>
                  </span>
                  <span>• Assigned: {alert.assignedVolunteer}</span>
                </div>
              </div>

              <button
                onClick={() => handleIntervene(alert.id, alert.familyId)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-sm transition flex items-center gap-1.5 self-start sm:self-auto"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Dispatch Early Intervention
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Predictive Poverty Risk Model (Section 21) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200">
              Machine Learning Forecasting
            </span>
            <span className="text-xs text-slate-400">At-Risk Relapse Prevention</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Brain className="w-5 h-5 text-amber-600" />
            Predictive Poverty Risk Dashboard
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Predictive heuristic models evaluate macroeconomic factors, seasonal crop failure, and debt ratios to detect households at risk of falling deeper into poverty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {predictiveRisks.map((pr) => (
            <div
              key={pr.familyId}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                    {pr.familyId}
                  </span>
                  <span
                    className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                      pr.predictedRisk > 75
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    Risk: {pr.predictedRisk}%
                  </span>
                </div>

                <h4 className="text-sm font-black text-slate-900 mt-2">
                  {pr.familyName}
                </h4>

                <div className="mt-2 text-xs space-y-1 text-slate-600">
                  <div>
                    Current MPI Score: <strong>{pr.currentScore}/100</strong>
                  </div>
                  <div>
                    Trend: <strong className={pr.trend === 'Increasing' ? 'text-rose-600' : 'text-emerald-600'}>{pr.trend}</strong>
                  </div>
                  <div className="pt-1 text-[11px] text-slate-700">
                    <strong>Reason:</strong> {pr.reason}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] font-bold uppercase text-emerald-800 block">
                  Recommended Action:
                </span>
                <p className="text-xs text-emerald-900 mt-0.5 font-medium">
                  {pr.recommendedAction}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
