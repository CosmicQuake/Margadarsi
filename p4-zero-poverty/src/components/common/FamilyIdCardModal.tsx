import React from 'react';
import { X, Printer, ShieldCheck, QrCode, UserCheck, HeartHandshake } from 'lucide-react';
import { Family } from '../../data/mockData';
import { P4Logo } from '../brand/P4Logo';

import { useApp } from '../../context/AppContext';

interface FamilyIdCardModalProps {
  family: Family;
  isOpen: boolean;
  onClose: () => void;
}

export const FamilyIdCardModal: React.FC<FamilyIdCardModalProps> = ({ family, isOpen, onClose }) => {
  const { language } = useApp();
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Actions bar */}
        <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Official Smart ID Preview
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Card
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The Smart Card Container */}
        <div className="p-6 bg-slate-50 flex justify-center">
          <div className="w-full max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl shadow-xl overflow-hidden border-2 border-amber-400/80 relative">
            {/* Holographic Security Stripe */}
            <div className="h-2 bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400 w-full" />

            {/* Card Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <P4Logo size="sm" theme="dark" showSubtitle={false} />
              <div className="text-right">
                <span className="text-[10px] font-black text-amber-400 tracking-wider uppercase block">
                  {language === 'te' ? 'బంగారు కుటుంబం' : 'BANGARU KUTUMBAM'}
                </span>
                <span className="text-[9px] text-slate-300 uppercase tracking-widest font-mono">
                  ZERO POVERTY ID
                </span>
              </div>
            </div>

            {/* Card Details */}
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-4">
                {/* Photo Placeholder */}
                <div className="w-20 h-24 rounded-xl bg-slate-700 border-2 border-amber-400/60 overflow-hidden flex-shrink-0 flex flex-col items-center justify-center text-slate-400 shadow-inner">
                  <UserCheck className="w-8 h-8 text-emerald-400" />
                  <span className="text-[9px] text-center font-bold text-slate-300 mt-1 uppercase">
                    BIOMETRIC
                  </span>
                  <span className="text-[8px] text-emerald-300">VERIFIED</span>
                </div>

                {/* Head Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-extrabold text-white truncate">
                    {family.headOfHousehold}
                  </h4>
                  <p className="text-xs text-amber-300 font-medium truncate">
                    {language === 'te' ? family.familyNameTe : family.familyName}
                  </p>
                  <div className="mt-2 space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-300 font-mono text-[11px]">
                      <span>ID:</span>
                      <strong className="text-white">{family.id}</strong>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300 font-mono text-[11px]">
                      <span>Ration:</span>
                      <span className="text-slate-200">{family.rationCardNo}</span>
                    </div>
                    <div className="text-slate-300 text-[11px] truncate">
                      {family.village}, {family.mandal}, {family.district}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status and Score Badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-center">
                <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                  <span className="text-[9px] text-slate-400 block uppercase font-medium">
                    Vulnerability Score
                  </span>
                  <span className="text-base font-black text-amber-400">
                    {family.povertyScore}
                    <span className="text-xs text-slate-400 font-normal">/100</span>
                  </span>
                </div>
                <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                  <span className="text-[9px] text-slate-400 block uppercase font-medium">
                    Current Phase
                  </span>
                  <span className="text-xs font-bold text-emerald-400 truncate block mt-0.5">
                    {family.povertyStatus}
                  </span>
                </div>
              </div>

              {/* Partnership Tags */}
              <div className="bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/30 text-[11px] space-y-1">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1">
                    <HeartHandshake className="w-3 h-3 text-emerald-400" />
                    Margadarsi (Mentor):
                  </span>
                  <span className="font-bold text-white truncate max-w-[140px]">
                    {family.mentorName ? family.mentorName.split('(')[0] : 'Open for Adoption'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Sachivalayam Volunteer:</span>
                  <span className="font-bold text-white truncate">{family.assignedVolunteerName}</span>
                </div>
              </div>
            </div>

            {/* Card Footer with QR & Government Validation Stamp */}
            <div className="p-3 bg-black/40 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded p-0.5 flex items-center justify-center">
                  <QrCode className="w-7 h-7 text-slate-900" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-300 block font-mono">
                    UIDAI & P4 NATIONAL PORTAL SECURE
                  </span>
                  <span className="text-[8px] text-emerald-400 flex items-center gap-1 font-bold">
                    <ShieldCheck className="w-2.5 h-2.5" /> TAMPER PROOF CHIP
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[8px] text-slate-400 block">National Zero Poverty Mission</span>
                <span className="text-[9px] font-bold text-amber-300">Mission Zero Poverty 2029</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
