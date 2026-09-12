import React, { useState } from 'react';
import {
  Bell,
  MessageSquare,
  PhoneCall,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Coins,
  ShieldAlert,
  Clock,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationsView: React.FC = () => {
  const { t, showToast, playAudioChime } = useApp();
  const [selectedChannel, setSelectedChannel] = useState('All');

  const notifications = [
    {
      id: 'N-01',
      title: 'Verification Proof Validated by Computer Vision',
      message: 'Murrah Buffalo asset proof for Smt. K. Lakshmi Devi (P4-BK-001) verified with 96% confidence score.',
      channel: 'In-App',
      type: 'verification',
      timestamp: '10 mins ago',
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      id: 'N-02',
      title: 'Controlled Escrow Released to Livelihood Vendor',
      message: 'Authorized payment of ₹40,000 disbursed directly to Sri Krishna Agri Equipment & Supplies for Murrah Cattle Unit.',
      channel: 'SMS Simulation',
      type: 'payment',
      timestamp: '25 mins ago',
      icon: Coins,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      id: 'N-03',
      title: 'Anti-Fraud Geo-Fence Breached Alert',
      message: 'Survey BK-006 coordinates flagged 42.6 km outside village boundary. Vigilance freeze initiated.',
      channel: 'Email Simulation',
      type: 'fraud',
      timestamp: '1 hour ago',
      icon: ShieldAlert,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
    {
      id: 'N-04',
      title: 'Autonomous Inactivity Escalation',
      message: 'Household BK-006 inactive for 36 days. Case auto-escalated to Field Worker VOL-06 for doorstep visit.',
      channel: 'Voice/IVR Simulation',
      type: 'followup',
      timestamp: '3 hours ago',
      icon: Clock,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      id: 'N-05',
      title: 'Digital P4 Adoption Agreement Ratified',
      message: 'Dr. K. Srinivas Rao completed formal adoption agreement for Smt. K. Lakshmi Devi & Family with ₹75,000 grant.',
      channel: 'In-App',
      type: 'mentor',
      timestamp: 'Yesterday',
      icon: CheckCircle2,
      color: 'text-teal-600 bg-teal-50 border-teal-200',
    },
    {
      id: 'N-06',
      title: 'Ayushman Health Protection Card Dispatched',
      message: 'National Health Card issued for chronic asthma treatment linkage at Tenali Community Health Center.',
      channel: 'SMS Simulation',
      type: 'scheme',
      timestamp: '2 days ago',
      icon: CheckCircle2,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
    },
  ];

  const filtered = notifications.filter((n) => {
    return selectedChannel === 'All' || n.channel === selectedChannel;
  });

  const handleSimulateDispatch = (channel: string) => {
    playAudioChime('click');
    showToast({
      type: 'info',
      title: `${channel} Dispatched`,
      message: `Simulated broadcast delivered via ${channel} gateway API.`,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{t('nav.notifications')}</h1>
              <p className="text-xs text-slate-500">
                Multi-Channel Dispatch Engine • In-App, SMS, Voice/IVR & Email Simulations
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {['In-App', 'SMS Simulation', 'Voice/IVR Simulation', 'Email Simulation'].map((ch) => (
            <button
              key={ch}
              onClick={() => handleSimulateDispatch(ch)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              <span>Test {ch.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {['All', 'In-App', 'SMS Simulation', 'Voice/IVR Simulation', 'Email Simulation'].map((ch) => (
          <button
            key={ch}
            onClick={() => setSelectedChannel(ch)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 ${
              selectedChannel === ch
                ? 'bg-slate-900 text-white shadow'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {ch}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              className={`p-5 rounded-3xl border transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white shadow-sm hover:shadow-md`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-2xl ${n.color} flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {n.channel}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{n.timestamp}</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 mt-1">{n.title}</h3>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
                </div>
              </div>

              <div className="self-end sm:self-center">
                <button
                  onClick={() => {
                    playAudioChime('success');
                    showToast({
                      type: 'success',
                      title: 'Notification Acknowledged',
                      message: `Notification #${n.id} marked as read.`,
                    });
                  }}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                >
                  Mark Read
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
