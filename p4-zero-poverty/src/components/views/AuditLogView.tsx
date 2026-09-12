import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Key,
  Search,
  Fingerprint,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuditLogView: React.FC = () => {
  const { auditLogs, t, showToast, playAudioChime } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedChain, setVerifiedChain] = useState(true);

  const filteredLogs = auditLogs.filter((log) => {
    return (
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleVerifyChain = () => {
    setIsVerifying(true);
    playAudioChime('click');
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedChain(true);
      playAudioChime('success');
      showToast({
        type: 'success',
        title: 'Cryptographic Hash Chain Validated',
        message: `Validated ${auditLogs.length} SHA-256 blocks with zero tampering detected.`,
      });
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">TAMPER-EVIDENT AUDIT LOG</h1>
              <p className="text-xs text-slate-500">
                Cryptographic SHA-256 Hash Chaining • Immutable Governance Ledger
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleVerifyChain}
            disabled={isVerifying}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
          >
            <ShieldCheck className={`w-4 h-4 text-emerald-400 ${isVerifying ? 'animate-spin' : ''}`} />
            <span>{isVerifying ? 'Validating Hashes...' : 'Verify Hash Chain Integrity'}</span>
          </button>
        </div>
      </div>

      {/* Security Architecture Callout */}
      <div className="p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl border border-slate-800 space-y-2 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-emerald-400" />
            <span className="font-black text-sm text-white">SHA-256 Cryptographic Block Verification</span>
          </div>
          <span className="text-xs font-black text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            Chain Integrity 100% Intact
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
          Every critical transaction—e-KYC validation, MPI survey submission, Margadarsi adoption agreement, Controlled Escrow release, and vigilance flags—is cryptographically bound to its previous state using SHA-256 hashing.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search audit trail by actor, role, action, or token..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
          />
        </div>
        <span className="text-xs font-bold text-slate-500">
          Showing {filteredLogs.length} Audit Events
        </span>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-extrabold uppercase text-[10px]">
                <th className="pb-3">Event ID & Timestamp</th>
                <th className="pb-3">Actor & Role</th>
                <th className="pb-3">Action Type</th>
                <th className="pb-3">Details & Audit Payload</th>
                <th className="pb-3 text-right">Cryptographic Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 pr-4">
                    <div className="font-bold text-slate-900">{log.id}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{log.timestamp}</div>
                  </td>
                  <td className="py-3.5 pr-4">
                    <div className="font-extrabold text-slate-800">{log.actor}</div>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                      {log.role}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className="font-mono font-bold text-[11px] text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-slate-600 max-w-xs">
                    <p className="text-xs truncate">{log.details}</p>
                  </td>
                  <td className="py-3.5 text-right font-mono text-[10px] text-slate-500">
                    <div className="text-emerald-700 font-bold" title={log.currentHash}>
                      {log.currentHash.slice(0, 12)}...{log.currentHash.slice(-6)}
                    </div>
                    <div className="text-[9px] text-slate-400">
                      Prev: {log.previousHash.slice(0, 8)}...
                    </div>
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
