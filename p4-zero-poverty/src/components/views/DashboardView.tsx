import React from 'react';
import {
  Users,
  HeartHandshake,
  TrendingDown,
  Coins,
  ShieldAlert,
  ClipboardCheck,
  Play,
  Volume2,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  Sparkles,
  HelpCircle,
  FileCheck2,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { P4Logo } from '../brand/P4Logo';

export const DashboardView: React.FC = () => {
  const {
    role,
    families,
    mentors,
    anomalies,
    escrows,
    t,
    setActiveNav,
    handleSelectHousehold,
    handleNewBaselineSurvey,
    handleSpeakYourNeed,
    handleEmergencyHelp,
    startMasterDemo,
    handleAdoptFamily
  } = useApp();

  const totalFamilies = families.length;
  const verifiedFamilies = families.filter((f) => f.eKycStatus === 'Verified').length;
  const adoptedFamilies = families.filter((f) => f.mentorId !== null).length;
  const criticalFamilies = families.filter((f) => f.povertyCategory === 'Critical' || f.povertyCategory === 'High Risk').length;
  const totalCommitted = escrows.reduce((acc, e) => acc + e.totalPledged, 0);
  const totalReleased = escrows.reduce((acc, e) => acc + e.fundsReleased, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Hero Governance Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              National Social-Impact Architecture • SIH Hackathon Prototype
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              P4: People • Progress • Partnership • Poverty Exit
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Empowering bottom-of-the-pyramid families to sustainably exit multidimensional poverty
              through verifiable field assessments, AI need classification, non-commercial Margadarsi mentorship,
              and Controlled Escrow vendor disbursements.
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <button
                onClick={startMasterDemo}
                className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-xl text-xs shadow-lg transition hover:scale-105 flex items-center gap-2 ring-2 ring-amber-400/50"
              >
                <Play className="w-4 h-4 fill-current text-slate-950" />
                {t('action.run_demo')}
              </button>

              <button
                onClick={handleSpeakYourNeed}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 border border-white/20"
              >
                <Volume2 className="w-4 h-4 text-emerald-400" />
                {t('action.speak_your_need')}
              </button>

              <button
                onClick={handleEmergencyHelp}
                className="px-4 py-2.5 bg-red-600/80 hover:bg-red-600 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shadow"
              >
                <AlertTriangle className="w-4 h-4" />
                {t('action.emergency_help')}
              </button>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-end justify-center">
            <P4Logo size="lg" variant="compact" theme="dark" showSubtitle={false} />
            <div className="mt-2 text-right">
              <span className="text-[11px] font-bold text-slate-400 block">Perspective Role:</span>
              <span className="text-xs font-black text-amber-400 uppercase tracking-wide">
                {role.replace('-', ' ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveNav('families')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">{t('metric.total_families')}</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700 group-hover:scale-110 transition">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{totalFamilies}</span>
            <span className="text-[11px] font-bold text-emerald-600">{verifiedFamilies} e-KYC Verified</span>
          </div>
          <div className="mt-3 flex items-center text-[11px] font-bold text-blue-600 gap-1">
            <span>Manage Households</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

        <div
          onClick={() => setActiveNav('mentors')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">{t('metric.families_adopted')}</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700 group-hover:scale-110 transition">
              <HeartHandshake className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{adoptedFamilies}</span>
            <span className="text-[11px] font-bold text-amber-600">{mentors.length} Margadarsi Mentors</span>
          </div>
          <div className="mt-3 flex items-center text-[11px] font-bold text-amber-600 gap-1">
            <span>View Mentorship Plans</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

        <div
          onClick={() => setActiveNav('funds')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Controlled Escrow</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 group-hover:scale-110 transition">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">₹{(totalReleased / 1000).toFixed(0)}k</span>
            <span className="text-[11px] font-bold text-slate-400">/ ₹{(totalCommitted / 1000).toFixed(0)}k Locked</span>
          </div>
          <div className="mt-3 flex items-center text-[11px] font-bold text-emerald-600 gap-1">
            <span>Inspect Escrow Ledger</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

        <div
          onClick={() => setActiveNav('fraud_vigilance')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">{t('metric.fraud_alerts')}</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-700 group-hover:scale-110 transition">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-rose-700">{anomalies.filter((a) => a.status !== 'Cleared').length}</span>
            <span className="text-[11px] font-bold text-rose-600">Active Flags</span>
          </div>
          <div className="mt-3 flex items-center text-[11px] font-bold text-rose-600 gap-1">
            <span>Open Vigilance Radar</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Two Columns: Actionable Roster + Quick Workflows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Priority Households */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">High-Priority Households (BPL Focus)</h2>
              <p className="text-xs text-slate-500">Beneficiary families requiring immediate survey updates or adoption linkage</p>
            </div>
            <button
              onClick={() => setActiveNav('families')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              <span>View All 25</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {families.slice(0, 5).map((fam) => (
              <div
                key={fam.id}
                onClick={() => handleSelectHousehold(fam.id)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 group bg-slate-50/50 hover:bg-white"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs text-white flex-shrink-0 ${
                      fam.povertyScore >= 80
                        ? 'bg-rose-600'
                        : fam.povertyScore >= 60
                        ? 'bg-amber-500'
                        : fam.povertyScore >= 40
                        ? 'bg-blue-600'
                        : 'bg-emerald-600'
                    }`}
                  >
                    {fam.povertyScore}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition">
                        {fam.familyName}
                      </h3>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                        {fam.id}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {fam.village}, {fam.mandal} • Monthly Income: ₹{fam.monthlyIncome.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      fam.mentorId
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {fam.mentorId ? `Adopted: ${fam.mentorName?.split(' ')[0]}` : 'Awaiting Mentor'}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectHousehold(fam.id);
                    }}
                    className="px-3 py-1 bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold rounded-xl transition"
                  >
                    {t('action.select_household')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Quick Actions & P4 Pillar Progress */}
        <div className="space-y-6">
          {/* Quick Action Station */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Quick Actions</h2>
            
            <div className="space-y-2">
              <button
                onClick={handleNewBaselineSurvey}
                className="w-full p-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 text-xs font-bold transition flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <ClipboardCheck className="w-4 h-4 text-teal-700" />
                  <span>{t('action.new_baseline_survey')}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-teal-600" />
              </button>

              <button
                onClick={() => setActiveNav('matching')}
                className="w-full p-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>{t('action.match')}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-600" />
              </button>

              <button
                onClick={() => setActiveNav('schemes')}
                className="w-full p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold transition flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <FileCheck2 className="w-4 h-4 text-blue-700" />
                  <span>{t('action.recommended_schemes')}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-600" />
              </button>

              <button
                onClick={() => setActiveNav('gis_map')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 text-xs font-bold transition flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-700" />
                  <span>{t('action.view_map')}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>

          {/* 4 Pillars Progress Widget */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-md border border-slate-800 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
              The Four Interconnected Pillars
            </h3>

            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-sky-400">1. People (Citizens)</span>
                  <span>100% e-KYC Verified</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-sky-400 rounded-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-teal-400">2. Progress (MPI Graduation)</span>
                  <span>68% Graduating</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-teal-400 rounded-full w-[68%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-amber-400">3. Partnership (Margadarsi)</span>
                  <span>84% Mentored</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[84%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-emerald-400">4. Poverty Exit (Sustainable)</span>
                  <span>42% Exited</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full w-[42%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
