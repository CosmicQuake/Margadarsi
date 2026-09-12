import React, { useState } from 'react';
import {
  Database,
  Server,
  Cpu,
  X,
  Code2,
  Table,
  CheckCircle2,
  Layers,
  Copy,
} from 'lucide-react';

interface ArchitectureDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureDocsModal: React.FC<ArchitectureDocsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'db' | 'api' | 'ai'>('db');

  if (!isOpen) return null;

  const dbTables = [
    'users', 'roles', 'families', 'family_members', 'household_surveys',
    'needs', 'poverty_scores', 'government_schemes', 'scheme_applications',
    'mentors', 'mentor_profiles', 'mentor_matches', 'adoption_agreements',
    'escrow_transactions', 'milestones', 'evidence', 'asset_verification',
    'vendors', 'vendor_orders', 'payments', 'fraud_alerts', 'grievances',
    'notifications', 'gis_locations (PostGIS)', 'audit_logs'
  ];

  const apiEndpoints = [
    { method: 'POST', path: '/api/auth/login', desc: 'Role simulation session auth' },
    { method: 'GET / POST', path: '/api/families', desc: 'Household poverty registry & profiles' },
    { method: 'POST', path: '/api/surveys', desc: '10-dimension MPI survey ingestion (Maker)' },
    { method: 'POST', path: '/api/surveys/:id/verify', desc: 'Dual-signature verification (Checker)' },
    { method: 'GET / POST', path: '/api/needs', desc: '8-category need demand ticketing' },
    { method: 'POST', path: '/api/poverty-score/calculate', desc: 'MPI scoring & trajectory engine' },
    { method: 'GET', path: '/api/schemes/recommend', desc: 'Entitlement recommendation engine' },
    { method: 'GET / POST', path: '/api/mentors', desc: 'Margadarsi CSR directory' },
    { method: 'POST', path: '/api/matches/vector-search', desc: 'FAISS cosine similarity matchmaker' },
    { method: 'POST', path: '/api/adoptions', desc: 'Formal P4 adoption agreement covenant' },
    { method: 'GET / POST', path: '/api/milestones', desc: '9-stage graduation milestone tracking' },
    { method: 'POST', path: '/api/escrow/pledge', desc: 'Stage-gated controlled escrow lock' },
    { method: 'POST', path: '/api/escrow/release', desc: 'Authorized milestone vendor disbursement' },
    { method: 'POST', path: '/api/evidence/upload', desc: 'Asset delivery geotagged image proof' },
    { method: 'POST', path: '/api/verification/yolo', desc: 'YOLOv8 object detection & EXIF check' },
    { method: 'GET / POST', path: '/api/fraud/anomalies', desc: 'AI fraud radar & case freeze' },
    { method: 'GET / POST', path: '/api/grievances', desc: '72-Hour SLA citizen redressal' },
    { method: 'GET', path: '/api/gis/clusters', desc: 'PostGIS spatial household heatmap' },
    { method: 'GET', path: '/api/audit/chain', desc: 'Tamper-evident SHA-256 event log' },
    { method: 'GET', path: '/api/analytics/kpis', desc: 'District & state graduation funnel' },
  ];

  const aiModules = [
    { name: 'Bhashini Voice ASR', tech: 'Bhashini Speech-to-Text (Regional Acoustic Models)', purpose: 'Transcribes vernacular speech into structured regional script.' },
    { name: 'IndicTrans2 Machine Translation', tech: 'IndicTrans2 Transformer Architecture', purpose: 'Zero-shot translation from regional languages to standardized intent formats.' },
    { name: 'NLU Intent & Need Classifier', tech: 'BERT / RoBERTa Multi-Label Classification', purpose: 'Extracts primary/secondary needs and assigns urgency priority.' },
    { name: 'FAISS AI Vector Matchmaker', tech: 'Facebook AI Similarity Search (Cosine Indexing)', purpose: 'Computes high-dimensional compatibility between family need vectors and mentor profile vectors.' },
    { name: 'YOLOv8 Object Detection & CV', tech: 'Ultralytics YOLOv8 PyTorch Weights', purpose: 'Validates physical delivery evidence (bounding box, confidence, GPS, timestamp, EXIF).' },
    { name: 'AI Anomaly & Anti-Fraud Radar', tech: 'Isolation Forests & Geospatial Geofence Rules', purpose: 'Detects duplicate claims, impossible travel jumps, and invoice barcode collisions.' },
    { name: 'Predictive Poverty Risk Model', tech: 'Gradient Boosted Trees (XGBoost / LightGBM)', purpose: 'Forecasts 6-month relapse risks to trigger preventive interventions.' },
    { name: 'Autonomous Agentic Sentinel', tech: 'Cron-Driven State Machine Engine', purpose: 'Detects inactivity >30 days and triggers automated supervisor alerts.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">
                P4 Architecture Specifications & Schemas
              </h3>
              <p className="text-xs text-slate-400">
                PostgreSQL + PostGIS Schema (Section 29) • REST API (Section 30) • AI Services (Section 31)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2">
          {[
            { id: 'db', label: 'PostgreSQL + PostGIS Schema (25 Tables)', icon: Database },
            { id: 'api', label: 'REST API Route Registry (20 Endpoints)', icon: Server },
            { id: 'ai', label: 'AI Service Architecture (8 Modules)', icon: Cpu },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-3 font-bold text-xs flex items-center gap-2 border-b-2 transition ${
                  isActive
                    ? 'border-emerald-600 text-emerald-800 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs text-slate-700">
          {activeTab === 'db' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200">
                <strong>Primary Datastore:</strong> PostgreSQL 16 with PostGIS 3.4 spatial extensions for geo-fencing and spatial clustering.
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px]">
                {dbTables.map((t, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2">
                    <Table className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-bold text-slate-800 truncate">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-2">
              {apiEndpoints.map((ep, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between font-mono text-[11px]">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ep.method.includes('POST') ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'
                    }`}>
                      {ep.method}
                    </span>
                    <strong className="text-slate-900">{ep.path}</strong>
                  </div>
                  <span className="text-slate-500 font-sans text-xs hidden sm:block">{ep.desc}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {aiModules.map((m, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-indigo-600" />
                    <h4 className="font-black text-slate-900 text-xs">{m.name}</h4>
                  </div>
                  <div className="text-[11px] font-mono text-indigo-700">{m.tech}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.purpose}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow"
          >
            Close Specifications
          </button>
        </div>
      </div>
    </div>
  );
};
