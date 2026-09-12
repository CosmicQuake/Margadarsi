import React, { useState } from 'react';
import {
  ClipboardCheck,
  Plus,
  Wifi,
  WifiOff,
  RefreshCw,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Camera,
  ShieldCheck,
  Search,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FieldSurveysView: React.FC = () => {
  const {
    families,
    isOffline,
    toggleOfflineMode,
    pendingSyncCount,
    syncOfflineRecords,
    isSyncing,
    t,
    handleSelectHousehold,
    handleNewBaselineSurvey,
    handleSubmitEvidence,
    showToast,
    playAudioChime
  } = useApp();

  const [simulatedGps, setSimulatedGps] = useState<{ lat: number; lng: number; accuracy: number; verified: boolean }>({
    lat: 16.2415,
    lng: 80.6482,
    accuracy: 4.2,
    verified: true,
  });
  const [capturingGps, setCapturingGps] = useState(false);

  const handleCaptureGps = () => {
    setCapturingGps(true);
    playAudioChime('click');
    setTimeout(() => {
      setSimulatedGps({
        lat: 16.2415 + (Math.random() - 0.5) * 0.005,
        lng: 80.6482 + (Math.random() - 0.5) * 0.005,
        accuracy: 3.1,
        verified: true,
      });
      setCapturingGps(false);
      playAudioChime('success');
      showToast({
        type: 'success',
        title: 'GPS Geofence Verified',
        message: 'Accurate coordinates locked: 16.2415°N, 80.6482°E (Within 5m tolerance).',
      });
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Field Worker Header with Sync & Status Controls */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{t('nav.field_surveys')}</h1>
              <p className="text-xs text-slate-500">Maker Operations Desk • Ch. Naveen Kumar (Field Worker VOL-01)</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Offline Mode Toggle Button */}
          <button
            onClick={toggleOfflineMode}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              isOffline
                ? 'bg-amber-100 text-amber-900 border-amber-400 ring-1 ring-amber-400'
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
            }`}
          >
            {isOffline ? (
              <>
                <WifiOff className="w-4 h-4 text-amber-700 animate-pulse" />
                <span>Offline Mode ({pendingSyncCount} pending)</span>
              </>
            ) : (
              <>
                <Wifi className="w-4 h-4 text-emerald-600" />
                <span>Online Field Sync Active</span>
              </>
            )}
          </button>

          {/* Sync Now Button */}
          <button
            onClick={syncOfflineRecords}
            disabled={isSyncing}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow ${
              isSyncing
                ? 'bg-teal-800 text-white cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-700 text-white'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing Records...' : t('action.sync_now')}</span>
          </button>

          {/* New Baseline Survey Button */}
          <button
            onClick={handleNewBaselineSurvey}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>{t('action.new_baseline_survey')}</span>
          </button>
        </div>
      </div>

      {/* Field Operations Widget Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* GPS Geofence Box */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">GPS Geofence Status</span>
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
              Verified Valid
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl text-xs space-y-1 font-mono text-slate-700">
            <div>Lat: <span className="font-bold">{simulatedGps.lat.toFixed(4)}°N</span></div>
            <div>Lng: <span className="font-bold">{simulatedGps.lng.toFixed(4)}°E</span></div>
            <div>Accuracy: <span className="font-bold text-emerald-700">±{simulatedGps.accuracy}m</span></div>
          </div>

          <button
            onClick={handleCaptureGps}
            disabled={capturingGps}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5 text-slate-600" />
            <span>{capturingGps ? 'Locking Satellite Signal...' : 'Re-Capture Geotag'}</span>
          </button>
        </div>

        {/* Offline Sync Buffer Box */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Local SQLite Buffer</span>
            <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
              {pendingSyncCount} Queued
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Offline-first architecture stores survey records, tamper hashes, and photographic evidence locally until connectivity is restored.
          </p>

          <button
            onClick={syncOfflineRecords}
            disabled={isSyncing || pendingSyncCount === 0}
            className="w-full py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{isSyncing ? 'Syncing...' : `Flush Sync Queue (${pendingSyncCount})`}</span>
          </button>
        </div>

        {/* Quick Camera Evidence Upload */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Asset Evidence Scan</span>
            <span className="text-[11px] font-bold text-sky-600">YOLOv8 Engine</span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Capture delivery evidence photos for Computer Vision object recognition and tamper analysis.
          </p>

          <button
            onClick={() => handleSubmitEvidence('P4-BK-001', 5)}
            className="w-full py-2 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <Camera className="w-3.5 h-3.5 text-sky-700" />
            <span>{t('action.submit_evidence')}</span>
          </button>
        </div>
      </div>

      {/* Field Roster Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Assigned Household Survey Roster</h2>
            <p className="text-xs text-slate-500">Scheduled for monthly follow-up & MPI progress audits</p>
          </div>
          <span className="text-xs font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            {families.length} Assigned Households
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-extrabold uppercase text-[10px]">
                <th className="pb-3">Household ID & Name</th>
                <th className="pb-3">Village & Mandal</th>
                <th className="pb-3">MPI Score</th>
                <th className="pb-3">e-KYC Status</th>
                <th className="pb-3">Last Survey Date</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {families.map((fam) => (
                <tr
                  key={fam.id}
                  onClick={() => handleSelectHousehold(fam.id)}
                  className="hover:bg-slate-50 cursor-pointer transition"
                >
                  <td className="py-3.5 pr-4">
                    <div className="font-extrabold text-slate-900">{fam.familyName}</div>
                    <div className="text-[11px] text-slate-400">{fam.id} • Head: {fam.headOfHousehold}</div>
                  </td>
                  <td className="py-3.5 pr-4 text-slate-600">
                    <div>{fam.village}</div>
                    <div className="text-[10px] text-slate-400">{fam.mandal}</div>
                  </td>
                  <td className="py-3.5 pr-4">
                    <span
                      className={`font-black text-xs px-2 py-0.5 rounded-lg ${
                        fam.povertyScore >= 80
                          ? 'bg-rose-100 text-rose-800'
                          : fam.povertyScore >= 60
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {fam.povertyScore} / 100
                    </span>
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-slate-500 font-mono text-[11px]">
                    {fam.surveyCompletedDate}
                  </td>
                  <td className="py-3.5 text-right space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectHousehold(fam.id);
                      }}
                      className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition text-xs"
                    >
                      {t('action.select_household')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
