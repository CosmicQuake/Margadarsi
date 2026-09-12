import React, { useState } from 'react';
import {
  X,
  ClipboardCheck,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Plus,
  Save,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Family, FamilyMember } from '../../data/mockData';
import { api } from '../../api/client';

export const NewSurveyModal: React.FC = () => {
  const { isNewSurveyModalOpen, setIsNewSurveyModalOpen, families, submitSurvey, showToast, playAudioChime } = useApp();

  const [familyName, setFamilyName] = useState('');
  const [headOfHousehold, setHeadOfHousehold] = useState('');
  const [phone, setPhone] = useState('+91 98480 ');
  const [district, setDistrict] = useState('Navodaya Division');
  const [mandal, setMandal] = useState('Tenali Block');
  const [village, setVillage] = useState('Pinapadu Village');
  const [housingType, setHousingType] = useState('Katcha Mud & Thatch Hut');
  const [monthlyIncome, setMonthlyIncome] = useState(4200);
  const [targetIncome, setTargetIncome] = useState(18000);
  const [landHoldings, setLandHoldings] = useState('0.00 Acres (Landless)');
  const [incomeDep, setIncomeDep] = useState(75);
  const [healthDep, setHealthDep] = useState(65);

  if (!isNewSurveyModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!familyName.trim() || !headOfHousehold.trim()) return;

    playAudioChime('click');

    const surveyData = {
      familyName,
      headOfHousehold,
      phone,
      district,
      mandal,
      village,
      housingType,
      monthlyIncome,
      targetIncome,
      landHoldings,
      members: [
        {
          id: `M-${Date.now()}-1`,
          name: headOfHousehold,
          relation: 'Self (Head)',
          age: 40,
          gender: 'Female',
          education: 'Primary (4th)',
          occupation: 'Daily Wage Farm Labor',
          income: monthlyIncome * 0.7,
        },
      ],
      dimensions: {
        income: incomeDep,
        employment: 70,
        housing: 80,
        education: 55,
        healthcare: healthDep,
        foodSecurity: 60,
        benefitAccess: 40,
        debt: 60,
        skills: 55,
      },
      lat: 16.2415,
      lng: 80.6482,
      consentGiven: true,
    };

    submitSurvey(surveyData);
    setIsNewSurveyModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-400 flex items-center justify-center font-black">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">New MPI Baseline Survey</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Field Worker Maker intake • GPS Geotagged • 9-Dimension Multidimensional Poverty Assessment
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsNewSurveyModalOpen(false)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Family Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Smt. K. Lakshmi Devi & Family"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Head of Household</label>
              <input
                type="text"
                required
                placeholder="e.g. K. Lakshmi Devi"
                value={headOfHousehold}
                onChange={(e) => setHeadOfHousehold(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Contact Phone Number</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">District Division</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none font-bold"
              >
                {['Navodaya Division', 'Green Valley', 'Kalyan Puram', 'Coastal Haven', 'Sundar Nagar', 'Shanti Nagar'].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Mandal / Block</label>
              <input
                type="text"
                required
                value={mandal}
                onChange={(e) => setMandal(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Village / Hamlet</label>
              <input
                type="text"
                required
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Monthly Household Income (₹)</label>
              <input
                type="number"
                required
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Graduation Income (₹)</label>
              <input
                type="number"
                required
                value={targetIncome}
                onChange={(e) => setTargetIncome(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Housing Condition</label>
              <input
                type="text"
                value={housingType}
                onChange={(e) => setHousingType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Land Holdings Status</label>
              <input
                type="text"
                value={landHoldings}
                onChange={(e) => setLandHoldings(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
              />
            </div>
          </div>

          {/* Deprivation Sliders */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <span className="text-xs font-extrabold text-slate-700 block">
              Baseline Deprivation Estimates (0 = None, 100 = Extreme)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <div className="flex justify-between mb-1 font-bold">
                  <span>Income Deprivation:</span>
                  <span className="text-rose-700 font-black">{incomeDep}/100</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={incomeDep}
                  onChange={(e) => setIncomeDep(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1 font-bold">
                  <span>Healthcare Deprivation:</span>
                  <span className="text-rose-700 font-black">{healthDep}/100</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={healthDep}
                  onChange={(e) => setHealthDep(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
              </div>
            </div>
          </div>

          {/* GPS Geofence Confirmation */}
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs flex items-center justify-between text-emerald-950">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Locked Geotag: 16.2415°N, 80.6482°E (Pinapadu Hamlet Geofence)</span>
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
              Valid
            </span>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsNewSurveyModalOpen(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <Save className="w-4 h-4" />
              <span>Submit & Compute MPI Score</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
