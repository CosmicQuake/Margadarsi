import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  FileSearch,
  CheckCircle2,
  Lock,
  Unlock,
  Radio,
  Eye,
  Activity,
  UserX,
  MapPin,
  RefreshCw,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AnomalyItem } from '../../data/mockData';

export const VigilanceView: React.FC = () => {
  const { anomalies, resolveAnomalyAction } = useApp();
  const [selectedAnomaly, setSelectedAnomaly] = useState<AnomalyItem | null>(null);
  const [filterType, setFilterType] = useState<string>('ALL');

  const filtered = anomalies.filter((a) => {
    if (filterType === 'ALL') return true;
    return a.status === filterType;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Vigilance Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-rose-950 to-slate-950 text-white rounded-3xl p-6 shadow-xl border border-rose-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-rose-500/30 text-rose-300 text-xs font-bold px-3 py-0.5 rounded-full border border-rose-500/40 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              State Vigilance & Anti-Fraud Radar • AI Surveillance
            </span>
            <span className="text-xs text-slate-400 font-mono">Officer ID: NAT-VIG-2026-99</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Sri V. Prasad, State Vigilance Officer
          </h2>
          <p className="text-xs text-rose-200 mt-0.5">
            P4 Integrity Directorate • Anti-Corruption & Leakage Prevention Bureau
          </p>
        </div>

        {/* Vigilance Quick Metrics */}
        <div className="flex items-center gap-3">
          <div className="bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">
              Active Flags
            </span>
            <span className="text-xl font-black text-rose-400">
              {anomalies.filter((a) => a.status === 'Under Investigation' || a.status === 'Frozen').length}
            </span>
          </div>
          <div className="bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">
              Leakage Saved
            </span>
            <span className="text-xl font-black text-emerald-400">
              ₹4.2 Cr
            </span>
          </div>
        </div>
      </div>

      {/* Anomaly Radar Live Incident Feed */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-rose-600" />
              Automated AI Anomaly Radar Feed
            </h3>
            <p className="text-xs text-slate-500">
              Real-time heuristic & geospatial anomaly triggers preventing ghost beneficiaries and duplicate payouts
            </p>
          </div>

          <div className="flex items-center gap-2">
            {['ALL', 'Under Investigation', 'Frozen', 'Cleared'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterType(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  filterType === st
                    ? 'bg-rose-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Anomalies List */}
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition space-y-3 ${
                item.status === 'Frozen'
                  ? 'bg-rose-50/60 border-rose-400'
                  : item.status === 'Cleared'
                  ? 'bg-emerald-50/50 border-emerald-300'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded border text-slate-800">
                    {item.id}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                      item.severity === 'Critical'
                        ? 'bg-rose-600 text-white'
                        : item.severity === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.severity} Severity
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {item.flaggedAt.split('T')[0]}
                  </span>
                </div>

                <span
                  className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                    item.status === 'Frozen'
                      ? 'bg-rose-200 text-rose-950 flex items-center gap-1'
                      : item.status === 'Cleared'
                      ? 'bg-emerald-200 text-emerald-950 flex items-center gap-1'
                      : 'bg-amber-200 text-amber-950'
                  }`}
                >
                  {item.status === 'Frozen' && <Lock className="w-3.5 h-3.5" />}
                  {item.status === 'Cleared' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  Status: {item.status}
                </span>
              </div>

              <div>
                <h4 className="text-base font-extrabold text-slate-900">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  {item.description}
                </p>
              </div>

              {/* Heuristic Evidence Box */}
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-xs font-mono text-slate-700 space-y-1">
                <span className="font-bold text-rose-900 block text-[11px] uppercase">
                  🔍 Algorithmic Evidence / Audit Telemetry:
                </span>
                <p>{item.evidence}</p>
              </div>

              {/* Action Controls */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200">
                <div className="text-xs text-slate-500">
                  Target: <strong>{item.householdId}</strong> ({item.mandal}, {item.district})
                </div>

                <div className="flex items-center gap-2">
                  {item.status !== 'Cleared' && (
                    <button
                      onClick={() => resolveAnomalyAction(item.id, 'Cleared')}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Clear / Verified
                    </button>
                  )}

                  {item.status !== 'Frozen' && (
                    <button
                      onClick={() => resolveAnomalyAction(item.id, 'Frozen')}
                      className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                    >
                      <Lock className="w-3.5 h-3.5" /> Freeze Payouts
                    </button>
                  )}

                  <button
                    onClick={() => alert(`Flying Squad Inspection order dispatched for Case #${item.id}`)}
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                  >
                    <FileSearch className="w-3.5 h-3.5" /> Dispatch Flying Squad
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
