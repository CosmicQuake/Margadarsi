import React, { useState } from 'react';
import {
  Camera,
  CheckCircle2,
  AlertTriangle,
  X,
  Scan,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ComputerVisionVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetTitle?: string;
  householdId?: string;
}

export const ComputerVisionVerificationModal: React.FC<ComputerVisionVerificationModalProps> = ({
  isOpen,
  onClose,
  assetTitle = 'Industrial Sewing Machine',
  householdId = 'P4-BK-001',
}) => {
  const { addAuditLogEntry, playAudioChime } = useApp();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [selectedAssetType, setSelectedAssetType] = useState(assetTitle);

  if (!isOpen) return null;

  const handleRunVerification = () => {
    setIsAnalyzing(true);
    setIsVerified(false);

    setTimeout(() => {
      setIsAnalyzing(false);
      setIsVerified(true);
      playAudioChime('success');
      addAuditLogEntry(
        'YOLOV8_ASSET_VERIFIED',
        'YOLOv8 AI Service',
        'AI Service',
        `Validated ${selectedAssetType} for ${householdId}. Confidence: 94.2%. GPS tag matched.`
      );
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 text-white flex items-center justify-between border-b border-indigo-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/50 flex items-center justify-center text-indigo-400">
              <Scan className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">
                  YOLOv8 Computer Vision Asset Verifier
                </h3>
                <span className="text-[10px] font-bold bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full border border-indigo-500/40">
                  AI Multi-Modal
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Automated evidence validation: Object detection, EXIF check, and GPS tagging
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Asset Image Preview with Simulated YOLOv8 Bounding Box */}
          <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-700 flex items-center justify-center group">
            <img
              src="https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?auto=format&fit=crop&q=80&w=800"
              alt="Asset Evidence"
              className="w-full h-full object-cover opacity-80"
            />

            {/* Simulated Bounding Box */}
            <div className="absolute inset-10 border-2 border-emerald-400 bg-emerald-400/10 rounded-lg pointer-events-none flex flex-col justify-between p-2">
              <span className="bg-emerald-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded w-fit shadow">
                sewing_machine: 94.2%
              </span>
              <span className="text-[9px] font-mono text-emerald-300 self-end">
                bbox: [x:120, y:80, w:380, h:240]
              </span>
            </div>

            {isAnalyzing && (
              <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-white space-y-2">
                <Scan className="w-10 h-10 text-emerald-400 animate-spin" />
                <span className="text-xs font-mono font-bold text-emerald-300">
                  Running YOLOv8 Neural Inference...
                </span>
              </div>
            )}
          </div>

          {/* Verification Results Panel */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-bold text-slate-700 uppercase text-[10px]">
                Validation Checks
              </span>
              <span
                className={`font-mono font-bold px-2 py-0.5 rounded ${
                  isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {isVerified ? 'RESULT: PROOF VALIDATED' : 'Status: Ready for Analysis'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
              <div className="flex justify-between p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500">Detected Object:</span>
                <strong className="text-slate-900">Sewing Machine</strong>
              </div>
              <div className="flex justify-between p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500">Object Confidence:</span>
                <strong className="text-emerald-700">94.2%</strong>
              </div>
              <div className="flex justify-between p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500">GPS Validation:</span>
                <strong className="text-emerald-700">VALID (±3.2m)</strong>
              </div>
              <div className="flex justify-between p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500">Timestamp:</span>
                <strong className="text-emerald-700">VALID (Today)</strong>
              </div>
              <div className="flex justify-between p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500">EXIF Integrity:</span>
                <strong className="text-emerald-700">ORIGINAL</strong>
              </div>
              <div className="flex justify-between p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-500">Duplicate Check:</span>
                <strong className="text-emerald-700">CLEAR</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Household Target: <strong className="text-slate-800">{householdId}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-200"
            >
              Close
            </button>
            <button
              onClick={handleRunVerification}
              disabled={isAnalyzing}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Run YOLOv8 Proof Verification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
