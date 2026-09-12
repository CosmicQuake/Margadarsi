import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { BangaruKutumbamView } from './components/family/BangaruKutumbamView';
import { VolunteerMakerView } from './components/volunteer/VolunteerMakerView';
import { MandalCheckerView } from './components/officer/MandalCheckerView';
import { MargadarsiView } from './components/mentor/MargadarsiView';
import { VigilanceView } from './components/vigilance/VigilanceView';
import { StateAdminDashboard } from './components/admin/StateAdminDashboard';
import { VendorView } from './components/vendor/VendorView';
import { LandingPage } from './components/landing/LandingPage';
import { JudgeModeDashboard } from './components/judge/JudgeModeDashboard';
import { P4Logo } from './components/brand/P4Logo';

const MainAppLayout: React.FC = () => {
  const { role, setRole, viewMode, setViewMode } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If user is on landing page view mode
  if (viewMode === 'landing') {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Universal Navbar */}
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Primary Content Container */}
      <div className="flex-1 flex">
        {/* Left Sidebar Navigator */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Work Area */}
        <main className="flex-1 lg:pl-72 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {viewMode === 'judge-mode' ? (
            <JudgeModeDashboard />
          ) : (
            <>
              {role === 'bangaru-kutumbam' && <BangaruKutumbamView />}
              {role === 'volunteer' && <VolunteerMakerView />}
              {role === 'mandal-officer' && <MandalCheckerView />}
              {role === 'margadarsi' && <MargadarsiView />}
              {role === 'vigilance-officer' && <VigilanceView />}
              {role === 'state-admin' && <StateAdminDashboard />}
              {role === 'vendor' && <VendorView />}
            </>
          )}
        </main>
      </div>

      {/* Floating Bottom Navigator for Judges & Evaluators */}
      <div className="sticky bottom-0 z-30 bg-slate-900/95 backdrop-blur-md text-white py-2 px-4 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-2xl">
        <div className="flex items-center gap-2">
          <P4Logo size="sm" variant="icon-only" theme="dark" />
          <div className="text-[11px] leading-tight hidden md:block">
            <span className="font-extrabold text-amber-400">SIH26202 Multi-Role Navigator:</span>{' '}
            <span className="text-slate-300">Click any role to test its live workflow</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-0.5 no-scrollbar">
          {[
            { id: 'bangaru-kutumbam', label: '1. Family (BPL)' },
            { id: 'volunteer', label: '2. Volunteer (Maker)' },
            { id: 'mandal-officer', label: '3. Block Officer (Checker)' },
            { id: 'margadarsi', label: '4. Margadarsi (CSR)' },
            { id: 'vigilance-officer', label: '5. Vigilance' },
            { id: 'state-admin', label: '6. Command Center / GIS' },
            { id: 'vendor', label: '7. Vendor' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setViewMode('dashboard');
                setRole(item.id as typeof role);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex-shrink-0 ${
                role === item.id && viewMode === 'dashboard'
                  ? 'bg-amber-400 text-slate-950 shadow ring-1 ring-white'
                  : 'bg-white/10 hover:bg-white/20 text-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainAppLayout />
    </AppProvider>
  );
}

export default App;
