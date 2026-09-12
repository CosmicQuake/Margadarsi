import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Award,
  Printer,
  X,
  Search,
  ChevronRight,
  Filter,
  ShieldAlert,
  Edit3,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SchemeItem, Family } from '../../data/mockData';

export const MandalCheckerView: React.FC = () => {
  const {
    families,
    sanctionScheme,
    rejectScheme,
    requestCorrection,
    flagForInvestigation,
  } = useApp();

  const [sanctionModalData, setSanctionModalData] = useState<{
    family: Family;
    scheme: SchemeItem;
  } | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [correctionText, setCorrectionText] = useState('');
  const [targetFamily, setTargetFamily] = useState<Family | null>(null);
  const [targetSchemeId, setTargetSchemeId] = useState<string>('');

  const pendingApplications: { family: Family; scheme: SchemeItem }[] = [];
  families.forEach((fam) => {
    fam.schemes.forEach((sch) => {
      if (sch.status === 'Under Review') {
        pendingApplications.push({ family: fam, scheme: sch });
      }
    });
  });

  const handleOpenSanctionLetter = (family: Family, scheme: SchemeItem) => {
    sanctionScheme(family.id, scheme.id, scheme.sanctionAmount || 25000);
    setSanctionModalData({ family, scheme });
  };

  const handleInitiateReject = (family: Family, schemeId: string) => {
    setTargetFamily(family);
    setTargetSchemeId(schemeId);
    setShowRejectModal(true);
  };

  const confirmRejection = () => {
    if (targetFamily && targetSchemeId) {
      rejectScheme(targetFamily.id, targetSchemeId, rejectReason || 'Ineligible by documentation');
      setShowRejectModal(false);
      setRejectReason('');
    }
  };

  const handleInitiateCorrection = (family: Family) => {
    setTargetFamily(family);
    setShowCorrectionModal(true);
  };

  const confirmCorrection = () => {
    if (targetFamily) {
      requestCorrection(targetFamily.id, correctionText || 'Please verify landless certificate with local land registry.');
      setShowCorrectionModal(false);
      setCorrectionText('');
    }
  };

  const handleFlagInvestigation = (family: Family) => {
    if (window.confirm(`Flag Household ${family.id} for Vigilance Investigation and freeze benefits?`)) {
      flagForInvestigation(family.id, 'Discrepancy observed between claimed income and reported assets.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Officer Header */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl border border-blue-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-500/30 text-blue-300 text-xs font-bold px-3 py-0.5 rounded-full border border-blue-500/40">
              Administrative Checker • Dual-Verification Authority
            </span>
            <span className="text-xs text-slate-400 font-mono">Officer ID: BDO-TEN-04</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Sri S. Ramanjaneyulu, Block Development Officer (BDO)
          </h2>
          <p className="text-xs text-blue-200 mt-0.5">
            P4 Zero Poverty Elimination Directorate • Rural Development Division
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">
              Pending in Queue
            </span>
            <span className="text-xl font-black text-amber-400">
              {pendingApplications.length}
            </span>
          </div>
          <div className="bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">
              Sanctions Cleared
            </span>
            <span className="text-xl font-black text-emerald-400">
              1,240
            </span>
          </div>
        </div>
      </div>

      {/* Verification Queue (Section 7) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-blue-700" />
              Maker ➔ Checker Dual-Signature Verification Queue
            </h3>
            <p className="text-xs text-slate-500">
              Independent audit of field surveys before public welfare disbursements enter the master database
            </p>
          </div>

          <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
            {pendingApplications.length} Records Pending Checker Approval
          </span>
        </div>

        {pendingApplications.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-800">Verification Queue Cleared</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Switch to Volunteer (Maker) role to log a new household survey.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingApplications.map(({ family, scheme }) => (
              <div
                key={`${family.id}-${scheme.id}`}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
              >
                {/* Beneficiary & Scheme Info */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                      {family.id}
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {family.headOfHousehold} ({family.familyName})
                    </span>
                    <span className="text-[11px] text-slate-500">
                      • {family.village}, {family.mandal}
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-blue-950">
                    {scheme.name}
                  </h4>
                  <p className="text-xs font-semibold text-emerald-700">
                    Benefit: {scheme.benefit}
                  </p>

                  <div className="text-xs text-slate-600 flex flex-wrap items-center gap-3 pt-1">
                    <span>MPI Poverty Score: <strong className="text-slate-900">{family.povertyScore}/100</strong></span>
                    <span>Maker Volunteer: <strong>{family.assignedVolunteerName}</strong></span>
                    <span>Monthly Income: <strong>₹{family.monthlyIncome.toLocaleString('en-IN')}</strong></span>
                    <span className="text-emerald-700 font-semibold">GPS: Validated</span>
                    <span className="text-teal-700 font-semibold">Duplicate Status: Clear</span>
                  </div>
                </div>

                {/* All 4 Verification Action Buttons (Section 7) */}
                <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                  {/* 1. Approve */}
                  <button
                    onClick={() => handleOpenSanctionLetter(family, scheme)}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow transition flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                  </button>

                  {/* 2. Reject */}
                  <button
                    onClick={() => handleInitiateReject(family, scheme.id)}
                    className="px-3 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-700 text-xs font-bold rounded-xl transition"
                  >
                    Reject
                  </button>

                  {/* 3. Request Correction */}
                  <button
                    onClick={() => handleInitiateCorrection(family)}
                    className="px-3 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold rounded-xl transition flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Request Correction
                  </button>

                  {/* 4. Flag for Investigation */}
                  <button
                    onClick={() => handleFlagInvestigation(family)}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition flex items-center gap-1"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> Flag Investigation
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Official Sanction Certificate Modal */}
      {sanctionModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600" /> Official Sanction Order
              </span>
              <button onClick={() => setSanctionModalData(null)} className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-8 space-y-6 text-slate-900">
              <div className="text-center border-b pb-4 border-slate-200">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500">P4 Zero Poverty Elimination Mission</div>
                <h3 className="text-lg font-black text-blue-950 mt-0.5">Office of the Block Development Officer</h3>
                <p className="text-[11px] text-slate-600">Sanction Proceedings No: P4/BDO/2026/0942</p>
              </div>

              <div className="text-xs leading-relaxed space-y-3">
                <p>
                  Having duly verified the Multidimensional Poverty Index field report submitted by Community Volunteer{' '}
                  <strong>{sanctionModalData.family.assignedVolunteerName}</strong>, the Checker Authority hereby sanctions:
                </p>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 text-center">
                  <span className="text-xs font-bold text-emerald-900 block uppercase">Sanctioned Grant Amount</span>
                  <span className="text-2xl font-black text-emerald-800 font-mono">
                    ₹{Number(sanctionModalData.scheme.sanctionAmount || 25000).toLocaleString('en-IN')}
                  </span>
                  <p className="text-[11px] text-emerald-700 mt-1">
                    Beneficiary: {sanctionModalData.family.headOfHousehold} (HH #{sanctionModalData.family.id})
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-end justify-between">
                <div className="text-[10px] font-mono text-blue-800 bg-blue-50 p-2 rounded">
                  ✓ DIGITALLY SIGNED & SEEDED IN P4 MASTER VAULT
                </div>
                <div className="text-right font-bold text-xs text-slate-900">
                  S. Ramanjaneyulu, BDO
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button onClick={() => window.print()} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-700">
                  Print Sanction Order
                </button>
                <button onClick={() => setSanctionModalData(null)} className="px-5 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl">
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Revert Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">Reject Application</h3>
            <textarea rows={3} value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="State justification for rejection..." className="w-full p-3 rounded-xl border border-slate-300 text-xs" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowRejectModal(false)} className="px-4 py-2 border rounded-xl text-xs font-bold">Cancel</button>
              <button onClick={confirmRejection} className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold">Confirm Rejection</button>
            </div>
          </div>
        </div>
      )}

      {/* Request Correction Modal */}
      {showCorrectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">Request Correction from Maker</h3>
            <textarea rows={3} value={correctionText} onChange={(e) => setCorrectionText(e.target.value)} placeholder="Detail corrections required..." className="w-full p-3 rounded-xl border border-slate-300 text-xs" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowCorrectionModal(false)} className="px-4 py-2 border rounded-xl text-xs font-bold">Cancel</button>
              <button onClick={confirmCorrection} className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold">Send to Maker</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
