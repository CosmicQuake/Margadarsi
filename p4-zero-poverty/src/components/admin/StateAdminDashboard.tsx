import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Award,
  Layers,
  Printer,
  Download,
  Building,
  DollarSign,
  CheckCircle2,
  MapPin,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GISDashboard } from '../gis/GISDashboard';

export const StateAdminDashboard: React.FC = () => {
  const { districts, families } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'kpis' | 'gis'>('kpis');

  const totalSurveyed = districts.reduce((acc, d) => acc + d.surveyedFamilies, 0);
  const totalExited = districts.reduce((acc, d) => acc + d.povertyExitedCount, 0);
  const totalCSR = districts.reduce((acc, d) => acc + d.csrFundsCr, 0);
  const avgExitRate = (districts.reduce((acc, d) => acc + d.exitRate, 0) / districts.length).toFixed(1);

  const handlePrintBriefing = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* State Admin Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-emerald-950 text-white rounded-3xl p-6 shadow-xl border border-blue-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-500/30 text-blue-300 text-xs font-bold px-3 py-0.5 rounded-full border border-blue-500/40">
              National Executive Command • P4 Poverty Elimination Directorate
            </span>
            <span className="text-xs text-slate-400 font-mono">SIH Problem Statement SIH26202</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Smt. A. Shailaja, IAS, Mission Director General
          </h2>
          <p className="text-xs text-blue-200 mt-0.5">
            P4 Zero Poverty Elimination Mission • Public-Private-People-Partnership Directorate
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrintBriefing}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-white flex items-center gap-2 transition"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            Export Executive Briefing
          </button>
        </div>
      </div>

      {/* Sub-Navigation between Analytics & Spatial GIS */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveSubTab('kpis')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeSubTab === 'kpis'
              ? 'bg-blue-800 text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Statewide KPI Funnel & District League
        </button>

        <button
          onClick={() => setActiveSubTab('gis')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeSubTab === 'gis'
              ? 'bg-blue-800 text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          Interactive GIS Spatial Intelligence
        </button>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* SUB-VIEW 1: KPIS & FUNNEL */}
      {/* ---------------------------------------------------------------- */}
      {activeSubTab === 'kpis' ? (
        <div className="space-y-6">
          {/* Executive KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total BPL Households Surveyed
              </span>
              <div className="my-2">
                <span className="text-3xl font-black text-slate-900">
                  {(totalSurveyed / 100000).toFixed(2)} Lakhs
                </span>
                <p className="text-xs text-emerald-600 font-semibold mt-0.5">
                  100% Ward Geo-Tagged
                </p>
              </div>
              <div className="text-[11px] text-slate-400">
                15,004 Grama Sachivalayams Active
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Poverty Exit Rate (State Avg)
              </span>
              <div className="my-2">
                <span className="text-3xl font-black text-emerald-700">
                  {avgExitRate}%
                </span>
                <p className="text-xs text-emerald-600 font-semibold mt-0.5">
                  +14.2% YoY Improvement
                </p>
              </div>
              <div className="text-[11px] text-slate-400">
                MPI Score &lt; 20 Threshold
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Private CSR Capital Mobilized
              </span>
              <div className="my-2">
                <span className="text-3xl font-black text-blue-800 font-mono">
                  ₹{totalCSR.toFixed(1)} Cr
                </span>
                <p className="text-xs text-blue-600 font-semibold mt-0.5">
                  Public-Private Synergy (P4)
                </p>
              </div>
              <div className="text-[11px] text-slate-400">
                982 Empanelled Margadarsis
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Avg Monthly Income Uplift
              </span>
              <div className="my-2">
                <span className="text-3xl font-black text-amber-600 font-mono">
                  +320%
                </span>
                <p className="text-xs text-amber-700 font-semibold mt-0.5">
                  ₹4,200 ➔ ₹17,850 / month
                </p>
              </div>
              <div className="text-[11px] text-slate-400">
                Livelihood Skilling Verified
              </div>
            </div>
          </div>

          {/* Poverty Exit Funnel Visualization */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-900">
                P4 National Poverty Exit Conversion Funnel
              </h3>
              <p className="text-xs text-slate-500">
                Tracing families through the 5 graduation stages to permanent zero poverty
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { stage: '1. Baseline Survey & Extreme Vulnerability Identification (MPI > 70)', count: '1,421,000 Families', pct: 100, color: 'bg-rose-500' },
                { stage: '2. Mapped to Core National Welfare Schemes & Village Volunteer', count: '1,180,000 Families', pct: 83, color: 'bg-amber-500' },
                { stage: '3. Margadarsi Mentor Adoption & Seed Capital Pledged', count: '640,000 Families', pct: 45, color: 'bg-blue-500' },
                { stage: '4. Livelihood Asset Delivered & Skill Training Completed', count: '385,000 Families', pct: 27, color: 'bg-teal-500' },
                { stage: '5. Sustainable Income (>₹15k/mo) & Conferred Zero Poverty Certification', count: '142,000 Families', pct: 10, color: 'bg-emerald-600' },
              ].map((fn, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-bold gap-1">
                    <span className="text-slate-900">{fn.stage}</span>
                    <span className="text-slate-600 font-mono">{fn.count} ({fn.pct}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${fn.color} rounded-full transition-all duration-500`}
                      style={{ width: `${fn.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* District Performance League Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xl font-black text-slate-900">
              District Poverty Elimination Benchmarks
            </h3>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3.5">District</th>
                    <th className="p-3.5">Surveyed Households</th>
                    <th className="p-3.5">Extreme Vulnerable</th>
                    <th className="p-3.5">Exited Poverty</th>
                    <th className="p-3.5">Exit Rate (%)</th>
                    <th className="p-3.5">CSR Private Capital</th>
                    <th className="p-3.5">Active Mentors</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {districts.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-bold text-slate-900">
                        {d.name}{' '}
                        <span className="text-[10px] text-slate-400 font-normal">
                          ({d.nameTe})
                        </span>
                      </td>
                      <td className="p-3.5 font-mono">{d.surveyedFamilies.toLocaleString('en-IN')}</td>
                      <td className="p-3.5 font-mono text-rose-700 font-bold">{d.extremeVulnerableCount.toLocaleString('en-IN')}</td>
                      <td className="p-3.5 font-mono text-emerald-700 font-bold">{d.povertyExitedCount.toLocaleString('en-IN')}</td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                            d.exitRate > 50
                              ? 'bg-emerald-100 text-emerald-800'
                              : d.exitRate > 30
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {d.exitRate}%
                        </span>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-blue-900">₹{d.csrFundsCr} Cr</td>
                      <td className="p-3.5 font-mono">{d.mentorsActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* SUB-VIEW 2: INTEGRATED GIS VIEW */
        <GISDashboard />
      )}
    </div>
  );
};
