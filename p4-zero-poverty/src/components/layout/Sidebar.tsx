import React from 'react';
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  HelpCircle,
  TrendingDown,
  FileCheck2,
  HeartHandshake,
  Sparkles,
  FileSignature,
  Milestone,
  Coins,
  Store,
  ShieldAlert,
  MessageSquareWarning,
  MapPin,
  LineChart,
  Bell,
  FileText,
  Settings,
  X,
  ChevronRight
} from 'lucide-react';
import { useApp, NavItemKey } from '../../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

interface NavItemConfig {
  key: NavItemKey;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { activeNav, setActiveNav, t, anomalies, vouchers, families } = useApp();

  const navItems: NavItemConfig[] = [
    { key: 'dashboard', icon: LayoutDashboard },
    { key: 'families', icon: Users, badge: `${families.length}` },
    { key: 'field_surveys', icon: ClipboardCheck },
    { key: 'needs', icon: HelpCircle },
    { key: 'poverty_score', icon: TrendingDown },
    { key: 'schemes', icon: FileCheck2 },
    { key: 'mentors', icon: HeartHandshake },
    { key: 'matching', icon: Sparkles, badge: 'AI' },
    { key: 'adoptions', icon: FileSignature },
    { key: 'milestones', icon: Milestone },
    { key: 'funds', icon: Coins },
    { key: 'vendors', icon: Store, badge: `${vouchers.filter((v) => v.status === 'Issued').length}` },
    { key: 'fraud_vigilance', icon: ShieldAlert, badge: `${anomalies.filter((a) => a.status !== 'Cleared').length}`, badgeColor: 'bg-rose-100 text-rose-800' },
    { key: 'grievances', icon: MessageSquareWarning },
    { key: 'gis_map', icon: MapPin },
    { key: 'analytics', icon: LineChart },
    { key: 'notifications', icon: Bell, badge: '4' },
    { key: 'audit_log', icon: FileText },
    { key: 'settings', icon: Settings },
  ];

  const handleSelectNav = (key: NavItemKey) => {
    setActiveNav(key);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Desktop & Mobile Drawer */}
      <aside
        className={`fixed top-20 bottom-0 left-0 z-40 w-72 bg-white border-r border-slate-200 shadow-sm flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 lg:hidden">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Navigation</span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Platform Modules
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleSelectNav(item.key)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition group text-left ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-700'
                    }`}
                  />
                  <span>{t(`nav.${item.key}`)}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badgeColor || 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-amber-400" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom System Status */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/80">
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">Governance Node</span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </div>
            <p className="text-slate-400 text-[10px] mt-0.5">SHA-256 Tamper Audit Enabled</p>
          </div>
        </div>
      </aside>
    </>
  );
};
