import React from 'react';
import {
  Coins,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Lock,
  Store,
  HeartHandshake,
  FileCheck2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FundsView: React.FC = () => {
  const { escrows, t, handleReleasePayment, setActiveNav } = useApp();

  const totalCommitted = escrows.reduce((acc, e) => acc + e.totalPledged, 0);
  const totalLocked = escrows.reduce((acc, e) => acc + e.fundsLocked, 0);
  const totalReleased = escrows.reduce((acc, e) => acc + e.fundsReleased, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{t('nav.funds')}</h1>
              <p className="text-xs text-slate-500">
                Transparent Controlled Escrow Workflow • Direct-to-Vendor Disbursement (No Cash Handouts)
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
            Controlled Escrow Active
          </span>
        </div>
      </div>

      {/* Controlled Escrow Architecture Banner */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl border border-slate-800 space-y-3">
        <h2 className="text-xs font-black uppercase tracking-wider text-amber-400">
          Controlled Escrow Lifecycle Workflow
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-[10px] font-bold">
          <div className="p-2 bg-white/5 rounded-xl border border-white/10">1. Mentor Pledge</div>
          <div className="p-2 bg-white/5 rounded-xl border border-white/10">2. Escrow Locked</div>
          <div className="p-2 bg-white/5 rounded-xl border border-white/10">3. Milestone Trigger</div>
          <div className="p-2 bg-white/5 rounded-xl border border-white/10">4. CV Proof Validated</div>
          <div className="p-2 bg-white/5 rounded-xl border border-white/10">5. Officer Seal</div>
          <div className="p-2 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-500/30">6. Authorized Release</div>
          <div className="p-2 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-500/30">7. Vendor Disbursed</div>
        </div>
      </div>

      {/* Aggregate Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Total Funds Committed</span>
            <HeartHandshake className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">₹{totalCommitted.toLocaleString()}</div>
          <span className="text-[11px] text-slate-400">CSR Pledges from Margadarsi Mentors</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Locked in Controlled Escrow</span>
            <Lock className="w-4 h-4 text-sky-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-sky-700">₹{totalLocked.toLocaleString()}</div>
          <span className="text-[11px] text-slate-400">Awaiting Milestone Verification</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Released to Vendors</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-emerald-700">₹{totalReleased.toLocaleString()}</div>
          <span className="text-[11px] text-slate-400">Direct Equipment & Asset Disbursal</span>
        </div>
      </div>

      {/* Escrow Accounts Ledger Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Active Controlled Escrow Accounts</h2>
            <p className="text-xs text-slate-500">Milestone-linked disbursement ledger</p>
          </div>
          <button
            onClick={() => setActiveNav('vendors')}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>View Vendor Settlement Queue</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-extrabold uppercase text-[10px]">
                <th className="pb-3">Escrow ID</th>
                <th className="pb-3">Beneficiary Family</th>
                <th className="pb-3">Margadarsi Mentor</th>
                <th className="pb-3">Locked / Released</th>
                <th className="pb-3">Current Milestone</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {escrows.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 pr-4 font-mono font-bold text-slate-800">{e.id}</td>
                  <td className="py-3.5 pr-4 font-bold text-slate-900">{e.householdId}</td>
                  <td className="py-3.5 pr-4 text-slate-600">{e.mentorName}</td>
                  <td className="py-3.5 pr-4">
                    <span className="font-extrabold text-slate-900">₹{e.fundsReleased.toLocaleString()}</span>
                    <span className="text-slate-400"> / ₹{e.totalPledged.toLocaleString()}</span>
                  </td>
                  <td className="py-3.5 pr-4 text-slate-600">{e.currentMilestoneName}</td>
                  <td className="py-3.5 pr-4">
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        e.status === 'Released'
                          ? 'bg-emerald-100 text-emerald-800'
                          : e.status === 'Locked'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    {e.fundsLocked > 0 ? (
                      <button
                        onClick={() => handleReleasePayment(e.id, 15000)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition text-xs shadow"
                      >
                        {t('action.release_payment')}
                      </button>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-400">Fully Settled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
