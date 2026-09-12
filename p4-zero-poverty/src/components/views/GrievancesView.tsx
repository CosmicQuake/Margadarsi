import React, { useState } from 'react';
import {
  MessageSquareWarning,
  Plus,
  Volume2,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  AlertTriangle,
  Send,
  HelpCircle,
  ThumbsUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GrievancesView: React.FC = () => {
  const {
    families,
    activeFamily,
    t,
    handleSpeakYourNeed,
    handleSubmitGrievance,
    handleResolveGrievance,
    handleEscalateGrievance,
    showToast,
    playAudioChime
  } = useApp();

  const [filterStatus, setFilterStatus] = useState('All');
  const [isFiling, setIsFiling] = useState(false);
  const [cat, setCat] = useState('Benefit Access');
  const [prio, setPrio] = useState<'Critical' | 'High' | 'Medium'>('High');
  const [desc, setDesc] = useState('');

  const allGrievances = families.flatMap((f) => f.grievances);

  const filtered = allGrievances.filter((g) => {
    return filterStatus === 'All' || g.status === filterStatus;
  });

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc.trim()) return;
    handleSubmitGrievance({
      category: cat,
      priority: prio,
      description: desc,
      householdId: activeFamily.id,
      householdName: activeFamily.familyName,
    });
    setDesc('');
    setIsFiling(false);
  };

  const handleGiveFeedback = (id: string) => {
    playAudioChime('success');
    showToast({
      type: 'success',
      title: 'Feedback Recorded',
      message: `Citizen satisfaction rating (5/5) recorded for resolved grievance #${id}.`,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-700">
              <MessageSquareWarning className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{t('nav.grievances')}</h1>
              <p className="text-xs text-slate-500">
                Multi-Channel Grievance Redressal Desk • Voice AI & 72-Hour Mandal Escalation SLA
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFiling(!isFiling)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>{t('action.submit_grievance')}</span>
          </button>

          <button
            onClick={handleSpeakYourNeed}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
          >
            <Volume2 className="w-4 h-4" />
            <span>Voice Grievance</span>
          </button>
        </div>
      </div>

      {/* Grievance Submission Drawer/Form */}
      {isFiling && (
        <form
          onSubmit={handleCreateNew}
          className="bg-rose-50/60 border border-rose-200 rounded-3xl p-6 space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-rose-950">Lodge Official Citizen Grievance for {activeFamily.familyName}</h3>
            <button
              type="button"
              onClick={() => setIsFiling(false)}
              className="text-xs text-rose-700 font-bold hover:underline"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Grievance Category</label>
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none"
              >
                {['Benefit Access', 'Housing Quality', 'Ration Denial', 'Health Card Service', 'Vendor Overcharge', 'Field Worker Visit'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Severity & Priority</label>
              <select
                value={prio}
                onChange={(e) => setPrio(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none"
              >
                <option value="Critical">Critical (24-Hour Hearing SLA)</option>
                <option value="High">High (72-Hour Resolution SLA)</option>
                <option value="Medium">Medium (7-Day Normal SLA)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Grievance Description</label>
            <textarea
              rows={3}
              required
              placeholder="State the exact issue, responsible department, and evidence details..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="px-5 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold transition shadow"
            >
              Lodge Ticket & Assign Officer
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {['All', 'Open', 'Investigating', 'Resolved'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 ${
              filterStatus === st
                ? 'bg-slate-900 text-white shadow'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Grievances Queue */}
      <div className="space-y-4">
        {filtered.map((grv) => (
          <div
            key={grv.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {grv.id}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      grv.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : grv.status === 'Investigating'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {grv.status}
                  </span>
                  <span className="text-xs font-bold text-slate-500">Channel: {grv.channel}</span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 mt-1">{grv.category}</h3>
                <p className="text-[11px] text-blue-600 font-bold">{grv.householdName} ({grv.householdId})</p>
              </div>

              <div className="text-right text-[11px] text-slate-500 font-mono">
                <div>Filed: {grv.filedAt}</div>
                <div className="text-rose-600 font-bold">SLA: {grv.slaDeadline}</div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{grv.description}</p>

            <div className="p-3 bg-slate-50 rounded-2xl text-[11px] space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned Redressal Officer:</span>
                <span className="font-bold text-slate-800">{grv.assignedOfficer}</span>
              </div>
              {grv.officerRemarks && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Officer Investigation Remarks:</span>
                  <span className="font-bold text-emerald-700">{grv.officerRemarks}</span>
                </div>
              )}
            </div>

            {/* Action Bar (Zero Dead Buttons) */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2">
              {grv.status !== 'Resolved' ? (
                <>
                  <button
                    onClick={() => handleResolveGrievance(grv.id, 'Spot inspection conducted and benefit restored.')}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{t('action.resolve')}</span>
                  </button>

                  <button
                    onClick={() => handleEscalateGrievance(grv.id, 'SLA exceeded without field response.')}
                    className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-1"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{t('action.escalate')}</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleGiveFeedback(grv.id)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('action.give_feedback')}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
