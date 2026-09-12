import React, { useState } from 'react';
import {
  MapPin,
  Layers,
  Filter,
  Eye,
  TrendingUp,
  Award,
  AlertCircle,
  Building,
  Users,
  Compass,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DistrictMetric } from '../../data/mockData';

export const GISDashboard: React.FC = () => {
  const { districts, families, setActiveFamilyId, activeFamilyId, language } = useApp();

  const [selectedDistrict, setSelectedDistrict] = useState<DistrictMetric>(districts[0]);
  const [heatmapMode, setHeatmapMode] = useState<'exitRate' | 'vulnerability' | 'csr'>('exitRate');
  const [selectedPovertyFilter, setSelectedPovertyFilter] = useState<'ALL' | 'CRITICAL' | 'GRADUATING' | 'EXITED'>('ALL');

  // Filter households according to GIS controls
  const filteredHouseholds = families.filter((fam) => {
    const matchesDistrict = fam.district.toLowerCase() === selectedDistrict.name.toLowerCase();
    if (!matchesDistrict) return false;

    if (selectedPovertyFilter === 'CRITICAL') return fam.povertyScore > 70;
    if (selectedPovertyFilter === 'GRADUATING') return fam.povertyScore >= 20 && fam.povertyScore <= 70;
    if (selectedPovertyFilter === 'EXITED') return fam.povertyScore < 20;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* GIS Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-emerald-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-500/30 text-emerald-300 text-xs font-bold px-3 py-0.5 rounded-full border border-emerald-500/40 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              National GIS Spatial Intelligence
            </span>
            <span className="text-xs text-slate-400">P4 PostGIS Engine 2026</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            P4 Zero Poverty Geospatial Command Center
          </h2>
          <p className="text-xs text-emerald-200 mt-0.5">
            Real-time household vulnerability clustering, district benchmarks, and poverty exit heatmaps
          </p>
        </div>

        {/* Heatmap Layer Selectors */}
        <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10">
          {[
            { id: 'exitRate', label: 'Poverty Exit Rate (%)' },
            { id: 'vulnerability', label: 'Vulnerability Index' },
            { id: 'csr', label: 'CSR Private Funds' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setHeatmapMode(mode.id as typeof heatmapMode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                heatmapMode === mode.id
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main GIS Interactive Visual Map & District Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive District Nodes Map (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-600" />
                District & Regional Vulnerability Heatmap
              </h3>
              <p className="text-xs text-slate-500">
                Click any district node to drill down into household clusters and mandal metrics
              </p>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
              Active: {selectedDistrict.name} {language === 'te' && `(${selectedDistrict.nameTe})`}
            </span>
          </div>

          {/* Stylized Interactive GIS SVG Map */}
          <div className="relative w-full h-[400px] bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 rounded-2xl overflow-hidden border border-slate-800 p-4 select-none">
            {/* Map Grid Background */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Regional Cluster Contour Line */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
              viewBox="0 0 500 350"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 60 280 C 100 240, 160 260, 200 220 C 240 180, 280 140, 320 120 C 370 100, 420 60, 470 30"
                stroke="#059669"
                strokeWidth="4"
                strokeDasharray="6,4"
              />
              <text x="320" y="240" fill="#38BDF8" opacity="0.4" fontSize="14" fontWeight="bold">
                REGIONAL CORRIDOR
              </text>
            </svg>

            {/* District Interactive Nodes plotted on geographical layout */}
            <div className="relative w-full h-full">
              {districts.map((d, index) => {
                const isSelected = d.id === selectedDistrict.id;

                // Relative positioning across regional grid
                const positions: Record<string, { top: string; left: string }> = {
                  SKL: { top: '12%', left: '84%' },
                  VZG: { top: '24%', left: '74%' },
                  EGD: { top: '38%', left: '64%' },
                  KRI: { top: '50%', left: '55%' },
                  GNT: { top: '56%', left: '46%' },
                  CTR: { top: '82%', left: '38%' },
                  KNL: { top: '64%', left: '22%' },
                  ATP: { top: '78%', left: '16%' },
                };

                const pos = positions[d.id] || { top: `${30 + index * 8}%`, left: `${20 + index * 8}%` };

                return (
                  <div
                    key={d.id}
                    onClick={() => setSelectedDistrict(d)}
                    style={{ top: pos.top, left: pos.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  >
                    {/* Pulsing ring for selected */}
                    {isSelected && (
                      <div className="absolute -inset-2 rounded-full bg-emerald-400/30 animate-ping" />
                    )}

                    {/* Node Dot */}
                    <div
                      className={`relative px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-lg ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 scale-110 ring-4 ring-amber-300/40 z-20'
                          : 'bg-slate-800/90 hover:bg-emerald-600 text-white border border-slate-600 hover:border-emerald-400 z-10'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            heatmapMode === 'exitRate'
                              ? d.exitRate > 50 ? '#10B981' : d.exitRate > 30 ? '#F59E0B' : '#EF4444'
                              : d.color,
                        }}
                      />
                      <span>{d.name}</span>
                      <span className="text-[10px] opacity-80 font-mono">
                        {heatmapMode === 'exitRate'
                          ? `${d.exitRate}%`
                          : heatmapMode === 'csr'
                          ? `₹${d.csrFundsCr}Cr`
                          : `${(d.extremeVulnerableCount / 1000).toFixed(0)}k`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 text-[10px] text-white flex items-center gap-3">
              <span className="font-bold text-slate-400">Exit Rate:</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> &gt;50% High
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> 30-50% Moderate
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> &lt;30% Lagging
              </span>
            </div>
          </div>
        </div>

        {/* District Deep-Dive & Household Clusters (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Selected District Profile
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {selectedDistrict.name} {language === 'te' && `(${selectedDistrict.nameTe})`}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-full">
                Exit Rate: {selectedDistrict.exitRate}%
              </span>
            </div>

            {/* District Statistics Cards */}
            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Surveyed Households
                </span>
                <span className="text-base font-black text-slate-900">
                  {selectedDistrict.surveyedFamilies.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Poverty Exited
                </span>
                <span className="text-base font-black text-emerald-700">
                  {selectedDistrict.povertyExitedCount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Active Mentors
                </span>
                <span className="text-base font-black text-amber-600">
                  {selectedDistrict.mentorsActive} CSR Champions
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Private Capital
                </span>
                <span className="text-base font-black text-blue-700 font-mono">
                  ₹{selectedDistrict.csrFundsCr} Crores
                </span>
              </div>
            </div>

            {/* Household Cluster Filter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">
                  Surveyed Household Geotag Pins:
                </span>
                <div className="flex items-center gap-1">
                  {(['ALL', 'CRITICAL', 'GRADUATING', 'EXITED'] as const).map((flt) => (
                    <button
                      key={flt}
                      onClick={() => setSelectedPovertyFilter(flt)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                        selectedPovertyFilter === flt
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {flt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Households in this district */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {filteredHouseholds.length === 0 ? (
                  <p className="text-xs text-slate-400 py-3 text-center">
                    No household pins matching current filter in {selectedDistrict.name}.
                  </p>
                ) : (
                  filteredHouseholds.map((fam) => (
                    <div
                      key={fam.id}
                      onClick={() => setActiveFamilyId(fam.id)}
                      className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                        fam.id === activeFamilyId
                          ? 'bg-emerald-50 border-emerald-500'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          {fam.familyName}
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          {fam.village} • {fam.lat.toFixed(3)}°N, {fam.lng.toFixed(3)}°E
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          fam.povertyScore > 70
                            ? 'bg-rose-100 text-rose-800'
                            : fam.povertyScore > 30
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        MPI: {fam.povertyScore}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-500">
              Data synchronized from 15,004 Grama & Ward Secretariats in real-time.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
