import React from 'react';
import {
  Lock,
  Unlock,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ControlledEscrowView: React.FC = () => {
  const { escrows, releaseEscrowPayment } = useApp();

  const activeEscrow = escrows[0];

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full border border-blue-200">
              P4 Financial Protocol
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Controlled Escrow Workflow — Prototype
            </span>
          </div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-700" />
            Controlled Escrow Multi-Tranche Ledger
          </h3>
        </div>

        <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-xl">
          Escrow ID: {activeEscrow ? activeEscrow.id : 'ESC-2026-01'}
        </span>
      </div>

      {/* Escrow Pipeline Visualizer (Section 15) */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
        <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
          Stage-Gated Capital Release Flow:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-slate-800 border border-emerald-500/40 text-emerald-300 font-bold">
            1. Mentor Pledge
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800 border border-emerald-500/40 text-emerald-300 font-bold">
            2. Funds Locked
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800 border border-emerald-500/40 text-emerald-300 font-bold">
            3. Milestone Submitted
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800 border border-emerald-500/40 text-emerald-300 font-bold">
            4. Proof Verified
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800 border border-emerald-500/40 text-emerald-300 font-bold">
            5. Authorized Approval
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800 border border-emerald-500/40 text-emerald-300 font-bold">
            6. Vendor Payout
          </div>
        </div>
      </div>

      {/* Escrow Amounts Display (Exact labels from Section 15) */}
      {activeEscrow && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Pledged
            </span>
            <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">
              ₹{activeEscrow.totalPledged.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-slate-500">
              By {activeEscrow.mentorName.split('(')[0]}
            </span>
          </div>

          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
            <span className="text-[10px] uppercase font-bold text-blue-800 block">
              Locked
            </span>
            <span className="text-2xl font-black text-blue-900 font-mono mt-1 block">
              ₹{activeEscrow.fundsLocked.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-blue-600">
              In Escrow Vault
            </span>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">
              Released
            </span>
            <span className="text-2xl font-black text-emerald-700 font-mono mt-1 block">
              ₹{activeEscrow.fundsReleased.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-emerald-600 font-bold">
              Settled to Vendor
            </span>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
            <span className="text-[10px] uppercase font-bold text-amber-800 block">
              Remaining
            </span>
            <span className="text-2xl font-black text-amber-700 font-mono mt-1 block">
              ₹{activeEscrow.fundsRemaining.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-amber-600">
              For Milestone 2 & 3
            </span>
          </div>
        </div>
      )}

      {/* Release Tranche Action */}
      {activeEscrow && activeEscrow.fundsRemaining > 0 && (
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div>
            <strong className="text-slate-900 block">
              Milestone 2 Skilling Tranche Ready for Clearance
            </strong>
            <span className="text-slate-500">
              Attendance verified by Mandal Skill Hub. Authorize release of ₹5,000.
            </span>
          </div>

          <button
            onClick={() => releaseEscrowPayment(activeEscrow.id, 5000)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow transition"
          >
            Authorize Release (₹5,000)
          </button>
        </div>
      )}
    </div>
  );
};
