import React, { useState } from 'react';
import {
  HeartHandshake,
  Search,
  Filter,
  MapPin,
  Coins,
  Users,
  CheckCircle2,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Mentor } from '../../data/mockData';

export const MentorsView: React.FC = () => {
  const { mentors, families, t, handleAdoptFamily, setActiveNav, handleRunMatch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const locations = ['All', ...Array.from(new Set(mentors.map((m) => m.location)))];

  const filteredMentors = mentors.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.focusAreas.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation = selectedLocation === 'All' || m.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{t('nav.mentors')}</h1>
              <p className="text-xs text-slate-500">
                P4 Margadarsi Desk • Corporate CSR & Philanthropic Mentors Directory
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveNav('matching')}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-slate-950 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>{t('nav.matching')}</span>
          </button>
        </div>
      </div>

      {/* Search & Location Filter */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search mentors by name, organization, skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                Region: {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex items-start gap-3">
                <img
                  src={mentor.avatarUrl}
                  alt={mentor.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-amber-600 transition">
                    {mentor.name}
                  </h3>
                  <p className="text-[11px] text-slate-500">{mentor.title}</p>
                  <p className="text-[11px] font-bold text-blue-600">{mentor.organization}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-2xl">
                  <span className="text-slate-400 block text-[10px] font-bold">Total Pledged</span>
                  <span className="font-extrabold text-slate-900">₹{mentor.totalPledged.toLocaleString()}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-2xl">
                  <span className="text-slate-400 block text-[10px] font-bold">Families Adopted</span>
                  <span className="font-extrabold text-amber-600">{mentor.adoptedFamilyIds.length} Households</span>
                </div>
              </div>

              {/* Focus Areas */}
              <div className="mt-3">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">Expertise & Focus</span>
                <div className="flex flex-wrap gap-1">
                  {mentor.focusAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{mentor.location}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => handleAdoptFamily(families[0]?.id, mentor.id)}
                className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
              >
                <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('action.adopt_family')}</span>
              </button>

              <button
                onClick={() => handleRunMatch(families[0]?.id)}
                className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold transition"
                title="Run Vector Match Analysis"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
