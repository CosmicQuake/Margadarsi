import React from 'react';
import {
  X,
  Users,
  HeartHandshake,
  ClipboardCheck,
  ShieldCheck,
  ShieldAlert,
  BarChart3,
  Store,
  CheckCircle2,
  Code2
} from 'lucide-react';
import { useApp, UserRole } from '../../context/AppContext';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RoleCard {
  id: UserRole;
  title: string;
  subtitle: string;
  desc: string;
  badge: string;
  icon: React.ElementType;
  color: string;
  accent: string;
}

const ROLES_LIST: RoleCard[] = [
  {
    id: 'bangaru-kutumbam',
    title: '1. Bangaru Kutumbam',
    subtitle: 'Smt. K. Lakshmi Devi & Family',
    desc: 'Vulnerable/BPL family interface. Features large visual cards, AI Voice Assistant (Telugu, English, Hindi), 9-stage support journey, and grievance SLA countdown.',
    badge: 'Beneficiary (Citizen)',
    icon: Users,
    color: 'border-emerald-500 bg-emerald-50/50',
    accent: 'bg-emerald-600 text-white',
  },
  {
    id: 'volunteer',
    title: '2. Community Field Worker',
    subtitle: 'Ch. Naveen Kumar (Field Worker VOL-01)',
    desc: 'The Maker role. Field baseline survey form with 9-dimension MPI scoring engine, GPS geo-tagging, offline sync queue, and direct submission to the Mandal Checker.',
    badge: 'Maker (Field Operations)',
    icon: ClipboardCheck,
    color: 'border-teal-500 bg-teal-50/50',
    accent: 'bg-teal-700 text-white',
  },
  {
    id: 'mandal-officer',
    title: '3. Mandal Officer',
    subtitle: 'Mandal Development Officer & Checker',
    desc: 'The Checker role. Maker-Checker approval queue, independent benefit sanctioning engine, digital seal sanction orders, and grievance hearing schedule.',
    badge: 'Checker (Sanctioning Authority)',
    icon: ShieldCheck,
    color: 'border-blue-500 bg-blue-50/50',
    accent: 'bg-blue-800 text-white',
  },
  {
    id: 'margadarsi',
    title: '4. Margadarsi (Mentor)',
    subtitle: 'Dr. K. Srinivas Rao (Tata Social Initiatives)',
    desc: 'CSR & Philanthropist portal. Adopt vulnerable families, pledge and disburse milestone-gated grants via Controlled Escrow, and track graduation progress.',
    badge: 'Mentor (P4 Pillar 3)',
    icon: HeartHandshake,
    color: 'border-amber-500 bg-amber-50/50',
    accent: 'bg-amber-600 text-white',
  },
  {
    id: 'vigilance-officer',
    title: '5. Vigilance Officer',
    subtitle: 'Anti-Corruption & Anti-Fraud Division',
    desc: 'Anti-fraud surveillance radar. Automated detection of geo-fence breaches, duplicate Ration cards across mandals, rapid score manipulation, and image hash collisions.',
    badge: 'Vigilance & Anti-Fraud',
    icon: ShieldAlert,
    color: 'border-rose-500 bg-rose-50/50',
    accent: 'bg-rose-700 text-white',
  },
  {
    id: 'state-admin',
    title: '6. Command Center',
    subtitle: 'Mission Directorate Executive Desk',
    desc: 'Executive command center. Statewide Poverty Exit Funnel, district league benchmarks, CSR funding metrics, and interactive multi-district GIS spatial heatmaps.',
    badge: 'Executive / Apex',
    icon: BarChart3,
    color: 'border-indigo-500 bg-indigo-50/50',
    accent: 'bg-indigo-900 text-white',
  },
  {
    id: 'vendor',
    title: '7. Livelihood Vendor',
    subtitle: 'Sri Krishna Agri-Equipment & Supplies',
    desc: 'In-kind livelihood asset fulfillment. Digital voucher redemption, geo-tagged delivery confirmation, and direct-to-vendor payment processing without cash leakages.',
    badge: 'Vendor Partner',
    icon: Store,
    color: 'border-amber-600 bg-amber-50/30',
    accent: 'bg-amber-800 text-white',
  },
  {
    id: 'system-admin',
    title: '8. System Administrator',
    subtitle: 'Zero-Trust Security & Audit Desk',
    desc: 'Platform governance control. Tamper-evident SHA-256 audit log inspection, cryptographic hash verification, role permission matrices, and API health monitoring.',
    badge: 'Zero-Trust Security',
    icon: Code2,
    color: 'border-purple-500 bg-purple-50/50',
    accent: 'bg-purple-800 text-white',
  },
];

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { role, setRole, setViewMode } = useApp();

  if (!isOpen) return null;

  const handleSelectRole = (roleId: UserRole) => {
    setRole(roleId);
    setViewMode('dashboard');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold tracking-tight">P4 Multi-Role Access Control</h2>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                8 Live Roles
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Select any stakeholder role to evaluate their tailored workflow, permissions, and dashboards.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {ROLES_LIST.map((r) => {
            const Icon = r.icon;
            const isSelected = role === r.id;
            return (
              <div
                key={r.id}
                onClick={() => handleSelectRole(r.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between hover:shadow-lg hover:scale-[1.01] ${
                  isSelected
                    ? `${r.color} shadow-md ring-2 ring-amber-400`
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${r.accent}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                          {r.title}
                        </h3>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {r.subtitle}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {r.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">{r.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500">
                    {isSelected ? 'Active Perspective' : 'Click to Switch Role'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectRole(r.id);
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                      isSelected
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    {isSelected ? 'Current View' : 'Select View'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Role-Based Access Control (RBAC) enforced with Zero-Trust principles.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
