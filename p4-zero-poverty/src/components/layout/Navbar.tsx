import React, { useState } from 'react';
import {
  Users,
  Bell,
  Languages,
  RotateCcw,
  ChevronDown,
  Menu,
  AlertTriangle,
  HeartHandshake,
  ClipboardCheck,
  ShieldCheck,
  ShieldAlert,
  BarChart3,
  Store,
  Play,
  Award,
  Wifi,
  WifiOff,
  Code2,
  CheckCircle2,
  X,
  Volume2
} from 'lucide-react';
import { useApp, UserRole } from '../../context/AppContext';
import { P4Logo } from '../brand/P4Logo';
import { RoleSwitcherModal } from './RoleSwitcherModal';
import { MasterDemoRunnerModal } from '../demo/MasterDemoRunnerModal';
import { ArchitectureDocsModal } from '../docs/ArchitectureDocsModal';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../../i18n/translations';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const {
    role,
    setRole,
    viewMode,
    setViewMode,
    activeNav,
    setActiveNav,
    language,
    setLanguage,
    t,
    resetDemoData,
    sosAlertActive,
    clearSOS,
    toasts,
    removeToast,
    isOffline,
    toggleOfflineMode,
    pendingSyncCount,
    syncOfflineRecords,
    isSyncing,
    startMasterDemo,
    handleSpeakYourNeed,
    handleEmergencyHelp
  } = useApp();

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isArchModalOpen, setIsArchModalOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);

  const roleNameMap: Record<UserRole, { title: string; badge: string; icon: React.ElementType; color: string }> = {
    'bangaru-kutumbam': { title: 'Bangaru Kutumbam', badge: 'Citizen Family', icon: Users, color: 'bg-emerald-100 text-emerald-800' },
    'volunteer': { title: 'Community Field Worker', badge: 'Maker', icon: ClipboardCheck, color: 'bg-teal-100 text-teal-800' },
    'mandal-officer': { title: 'Mandal Officer', badge: 'Checker', icon: ShieldCheck, color: 'bg-blue-100 text-blue-800' },
    'margadarsi': { title: 'Margadarsi Mentor', badge: 'CSR / Donor', icon: HeartHandshake, color: 'bg-amber-100 text-amber-800' },
    'vigilance-officer': { title: 'Vigilance Officer', badge: 'Anti-Fraud', icon: ShieldAlert, color: 'bg-rose-100 text-rose-800' },
    'state-admin': { title: 'Command Center', badge: 'Executive', icon: BarChart3, color: 'bg-indigo-100 text-indigo-800' },
    'vendor': { title: 'Livelihood Vendor', badge: 'Supply Partner', icon: Store, color: 'bg-amber-100 text-amber-800' },
    'system-admin': { title: 'System Administrator', badge: 'Zero-Trust', icon: Code2, color: 'bg-purple-100 text-purple-800' }
  };

  const currentRoleInfo = roleNameMap[role] || roleNameMap['bangaru-kutumbam'];
  const CurrentIcon = currentRoleInfo.icon;

  const handleTriggerDemo = () => {
    startMasterDemo();
    setIsDemoModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Left: Brand Logo & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none transition"
                title="Toggle Navigation Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
            <div
              className="cursor-pointer"
              onClick={() => {
                setViewMode('dashboard');
                setActiveNav('dashboard');
              }}
              title="Return to Dashboard"
            >
              <P4Logo size="md" variant="full" theme="light" />
            </div>
          </div>

          {/* Center/Right: Action Buttons & Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Master Demo CTA Button (Section 38) */}
            <button
              onClick={handleTriggerDemo}
              className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 rounded-xl text-xs font-black shadow-md transition hover:scale-105 flex items-center gap-1.5 ring-1 ring-amber-400"
              title="Execute Automated 23-Step P4 Journey"
            >
              <Play className="w-3.5 h-3.5 fill-current text-slate-950" />
              <span className="hidden sm:inline font-extrabold tracking-wide">RUN COMPLETE P4 DEMO</span>
              <span className="sm:hidden font-extrabold">Demo</span>
            </button>

            {/* Speak Your Need Button (Section 5) */}
            <button
              onClick={handleSpeakYourNeed}
              className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              title="Open Multilingual AI Voice Assistant"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span className="hidden md:inline">{t('action.speak_your_need')}</span>
            </button>

            {/* Offline-First Mode Toggle (Section 29) */}
            <button
              onClick={toggleOfflineMode}
              className={`px-2.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                isOffline
                  ? 'bg-amber-100 text-amber-900 border-amber-400 ring-1 ring-amber-400'
                  : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
              }`}
              title={isOffline ? 'Offline Mode Active (Click to Reconnect)' : 'Online Mode (Click to Simulate Offline Field Worker)'}
            >
              {isOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                  <span className="hidden lg:inline text-[11px] font-bold">Offline ({pendingSyncCount})</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden lg:inline text-[11px]">Online</span>
                </>
              )}
            </button>

            {/* Offline Sync Button if records pending */}
            {pendingSyncCount > 0 && !isOffline && (
              <button
                onClick={syncOfflineRecords}
                disabled={isSyncing}
                className="px-2.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-[11px] font-bold shadow transition animate-pulse flex items-center gap-1"
                title="Synchronize pending offline records"
              >
                {isSyncing ? 'Syncing...' : `Sync (${pendingSyncCount})`}
              </button>
            )}

            {/* 1-Click Role Switcher Pill (Section 3) */}
            <button
              onClick={() => setIsRoleModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl border border-slate-300 shadow-sm transition hover:scale-102"
              title="Click to Switch User Role (8 Roles)"
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${currentRoleInfo.color}`}>
                <CurrentIcon className="w-3.5 h-3.5" />
              </div>
              <div className="text-left hidden xl:block">
                <span className="text-[9px] font-bold uppercase text-slate-400 block leading-none">
                  Simulated Role:
                </span>
                <span className="text-xs font-black text-slate-900 flex items-center gap-0.5">
                  {currentRoleInfo.title}
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </span>
              </div>
            </button>

            {/* Multilingual Selector Dropdown (Section 2: 6 Languages) */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="px-2.5 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 border border-slate-300 transition flex items-center gap-1.5"
                title="Select Application Language"
              >
                <Languages className="w-4 h-4 text-sky-700" />
                <span className="text-xs font-black uppercase text-slate-800">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-2xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Choose Language
                  </div>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full px-3.5 py-2 text-left text-xs font-semibold flex items-center justify-between transition ${
                        language === lang.code
                          ? 'bg-emerald-50 text-emerald-800 font-bold'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>{lang.name}</span>
                      <span className="text-[11px] font-medium text-slate-400">{lang.nativeName}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <button
              onClick={() => setIsNotifDrawerOpen(true)}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 border border-slate-300 transition relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white rounded-full text-[9px] font-black flex items-center justify-center">
                4
              </span>
            </button>

            {/* Reset Demo Data Button */}
            <button
              onClick={resetDemoData}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-500 hover:text-slate-800 border border-slate-300 transition hidden sm:block"
              title="Reset Demo Databases to Benchmark State"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SOS Emergency Alert Banner if Active */}
        {sosAlertActive && (
          <div className="bg-red-600 text-white px-4 py-2 flex items-center justify-between text-xs font-bold animate-pulse">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>EMERGENCY SOS ACTIVE: Family distress signal registered. Mandal Rapid Response Unit dispatched.</span>
            </div>
            <button
              onClick={clearSOS}
              className="px-2.5 py-0.5 bg-white text-red-700 rounded-lg text-xs font-black hover:bg-slate-100 transition"
            >
              Clear SOS
            </button>
          </div>
        )}
      </header>

      {/* Notifications Drawer Modal */}
      {isNotifDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-extrabold text-slate-900 text-lg">System Notifications</h3>
                </div>
                <button
                  onClick={() => setIsNotifDrawerOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800">Asset Proof Validated</span>
                    <span className="text-[10px] text-slate-400">10m ago</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">Computer Vision verified milch cow delivery proof for Smt. K. Lakshmi Devi (P4-BK-001).</p>
                </div>

                <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-800">Controlled Escrow Disbursed</span>
                    <span className="text-[10px] text-slate-400">25m ago</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">Authorized payment of Rs. 40,000 released directly to Sri Krishna Agri Equipment & Supplies.</p>
                </div>

                <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-800">Vigilance Geo-Fence Flag</span>
                    <span className="text-[10px] text-slate-400">1h ago</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">Survey coordinates deviate from registered Grama Sabha boundaries for household BK-006.</p>
                </div>

                <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-800">Autonomous Follow-up Due</span>
                    <span className="text-[10px] text-slate-400">3h ago</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">Household BK-006 inactive for 36 days. Escalated to Field Worker VOL-06.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsNotifDrawerOpen(false)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
            >
              Close Drawer
            </button>
          </div>
        </div>
      )}

      {/* Interactive Modals */}
      <RoleSwitcherModal isOpen={isRoleModalOpen} onClose={() => setIsRoleModalOpen(false)} />
      <MasterDemoRunnerModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      <ArchitectureDocsModal isOpen={isArchModalOpen} onClose={() => setIsArchModalOpen(false)} />

      {/* Floating Toast Notification Stack */}
      {toasts.length > 0 && (
        <div className="fixed bottom-14 right-4 z-50 flex flex-col gap-2 pointer-events-none">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`pointer-events-auto p-4 rounded-2xl shadow-2xl border flex items-start gap-3 max-w-sm transition-all duration-300 transform translate-y-0 ${
                toast.type === 'success'
                  ? 'bg-emerald-950 text-white border-emerald-700'
                  : toast.type === 'warning'
                  ? 'bg-amber-950 text-white border-amber-700'
                  : toast.type === 'error'
                  ? 'bg-rose-950 text-white border-rose-700'
                  : 'bg-slate-900 text-white border-slate-700'
              }`}
            >
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              ) : toast.type === 'warning' ? (
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              ) : toast.type === 'error' ? (
                <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <h4 className="text-xs font-black tracking-wide">{toast.title}</h4>
                <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
