import React, { useState } from 'react';
import {
  HelpCircle,
  Plus,
  Volume2,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NeedItem } from '../../data/mockData';

export const NeedsView: React.FC = () => {
  const {
    activeFamily,
    families,
    t,
    handleSpeakYourNeed,
    addFamilyNeed,
    setActiveNav,
    showToast
  } = useApp();

  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [newNeedTitle, setNewNeedTitle] = useState('');
  const [newNeedDesc, setNewNeedDesc] = useState('');
  const [newNeedCat, setNewNeedCat] = useState('Livelihood');
  const [isAdding, setIsAdding] = useState(false);

  // Aggregate all needs across families
  const allNeeds = families.flatMap((f) =>
    f.needs.map((n) => ({ ...n, familyName: f.familyName, householdId: f.id }))
  );

  const filteredNeeds = allNeeds.filter((n) => {
    return filterCategory === 'All' || n.category === filterCategory;
  });

  const handleSaveNeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNeedTitle.trim()) return;
    addFamilyNeed(activeFamily.id, {
      title: newNeedTitle,
      description: newNeedDesc,
      category: newNeedCat as any,
      urgency: 'High',
    });
    setNewNeedTitle('');
    setNewNeedDesc('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{t('nav.needs')}</h1>
              <p className="text-xs text-slate-500">AI Multidimensional Need Classification & Triage Pipeline</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Log Need Manually</span>
          </button>

          <button
            onClick={handleSpeakYourNeed}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
          >
            <Volume2 className="w-4 h-4" />
            <span>{t('action.speak_your_need')}</span>
          </button>
        </div>
      </div>

      {/* Manual Need Entry Form Modal/Drawer */}
      {isAdding && (
        <form
          onSubmit={handleSaveNeed}
          className="bg-purple-50/70 border border-purple-200 rounded-3xl p-6 space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-purple-950">Log New Family Need for {activeFamily.familyName}</h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs text-purple-700 font-bold hover:underline"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Need Category</label>
              <select
                value={newNeedCat}
                onChange={(e) => setNewNeedCat(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none"
              >
                {['Livelihood', 'Housing', 'Healthcare', 'Food', 'Employment', 'Education', 'Skill Development', 'Sanitation', 'Financial Support'].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Need Title / Short Summary</label>
              <input
                type="text"
                required
                placeholder="e.g. Electric Sewing Machine or Milch Buffalo"
                value={newNeedTitle}
                onChange={(e) => setNewNeedTitle(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Household Requirement</label>
            <textarea
              rows={2}
              placeholder="Describe the specific need, required support, and estimated economic impact on household income..."
              value={newNeedDesc}
              onChange={(e) => setNewNeedDesc(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition shadow"
            >
              Save & Run AI Triage
            </button>
          </div>
        </form>
      )}

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {['All', 'Livelihood', 'Housing', 'Healthcare', 'Food', 'Employment', 'Education', 'Skill Development'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 ${
              filterCategory === cat
                ? 'bg-slate-900 text-white shadow'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Needs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNeeds.map((need) => (
          <div
            key={need.id}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                  {need.category}
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 mt-1">{need.title}</h3>
                <span className="text-[11px] font-bold text-blue-600">
                  {need.familyName} ({need.householdId})
                </span>
              </div>

              <span
                className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-xl ${
                  need.urgency === 'High'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {need.urgency} Priority
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{need.description}</p>

            <div className="p-3 bg-slate-50 rounded-2xl text-[11px] space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Responsible Actor:</span>
                <span className="font-bold text-slate-700">{need.assignedTo || 'Community Field Worker'}</span>
              </div>
              {need.actionTaken && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Action Taken:</span>
                  <span className="font-bold text-emerald-700">{need.actionTaken}</span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Logged on {need.requestedAt}</span>
              <button
                onClick={() => setActiveNav('schemes')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
              >
                <span>Link Scheme</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
