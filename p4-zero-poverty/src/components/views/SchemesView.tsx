import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle2,
  Clock,
  Upload,
  ArrowRight,
  ShieldCheck,
  Building2,
  Search,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SchemeItem } from '../../data/mockData';

export const SchemesView: React.FC = () => {
  const { activeFamily, t, handleSchemeAction, setSelectedSchemeForModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const schemes = activeFamily.schemes;

  const filteredSchemes = schemes.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.benefit.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{t('nav.schemes')}</h1>
              <p className="text-xs text-slate-500">
                Government Welfare Schemes & Direct Benefit Recommendations for {activeFamily.familyName}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">
            {schemes.filter((s) => s.status === 'Applied' || s.status === 'Approved').length} Active Applications
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search welfare schemes, departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Eligible', 'Applied', 'Under Review', 'Approved'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                statusFilter === status
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {scheme.dept}
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900 mt-1.5">{scheme.name}</h3>
                </div>

                <span
                  className={`text-[10px] font-black px-2.5 py-1 rounded-xl flex-shrink-0 ${
                    scheme.status === 'Approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : scheme.status === 'Applied' || scheme.status === 'Under Review'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  {scheme.status}
                </span>
              </div>

              {/* Benefit & Eligibility */}
              <div className="mt-3 space-y-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Entitlement & Benefit</span>
                  <p className="font-semibold text-slate-800 mt-0.5 leading-relaxed">{scheme.benefit}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Eligibility Criteria</span>
                  <p className="text-slate-700 mt-0.5 text-[11px] leading-relaxed">{scheme.eligibility}</p>
                </div>

                {/* Required Documents */}
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase mb-1">Required Documents</span>
                  <div className="flex flex-wrap gap-1.5">
                    {scheme.requiredDocs.map((doc, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3 text-slate-400" />
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Bar (Zero Dead Buttons) */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
              {scheme.status === 'Eligible' ? (
                <button
                  onClick={() => handleSchemeAction(activeFamily.id, scheme.id, 'apply')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
                >
                  <span>{t('action.apply')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => handleSchemeAction(activeFamily.id, scheme.id, 'track')}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1"
                >
                  <span>{t('action.track_application')}</span>
                </button>
              )}

              <button
                onClick={() => handleSchemeAction(activeFamily.id, scheme.id, 'upload')}
                className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1"
              >
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>{t('action.upload_documents')}</span>
              </button>

              <button
                onClick={() => {
                  setSelectedSchemeForModal(scheme);
                  handleSchemeAction(activeFamily.id, scheme.id, 'view');
                }}
                className="px-3 py-2 text-blue-600 hover:text-blue-800 rounded-xl text-xs font-bold transition"
              >
                {t('action.view_details')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
