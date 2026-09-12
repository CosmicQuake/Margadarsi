import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  DollarSign,
  UserCheck,
  Pause,
  RotateCcw,
  Coins,
  Camera,
  MapPin,
  LineChart,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import { api } from '../../api/client';

interface MasterDemoRunnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DemoStep {
  id: number;
  title: string;
  subtitle: string;
  systemAction: string;
  actor: string;
  module: string;
}

const DEMO_23_STEPS: DemoStep[] = [
  { id: 1, title: '1. Family Registration', subtitle: 'Demographic baseline intake', systemAction: 'Citizen Smt. K. Lakshmi Devi & 4 members registered in BPL database.', actor: 'Citizen / Field Worker', module: 'Bangaru Kutumbam Roster' },
  { id: 2, title: '2. e-KYC Verification', subtitle: 'Biometric identity confirmation', systemAction: 'Masked Aadhaar (XXXX-XXXX-8921) confirmed against Grama Sabha token registry.', actor: 'Grama Sabha Desk', module: 'Identity Verification' },
  { id: 3, title: '3. Household Verification', subtitle: 'Geofenced physical homestead check', systemAction: 'GPS coordinates (16.2415°N, 80.6482°E) verified inside Pinapadu village boundary.', actor: 'Community Field Worker', module: 'Geofence Engine' },
  { id: 4, title: '4. MPI Baseline Survey', subtitle: 'Multidimensional survey collection', systemAction: 'Field Worker completes comprehensive 9-dimension socioeconomic questionnaire.', actor: 'Field Worker (Maker)', module: 'MPI Survey Engine' },
  { id: 5, title: '5. Poverty Score Computation', subtitle: '9-Dimension weighted MPI calculation', systemAction: 'Calculated MPI Score: 78/100 (High Risk). Identified severe income & asset deprivation.', actor: 'P4 Scoring Engine', module: 'MPI Index' },
  { id: 6, title: '6. AI Need Classification', subtitle: 'NLU Intent triage', systemAction: 'Triaged primary need: Murrah Buffalo Dairy Unit for daily income generation (Priority: P1).', actor: 'NLP Need Classifier', module: 'Need Triage Desk' },
  { id: 7, title: '7. Scheme Recommendation', subtitle: 'Government entitlement cross-match', systemAction: 'Matched 3 relevant schemes: Rural Housing, Animal Husbandry Subvention & Health Card.', actor: 'Scheme Recommender', module: 'Entitlement Engine' },
  { id: 8, title: '8. AI Mentor Matchmaking', subtitle: 'scikit-learn Cosine Similarity', systemAction: 'Vector matching yields 92% synergy with Dr. K. Srinivas Rao (Tata Social Initiatives).', actor: 'Vector Matchmaker', module: 'AI Match Desk' },
  { id: 9, title: '9. Family Adoption by Margadarsi', subtitle: 'Philanthropic partnership selection', systemAction: 'Dr. K. Srinivas Rao formally accepts mentorship adoption for 12-month graduation.', actor: 'Margadarsi Mentor', module: 'P4 Pillar 3' },
  { id: 10, title: '10. Digital P4 Adoption Agreement', subtitle: 'Non-commercial covenant generation', systemAction: 'Digital P4 Agreement executed with beneficiary consent and mutual covenants.', actor: 'Contract Registry', module: 'Adoption Agreement' },
  { id: 11, title: '11. Support Plan Finalization', subtitle: 'Economic graduation pathway', systemAction: 'Established 12-month milestones targeting sustainable household income of ₹18,000/month.', actor: 'Mentor & Worker', module: 'Graduation Plan' },
  { id: 12, title: '12. Controlled Escrow Commitment', subtitle: 'Financial integrity lock', systemAction: 'Committed grant of ₹75,000 locked into Controlled Escrow with milestone gating.', actor: 'Escrow Finance', module: 'Controlled Escrow' },
  { id: 13, title: '13. Milestone Schedule Creation', subtitle: '9-stage delivery roadmap', systemAction: 'Mapped 9 support journey milestones with responsible field verifiers assigned.', actor: 'Mandal Checker', module: 'Milestone Manager' },
  { id: 14, title: '14. Evidence Photo Submission', subtitle: 'Delivery proof capture with geotag', systemAction: 'Field worker uploads delivery photograph of Murrah Buffalo with EXIF camera metadata.', actor: 'Field Worker', module: 'Evidence Gateway' },
  { id: 15, title: '15. Computer Vision Verification', subtitle: 'YOLOv8 deep learning validation', systemAction: 'YOLOv8 detects "Murrah Dairy Cattle" (96% confidence score); GPS and EXIF confirmed.', actor: 'YOLOv8 CV Service', module: 'CV Verifier' },
  { id: 16, title: '16. Anti-Fraud Integrity Check', subtitle: 'Vigilance surveillance scan', systemAction: 'Anti-Fraud Engine validates zero image hash collisions and zero duplicate ration IDs.', actor: 'Anti-Fraud Engine', module: 'Vigilance Radar' },
  { id: 17, title: '17. Authorized Officer Approval', subtitle: 'Maker-Checker digital sign-off', systemAction: 'Mandal Development Officer (Checker) inspects proof and signs digital sanction order.', actor: 'Mandal Officer (Checker)', module: 'Checker Approval' },
  { id: 18, title: '18. Direct-to-Vendor Disbursement', subtitle: 'Controlled Escrow release', systemAction: '₹40,000 released from Controlled Escrow directly to Sri Krishna Agri & Dairy Supplies.', actor: 'Escrow Finance', module: 'Vendor Payout' },
  { id: 19, title: '19. Poverty Score Re-computation', subtitle: 'Asset ownership economic boost', systemAction: 'Productive dairy revenues recorded. MPI Score drops dramatically from 78 ➔ 48 (Stabilizing).', actor: 'MPI Engine', module: 'Graduation Engine' },
  { id: 20, title: '20. Poverty Exit Trajectory Graph', subtitle: 'Sustainable graduation tracking', systemAction: 'Projected monthly income increases to ₹12,400/month; on track for Self-Reliance in 5 months.', actor: 'Predictive Analytics', module: 'Trajectory Funnel' },
  { id: 21, title: '21. GIS Community Map Update', subtitle: 'Spatial cluster refresh', systemAction: 'Household pin on National GIS Map transitions from Red (High Risk) to Green (Graduating).', actor: 'PostGIS Engine', module: 'GIS Command' },
  { id: 22, title: '22. Predictive Poverty Risk Update', subtitle: 'ML regression model execution', systemAction: 'Scikit-learn model calculates 6-month poverty regression risk dropped to 35% (Trend: Decreasing).', actor: 'ML Risk Service', module: 'Predictive Engine' },
  { id: 23, title: '23. Tamper-Evident Audit Log Entry', subtitle: 'SHA-256 cryptographic chain seal', systemAction: 'Tamper-evident block generated with previous hash link and immutable cryptographic seal.', actor: 'Audit Ledger', module: 'SHA-256 Hash Chain' },
];

