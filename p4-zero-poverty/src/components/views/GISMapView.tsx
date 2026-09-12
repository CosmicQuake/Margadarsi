import React, { useState } from 'react';
import {
  MapPin,
  Layers,
  Filter,
  CheckCircle2,
  Users,
  Building2,
  GraduationCap,
  Hospital,
  Store,
  ChevronRight,
  Eye
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GISDashboard } from '../gis/GISDashboard';

export const GISMapView: React.FC = () => {
  const { families, t, handleSelectHousehold } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{t('nav.gis_map')}</h1>
              <p className="text-xs text-slate-500">
                Spatial GIS Community Mapping • District, Mandal, Village & Household Geotagged Layers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Live Interactive GIS Dashboard Component */}
      <GISDashboard />
    </div>
  );
};
