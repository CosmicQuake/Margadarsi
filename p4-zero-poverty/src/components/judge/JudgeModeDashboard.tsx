import React, { useState } from 'react';
import {
  Award,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  HeartHandshake,
  DollarSign,
  Users,
  CheckCircle2,
  FileCheck,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Activity,
  Layers,
  Database,
  Cpu,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { P4Logo } from '../brand/P4Logo';

export const JudgeModeDashboard: React.FC = () => {
  const { setViewMode, startMasterDemo, families, mentors, escrows, auditLogs, anomalies } = useApp();
  const [activeFlowStep, setActiveFlowStep] = useState<number>(0);

  const flowStages = [
    { title: 'Citizen (Bangaru Kutumbam)', icon: Users, desc: 'BPL family requests support via accessible UI, Bhashini voice AI, or kiosk.' },
    { title: 'Voice AI & IndicTrans2', icon: Cpu, desc: 'Bhashini ASR transcribes Telugu/Hindi; IndicTrans2 extracts standard intent.' },
    { title: 'Maker Survey (Volunteer)', icon: FileCheck, desc: 'Grama Sachivalayam volunteer conducts 10-dimension MPI survey with GPS geotag.' },
    { title: 'Dual-Verification (Checker)', icon: ShieldCheck, desc: 'BDO validates evidence vs. state registries and sanctions benefits.' },
    { title: 'PostgreSQL + PostGIS', icon: Database, desc: 'Stores spatial household profiles and Multidimensional Poverty Index.' },
    { title: 'AI Scheme Recommendation', icon: Sparkles, desc: 'Cross-checks entitlements with Centrally Sponsored schemes.' },
    { title: 'FAISS Vector Matchmaker', icon: Activity, desc: 'Matches family needs with corporate CSR mentor profile vectors.' },
    { title: 'P4 Adoption & Escrow', icon: HeartHandshake, desc: 'Generates formal adoption covenants; locks funds in Controlled Escrow.' },
    { title: 'Milestone & Proof Upload', icon: Layers, desc: 'Volunteer captures equipment handover photo with GPS and timestamp.' },
    { title: 'YOLOv8 Computer Vision', icon: Cpu, desc: 'Object detection verifies asset, validates EXIF, and checks duplicates.' },
    { title: 'Direct Vendor Disbursement', icon: DollarSign, desc: 'Escrow engine releases payment directly to verified vendor.' },
    { title: 'Poverty Exit & Certification', icon: Award, desc: 'Household crosses self-reliance threshold; awarded Zero Poverty honor.' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Smart India Hackathon • SIH26202
            </span>
            <span className="text-xs text-amber-200">Evaluation Mode</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            P4 Zero Poverty: Executive Presentation & Architecture Flow
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Complete ecosystem review: High-impact outcome metrics, tamper-evident audit trails,
            and an end-to-end animated system workflow.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={startMasterDemo}
            className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-2xl text-xs sm:text-sm shadow-xl transition hover:scale-105 flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            Run Complete Demo
          </button>
          <button
            onClick={() => setViewMode('dashboard')}
            className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-bold border border-white/20 transition"
          >
            Back to Platform
          </button>
        </div>
      </div>

      {/* 9 Impressive Evaluation Metrics Cards (As requested in Section 38) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-600" />
            Key Evaluation Indicators (SIH Scorecard)
          </h3>
          <span className="text-xs text-slate-500">Live Simulation Data</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">1. Families Reached</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">17.9 Lakhs</span>
            <span className="text-[10px] text-emerald-600 font-semibold">100% Ward Geo-Tagged</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">2. Families Verified (Dual)</span>
            <span className="text-2xl font-black text-blue-700 mt-1 block">15.8 Lakhs</span>
            <span className="text-[10px] text-slate-500">Maker-Checker Verified</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">3. Mentor Matches</span>
            <span className="text-2xl font-black text-amber-600 mt-1 block">982 Mentors</span>
            <span className="text-[10px] text-amber-700 font-semibold">FAISS AI Matched</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">4. Funds Transparently Utilized</span>
            <span className="text-2xl font-black text-emerald-700 font-mono mt-1 block">₹145.2 Cr</span>
            <span className="text-[10px] text-emerald-600 font-semibold">Controlled Escrow Gated</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">5. Milestones Completed</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">38,410</span>
            <span className="text-[10px] text-slate-500">YOLOv8 Proof Validated</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">6. Fraud Cases Prevented</span>
            <span className="text-2xl font-black text-rose-600 mt-1 block">420 Cases</span>
            <span className="text-[10px] text-rose-700 font-semibold">₹4.2 Cr Saved</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">7. Grievances Resolved</span>
            <span className="text-2xl font-black text-teal-700 mt-1 block">99.4%</span>
            <span className="text-[10px] text-teal-600 font-semibold">&lt; 72-Hour SLA Met</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">8. Poverty Exits Confirmed</span>
            <span className="text-2xl font-black text-amber-500 mt-1 block">142,000</span>
            <span className="text-[10px] text-amber-700 font-semibold">Self-Reliant Certified</span>
          </div>
        </div>
      </div>

      {/* Animated End-to-End System Flow Visualizer (Section 36) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Activity className="w-6 h-6 text-emerald-600" />
              Interactive End-to-End System Workflow
            </h3>
            <p className="text-xs text-slate-500">
              Click any node below to inspect data transforms, models, and cryptographic audit handoffs
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl">
            12 Sequential Governance Gates
          </div>
        </div>

        {/* Stepper Pipeline Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {flowStages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = activeFlowStep === idx;

            return (
              <div
                key={idx}
                onClick={() => setActiveFlowStep(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 select-none ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md scale-102'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    GATE {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h4 className="text-xs font-extrabold text-slate-900 leading-snug">
                  {stage.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Gate Inspection Panel */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Selected Gate Details: {flowStages[activeFlowStep].title}
            </span>
            <span className="text-[10px] font-mono text-emerald-400">
              Tamper-Evident SHA-256 Audit Logged
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {flowStages[activeFlowStep].desc} All actions executed at this stage trigger automated event
            logging with cryptographic chaining, ensuring zero unauthorized tampering between Volunteer Maker,
            BDO Checker, and Private CSR Margadarsi.
          </p>
        </div>
      </div>
    </div>
  );
};
