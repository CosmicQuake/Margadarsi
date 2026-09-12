import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Eye,
  HeartHandshake,
  Milestone,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Plus,
  Volume2,
  Sparkles,
  HelpCircle,
  Home,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Family } from '../../data/mockData';

export const FamiliesView: React.FC = () => {
  const {
    families,
    t,
    handleSelectHousehold,
    handleNewBaselineSurvey,
    handleAdoptFamily,
    handleViewTimeline,
    handleSpeakYourNeed,
    handleEmergencyHelp,
    setActiveNav
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const districts = ['All', ...Array.from(new Set(families.map((f) => f.district)))];
  const categories = ['All', 'Critical', 'High Risk', 'Vulnerable', 'Stabilizing', 'Self-Reliant'];

  const filteredFamilies = families.filter((f) => {
    const matchesSearch =
      f.familyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.headOfHousehold.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.village.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === 'All' || f.district === selectedDistrict;
    const matchesCategory = selectedCategory === 'All' || f.povertyCategory === selectedCategory;
    return matchesSearch && matchesDistrict && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner with Low-Literacy Friendly Action Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{t('nav.families')}</h1>
              <p className="text-xs text-slate-500">Digital Poverty Profiles • Grama Sabha Verified Roster</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleNewBaselineSurvey}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>{t('action.new_baseline_survey')}</span>
          </button>

          <button
            onClick={handleSpeakYourNeed}
            className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>{t('action.speak_your_need')}</span>
          </button>

          <button
            onClick={handleEmergencyHelp}
            className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>{t('action.emergency_help')}</span>
          </button>
        </div>
      </div>

      {/* Large Low-Literacy Citizen Shortcuts (Section 4) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {[
          { label: t('action.my_family'), icon: Users, color: 'bg-blue-50 text-blue-700 hover:bg-blue-100', action: () => handleSelectHousehold(families[0]?.id) },
          { label: t('action.my_needs'), icon: HelpCircle, color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100', action: () => setActiveNav('needs') },
          { label: t('action.recommended_schemes'), icon: FileCheck2, color: 'bg-purple-50 text-purple-700 hover:bg-purple-100', action: () => setActiveNav('schemes') },
          { label: t('action.my_progress'), icon: Milestone, color: 'bg-amber-50 text-amber-700 hover:bg-amber-100', action: () => setActiveNav('poverty_score') },
          { label: t('action.support_journey'), icon: HeartHandshake, color: 'bg-teal-50 text-teal-700 hover:bg-teal-100', action: () => handleViewTimeline(families[0]?.id) },
          { label: t('nav.grievances'), icon: AlertTriangle, color: 'bg-rose-50 text-rose-700 hover:bg-rose-100', action: () => setActiveNav('grievances') },
        ].map((btn, idx) => {
          const Icon = btn.icon;
          return (
            <button
              key={idx}
              onClick={btn.action}
              className={`p-3 rounded-2xl border border-slate-200 transition text-center flex flex-col items-center justify-center gap-2 group shadow-sm ${btn.color}`}
            >
              <Icon className="w-5 h-5 group-hover:scale-110 transition" />
              <span className="text-[11px] font-extrabold leading-tight">{btn.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, ID, village, head of family..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
          >
            {districts.map((d) => (
              <option key={d} value={d}>
                District: {d}
              </option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                MPI Risk: {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Households Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFamilies.map((fam) => (
          <div
            key={fam.id}
            onClick={() => handleSelectHousehold(fam.id)}
            className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg transition cursor-pointer flex flex-col justify-between group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {fam.id}
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900 mt-1 group-hover:text-blue-600 transition">
                    {fam.familyName}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Head: <span className="font-bold text-slate-700">{fam.headOfHousehold}</span> ({fam.members.length} Members)
                  </p>
                </div>

                <div
                  className={`px-2.5 py-1 rounded-xl text-center flex-shrink-0 ${
                    fam.povertyScore >= 80
                      ? 'bg-rose-100 text-rose-800'
                      : fam.povertyScore >= 60
                      ? 'bg-amber-100 text-amber-800'
                      : fam.povertyScore >= 40
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  <span className="text-[9px] font-bold block uppercase">MPI Score</span>
                  <span className="text-base font-black">{fam.povertyScore}</span>
                </div>
              </div>

              {/* Household Attributes */}
              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-slate-50 p-2 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">Monthly Income</span>
                  <span className="font-extrabold text-slate-800">₹{fam.monthlyIncome.toLocaleString()}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">Poverty Status</span>
                  <span className="font-extrabold text-slate-800 truncate block">{fam.povertyCategory}</span>
                </div>
              </div>

              <div className="mt-2 text-[11px] text-slate-500 space-y-1">
                <p>📍 {fam.village}, {fam.mandal}, {fam.district}</p>
                <p>🏠 {fam.housingType}</p>
              </div>

              {/* e-KYC and Margadarsi status badge */}
              <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  <ShieldCheck className="w-3 h-3" />
                  e-KYC Verified
                </span>

                {fam.mentorId ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    <HeartHandshake className="w-3 h-3" />
                    Adopted: {fam.mentorName?.split(' ')[0]}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Awaiting Margadarsi
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons Bar (Zero Dead Buttons) */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectHousehold(fam.id);
                }}
                className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t('action.select_household')}</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewTimeline(fam.id);
                }}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                title="View Milestone Timeline"
              >
                <Milestone className="w-4 h-4" />
              </button>

              {!fam.mentorId && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAdoptFamily(fam.id);
                  }}
                  className="p-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl transition"
                  title="Adopt Family"
                >
                  <HeartHandshake className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
