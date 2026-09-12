import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Users,
  TrendingUp,
  HeartHandshake,
  Award,
  ShieldCheck,
  Compass,
  Play,
  CheckCircle2,
  Lock,
  Layers,
  FileCheck,
  Building,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { P4Logo } from '../brand/P4Logo';

export const LandingPage: React.FC = () => {
  const { setViewMode, setRole, startMasterDemo, families, mentors, escrows } = useApp();

  const handleLaunchDashboard = () => {
    setViewMode('dashboard');
  };

  const handleLaunchJudgeMode = () => {
    setViewMode('judge-mode');
  };

  const handleRunDemo = () => {
    setViewMode('dashboard');
    startMasterDemo();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Top Glass Navbar */}
      <nav className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <P4Logo size="md" theme="dark" variant="full" />

          <div className="flex items-center gap-3">
            <button
              onClick={handleLaunchJudgeMode}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-amber-300 bg-amber-950/60 border border-amber-500/40 hover:bg-amber-900/60 transition flex items-center gap-1.5 shadow-sm"
            >
              <Award className="w-3.5 h-3.5" />
              Judge Mode
            </button>

            <button
              onClick={handleLaunchDashboard}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5"
            >
              Launch Platform
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-1 flex flex-col justify-center text-center items-center">
        {/* Glow Spheres in background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          {/* SIH Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>SIH Problem Statement SIH26202 • Public-Private-People Partnership</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-none">
              P4 <span className="text-amber-400">ZERO</span>{' '}
              <span className="text-emerald-500">POVERTY</span>
            </h1>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-300 max-w-2xl mx-auto">
              "From Identification to Poverty Exit"
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed">
            An AI-powered, transparent, and community-driven ecosystem accelerating the journey
            from vulnerability to sustainable self-reliance. Connecting citizens, field workers,
            verified checkers, CSR mentors, and suppliers in a closed-loop governance framework.
          </p>

          {/* Master CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={handleRunDemo}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-2xl text-sm shadow-xl shadow-amber-950/50 transition hover:scale-105 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              RUN COMPLETE P4 DEMO (15 Steps)
            </button>

            <button
              onClick={handleLaunchDashboard}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-sm shadow-xl shadow-emerald-950/50 transition hover:scale-102 flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              Explore Platform
            </button>

            <button
              onClick={handleLaunchJudgeMode}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold rounded-2xl text-sm transition flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-amber-400" />
              Judge Evaluation Mode
            </button>
          </div>
        </div>

        {/* The 4 Pillars Showcase */}
        <div className="relative z-10 mt-20 w-full">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
            The Four Pillars of the P4 Architecture
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {/* Pillar 1: People */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-sky-800/40 hover:border-sky-500 transition space-y-3 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-black">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-400 block">
                Pillar 01
              </span>
              <h3 className="text-lg font-black text-white">People</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Empowering vulnerable households (Bangaru Kutumbam) with accessible low-literacy
                interfaces and Bhashini multilingual voice AI support.
              </p>
            </div>

            {/* Pillar 2: Progress */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-teal-800/40 hover:border-teal-500 transition space-y-3 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-black">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-400 block">
                Pillar 02
              </span>
              <h3 className="text-lg font-black text-white">Progress</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Data-driven tracking of the 10-dimension Multidimensional Poverty Index (MPI) and
                9-stage graduation journey toward self-reliance.
              </p>
            </div>

            {/* Pillar 3: Partnership */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-orange-800/40 hover:border-orange-500 transition space-y-3 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-black">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-400 block">
                Pillar 03
              </span>
              <h3 className="text-lg font-black text-white">Partnership</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connecting Government schemes with private CSR mentors (Margadarsi), controlled escrow
                seed grants, and verified local equipment suppliers.
              </p>
            </div>

            {/* Pillar 4: Poverty Exit */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-800/40 hover:border-emerald-500 transition space-y-3 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">
                Pillar 04
              </span>
              <h3 className="text-lg font-black text-white">Poverty Exit</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sustainable, permanent graduation above poverty thresholds with formal certification,
                anti-fraud surveillance, and agentic relapse prevention.
              </p>
            </div>
          </div>
        </div>

        {/* Live Ecosystem Metrics */}
        <div className="mt-16 pt-12 border-t border-slate-800 w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-3xl font-black text-white block">
              {families.length}+
            </span>
            <span className="text-xs text-slate-400 uppercase font-semibold mt-1 block">
              Synthetic BPL Households
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-3xl font-black text-emerald-400 block">
              46.8%
            </span>
            <span className="text-xs text-slate-400 uppercase font-semibold mt-1 block">
              Poverty Exit Rate
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-3xl font-black text-amber-400 block font-mono">
              ₹145+ Cr
            </span>
            <span className="text-xs text-slate-400 uppercase font-semibold mt-1 block">
              CSR & Private Capital
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <span className="text-3xl font-black text-sky-400 block">
              {mentors.length}
            </span>
            <span className="text-xs text-slate-400 uppercase font-semibold mt-1 block">
              Empanelled Margadarsis
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 border-t border-slate-800 bg-slate-950 text-center text-xs text-slate-500">
        P4 – Zero Poverty Digital Governance Ecosystem • SIH26202 Prototype
      </footer>
    </div>
  );
};
