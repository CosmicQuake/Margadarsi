import React from 'react';
import {
  X,
  MapPin,
  Users,
  Home,
  Briefcase,
  Activity,
  GraduationCap,
  Hammer,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Phone
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GISMarker } from '../../data/mockData';

export const GISMarkerDetailModal: React.FC = () => {
  const {
    selectedMarkerForModal,
    setSelectedMarkerForModal,
    handleSelectHousehold,
    handleViewTimeline,
    handleOpenRequestSupportModal,
    showToast,
    playAudioChime
  } = useApp();

  if (!selectedMarkerForModal) return null;

  const m: GISMarker = selectedMarkerForModal;

  const getBadgeStyle = () => {
    switch (m.type) {
      case 'family': return { bg: 'bg-amber-100 text-amber-900 border-amber-300', icon: Home, label: 'Adopted Family' };
      case 'need': return { bg: 'bg-rose-100 text-rose-900 border-rose-300', icon: AlertCircle, label: 'Unresolved Need' };
      case 'project': return { bg: 'bg-emerald-100 text-emerald-900 border-emerald-300', icon: Hammer, label: 'Community Infrastructure' };
      case 'employment': return { bg: 'bg-blue-100 text-blue-900 border-blue-300', icon: Briefcase, label: 'Employment Unit' };
      case 'school': return { bg: 'bg-indigo-100 text-indigo-900 border-indigo-300', icon: GraduationCap, label: 'Educational Institution' };
      case 'health': return { bg: 'bg-teal-100 text-teal-900 border-teal-300', icon: Activity, label: 'Primary Health Center' };
      default: return { bg: 'bg-purple-100 text-purple-900 border-purple-300', icon: Users, label: 'Vulnerable Cluster' };
    }
  };

  const badge = getBadgeStyle();
  const Icon = badge.icon;

  const handleAction = () => {
    playAudioChime('click');
    if (m.type === 'family' && m.householdId) {
      handleSelectHousehold(m.householdId);
      setSelectedMarkerForModal(null);
    } else if (m.type === 'need') {
      handleOpenRequestSupportModal();
      setSelectedMarkerForModal(null);
    } else {
      showToast({
        type: 'info',
        title: 'GIS Action Executed',
        message: `Dispatched field inspection ping to ${m.mandal} administrative nodal desk.`,
      });
      setSelectedMarkerForModal(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 text-amber-400 flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.bg}`}>
                  {badge.label}
                </span>
                <span className="text-xs text-slate-400 font-mono">{m.id}</span>
              </div>
              <h3 className="text-lg font-black text-white mt-0.5">{m.title}</h3>
            </div>
          </div>
          <button
            onClick={() => setSelectedMarkerForModal(null)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          {/* Geo Location Header */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>{m.village || m.mandal}, {m.district}</span>
            </div>
            <span className="font-mono text-[11px] text-slate-500 font-bold">
              {m.lat.toFixed(4)}° N, {m.lng.toFixed(4)}° E
            </span>
          </div>

          {/* Contextual Properties */}
          {m.type === 'family' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Poverty Score</span>
                  <span className="text-base font-black text-amber-700">{m.povertyScore || 72}/100</span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Status</span>
                  <span className="text-sm font-black text-emerald-800">{m.adoptionStatus || 'Adopted'}</span>
                </div>
              </div>
              <div className="p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Current Milestone</span>
                <p className="font-bold text-slate-800 text-xs mt-0.5">{m.currentMilestone || 'Productive Asset Delivery'}</p>
              </div>
            </div>
          )}

          {m.type === 'need' && (
            <div className="space-y-2">
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                <span className="text-[10px] uppercase font-bold text-rose-700 block">Unmet Critical Need</span>
                <p className="text-xs font-bold text-slate-800 mt-1">{m.needsSummary || 'Drip irrigation & cold chain unit for 12 vegetable-growing families'}</p>
              </div>
            </div>
          )}

          {m.type === 'project' && (
            <div className="space-y-2">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Project Status</span>
                  <span className="text-emerald-700">{m.projectStatus || 'In Progress'}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Beneficiaries Reached</span>
                  <span className="font-bold">{m.beneficiariesCount || 45} Families</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Completion</span>
                  <span className="font-bold">{m.completionPct || 65}%</span>
                </div>
              </div>
            </div>
          )}

          {m.type === 'employment' && (
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 space-y-1">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Employer / Industry</span>
                  <span className="text-blue-700">{m.employerName || 'Tenali Agro-Processing Hub'}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Openings Available</span>
                  <span className="font-bold">{m.openings || 15} vacancies</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Daily Remuneration</span>
                  <span className="font-bold text-emerald-700">{m.wage || '₹450 / day + provident fund'}</span>
                </div>
              </div>
            </div>
          )}

          {m.type === 'school' && (
            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200 space-y-1">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Facility Name</span>
                <span>{m.schoolName || m.title}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>School Type</span>
                <span>{m.schoolType || 'Government Zilla Parishad High School'}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Catchment</span>
                <span>{m.communityServed || 'Pinapadu & 3 surrounding hamlets'}</span>
              </div>
            </div>
          )}

          {m.type === 'health' && (
            <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 space-y-1">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Facility Type</span>
                <span>{m.facilityType || 'Primary Health Center (PHC)'}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Service Hours</span>
                <span className="text-emerald-700 font-bold">{m.availability || '24x7 Emergency Services'}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Doctor on Duty</span>
                <span>{m.doctorOnDuty || 'Dr. M. Sravani, MBBS'}</span>
              </div>
            </div>
          )}

          {m.type === 'community' && (
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 space-y-1">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Cluster Name</span>
                <span>{m.communityName || m.title}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>BPL Population Ratio</span>
                <span className="text-rose-700 font-bold">{m.bplRatio || '68% below poverty line'}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Total Households</span>
                <span>{m.population || 340}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={() => setSelectedMarkerForModal(null)}
            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition"
          >
            Dismiss
          </button>

          <button
            onClick={handleAction}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-sm"
          >
            {m.type === 'family' ? 'Open Household Profile' : m.type === 'need' ? 'Pledge CSR Resolution' : 'Dispatch Field Alert'}
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
