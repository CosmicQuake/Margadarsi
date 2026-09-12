import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Flag,
  FileQuestion,
  Search,
  MapPin,
  Fingerprint
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FraudVigilanceView: React.FC = () => {
  const { anomalies, t, handlePerformFraudAction } = useApp();
  const [filterType, setFilterType] = useState('All');

  const filtered = anomalies.filter((a) => {
    return filterType === 'All' || a.type === filterType;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-700">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{t('nav.fraud_vigilance')}</h1>
              <p className="text-xs text-slate-500">
                Anti-Fraud Surveillance Radar & Middleman Leakage Prevention Engine
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black px-3 py-1 rounded-full bg-rose-100 text-rose-800">
            {anomalies.filter((a) => a.status !== 'Cleared').length} Active Alerts Under Review
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {['All', 'GEO_MISMATCH', 'DUPLICATE_ID', 'RAPID_SCORE_DROP', 'VENDOR_ANOMALY'].map((ft) => (
          <button
            key={ft}
            onClick={() => setFilterType(ft)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 ${
              filterType === ft
                ? 'bg-slate-900 text-white shadow'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {ft.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Anomalies List */}
      <div className="space-y-4">
        {filtered.map((anomaly) => (
          <div
            key={anomaly.id}
            className={`bg-white rounded-3xl p-6 border transition space-y-4 shadow-sm ${
              anomaly.status === 'Fraud Confirmed'
                ? 'border-rose-300 bg-rose-50/20'
                : anomaly.status === 'Frozen'
                ? 'border-amber-300 bg-amber-50/20'
                : anomaly.status === 'Cleared'
                ? 'border-emerald-300 opacity-60'
                : 'border-slate-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div
                  className={`p-2 rounded-xl ${
                    anomaly.severity === 'Critical'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {anomaly.type}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        anomaly.status === 'Cleared'
                          ? 'bg-emerald-100 text-emerald-800'
                          : anomaly.status === 'Frozen'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {anomaly.status}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 mt-1">{anomaly.title}</h3>
                </div>
              </div>

              <div className="text-right text-[11px] text-slate-500">
                <span>Flagged on {anomaly.flaggedAt}</span>
                <div className="font-bold text-slate-700">Household: {anomaly.householdId} ({anomaly.district})</div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{anomaly.description}</p>

            <div className="p-3 bg-slate-50 rounded-2xl text-[11px] font-mono text-slate-700 border border-slate-200">
              <span className="text-slate-400 font-sans block text-[10px] font-bold uppercase mb-0.5">
                Investigative Evidence
              </span>
              {anomaly.evidence}
            </div>

            {/* Action Bar (Zero Dead Buttons) */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2">
              {anomaly.status !== 'Cleared' && (
                <>
                  <button
                    onClick={() => handlePerformFraudAction(anomaly.id, 'Resolve Alert')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Resolve Alert</span>
                  </button>

                  <button
                    onClick={() => handlePerformFraudAction(anomaly.id, 'Freeze Workflow')}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-1"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Freeze Workflow</span>
                  </button>

                  <button
                    onClick={() => handlePerformFraudAction(anomaly.id, 'Flag')}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>Confirm Fraud</span>
                  </button>
                </>
              )}

              <button
                onClick={() => handlePerformFraudAction(anomaly.id, 'Request Evidence')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1"
              >
                <FileQuestion className="w-3.5 h-3.5 text-slate-500" />
                <span>Request Re-Audit</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
