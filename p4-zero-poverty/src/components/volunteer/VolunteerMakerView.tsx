import React, { useState } from 'react';
import {
  ClipboardCheck,
  MapPin,
  Camera,
  Wifi,
  WifiOff,
  Calculator,
  UserPlus,
  Send,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Users,
  Search,
  ChevronRight,
  Sparkles,
  RefreshCw,
  Clock,
  Home,
  Shield,
  CreditCard,
  Phone,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Family } from '../../data/mockData';

export const VolunteerMakerView: React.FC = () => {
  const {
    families,
    submitSurvey,
    setActiveFamilyId,
    activeFamilyId,
    isOffline,
    toggleOfflineMode,
    pendingSyncCount,
    syncOfflineRecords,
    isSyncing,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'roster' | 'new-survey'>('roster');
  const [searchTerm, setSearchTerm] = useState('');

  // 14-Section Comprehensive Survey Form State (Section 5)
  const [familyName, setFamilyName] = useState('');
  const [headName, setHeadName] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [rationCard, setRationCard] = useState('');
  const [phone, setPhone] = useState('');
  const [mandal, setMandal] = useState('Tenali Block');
  const [village, setVillage] = useState('Pinapadu Village');
  const [income, setIncome] = useState<number>(3800);
  const [housingType, setHousingType] = useState('Katcha Mud & Thatch');
  const [employmentStatus, setEmploymentStatus] = useState('Daily Wage Farm Laborer');
  const [educationLevel, setEducationLevel] = useState('Primary (4th Class)');
  const [foodSecurityStatus, setFoodSecurityStatus] = useState('Occasional Meal Skipping');
  const [healthcareAccess, setHealthcareAccess] = useState('PHC > 5km, High Out-of-Pocket Expense');
  const [bankingAccess, setBankingAccess] = useState('Jan Dhan Basic Savings Account');
  const [skillLevel, setSkillLevel] = useState('Unskilled Manual Labor');
  const [digitalAccess, setDigitalAccess] = useState('Basic 2G Feature Phone, No Internet');
  const [specialNeeds, setSpecialNeeds] = useState('Elderly Dependent with Chronic Asthma');

  // 10-Dimension Deprivation Checkboxes
  const [deprivations, setDeprivations] = useState({
    foodInsecurity: true,
    childSchoolDropout: false,
    chronicIllness: true,
    noPuccaSanitation: true,
    noDrinkingTap: false,
    katchaHouse: true,
    landlessFarmLabor: true,
    highInformalDebt: true,
  });

  const calculateLiveScore = () => {
    let score = 10;
    if (deprivations.foodInsecurity) score += 15;
    if (deprivations.childSchoolDropout) score += 15;
    if (deprivations.chronicIllness) score += 10;
    if (deprivations.noPuccaSanitation) score += 10;
    if (deprivations.noDrinkingTap) score += 10;
    if (deprivations.katchaHouse) score += 15;
    if (deprivations.landlessFarmLabor) score += 15;
    if (deprivations.highInformalDebt) score += 10;
    return Math.min(100, score);
  };

  const currentScore = calculateLiveScore();

  // Tier definition according to Section 5
  const getScoreTier = (score: number) => {
    if (score <= 20) return { label: 'Self-Reliant', color: 'bg-emerald-100 text-emerald-800' };
    if (score <= 40) return { label: 'Stabilizing', color: 'bg-teal-100 text-teal-800' };
    if (score <= 60) return { label: 'Vulnerable', color: 'bg-blue-100 text-blue-800' };
    if (score <= 80) return { label: 'High Risk', color: 'bg-amber-100 text-amber-800' };
    return { label: 'Critical', color: 'bg-rose-100 text-rose-800' };
  };

  const scoreTier = getScoreTier(currentScore);

  const handleToggleDeprivation = (key: keyof typeof deprivations) => {
    setDeprivations((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSurveySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!familyName.trim() || !headName.trim()) return;

    submitSurvey({
      familyName,
      headOfHousehold: headName,
      aadhaarMasked: aadhaar ? `XXXX-XXXX-${aadhaar.slice(-4)}` : 'XXXX-XXXX-4411',
      rationCardNo: rationCard || `RC-P4-${Math.floor(10000000 + Math.random() * 90000000)}`,
      phone: phone || '+91 98480 11990',
      district: 'Guntur Central Division',
      mandal,
      village,
      monthlyIncome: Number(income),
      housingType,
      povertyScore: currentScore,
      povertyCategory: scoreTier.label as Family['povertyCategory'],
      members: [
        {
          id: 'M-1',
          name: headName,
          relation: 'Self (Head)',
          age: 40,
          gender: 'Female',
          education: educationLevel,
          occupation: employmentStatus,
          income: Number(income),
          healthCondition: specialNeeds,
        },
      ],
    });

    // Reset Form
    setFamilyName('');
    setHeadName('');
    setAadhaar('');
    setRationCard('');
    setActiveTab('roster');
  };

  const filteredFamilies = families.filter(
    (f) =>
      f.familyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Volunteer Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-teal-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-teal-500/30 text-teal-300 text-xs font-bold px-3 py-0.5 rounded-full border border-teal-500/40">
              Community Field Worker • Maker Role
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Volunteer ID: VOL-01
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">
            K. Suresh, Community Field Volunteer
          </h2>
          <p className="text-xs text-teal-200 mt-0.5">
            Village Secretariat Unit #14 • Pinapadu • Guntur Central Division
          </p>
        </div>

        {/* Offline Mode & Sync Status Widget (Section 6) */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={toggleOfflineMode}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 ${
              isOffline
                ? 'bg-amber-500/20 text-amber-300 border-amber-400 animate-pulse'
                : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
            }`}
          >
            {isOffline ? <WifiOff className="w-4 h-4 text-amber-400" /> : <Wifi className="w-4 h-4 text-emerald-400" />}
            <span>{isOffline ? 'OFFLINE MODE ACTIVE' : 'Online & Connected'}</span>
          </button>

          {isOffline ? (
            <div className="px-3.5 py-2 bg-amber-950/80 border border-amber-500/50 rounded-xl text-xs text-amber-300 font-mono">
              Pending Sync: {pendingSyncCount} records
            </div>
          ) : pendingSyncCount > 0 ? (
            <button
              onClick={syncOfflineRecords}
              disabled={isSyncing}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-black shadow transition flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Synchronizing...' : `Sync Now (${pendingSyncCount} pending)`}
            </button>
          ) : (
            <div className="px-3.5 py-2 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Sync Complete
            </div>
          )}

          <button
            onClick={() => setActiveTab('new-survey')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow"
          >
            <UserPlus className="w-4 h-4" />
            New Baseline Survey
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('roster')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeTab === 'roster'
              ? 'bg-teal-700 text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          Assigned Household Roster ({families.length})
        </button>

        <button
          onClick={() => setActiveTab('new-survey')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeTab === 'new-survey'
              ? 'bg-teal-700 text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Calculator className="w-4 h-4" />
          14-Section MPI Household Survey Form
        </button>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* TAB 1: BENEFICIARY ROSTER */}
      {/* ---------------------------------------------------------------- */}
      {activeTab === 'roster' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-black text-slate-900">
                Assigned Households
              </h3>
              <p className="text-xs text-slate-500">
                Manage field visits, need logs, and asset handover follow-ups
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, ID, village..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFamilies.map((fam) => {
              const isSelected = fam.id === activeFamilyId;
              const tier = getScoreTier(fam.povertyScore);

              return (
                <div
                  key={fam.id}
                  onClick={() => setActiveFamilyId(fam.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-teal-50/70 border-teal-500 ring-2 ring-teal-500/20 shadow-md'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                        {fam.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tier.color}`}>
                        {fam.povertyScore}/100 • {tier.label}
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold text-slate-900 mt-2 truncate">
                      {fam.familyName}
                    </h4>
                    <p className="text-xs text-slate-500 truncate">
                      Head: {fam.headOfHousehold} • {fam.village}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 text-xs space-y-1 text-slate-600">
                    <div className="flex justify-between">
                      <span>Monthly Income:</span>
                      <strong className="text-slate-900 font-mono">₹{fam.monthlyIncome.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Housing:</span>
                      <span className="truncate max-w-[140px]">{fam.housingType}</span>
                    </div>
                  </div>

                  <button className="w-full py-1.5 bg-white hover:bg-teal-600 hover:text-white border border-slate-300 hover:border-teal-600 rounded-xl text-xs font-bold text-slate-700 transition flex items-center justify-center gap-1">
                    Select Household <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* TAB 2: 14-SECTION MPI BASELINE SURVEY (SECTION 5) */}
      {/* ---------------------------------------------------------------- */}
      {activeTab === 'new-survey' && (
        <form onSubmit={handleSurveySubmit} className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Household Multidimensional Poverty Baseline Survey
                </h3>
                <p className="text-xs text-slate-500">
                  Comprehensive 14-point assessment calculating real-time Poverty Vulnerability Score (PVS)
                </p>
              </div>

              {/* Live Vulnerability Tier Badge */}
              <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white p-3 rounded-2xl border border-teal-800 flex items-center gap-3">
                <Calculator className="w-6 h-6 text-amber-400" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    MPI Score & Category
                  </span>
                  <span className="text-xl font-black text-amber-400">
                    {currentScore}{' '}
                    <span className="text-xs font-bold text-emerald-300">
                      ({scoreTier.label})
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* 1. Household Information */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1">
                <Home className="w-3.5 h-3.5" /> 1. Household Demographics & Location
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Family / Household Name *</label>
                  <input type="text" required value={familyName} onChange={(e) => setFamilyName(e.target.value)} placeholder="e.g. Smt. K. Parvathi & Family" className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Head of Household (Woman Preferred) *</label>
                  <input type="text" required value={headName} onChange={(e) => setHeadName(e.target.value)} placeholder="e.g. K. Parvathi" className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Aadhaar (Last 4 Digits)</label>
                  <input type="text" maxLength={4} value={aadhaar} onChange={(e) => setAadhaar(e.target.value)} placeholder="e.g. 8821" className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none" />
                </div>
              </div>
            </div>

            {/* 2. Socio-Economic Dimensions (14 Points) */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800">
                2. Socioeconomic Status & Basic Needs Indicators
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Income (₹)</label>
                  <input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Employment Status</label>
                  <input type="text" value={employmentStatus} onChange={(e) => setEmploymentStatus(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Education Level of Head</label>
                  <input type="text" value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Food Security</label>
                  <input type="text" value={foodSecurityStatus} onChange={(e) => setFoodSecurityStatus(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Healthcare Access</label>
                  <input type="text" value={healthcareAccess} onChange={(e) => setHealthcareAccess(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Banking / Jan Dhan Access</label>
                  <input type="text" value={bankingAccess} onChange={(e) => setBankingAccess(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Skill Level</label>
                  <input type="text" value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Digital Access</label>
                  <input type="text" value={digitalAccess} onChange={(e) => setDigitalAccess(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Special Needs / Illness</label>
                  <input type="text" value={specialNeeds} onChange={(e) => setSpecialNeeds(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none" />
                </div>
              </div>
            </div>

            {/* 3. 10-Dimension Deprivation Matrix */}
            <div className="pt-3 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                3. Multidimensional Deprivation Checklist (Score Weighting):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { key: 'foodInsecurity', label: '1. Food Insecurity: Skipping meals or severe food shortage (+15)' },
                  { key: 'childSchoolDropout', label: '2. Education: Child out-of-school or irregular attendance (+15)' },
                  { key: 'chronicIllness', label: '3. Health: Untreated chronic illness without medication (+10)' },
                  { key: 'noPuccaSanitation', label: '4. Sanitation: Open defecation / no private toilet (+10)' },
                  { key: 'noDrinkingTap', label: '5. Water: No safe piped drinking water within 200m (+10)' },
                  { key: 'katchaHouse', label: '6. Housing: Dilapidated thatch/mud structure (+15)' },
                  { key: 'landlessFarmLabor', label: '7. Livelihood: Landless casual agricultural labor (+15)' },
                  { key: 'highInformalDebt', label: '8. Debt: High interest private debt burden (+10)' },
                ].map((item) => {
                  const isChecked = deprivations[item.key as keyof typeof deprivations];
                  return (
                    <div
                      key={item.key}
                      onClick={() => handleToggleDeprivation(item.key as keyof typeof deprivations)}
                      className={`p-3 rounded-xl border cursor-pointer transition flex items-start gap-3 select-none ${
                        isChecked ? 'bg-rose-50 border-rose-300 text-rose-950 font-bold' : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <input type="checkbox" checked={isChecked} readOnly className="mt-0.5 rounded text-rose-600" />
                      <span className="text-xs">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Geotag & Photo Verification */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Geo-Fence Location Tagged</span>
                  <span className="text-xs text-slate-500 font-mono">16.2440° N, 80.6402° E • Accuracy ±3.2m (Panchayat Boundary Validated)</span>
                </div>
              </div>
              <button type="button" className="px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-sm">
                <Camera className="w-4 h-4 text-slate-600" /> Capture Dwelling Photo
              </button>
            </div>

            {/* Form Submit */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {isOffline ? 'Survey will be stored in offline cache until connection is restored.' : 'Submits to Block Officer (Checker) approval queue.'}
              </span>
              <button
                type="submit"
                className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 shadow-lg transition"
              >
                <Send className="w-4 h-4" />
                {isOffline ? 'Save Survey Offline (Mock Local)' : 'Submit Survey to Checker'}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