export const MasterDemoRunnerModal: React.FC<MasterDemoRunnerModalProps> = ({ isOpen, onClose }) => {
  const { addAuditLogEntry, playAudioChime } = useApp();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
      setIsFinished(false);

      // Trigger backend demo runner asynchronously
      api.runCompleteDemo().catch((err) => console.log('Demo runner:', err));
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isOpen && isPlaying && !isFinished) {
      timer = setTimeout(() => {
        if (currentStepIndex < DEMO_23_STEPS.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
          playAudioChime('click');
        } else {
          setIsPlaying(false);
          setIsFinished(true);
          playAudioChime('success');
          confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
          addAuditLogEntry(
            'MASTER_DEMO_23_COMPLETED',
            'Demonstration Runner',
            'System Administrator',
            'Successfully completed 23-step end-to-end P4 Zero Poverty graduation simulation.'
          );
        }
      }, 2200);
    }
    return () => clearTimeout(timer);
  }, [isOpen, isPlaying, isFinished, currentStepIndex]);

  if (!isOpen) return null;

  const currentStep = DEMO_23_STEPS[currentStepIndex];
  const progressPercent = Math.round(((currentStepIndex + 1) / DEMO_23_STEPS.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white">
                  Automated P4 Zero Poverty Master Demo
                </h3>
                <span className="text-[10px] font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                  All 23 Steps Live
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Full end-to-end graduation lifecycle from registration to sustainable poverty exit.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4 pb-2 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-amber-400">
              Step {currentStepIndex + 1} of {DEMO_23_STEPS.length}: {currentStep.title}
            </span>
            <span className="font-mono text-emerald-400">{progressPercent}% Completed</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-teal-400 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!isFinished ? (
            /* Active Step Display */
            <div className="space-y-5">
              {/* Primary Active Card */}
              <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-400 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 w-fit">
                    Active Pipeline Step #{currentStep.id}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    Module: <strong className="text-white">{currentStep.module}</strong>
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-white">{currentStep.title}</h2>
                  <p className="text-xs text-slate-300 mt-1">{currentStep.subtitle}</p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Responsible Stakeholder:</span>
                    <span className="font-extrabold text-amber-300">{currentStep.actor}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-slate-200 leading-relaxed font-mono">
                    <span className="text-emerald-400 font-bold">System Execution: </span>
                    {currentStep.systemAction}
                  </div>
                </div>
              </div>

              {/* Steps Completed Roster Preview */}
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                  Completed Lifecycle Milestones:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {DEMO_23_STEPS.slice(0, currentStepIndex + 1).map((s) => (
                    <div
                      key={s.id}
                      className="p-2 rounded-xl bg-slate-800/60 border border-slate-700 text-[10px] flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{s.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Celebration Screen: P4 JOURNEY COMPLETED */
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400 flex items-center justify-center mx-auto shadow-2xl">
                <Sparkles className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
                  National Governance Benchmark Achieved
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  P4 JOURNEY COMPLETED
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                  All 23 lifecycle actions executed successfully with 100% cryptographic integrity,
                  Controlled Escrow release, and verified poverty score reduction.
                </p>
              </div>

              {/* Impact Statistics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto text-left">
                <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">MPI Poverty Score</span>
                  <div className="text-2xl font-black text-emerald-400 mt-1">78 ➔ 48</div>
                  <span className="text-[10px] text-slate-400">30-point reduction</span>
                </div>

                <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Monthly Income</span>
                  <div className="text-2xl font-black text-emerald-400 mt-1">₹12,400</div>
                  <span className="text-[10px] text-slate-400">+₹8,200/mo dairy cash</span>
                </div>

                <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Escrow Disbursed</span>
                  <div className="text-2xl font-black text-amber-400 mt-1">₹40,000</div>
                  <span className="text-[10px] text-slate-400">Direct to vendor</span>
                </div>

                <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Audit Verification</span>
                  <div className="text-2xl font-black text-sky-400 mt-1">SHA-256</div>
                  <span className="text-[10px] text-slate-400">Zero tampering</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Controls Footer */}
        <div className="p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentStepIndex(0);
                setIsPlaying(true);
                setIsFinished(false);
              }}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Demo</span>
            </button>

            {!isFinished && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause' : 'Resume'}</span>
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-100 hover:bg-white text-slate-950 rounded-xl text-xs font-black transition shadow"
          >
            {isFinished ? 'Done & Return to Platform' : 'Close Runner'}
          </button>
        </div>
      </div>
    </div>
  );
};
