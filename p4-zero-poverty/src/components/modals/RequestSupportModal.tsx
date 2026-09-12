import React, { useState, useEffect } from 'react';
import {
  X,
  HeartHandshake,
  Utensils,
  Home,
  GraduationCap,
  Briefcase,
  Activity,
  Award,
  CreditCard,
  AlertTriangle,
  Send,
  Sparkles,
  DollarSign,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NeedCategory } from '../../data/mockData';

interface CategoryOption {
  key: NeedCategory;
  label: string;
  subtext: string;
  icon: React.ElementType;
  color: string;
}

const CATEGORIES: CategoryOption[] = [
  { key: 'Food', label: 'Food & Nutrition', subtext: 'Essential rations & nutrition kits', icon: Utensils, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { key: 'Housing', label: 'Housing & Sanitation', subtext: 'Pucca roof, toilet & solar power', icon: Home, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { key: 'Education', label: 'Education & Books', subtext: 'Scholarship, books & coaching', icon: GraduationCap, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  { key: 'Employment', label: 'Job & Livelihood Asset', subtext: 'Dairy cattle, sewing kit, pushcart', icon: Briefcase, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { key: 'Healthcare', label: 'Healthcare & Medicine', subtext: 'Surgical aid, clinic & drugs', icon: Activity, color: 'text-rose-600 bg-rose-50 border-rose-200' },
  { key: 'Skill Development', label: 'Skill Training', subtext: 'Vocational training & certification', icon: Award, color: 'text-purple-600 bg-purple-50 border-purple-200' },
  { key: 'Financial Support', label: 'Debt Relief / Micro-Finance', subtext: 'High-cost loan swap & SHG linkage', icon: CreditCard, color: 'text-teal-600 bg-teal-50 border-teal-200' },
  { key: 'Other', label: 'Emergency Support', subtext: 'Immediate crisis buffer assistance', icon: AlertTriangle, color: 'text-orange-600 bg-orange-50 border-orange-200' },
];

export const RequestSupportModal: React.FC = () => {
  const {
    isRequestSupportModalOpen,
    setIsRequestSupportModalOpen,
    selectedNeedCategoryForRequest,
    activeFamily,
    activeFamilyId,
    addFamilyNeed
  } = useApp();

  const [category, setCategory] = useState<NeedCategory>(selectedNeedCategoryForRequest || 'Food');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<'High' | 'Medium' | 'Low'>('High');
  const [estimatedCost, setEstimatedCost] = useState<number>(15000);
  const [beneficiaryMember, setBeneficiaryMember] = useState(activeFamily?.headOfHousehold || 'Head of Family');
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    if (selectedNeedCategoryForRequest) {
      setCategory(selectedNeedCategoryForRequest);
      // Sensible defaults depending on category
      if (selectedNeedCategoryForRequest === 'Food') {
        setTitle('Monthly Nutritional Ration & Pulses Kit');
        setEstimatedCost(3500);
      } else if (selectedNeedCategoryForRequest === 'Housing') {
        setTitle('Sanitation Facility & Roof Leak Repair');
        setEstimatedCost(45000);
      } else if (selectedNeedCategoryForRequest === 'Education') {
        setTitle('Higher Secondary School Fees & Laptop Support');
        setEstimatedCost(20000);
      } else if (selectedNeedCategoryForRequest === 'Employment') {
        setTitle('Livelihood Pushcart & Stock Seed Capital');
        setEstimatedCost(25000);
      } else if (selectedNeedCategoryForRequest === 'Healthcare') {
        setTitle('Chronic Illness Medicine & Diagnostic Support');
        setEstimatedCost(12000);
      } else if (selectedNeedCategoryForRequest === 'Skill Development') {
        setTitle('Solar Technician Vocational Certification');
        setEstimatedCost(15000);
      } else if (selectedNeedCategoryForRequest === 'Financial Support') {
        setTitle('Micro-Loan Restructuring & SHG Credit Linkage');
        setEstimatedCost(30000);
      } else {
        setTitle('Emergency Family Hardship Assistance');
        setEstimatedCost(10000);
      }
    }
  }, [selectedNeedCategoryForRequest, isRequestSupportModalOpen]);

  if (!isRequestSupportModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addFamilyNeed(activeFamilyId, {
      category,
      title: title.trim(),
      description: `${description.trim()} (Beneficiary: ${beneficiaryMember}${remarks ? ` | Notes: ${remarks}` : ''})`,
      urgency,
      estimatedCost: Number(estimatedCost) || 0,
      assignedTo: 'Mandal Checker / Field Volunteer',
    });

    setIsRequestSupportModalOpen(false);
    setTitle('');
    setDescription('');
    setRemarks('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500 text-white flex items-center justify-center font-black shadow-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-teal-500/30 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-500/40">
                  Citizen Request Support Desk
                </span>
                <span className="text-xs text-slate-400 font-mono">{activeFamilyId}</span>
              </div>
              <h3 className="text-xl font-black text-white">
                Request Family Assistance: {activeFamily?.familyName}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsRequestSupportModalOpen(false)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Category Selector Grid */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
              Select Need Domain (8 Universal Categories) *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => {
                      setCategory(cat.key);
                    }}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'ring-2 ring-teal-600 bg-teal-50/80 border-teal-500 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${cat.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900 leading-snug">{cat.label}</div>
                      <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{cat.subtext}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Need Title & Estimated Requirement */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Specific Need / Equipment Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Electric Sewing Machine or Nutrition Ration"
                className="w-full p-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Estimated Cost (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  required
                  min={500}
                  step={500}
                  value={estimatedCost}
                  onChange={(e) => setEstimatedCost(Number(e.target.value))}
                  className="w-full pl-8 pr-3 p-3 rounded-xl border border-slate-300 text-sm font-mono font-bold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Beneficiary & Urgency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Designated Family Member
              </label>
              <input
                type="text"
                value={beneficiaryMember}
                onChange={(e) => setBeneficiaryMember(e.target.value)}
                placeholder="Name of family member"
                className="w-full p-3 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Priority / Urgency Level
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full p-3 rounded-xl border border-slate-300 text-sm font-bold bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <option value="High">High (Immediate Triage - 24-48h)</option>
                <option value="Medium">Medium (Standard Cycle - 7 days)</option>
                <option value="Low">Low (Longer-term Graduation Goal)</option>
              </select>
            </div>
          </div>

          {/* Description & Justification */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Detailed Description & Livelihood Impact *
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe current hardship, how this assistance unlocks sustainable income, and any physical documentation available..."
              className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Field Worker Verification Note */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Field Verification Notes (Optional)
            </label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="e.g. Verified by Gram Secretariat Volunteer during house visit on 11th Sept"
              className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
            <Info className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
            <p>
              Once submitted, this request will generate a verifiable tracking token, initiate AI scheme matching, and queue an automated task for the local <strong>Village Secretariat Volunteer (Maker)</strong> and <strong>Mandal Development Officer (Checker)</strong>.
            </p>
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsRequestSupportModalOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs shadow-lg shadow-teal-600/30 flex items-center gap-2 transition"
            >
              <Send className="w-3.5 h-3.5" />
              Submit Support Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
