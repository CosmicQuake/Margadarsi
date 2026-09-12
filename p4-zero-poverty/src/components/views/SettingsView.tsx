import React, { useState } from 'react';
import {
  Settings,
  Languages,
  Shield,
  Lock,
  Eye,
  CheckCircle2,
  Server,
  UserCheck,
  RotateCcw,
  FileText
} from 'lucide-react';
import { useApp, UserRole } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../../i18n/translations';

export const SettingsView: React.FC = () => {
  const { role, setRole, language, setLanguage, t, resetDemoData, showToast, playAudioChime } = useApp();
  const [dataMaskingEnabled, setDataMaskingEnabled] = useState(true);
  const [gpsPrecisionTolerance, setGpsPrecisionTolerance] = useState('5 meters');

  const rbacMatrix = [
    { role: 'Bangaru Kutumbam', viewProfile: 'Full', approveGrant: 'None', auditLog: 'Self', vigilance: 'None' },
    { role: 'Field Worker (Maker)', viewProfile: 'Full', approveGrant: 'Submit Only', auditLog: 'Ward', vigilance: 'Flag Only' },
    { role: 'Mandal Officer (Checker)', viewProfile: 'Full', approveGrant: 'Sanction', auditLog: 'Mandal', vigilance: 'Review' },
    { role: 'Margadarsi (Mentor)', viewProfile: 'Masked', approveGrant: 'Pledge Escrow', auditLog: 'Adopted', vigilance: 'None' },
    { role: 'Vigilance Officer', viewProfile: 'Investigative', approveGrant: 'Freeze', auditLog: 'Full Chain', vigilance: 'Full Authority' },
    { role: 'State Command Center', viewProfile: 'Anonymized', approveGrant: 'Budget Alloc', auditLog: 'Statewide', vigilance: 'Oversee' },
    { role: 'Livelihood Vendor', viewProfile: 'Order Level', approveGrant: 'Claim Payout', auditLog: 'Orders', vigilance: 'None' },
    { role: 'System Administrator', viewProfile: 'Full', approveGrant: 'Full', auditLog: 'Root Cryptographic', vigilance: 'Full' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{t('nav.settings')}</h1>
              <p className="text-xs text-slate-500">
                System Configurations, Zero-Trust Permissions & Data Privacy Notice
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={resetDemoData}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Demo Databases</span>
        </button>
      </div>

      {/* Language Preferences */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Languages className="w-5 h-5 text-sky-600" />
          <h2 className="text-base font-extrabold text-slate-900">National Vernacular Language Selector</h2>
        </div>
        <p className="text-xs text-slate-500">
          Select your preferred interface language. English is the default. All labels, notifications, voice responses, and reports dynamically adapt.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`p-4 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 shadow-sm ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-amber-400'
                    : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200'
                }`}
              >
                <span className="text-xs font-extrabold">{lang.name}</span>
                <span className={`text-[11px] ${isSelected ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
                  {lang.nativeName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Zero-Trust RBAC Matrix */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base font-extrabold text-slate-900">Zero-Trust Role-Based Access Control (RBAC)</h2>
        </div>
        <p className="text-xs text-slate-500">
          Enforced at both FastAPI backend service layer and React UI client state.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-extrabold uppercase text-[10px]">
                <th className="pb-3">Role Type</th>
                <th className="pb-3">Beneficiary Data Visibility</th>
                <th className="pb-3">Grant & Escrow Approval</th>
                <th className="pb-3">Audit Log Access</th>
                <th className="pb-3">Vigilance Authority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rbacMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3 font-extrabold text-slate-900">{row.role}</td>
                  <td className="py-3 text-slate-600">{row.viewProfile}</td>
                  <td className="py-3 text-slate-600">{row.approveGrant}</td>
                  <td className="py-3 text-slate-600">{row.auditLog}</td>
                  <td className="py-3 text-slate-600">{row.vigilance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Consent & Data Privacy Notice */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-extrabold text-slate-900">Beneficiary Consent & Data Privacy Safeguards</h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          1. <strong>Strict Data Minimization:</strong> Aadhaar numbers are securely masked (XXXX-XXXX-1234) and stored as non-reversible one-way cryptographic hashes.
          <br />
          2. <strong>Mentor Anonymity Buffer:</strong> Mentors inspect anonymized multidimensional need vectors and demographic archetypes prior to formal adoption agreement execution.
          <br />
          3. <strong>Grama Sabha Public Oversight:</strong> Household beneficiary selections undergo open community validation to prevent middleman extortion and elite capture.
        </p>
      </div>
    </div>
  );
};
