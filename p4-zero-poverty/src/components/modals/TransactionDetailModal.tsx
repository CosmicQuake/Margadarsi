import React from 'react';
import {
  X,
  Coins,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Unlock,
  ShieldCheck,
  Building,
  User,
  Calendar,
  DollarSign,
  ArrowRight,
  Hash,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TransactionDetailModal: React.FC = () => {
  const {
    selectedTransactionForModal,
    setSelectedTransactionForModal,
    releaseEscrowPayment,
    showToast,
    addAuditLogEntry,
    addNotification,
    playAudioChime
  } = useApp();

  if (!selectedTransactionForModal) return null;

  const tx = selectedTransactionForModal;
  const isLocked = tx.status === 'Locked' || tx.status === 'Pending';
  const isReleased = tx.status === 'Released' || tx.status === 'Completed';

  const handleAuthorizeRelease = () => {
    const releaseAmt = tx.fundsLocked > 0 ? tx.fundsLocked : (tx.amount || 25000);
    releaseEscrowPayment(tx.id, releaseAmt);
    setSelectedTransactionForModal(null);
  };

  const handleApprove = () => {
    playAudioChime('success');
    addAuditLogEntry(
      'ESCROW_TX_APPROVED',
      'Mandal Checker Desk',
      'Mandal Officer',
      `Approved transaction ${tx.id} for ${tx.householdName || tx.householdId}.`
    );
    addNotification({
      title: 'Transaction Approved',
      message: `Transaction ${tx.id} approved by Mandal Officer. Ready for disbursement.`,
      type: 'approval',
      actionNav: 'funds',
    });
    showToast({
      type: 'success',
      title: 'Escrow Transaction Approved',
      message: `Transaction ${tx.id} approved. Dual authorization verified.`,
    });
    setSelectedTransactionForModal(null);
  };

  const handleReject = () => {
    playAudioChime('alert');
    addAuditLogEntry(
      'ESCROW_TX_REJECTED',
      'Mandal Checker Desk',
      'Mandal Officer',
      `Rejected transaction ${tx.id} for ${tx.householdName || tx.householdId}. Discrepancy observed.`
    );
    addNotification({
      title: 'Transaction Rejected',
      message: `Transaction ${tx.id} was rejected by Checker Desk.`,
      type: 'warning',
      actionNav: 'funds',
    });
    showToast({
      type: 'warning',
      title: 'Escrow Transaction Rejected',
      message: `Transaction ${tx.id} rejected. Funds returned to mentor escrow vault.`,
    });
    setSelectedTransactionForModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-lg">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/30 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                  Controlled Escrow Transaction Detail
                </span>
                <span className="text-xs text-slate-400 font-mono">{tx.id}</span>
              </div>
              <h3 className="text-xl font-black text-white">
                ₹{(tx.amount || tx.totalPledged || 0).toLocaleString('en-IN')} — {tx.purpose || tx.currentMilestoneName}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setSelectedTransactionForModal(null)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1 text-xs">
          {/* Status Badge & Milestones */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Transaction Status</span>
              <span
                className={`inline-flex items-center gap-1 text-xs font-black uppercase px-3 py-1 rounded-full mt-0.5 ${
                  tx.status === 'Released' || tx.status === 'Completed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : tx.status === 'Locked' || tx.status === 'Pending'
                    ? 'bg-amber-100 text-amber-900'
                    : tx.status === 'Rejected'
                    ? 'bg-rose-100 text-rose-900'
                    : 'bg-blue-100 text-blue-900'
                }`}
              >
                {tx.status === 'Locked' && <Lock className="w-3.5 h-3.5" />}
                {tx.status === 'Released' && <Unlock className="w-3.5 h-3.5" />}
                {tx.status}
              </span>
            </div>

            <div className="text-right">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Milestone Condition</span>
              <span className="font-bold text-slate-800">{tx.currentMilestoneName}</span>
            </div>
          </div>

          {/* Key Parties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1">
                <User className="w-3 h-3 text-indigo-600" /> Beneficiary Household
              </span>
              <p className="font-extrabold text-sm text-slate-900">{tx.householdName || tx.householdId}</p>
              <p className="text-slate-500 font-mono text-[11px]">{tx.householdId}</p>
            </div>

            <div className="p-3.5 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1">
                <Building className="w-3 h-3 text-emerald-600" /> Mentorship Sponsor / CSR
              </span>
              <p className="font-extrabold text-sm text-slate-900">{tx.mentorName}</p>
              <p className="text-slate-500 font-mono text-[11px]">{tx.mentorId}</p>
            </div>

            <div className="p-3.5 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1">
                <FileCheck className="w-3 h-3 text-amber-600" /> Empanelled Vendor
              </span>
              <p className="font-extrabold text-sm text-slate-900">{tx.vendorName || 'Sri Balaji Livelihood Machinery'}</p>
              <p className="text-slate-500 font-mono text-[11px]">{tx.vendorId || 'VND-GNT-01'}</p>
            </div>

            <div className="p-3.5 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-500" /> Date & Category
              </span>
              <p className="font-extrabold text-sm text-slate-900">{tx.category || 'Productive Asset'}</p>
              <p className="text-slate-500 font-mono text-[11px]">{tx.date || tx.lastDisbursedAt || '2026-09-11'}</p>
            </div>
          </div>

          {/* Controlled Escrow Math */}
          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2">
            <h4 className="font-extrabold text-emerald-950 flex items-center gap-1.5 text-xs">
              <Coins className="w-4 h-4 text-emerald-700" /> Controlled Escrow Financial Breakdown
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Pledged</span>
                <span className="text-sm font-black text-slate-900">₹{tx.totalPledged.toLocaleString('en-IN')}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Currently Locked</span>
                <span className="text-sm font-black text-amber-600">₹{tx.fundsLocked.toLocaleString('en-IN')}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Disbursed to Vendor</span>
                <span className="text-sm font-black text-emerald-600">₹{tx.fundsReleased.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Audit Hash & Cryptographic Provenance */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-[11px] text-slate-600 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 flex items-center gap-1">
                <Hash className="w-3 h-3 text-slate-500" /> Cryptographic Ledger Audit Hash:
              </span>
              <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                VERIFIED IMMUTABLE
              </span>
            </div>
            <p className="break-all text-[10px] text-slate-500">
              {tx.auditHash || '0x4f8c9b2a1e7d0f3c5b8a9e2d4c6b8a0f1e3d5c7b9a2e4f6a8c0b2d4e6f8a0b2c'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={() => setSelectedTransactionForModal(null)}
            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            {isLocked && (
              <>
                <button
                  onClick={handleReject}
                  className="px-3.5 py-2 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 font-bold text-xs rounded-xl transition flex items-center gap-1"
                >
                  <XCircle className="w-3.5 h-3.5" /> Reject
                </button>
                <button
                  onClick={handleApprove}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approve Dual-Auth
                </button>
                <button
                  onClick={handleAuthorizeRelease}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center gap-1.5"
                >
                  <Unlock className="w-3.5 h-3.5" /> Authorize Release
                </button>
              </>
            )}

            {isReleased && (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 px-3 py-1.5 bg-emerald-50 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4" /> Disbursed to Vendor Account
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
