import React from 'react';
import {
  ShieldCheck,
  Hash,
  Clock,
  User,
  Activity,
  FileCheck,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TamperEvidentAuditView: React.FC = () => {
  const { auditLogs } = useApp();

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-full border border-slate-300">
              Cryptographic Event Chain
            </span>
            <span className="text-xs text-slate-400">
              SHA-256 Linked Sequence
            </span>
          </div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            TAMPER-EVIDENT AUDIT LOG
          </h3>
        </div>

        <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-xl border border-emerald-200">
          {auditLogs.length} Cryptographically Chained Events
        </span>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
            <tr>
              <th className="p-3.5">Event ID</th>
              <th className="p-3.5">Timestamp</th>
              <th className="p-3.5">Actor & Role</th>
              <th className="p-3.5">Action Code</th>
              <th className="p-3.5">Details</th>
              <th className="p-3.5">Previous Hash ➔ Current Hash</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
            {auditLogs.slice().reverse().map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/80">
                <td className="p-3.5 font-bold text-slate-900">{log.id}</td>
                <td className="p-3.5 text-slate-500">{log.timestamp.replace('T', ' ').slice(0, 19)}</td>
                <td className="p-3.5 font-sans">
                  <strong className="text-slate-900 block">{log.actor}</strong>
                  <span className="text-[10px] text-slate-500">{log.role}</span>
                </td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold border border-slate-200">
                    {log.action}
                  </span>
                </td>
                <td className="p-3.5 font-sans text-slate-600 max-w-xs truncate">
                  {log.details}
                </td>
                <td className="p-3.5 text-[9px] text-slate-500">
                  <span className="text-slate-400 block truncate max-w-[120px]">
                    Prev: {log.previousHash.slice(0, 16)}...
                  </span>
                  <span className="text-emerald-700 font-bold block truncate max-w-[120px]">
                    Curr: {log.currentHash.slice(0, 16)}...
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
