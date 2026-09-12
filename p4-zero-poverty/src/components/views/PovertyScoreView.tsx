import React, { useState } from 'react';
import {
  TrendingDown,
  TrendingUp,
  Sliders,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PovertyScoreView: React.FC = () => {
  const { activeFamily, t, showToast, playAudioChime } = useApp();

  // Interactive 9-Dimension Simulation State
  const [dimensions, setDimensions] = useState({
    income: 78,
    employment: 70,
    housing: 80,
    education: 60,
    healthcare: 75,
    foodSecurity: 65,
    benefitAccess: 35,
    debt: 68,
    skills: 62,
  });

  const weights: Record<keyof typeof dimensions, number> = {
    income: 0.18,
    employment: 0.14,
    housing: 0.12,
    education: 0.12,
    healthcare: 0.12,
    foodSecurity: 0.10,
    benefitAccess: 0.08,
    debt: 0.08,
    skills: 0.06,
  };

  const calculatedScore = Math.round(
    Object.entries(dimensions).reduce((acc, [key, val]) => {
      return acc + val * weights[key as keyof typeof dimensions];
    }, 0)
  );

  const vulnerabilityScore = Math.round(
    dimensions.debt * 0.4 + dimensions.healthcare * 0.35 + dimensions.foodSecurity * 0.25
  );

  const povertyExitScore = Math.max(0, 100 - calculatedScore);

  const handleSliderChange = (dim: keyof typeof dimensions, value: number) => {
    setDimensions((prev) => ({ ...prev, [dim]: value }));
  };

  const handleResetDimensions = () => {
    setDimensions({
      income: 78,
      employment: 70,
      housing: 80,
      education: 60,
      healthcare: 75,
      foodSecurity: 65,
      benefitAccess: 35,
      debt: 68,
      skills: 62,
    });
    playAudioChime('click');
    showToast({
      type: 'info',
      title: 'Reset to Baseline',
      message: 'Restored dimensions to initial field survey baseline.',
    });
  };

  const handleSimulateExit = () => {
    setDimensions({
      income: 25,
      employment: 20,
      housing: 28,
      education: 30,
      healthcare: 22,
      foodSecurity: 15,
      benefitAccess: 10,
      debt: 12,
      skills: 20,
    });
    playAudioChime('success');
    showToast({
      type: 'success',
      title: 'Graduation Simulated',
      message: 'Productive dairy asset + steady revenues pushed household to Self-Reliant status!',
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{t('nav.poverty_score')}</h1>
              <p className="text-xs text-slate-500">
                Multidimensional Poverty Index (MPI) • 9 Dimensions Deprivation Assessment
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDimensions}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>

          <button
            onClick={handleSimulateExit}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
          >
            <Sparkles className="w-4 h-4" />
            <span>Simulate Poverty Exit</span>
          </button>
        </div>
      </div>

      {/* Primary 4 Metric Gauges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm text-center">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
            MPI Poverty Score
          </span>
          <div className="mt-2 text-3xl font-black text-slate-900">{calculatedScore} / 100</div>
          <span
            className={`inline-block mt-2 text-[10px] font-black px-2.5 py-0.5 rounded-full ${
              calculatedScore >= 75
                ? 'bg-rose-100 text-rose-800'
                : calculatedScore >= 50
                ? 'bg-amber-100 text-amber-800'
                : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            {calculatedScore >= 75 ? 'Critical Deprivation' : calculatedScore >= 50 ? 'Vulnerable' : 'Stabilizing'}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm text-center">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
            Vulnerability Index
          </span>
          <div className="mt-2 text-3xl font-black text-amber-600">{vulnerabilityScore}%</div>
          <span className="inline-block mt-2 text-[10px] font-bold text-slate-500">
            Debt & Health Shock Buffer
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm text-center">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
            Poverty Exit Score
          </span>
          <div className="mt-2 text-3xl font-black text-emerald-600">{povertyExitScore} / 100</div>
          <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700">
            Progress to Graduation
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm text-center">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
            Trajectory Status
          </span>
          <div className="mt-2 text-xl font-black text-slate-800">
            {povertyExitScore >= 70 ? 'Self-Reliant' : povertyExitScore >= 50 ? 'Stabilizing' : 'Vulnerable'}
          </div>
          <span className="inline-block mt-2 text-[10px] font-bold text-slate-400">
            Sustainable Economic Exit
          </span>
        </div>
      </div>

      {/* Interactive 9-Dimension Deprivation Sliders */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">
            Interactive Multidimensional Deprivation Matrix
          </h2>
          <p className="text-xs text-slate-500">
            Adjust deprivation levels (0 = fully satisfied, 100 = severe deprivation) to simulate intervention impacts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(Object.keys(dimensions) as Array<keyof typeof dimensions>).map((dimKey) => {
            const val = dimensions[dimKey];
            const weightPct = Math.round(weights[dimKey] * 100);
            return (
              <div key={dimKey} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-800 capitalize">
                    {dimKey.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-400">Weight: {weightPct}%</span>
                    <span
                      className={`font-black px-2 py-0.5 rounded-lg text-xs ${
                        val >= 70
                          ? 'bg-rose-100 text-rose-800'
                          : val >= 40
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {val} / 100
                    </span>
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={val}
                  onChange={(e) => handleSliderChange(dimKey, parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                />

                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>Self-Reliant (0)</span>
                  <span>Severe Deprivation (100)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historical Trend & Recommended Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900">Historical Poverty Exit Trajectory</h3>
          <div className="space-y-3">
            {[
              { month: 'Oct 2025', score: 88, income: 3800, status: 'Critical' },
              { month: 'Nov 2025', score: 84, income: 4100, status: 'High Risk' },
              { month: 'Dec 2025', score: 81, income: 4200, status: 'High Risk' },
              { month: 'Jan 2026', score: 78, income: 4200, status: 'High Risk' },
              { month: 'Feb 2026 (Live)', score: calculatedScore, income: 12400, status: 'Stabilizing' },
            ].map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs">
                <span className="font-bold text-slate-700">{entry.month}</span>
                <span className="font-mono text-slate-500">₹{entry.income.toLocaleString()}/mo</span>
                <span className="font-black text-slate-900">{entry.score}/100</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  {entry.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900">Recommended Next Interventions</h3>
          <div className="space-y-2.5">
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-950">Direct-to-Vendor Asset Delivery</span>
                <p className="text-emerald-800 text-[11px] mt-0.5">
                  Murrah buffalo unit generating ₹8,200/mo incremental milk revenue.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-blue-950">Ayushman Health Protection Card</span>
                <p className="text-blue-800 text-[11px] mt-0.5">
                  Protects household from catastrophic health shocks (asthma treatment).
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-purple-950">SHG Low-Interest Debt Swap</span>
                <p className="text-purple-800 text-[11px] mt-0.5">
                  Replace private 36% loan with 4% Stree Nidhi institutional credit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
