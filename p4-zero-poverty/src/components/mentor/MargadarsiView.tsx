import React, { useState } from 'react';
import {
  HeartHandshake,
  DollarSign,
  TrendingUp,
  Users,
  Award,
  Send,
  Plus,
  ChevronRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Building,
  Brain,
  FileCheck,
  Download,
  X,
  Lock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Family } from '../../data/mockData';
import { FAISSMatchmakerModal } from '../ai/FAISSMatchmakerModal';
import { ControlledEscrowView } from '../escrow/ControlledEscrowView';

export const MargadarsiView: React.FC = () => {
  const { families, mentors, adoptFamilyByMentor, setActiveFamilyId, activeFamilyId } = useApp();

  const currentMentor = mentors[0]; // Dr. K. R. Rao
  const [selectedFamilyToAdopt, setSelectedFamilyToAdopt] = useState<Family | null>(null);
  const [pledgeAmount, setPledgeAmount] = useState<number>(25000);
  const [mentorNote, setMentorNote] = useState('');
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [isFAISSModalOpen, setIsFAISSModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'discover' | 'escrow'>('portfolio');

  const adoptedFamilies = families.filter(
    (f) => currentMentor.adoptedFamilyIds.includes(f.id) || f.mentorId === currentMentor.id
  );

  const unadoptedFamilies = families.filter((f) => !f.mentorId);

  const handleOpenAdoptionFlow = (fam: Family) => {
    setSelectedFamilyToAdopt(fam);
    setShowAgreementModal(true);
  };

  const handleConfirmAdoptionAgreement = () => {
    if (selectedFamilyToAdopt) {
      adoptFamilyByMentor(currentMentor.id, selectedFamilyToAdopt.id, pledgeAmount);
      setShowAgreementModal(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Margadarsi Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 shadow-xl border border-amber-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400/60 flex items-center justify-center text-amber-400">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-500/30 text-amber-300 text-xs font-bold px-3 py-0.5 rounded-full border border-amber-500/40">
                Margadarsi Philanthropy Portal • P4 Pillar 3
              </span>
              <span className="text-xs text-slate-400">CSR Sponsor ID: M-101</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              {currentMentor.name}
            </h2>
            <p className="text-xs text-amber-200 mt-0.5">
              {currentMentor.title} • {currentMentor.organization}
            </p>
          </div>
        </div>

        {/* Portfolio Stats (Section 11) */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          <div className="bg-white/10 px-3.5 py-2.5 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">
              Total Families
            </span>
            <span className="text-lg font-black text-amber-400">
              {adoptedFamilies.length}
            </span>
          </div>

          <div className="bg-white/10 px-3.5 py-2.5 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">
              Total Funds Pledged
            </span>
            <span className="text-lg font-black text-emerald-400">
              ₹{(currentMentor.totalPledged / 1000).toFixed(0)}k
            </span>
          </div>

          <div className="bg-white/10 px-3.5 py-2.5 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">
              Poverty Exits
            </span>
            <span className="text-lg font-black text-sky-400">
              {adoptedFamilies.filter((f) => f.povertyScore < 20).length}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeTab === 'portfolio'
              ? 'bg-amber-700 text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          Adopted Families Portfolio ({adoptedFamilies.length})
        </button>

        <button
          onClick={() => setActiveTab('discover')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeTab === 'discover'
              ? 'bg-amber-700 text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Search className="w-4 h-4" />
          Discover & Adopt Families ({unadoptedFamilies.length})
        </button>

        <button
          onClick={() => setActiveTab('escrow')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeTab === 'escrow'
              ? 'bg-amber-700 text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Lock className="w-4 h-4" />
          Controlled Escrow Workflow
        </button>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* TAB 1: ADOPTED FAMILIES PORTFOLIO */}
      {/* ---------------------------------------------------------------- */}
      {activeTab === 'portfolio' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-600" />
                Active Family Adoptions & Milestones
              </h3>
              <p className="text-xs text-slate-500">
                Directly guiding vulnerable households through the 9-stage poverty exit roadmap
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {adoptedFamilies.length} Households Under Active Sponsorship
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adoptedFamilies.map((fam) => {
              const isSelected = fam.id === activeFamilyId;
              const completedMilestones = fam.journeyMilestones.filter((m) => m.status === 'completed').length;

              return (
                <div
                  key={fam.id}
                  className={`p-5 rounded-2xl border transition flex flex-col justify-between space-y-4 ${
                    isSelected ? 'bg-amber-50/40 border-amber-400 shadow-md' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                        {fam.id}
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          fam.povertyScore < 20
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        MPI: {fam.povertyScore}/100
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-900 mt-2">
                      {fam.familyName}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {fam.village} • Head: {fam.headOfHousehold}
                    </p>
                  </div>

                  {/* Milestone Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Milestones Completed</span>
                      <span className="text-emerald-700">{completedMilestones} / 9 Stages</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all"
                        style={{ width: `${(completedMilestones / 9) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Pledged Capital:
                      </span>
                      <strong className="text-emerald-700 font-mono text-sm">
                        ₹{fam.mentorGrantTotal.toLocaleString('en-IN')}
                      </strong>
                    </div>

                    <button
                      onClick={() => setActiveFamilyId(fam.id)}
                      className="px-3.5 py-2 bg-white hover:bg-amber-600 hover:text-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 transition flex items-center gap-1 shadow-sm"
                    >
                      View Timeline <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* TAB 2: DISCOVER & ADOPT FAMILIES (SECTIONS 11 & 12) */}
      {/* ---------------------------------------------------------------- */}
      {activeTab === 'discover' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-emerald-600" />
                Anonymized Family Discovery & Adoption
              </h3>
              <p className="text-xs text-slate-500">
                Data-privacy protected profiles verified by community workers awaiting CSR sponsorship
              </p>
            </div>
            <button
              onClick={() => setIsFAISSModalOpen(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Brain className="w-4 h-4" />
              Launch FAISS AI Vector Matchmaker
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unadoptedFamilies.map((fam) => (
              <div
                key={fam.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 transition flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                      Family ID: {fam.id}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                      MPI: {fam.povertyScore}/100
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-slate-900 mt-2">
                    {fam.familyName}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Village: {fam.village} • {fam.members.length} Members
                  </p>

                  <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                    <div>
                      Need: <strong className="text-slate-800">{fam.needs[0]?.title || 'Sewing Machine / Toolset'}</strong>
                    </div>
                    <div>
                      Priority: <strong className="text-rose-700">{fam.needs[0]?.urgency || 'High'}</strong>
                    </div>
                    <div>
                      Required Support: <strong className="text-emerald-700">₹18,000–₹25,000</strong>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Expected Impact: <strong>Income generation & self-reliance</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenAdoptionFlow(fam)}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 text-white rounded-xl text-xs font-black shadow transition flex items-center justify-center gap-1.5"
                >
                  <HeartHandshake className="w-4 h-4" />
                  ADOPT FAMILY (P4)
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* TAB 3: CONTROLLED ESCROW WORKFLOW (SECTION 15) */}
      {/* ---------------------------------------------------------------- */}
      {activeTab === 'escrow' && <ControlledEscrowView />}

      {/* P4 Adoption Agreement Modal (Section 13) */}
      {showAgreementModal && selectedFamilyToAdopt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-black text-slate-900">
                  P4 Formal Adoption Agreement
                </h3>
              </div>
              <button
                onClick={() => setShowAgreementModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Agreement Terms (Section 13) */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-3 leading-relaxed">
              <div className="grid grid-cols-2 gap-2 text-[11px] pb-2 border-b border-slate-200">
                <div>Family ID: <strong>{selectedFamilyToAdopt.id}</strong></div>
                <div>Mentor ID: <strong>{currentMentor.id} ({currentMentor.name})</strong></div>
                <div>Support Objective: <strong>Sustainable Livelihood Graduation</strong></div>
                <div>Estimated Duration: <strong>12 Months (9 Milestones)</strong></div>
              </div>

              <p>
                <strong>Agreement Covenants:</strong> The Mentor commits to funding milestone-gated micro-grants
                deposited into Controlled Escrow. Capital release is contingent on verified YOLOv8 photo proof and
                field volunteer geotag verification.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Pledged Micro-Grant Capital:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[15000, 25000, 50000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setPledgeAmount(amt)}
                      className={`py-2 rounded-xl text-xs font-black border transition ${
                        pledgeAmount === amt
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Agreement Buttons (Section 13: Accept, Cancel, Download) */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download Agreement
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAgreementModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAdoptionAgreement}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow"
                >
                  Accept Agreement (Lock in Escrow)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAISS Matchmaker Modal */}
      <FAISSMatchmakerModal
        isOpen={isFAISSModalOpen}
        onClose={() => setIsFAISSModalOpen(false)}
        family={unadoptedFamilies[0] || families[0]}
        onAdoptSelect={(mId) => {
          handleOpenAdoptionFlow(unadoptedFamilies[0] || families[0]);
        }}
      />
    </div>
  );
};
