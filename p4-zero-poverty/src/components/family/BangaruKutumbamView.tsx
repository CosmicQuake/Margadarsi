import React, { useState } from 'react';
import {
  Mic,
  AlertTriangle,
  Heart,
  FileText,
  Clock,
  Compass,
  CheckCircle,
  Users,
  Home,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Send,
  Plus,
  HelpCircle,
  Shield,
  CreditCard,
  PhoneCall,
  DollarSign,
  Utensils,
  BookOpen,
  Wrench,
  Stethoscope,
  HeartHandshake,
  Coins,
  Smile,
  TrendingUp,
  Scan,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NeedCategory } from '../../data/mockData';
import { BhashiniVoiceModal } from '../voice/BhashiniVoiceModal';
import { FamilyIdCardModal } from '../common/FamilyIdCardModal';
import { ComputerVisionVerificationModal } from '../ai/ComputerVisionVerificationModal';
import confetti from 'canvas-confetti';

export const BangaruKutumbamView: React.FC = () => {
  const {
    activeFamily,
    language,
    setLanguage,
    addFamilyNeed,
    applyForScheme,
    fileGrievance,
    triggerSOS,
    sosAlertActive,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'profile' | 'needs' | 'schemes' | 'journey' | 'grievance'
  >('dashboard');

  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isSmartCardOpen, setIsSmartCardOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  // New Need Dialog State
  const [newNeedCategory, setNewNeedCategory] = useState<NeedCategory>('Food');
  const [newNeedTitle, setNewNeedTitle] = useState('');
  const [showAddNeedModal, setShowAddNeedModal] = useState(false);

  // Grievance Form State
  const [grievanceText, setGrievanceText] = useState('');
  const [grievanceCategory, setGrievanceCategory] = useState('Payment & Direct Benefit');
  const [grievancePriority, setGrievancePriority] = useState<'Critical' | 'High' | 'Medium' | 'Low'>('High');

  const isTe = language === 'te';

  const needCategories: { key: NeedCategory; labelEn: string; labelTe: string; icon: React.ElementType; color: string }[] = [
    { key: 'Food', labelEn: 'Food & Nutrition', labelTe: 'ఆహారం & పోషకాహారం', icon: Utensils, color: 'bg-amber-100 text-amber-800 border-amber-300' },
    { key: 'Housing', labelEn: 'Housing & Sanitation', labelTe: 'ఇల్లు & పరిశుభ్రత', icon: Home, color: 'bg-blue-100 text-blue-800 border-blue-300' },
    { key: 'Education', labelEn: 'Children Education', labelTe: 'పిల్లల చదువు', icon: BookOpen, color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    { key: 'Employment', labelEn: 'Job & Livelihood', labelTe: 'ఉపాధి & పని', icon: Briefcase, color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
    { key: 'Healthcare', labelEn: 'Healthcare & Medicines', labelTe: 'ఆరోగ్యం & మందులు', icon: Stethoscope, color: 'bg-rose-100 text-rose-800 border-rose-300' },
    { key: 'Skill Development', labelEn: 'Skill Training', labelTe: 'నైపుణ్య శిక్షణ', icon: Wrench, color: 'bg-purple-100 text-purple-800 border-purple-300' },
    { key: 'Financial Support', labelEn: 'Debt Relief & Credit', labelTe: 'రుణ విముక్తి & సాయం', icon: Coins, color: 'bg-teal-100 text-teal-800 border-teal-300' },
    { key: 'Other', labelEn: 'Emergency Relief', labelTe: 'ఇతర అత్యవసరం', icon: HelpCircle, color: 'bg-slate-100 text-slate-800 border-slate-300' },
  ];

  const handleCreateQuickNeed = (cat: NeedCategory) => {
    setNewNeedCategory(cat);
    setShowAddNeedModal(true);
  };

  const submitCustomNeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNeedTitle.trim()) return;

    addFamilyNeed(activeFamily.id, {
      category: newNeedCategory,
      title: newNeedTitle,
      titleTe: newNeedTitle,
      description: `Requested via Bangaru Kutumbam self-service portal by ${activeFamily.headOfHousehold}.`,
      urgency: 'High',
    });

    setNewNeedTitle('');
    setShowAddNeedModal(false);
  };

  const handleFileGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!grievanceText.trim()) return;

    fileGrievance({
      category: grievanceCategory,
      priority: grievancePriority,
      description: grievanceText,
      descriptionTe: grievanceText,
      channel: 'Mobile App',
    });

    setGrievanceText('');
  };

  const triggerCelebration = () => {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Banner with Low-Literacy Bilingual Switch, Voice Assistant, SOS */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-emerald-700/50">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-amber-400 text-slate-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                <Smile className="w-3.5 h-3.5" />
                {isTe ? 'బంగారు కుటుంబం పోర్టల్' : 'Bangaru Kutumbam Beneficiary Portal'}
              </span>
              <span className="text-xs bg-white/10 text-emerald-200 px-2.5 py-1 rounded-full border border-white/15 font-mono">
                HH ID: {activeFamily.id}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isTe ? activeFamily.familyNameTe : activeFamily.familyName}
            </h1>
            <p className="text-sm text-emerald-100 flex items-center gap-2">
              <span>{activeFamily.village}, {activeFamily.mandal}, {activeFamily.district}</span>
              <span>•</span>
              <span className="text-amber-300 font-semibold">
                {activeFamily.wardSecretariat}
              </span>
            </p>
          </div>

          {/* Action Buttons for High Accessibility & Low Literacy */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <button
              onClick={() => setLanguage(isTe ? 'en' : 'te')}
              className="flex-1 sm:flex-none px-4 py-3 bg-white/15 hover:bg-white/25 border border-white/20 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2"
              title="భాష మార్చండి / Toggle Language"
            >
              <span className="text-base font-bold text-amber-300">{isTe ? 'EN' : 'తెలుగు'}</span>
              <span>{isTe ? 'English' : 'తెలుగు వెర్షన్'}</span>
            </button>

            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="flex-1 sm:flex-none px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-amber-950/30 transition hover:scale-105 active:scale-95"
            >
              <div className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center">
                <Mic className="w-3.5 h-3.5 animate-pulse" />
              </div>
              <div className="text-left leading-tight">
                <span className="block text-[10px] uppercase font-bold text-amber-950">
                  {isTe ? 'భాషిణి వాయిస్ AI' : 'Bhashini Voice AI'}
                </span>
                <span>{isTe ? 'నోటితో మాట్లాడండి' : 'Speak Your Need'}</span>
              </div>
            </button>

            <button
              onClick={() => triggerSOS(activeFamily.id)}
              className={`flex-1 sm:flex-none px-4 py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-95 ${
                sosAlertActive
                  ? 'bg-rose-600 text-white ring-4 ring-rose-400 animate-pulse'
                  : 'bg-rose-700/80 hover:bg-rose-600 text-white border border-rose-500'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <div className="text-left leading-tight">
                <span className="block text-[9px] uppercase tracking-wider text-rose-200">
                  {isTe ? 'అత్యవసరం' : '24x7 Help'}
                </span>
                <span>{isTe ? 'SOS ఎమర్జెన్సీ' : 'Emergency SOS'}</span>
              </div>
            </button>

            <button
              onClick={() => setIsSmartCardOpen(true)}
              className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-white transition flex items-center justify-center"
              title="View Smart Poverty Exit Card"
            >
              <CreditCard className="w-5 h-5 text-amber-300" />
            </button>
          </div>
        </div>

        {/* SOS Alert Banner */}
        {sosAlertActive && (
          <div className="mt-4 p-4 bg-rose-600 text-white rounded-2xl flex items-center justify-between border-2 border-white shadow-xl animate-bounce-gentle">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-300" />
              <div>
                <strong className="block text-sm font-extrabold uppercase tracking-wide">
                  {isTe ? 'అత్యవసర సహాయ సంకేతం పంపబడింది!' : 'EMERGENCY BEACON BROADCAST ACTIVATED!'}
                </strong>
                <p className="text-xs text-rose-100">
                  Community Volunteer {activeFamily.assignedVolunteerName} ({activeFamily.volunteerPhone}) and Block Emergency Unit are en route.
                </p>
              </div>
            </div>
            <a
              href={`tel:${activeFamily.volunteerPhone}`}
              className="px-3 py-1.5 bg-white text-rose-700 text-xs font-black rounded-xl shadow hover:bg-rose-50 flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Call Volunteer
            </a>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'dashboard', labelEn: 'Dashboard & Exit Score', labelTe: 'డ్యాష్‌బోర్డ్', icon: Compass },
          { id: 'profile', labelEn: 'My Family Profile', labelTe: 'కుటుంబ వివరాలు', icon: Users },
          { id: 'needs', labelEn: 'My Needs (8 Categories)', labelTe: 'నా అవసరాలు', icon: Heart },
          { id: 'schemes', labelEn: 'Scheme Recommendations', labelTe: 'పథకాలు', icon: Shield },
          { id: 'journey', labelEn: 'Support Journey', labelTe: 'ప్రయాణం', icon: CheckCircle },
          { id: 'grievance', labelEn: 'Grievance / SLA', labelTe: 'ఫిర్యాదు', icon: HelpCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 flex-shrink-0 transition-all ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-md ring-2 ring-emerald-700/30'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
              <span>{isTe ? tab.labelTe : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* TAB 1: DASHBOARD & P4 POVERTY EXIT SCORE (SECTION 20) */}
      {/* ---------------------------------------------------------------- */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Section 20: P4 POVERTY EXIT SCORE Major Visual Component */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-500/80 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full border border-emerald-300">
                  Multidimensional Graduation Engine
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  P4 POVERTY EXIT SCORE: {100 - activeFamily.povertyScore}/100
                </h3>
                <p className="text-xs text-slate-500">
                  Calculated from 9 dimensions: Income, Employment, Housing, Education, Healthcare, Food Security, Benefits, Debt, Skills.
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Status</span>
                <span className="text-xl font-black text-emerald-700 block uppercase">
                  STABILIZING
                </span>
              </div>
            </div>

            {/* Improvement Trajectory Graph (Section 20) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Poverty Exit Trajectory & Income Uplift Trend</span>
                <span className="text-emerald-700 font-mono">+124% Improvement over 6 Months</span>
              </div>

              {/* Graphical Trend Bars */}
              <div className="grid grid-cols-6 gap-2 pt-2">
                {activeFamily.historicalScores.map((h, i) => (
                  <div key={i} className="flex flex-col items-center space-y-1 text-center">
                    <div className="w-full bg-slate-100 h-24 rounded-xl flex items-end p-1">
                      <div
                        className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-lg transition-all duration-500"
                        style={{ height: `${Math.min(100, Math.round((h.income / 20000) * 100))}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-700">{h.month}</span>
                    <span className="text-[9px] text-emerald-700 font-bold">₹{(h.income / 1000).toFixed(1)}k</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Need Request Tiles (8 Categories - Section 3) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {isTe ? 'మీకు ఏ సహాయం కావాలి? (ఒక బటన్ నొక్కండి)' : 'What support do you need today? (Tap any category)'}
                </h3>
                <p className="text-xs text-slate-500">
                  Direct 1-tap dispatch to Community Volunteer and Block Development Officer desk.
                </p>
              </div>
              <button
                onClick={() => setIsVoiceModalOpen(true)}
                className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold flex items-center gap-2 border border-amber-300"
              >
                <Mic className="w-4 h-4 text-amber-700" />
                {isTe ? 'వాయిస్ ద్వారా చెప్పండి' : 'Or Use Voice AI'}
              </button>
            </div>

            {/* 8 Need Categories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {needCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.key}
                    onClick={() => handleCreateQuickNeed(cat.key)}
                    className={`p-4 rounded-2xl border text-left transition hover:scale-102 hover:shadow-md active:scale-95 flex flex-col justify-between min-h-[110px] ${cat.color}`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/80 shadow-sm flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs sm:text-sm mt-2">
                        {isTe ? cat.labelTe : cat.labelEn}
                      </h4>
                      <span className="text-[10px] opacity-80 flex items-center gap-1 font-semibold mt-0.5">
                        <Plus className="w-3 h-3" /> {isTe ? 'అభ్యర్థించండి' : 'Request'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* TAB 2: MY FAMILY PROFILE */}
      {/* ---------------------------------------------------------------- */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Household Profile & Socioeconomic Baseline
              </h3>
              <p className="text-xs text-slate-500">Verified by Community Field Volunteer</p>
            </div>
            <button
              onClick={() => setIsSmartCardOpen(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow"
            >
              <CreditCard className="w-4 h-4" /> Smart ID Card
            </button>
          </div>

          {/* Members Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3.5">Name</th>
                  <th className="p-3.5">Relation</th>
                  <th className="p-3.5">Age / Gender</th>
                  <th className="p-3.5">Education</th>
                  <th className="p-3.5">Occupation</th>
                  <th className="p-3.5">Income</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeFamily.members.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">{m.name}</td>
                    <td className="p-3.5 text-slate-600">{m.relation}</td>
                    <td className="p-3.5 text-slate-600">{m.age} yrs • {m.gender}</td>
                    <td className="p-3.5 text-slate-700">{m.education}</td>
                    <td className="p-3.5 text-slate-700">{m.occupation}</td>
                    <td className="p-3.5 font-mono font-bold text-slate-900">₹{m.income.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* TAB 3: MY NEEDS (8 CATEGORIES) */}
      {/* ---------------------------------------------------------------- */}
      {activeTab === 'needs' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 className="text-xl font-black text-slate-900">My Registered Needs</h3>
            <button onClick={() => setShowAddNeedModal(true)} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow">
              <Plus className="w-4 h-4" /> Add Need
            </button>
          </div>

          <div className="space-y-3">
            {activeFamily.needs.map((n) => (
              <div key={n.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">{n.category}</span>
                  <span className="text-xs font-bold text-slate-700">{n.status}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mt-1">{isTe ? n.titleTe : n.title}</h4>
                <p className="text-xs text-slate-600">{n.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* TAB 4: SCHEME RECOMMENDATION ENGINE (SECTION 10) */}
      {/* ---------------------------------------------------------------- */}
      {activeTab === 'schemes' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-900 px-3 py-1 rounded-full border border-blue-300">
              Automated Entitlement Check
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              Government Scheme Recommendation Engine (Demo Data)
            </h3>
            <p className="text-xs text-slate-500">
              Checks income, age, gender, education, housing condition, and special needs to determine eligibility tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeFamily.schemes.map((sch) => (
              <div key={sch.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">{sch.dept}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      {sch.matchType || 'Eligible'}
                    </span>
                  </div>

                  <h4 className="text-base font-black text-slate-900">{sch.name}</h4>
                  <p className="text-xs text-emerald-700 font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                    Benefit: {sch.benefit}
                  </p>

                  <div className="text-xs text-slate-600">
                    <strong className="text-slate-800 block">Why Eligible:</strong>
                    {sch.eligibility}
                  </div>

                  <div className="text-xs text-slate-500">
                    <strong className="text-slate-800 block mb-1">Required Documents:</strong>
                    <div className="flex flex-wrap gap-1">
                      {sch.requiredDocs.map((d, i) => (
                        <span key={i} className="bg-white border text-slate-600 px-2 py-0.5 rounded text-[11px]">✓ {d}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Status: {sch.status}</span>
                  {sch.status !== 'Sanctioned' && (
                    <button
                      onClick={() => applyForScheme(activeFamily.id, sch.id)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow"
                    >
                      Apply Now (1-Click)
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* TAB 5: SUPPORT JOURNEY (9 STAGES) */}
      {/* ---------------------------------------------------------------- */}
      {activeTab === 'journey' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                9-Stage P4 Poverty Exit Journey
              </h3>
              <p className="text-xs text-slate-500">
                From Baseline Survey to Formal Zero Poverty Exit Certification
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCVModalOpen(true)}
                className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-indigo-300"
              >
                <Scan className="w-3.5 h-3.5" /> Verify Asset Photo (YOLOv8)
              </button>
              <button
                onClick={triggerCelebration}
                className="px-3.5 py-1.5 bg-amber-100 text-amber-900 rounded-xl text-xs font-bold"
              >
                🎉 Celebrate Milestone
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {activeFamily.journeyMilestones.map((m) => {
              const isDone = m.status === 'completed';
              const isCurrent = m.status === 'current';

              return (
                <div
                  key={m.id}
                  className={`p-4 rounded-2xl border flex items-start gap-4 ${
                    isCurrent ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow' : isDone ? 'bg-slate-50 border-slate-200' : 'bg-white opacity-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${
                    isDone ? 'bg-emerald-600 text-white' : isCurrent ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isDone ? <CheckCircle className="w-5 h-5" /> : `0${m.id}`}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-slate-900">{isTe ? m.titleTe : m.title}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100">{m.status}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{isTe ? m.descriptionTe : m.description}</p>
                    {m.date && <span className="text-[10px] text-slate-400 font-mono mt-1 block">📅 {m.date}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* TAB 6: GRIEVANCE REDRESSAL WITH 72H SLA */}
      {/* ---------------------------------------------------------------- */}
      {activeTab === 'grievance' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-xl font-black text-slate-900">
              Grievance Redressal & 72-Hour SLA Tracker
            </h3>
            <p className="text-xs text-slate-500">
              Guaranteed 72-hour resolution window with automated administrative escalation
            </p>
          </div>

          <form onSubmit={handleFileGrievanceSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Grievance Category</label>
                <select value={grievanceCategory} onChange={(e) => setGrievanceCategory(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs">
                  <option>Payment & Direct Benefit</option>
                  <option>Government Scheme Enrollment</option>
                  <option>Volunteer Field Service</option>
                  <option>Mentor Communication</option>
                  <option>Vendor Equipment Quality</option>
                  <option>Suspected Fraud or Overcharging</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Priority</label>
                <select value={grievancePriority} onChange={(e) => setGrievancePriority(e.target.value as typeof grievancePriority)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs">
                  <option value="Critical">Critical (24h Immediate SLA)</option>
                  <option value="High">High (72h SLA)</option>
                  <option value="Medium">Medium</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Description / సమస్య వివరణ</label>
              <textarea rows={3} value={grievanceText} onChange={(e) => setGrievanceText(e.target.value)} placeholder="Provide full details of your issue..." className="w-full p-3 rounded-xl border border-slate-300 text-xs" />
            </div>

            <button type="submit" className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow flex items-center gap-2">
              <Send className="w-3.5 h-3.5" /> Submit Grievance
            </button>
          </form>
        </div>
      )}

      {/* Voice Assistant Modal */}
      <BhashiniVoiceModal isOpen={isVoiceModalOpen} onClose={() => setIsVoiceModalOpen(false)} />

      {/* Printable Smart Card Modal */}
      <FamilyIdCardModal family={activeFamily} isOpen={isSmartCardOpen} onClose={() => setIsSmartCardOpen(false)} />

      {/* YOLOv8 CV Verification Modal */}
      <ComputerVisionVerificationModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} householdId={activeFamily.id} />
    </div>
  );
};
