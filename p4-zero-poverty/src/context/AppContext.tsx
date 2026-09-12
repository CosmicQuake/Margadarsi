import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Family,
  Mentor,
  VoucherItem,
  AnomalyItem,
  DistrictMetric,
  NeedItem,
  NeedCategory,
  GrievanceItem,
  EscrowTransaction,
  AuditLogEntry,
  PredictivePovertyRisk,
  AgenticInactivityAlert,
  INITIAL_FAMILIES,
  INITIAL_MENTORS,
  INITIAL_VOUCHERS,
  INITIAL_ANOMALIES,
  INITIAL_ESCROWS,
  INITIAL_AUDIT_LOGS,
  INITIAL_PREDICTIVE_RISKS,
  INITIAL_INACTIVITY_ALERTS,
  DISTRICTS_DATA,
  INITIAL_GIS_MARKERS,
  INITIAL_NOTIFICATIONS,
  GISMarker,
  AppNotification,
  SchemeItem,
  JourneyMilestone,
} from '../data/mockData';
import { SupportedLanguage, TRANSLATIONS } from '../i18n/translations';
import { api } from '../api/client';

export type UserRole =
  | 'bangaru-kutumbam'
  | 'volunteer'
  | 'mandal-officer'
  | 'margadarsi'
  | 'vigilance-officer'
  | 'state-admin'
  | 'vendor'
  | 'system-admin';

export type AppViewMode = 'dashboard' | 'landing' | 'judge-mode';

export type NavItemKey =
  | 'dashboard'
  | 'families'
  | 'field_surveys'
  | 'needs'
  | 'poverty_score'
  | 'schemes'
  | 'mentors'
  | 'matching'
  | 'adoptions'
  | 'milestones'
  | 'funds'
  | 'vendors'
  | 'fraud_vigilance'
  | 'grievances'
  | 'gis_map'
  | 'analytics'
  | 'notifications'
  | 'audit_log'
  | 'settings';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  // Roles & View
  role: UserRole;
  setRole: (role: UserRole) => void;
  viewMode: AppViewMode;
  setViewMode: (mode: AppViewMode) => void;
  activeNav: NavItemKey;
  setActiveNav: (nav: NavItemKey) => void;

  // Language & i18n
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;

  // Primary Data
  families: Family[];
  activeFamily: Family;
  activeFamilyId: string;
  setActiveFamilyId: (id: string) => void;
  mentors: Mentor[];
  vouchers: VoucherItem[];
  anomalies: AnomalyItem[];
  escrows: EscrowTransaction[];
  auditLogs: AuditLogEntry[];
  predictiveRisks: PredictivePovertyRisk[];
  inactivityAlerts: AgenticInactivityAlert[];
  districts: DistrictMetric[];

  // GIS Community Map
  gisMarkers: GISMarker[];
  setGisMarkers: React.Dispatch<React.SetStateAction<GISMarker[]>>;
  selectedMarkerForModal: GISMarker | null;
  setSelectedMarkerForModal: (marker: GISMarker | null) => void;

  // Dynamic Notifications
  notifications: AppNotification[];
  addNotification: (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'> & { timestamp?: string; read?: boolean }) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // Offline Mode
  isOffline: boolean;
  toggleOfflineMode: () => void;
  pendingSyncCount: number;
  syncOfflineRecords: () => void;
  isSyncing: boolean;

  // Interactive Modals State
  selectedFamilyForModal: Family | null;
  setSelectedFamilyForModal: (fam: Family | null) => void;
  isVoiceModalOpen: boolean;
  setIsVoiceModalOpen: (open: boolean) => void;
  isMasterDemoModalOpen: boolean;
  setIsMasterDemoModalOpen: (open: boolean) => void;
  isNewSurveyModalOpen: boolean;
  setIsNewSurveyModalOpen: (open: boolean) => void;
  isEvidenceModalOpen: boolean;
  setIsEvidenceModalOpen: (open: boolean) => void;
  selectedMilestoneForEvidence: { familyId: string; milestoneId: number; title: string } | null;
  setSelectedMilestoneForEvidence: (item: any) => void;
  isGrievanceModalOpen: boolean;
  setIsGrievanceModalOpen: (open: boolean) => void;
  isAdoptModalOpen: boolean;
  setIsAdoptModalOpen: (open: boolean) => void;
  selectedFamilyForAdopt: Family | null;
  setSelectedFamilyForAdopt: (fam: Family | null) => void;
  isEmergencyHelpModalOpen: boolean;
  setIsEmergencyHelpModalOpen: (open: boolean) => void;
  isTimelineModalOpen: boolean;
  setIsTimelineModalOpen: (open: boolean) => void;
  selectedSchemeForModal: SchemeItem | null;
  setSelectedSchemeForModal: (scheme: SchemeItem | null) => void;
  isMatchModalOpen: boolean;
  setIsMatchModalOpen: (open: boolean) => void;
  matchResultData: any;
  setMatchResultData: (data: any) => void;

  // Support Request Modal (8 Categories)
  isRequestSupportModalOpen: boolean;
  setIsRequestSupportModalOpen: (open: boolean) => void;
  selectedNeedCategoryForRequest: NeedCategory;
  setSelectedNeedCategoryForRequest: (cat: NeedCategory) => void;
  handleOpenRequestSupportModal: (category?: NeedCategory) => void;

  // Fund & Escrow Details Modal
  selectedTransactionForModal: EscrowTransaction | null;
  setSelectedTransactionForModal: (tx: EscrowTransaction | null) => void;

  // Master Automated Demo (23 Steps)
  isMasterDemoRunning: boolean;
  masterDemoStep: number;
  startMasterDemo: () => void;
  stopMasterDemo: () => void;

  // Universal Audit Entry
  addAuditLogEntry: (action: string, actor: string, roleName: string, details: string) => void;

  // Business Action Handlers (Zero Dead Buttons)
  handleSelectHousehold: (familyId: string) => void;
  handleNewBaselineSurvey: () => void;
  submitSurvey: (surveyData: any) => void;
  handleSyncNow: () => void;
  handleViewTimeline: (familyId?: string) => void;
  handleAdoptFamily: (familyId: string, mentorId?: string) => void;
  adoptFamilyByMentor: (mentorId: string, familyId: string, pledgedAmount: number) => void;
  confirmAdoption: (familyId: string, mentorId: string, amount: number) => void;
  handleRunMatch: (familyId: string) => void;
  handleSubmitEvidence: (familyId: string, milestoneId?: number) => void;
  handleVerifyEvidence: (familyId: string, milestoneId?: number) => void;
  handleReleasePayment: (escrowId: string, amount: number) => void;
  releaseEscrowPayment: (escrowId: string, amount: number) => void;
  handleViewMap: (targetLat?: number, targetLng?: number) => void;
  handleApplyScheme: (familyId: string, schemeId: string) => void;
  applyForScheme: (familyId: string, schemeId: string) => void;
  sanctionScheme: (familyId: string, schemeId: string, amount: number) => void;
  rejectScheme: (familyId: string, schemeId: string, reason: string) => void;
  requestCorrection: (familyId: string, remarks: string) => void;
  flagForInvestigation: (familyId: string, remarks: string) => void;
  handleSchemeAction: (familyId: string, schemeId: string, action: string) => void;
  handleSubmitGrievance: (grievance: Partial<GrievanceItem>) => void;
  fileGrievance: (grievance: Partial<GrievanceItem>) => void;
  handleResolveGrievance: (grievanceId: string, remarks?: string) => void;
  handleEscalateGrievance: (grievanceId: string, remarks?: string) => void;
  handleRunPrediction: (familyId: string) => void;
  handleSpeakYourNeed: () => void;
  handleEmergencyHelp: () => void;
  handlePerformFraudAction: (alertId: string, action: 'Review' | 'Flag' | 'Request Evidence' | 'Freeze Workflow' | 'Resolve Alert') => void;
  resolveAnomalyAction: (alertId: string, actionOrStatus: string) => void;
  redeemVoucherAction: (code: string, proofPhotoUrl?: string, geoLoc?: string) => boolean;
  addFamilyNeed: (familyId: string, need: Partial<NeedItem>) => void;
  resetDemoData: () => void;
  triggerSOS: (familyId: string) => void;
  sosAlertActive: boolean;
  clearSOS: () => void;
  playAudioChime: (type: 'success' | 'alert' | 'click') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'p4_zero_poverty_state_v3';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('bangaru-kutumbam');
  const [viewMode, setViewMode] = useState<AppViewMode>('dashboard');
  const [activeNav, setActiveNav] = useState<NavItemKey>('dashboard');
  const [language, setLanguageState] = useState<SupportedLanguage>('en'); // STRICT DEFAULT ENGLISH
  const [activeFamilyId, setActiveFamilyId] = useState<string>('P4-BK-001');

  // Offline-First Mode State
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(4);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Master Automated Demo State
  const [isMasterDemoRunning, setIsMasterDemoRunning] = useState<boolean>(false);
  const [masterDemoStep, setMasterDemoStep] = useState<number>(1);

  // Modal Dialog States
  const [selectedFamilyForModal, setSelectedFamilyForModal] = useState<Family | null>(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);
  const [isMasterDemoModalOpen, setIsMasterDemoModalOpen] = useState<boolean>(false);
  const [isNewSurveyModalOpen, setIsNewSurveyModalOpen] = useState<boolean>(false);
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState<boolean>(false);
  const [selectedMilestoneForEvidence, setSelectedMilestoneForEvidence] = useState<{ familyId: string; milestoneId: number; title: string } | null>(null);
  const [isGrievanceModalOpen, setIsGrievanceModalOpen] = useState<boolean>(false);
  const [isAdoptModalOpen, setIsAdoptModalOpen] = useState<boolean>(false);
  const [selectedFamilyForAdopt, setSelectedFamilyForAdopt] = useState<Family | null>(null);
  const [isEmergencyHelpModalOpen, setIsEmergencyHelpModalOpen] = useState<boolean>(false);
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState<boolean>(false);
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState<SchemeItem | null>(null);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState<boolean>(false);
  const [matchResultData, setMatchResultData] = useState<any>(null);

  // Support Request Modal State (8 Categories)
  const [isRequestSupportModalOpen, setIsRequestSupportModalOpen] = useState<boolean>(false);
  const [selectedNeedCategoryForRequest, setSelectedNeedCategoryForRequest] = useState<NeedCategory>('Food');

  // Fund & Escrow Details Modal State
  const [selectedTransactionForModal, setSelectedTransactionForModal] = useState<EscrowTransaction | null>(null);

  // GIS Community Map State
  const [gisMarkers, setGisMarkers] = useState<GISMarker[]>(INITIAL_GIS_MARKERS);
  const [selectedMarkerForModal, setSelectedMarkerForModal] = useState<GISMarker | null>(null);

  // Dynamic Notifications State
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_notifs');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_NOTIFICATIONS;
  });

  // SOS Emergency
  const [sosAlertActive, setSosAlertActive] = useState<boolean>(false);

  // Relational Entities
  const [families, setFamilies] = useState<Family[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_fams');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_FAMILIES;
  });

  const [mentors, setMentors] = useState<Mentor[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_mentors');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_MENTORS;
  });

  const [vouchers, setVouchers] = useState<VoucherItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_vouchers');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_VOUCHERS;
  });

  const [anomalies, setAnomalies] = useState<AnomalyItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_anomalies');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_ANOMALIES;
  });

  const [escrows, setEscrows] = useState<EscrowTransaction[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_escrows');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_ESCROWS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_audit');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_AUDIT_LOGS;
  });

  const [predictiveRisks, setPredictiveRisks] = useState<PredictivePovertyRisk[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_risks');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_PREDICTIVE_RISKS;
  });

  const [inactivityAlerts, setInactivityAlerts] = useState<AgenticInactivityAlert[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_inactivity');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_INACTIVITY_ALERTS;
  });

  const [districts] = useState<DistrictMetric[]>(DISTRICTS_DATA);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistent State Sync
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY + '_fams', JSON.stringify(families));
      localStorage.setItem(LOCAL_STORAGE_KEY + '_escrows', JSON.stringify(escrows));
      localStorage.setItem(LOCAL_STORAGE_KEY + '_audit', JSON.stringify(auditLogs));
      localStorage.setItem(LOCAL_STORAGE_KEY + '_anomalies', JSON.stringify(anomalies));
      localStorage.setItem(LOCAL_STORAGE_KEY + '_mentors', JSON.stringify(mentors));
      localStorage.setItem(LOCAL_STORAGE_KEY + '_vouchers', JSON.stringify(vouchers));
      localStorage.setItem(LOCAL_STORAGE_KEY + '_notifs', JSON.stringify(notifications));
    } catch (e) {}
  }, [families, escrows, auditLogs, anomalies, mentors, vouchers, notifications]);

  // Dynamic Notifications Management
  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'> & { timestamp?: string; read?: boolean }) => {
    const newNotif: AppNotification = {
      id: `NOTIF-${Date.now().toString().slice(-4)}`,
      title: notif.title,
      message: notif.message,
      type: notif.type,
      timestamp: notif.timestamp || 'Just now',
      read: notif.read || false,
      actionNav: notif.actionNav,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast({
      type: 'info',
      title: 'Notifications Cleared',
      message: 'All notifications marked as read.',
    });
  };

  // Derived Active Family
  const activeFamily = families.find((f) => f.id === activeFamilyId) || families[0];

  // Translation Function
  const t = (key: string): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  // Toast Notification System
  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const playAudioChime = (type: 'success' | 'alert' | 'click') => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'success') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'alert') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.setValueAtTime(240, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else {
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch (e) {}
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    playAudioChime('click');
    showToast({
      type: 'info',
      title: 'Role Switched',
      message: `Switched perspective to ${newRole.replace('-', ' ').toUpperCase()}`,
    });
  };

  const setLanguage = (newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    playAudioChime('click');
    showToast({
      type: 'info',
      title: 'Language Updated',
      message: `Interface language updated to ${newLang.toUpperCase()}`,
    });
  };

  const addAuditLogEntry = (action: string, actor: string, roleName: string, details: string) => {
    const prevHash = auditLogs[0]?.currentHash || '0'.repeat(64);
    const currHash = `${prevHash.slice(0, 16)}${Math.random().toString(16).slice(2, 10)}${Date.now().toString(16)}`.padEnd(64, 'a');
    const newEntry: AuditLogEntry = {
      id: `AUDIT-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor,
      role: roleName,
      action,
      previousHash: prevHash,
      currentHash: currHash,
      details,
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  // Offline-first handlers
  const toggleOfflineMode = () => {
    setIsOffline(!isOffline);
    playAudioChime('click');
    showToast({
      type: !isOffline ? 'warning' : 'success',
      title: !isOffline ? 'Offline Mode Active' : 'Online Mode Reconnected',
      message: !isOffline
        ? 'Field workers can capture surveys and evidence offline; records queue locally.'
        : 'Reconnected to national server. Pending records are ready to synchronize.',
    });
  };

  const syncOfflineRecords = () => {
    if (isSyncing || pendingSyncCount === 0) return;
    setIsSyncing(true);
    playAudioChime('click');
    setTimeout(() => {
      setIsSyncing(false);
      setPendingSyncCount(0);
      playAudioChime('success');
      addAuditLogEntry('OFFLINE_SYNC_BATCH', 'Field Worker VOL-01', 'Volunteer', 'Synchronized 4 offline baseline surveys with SHA-256 validation');
      showToast({
        type: 'success',
        title: 'Sync Completed',
        message: 'All queued offline surveys, GPS coordinates, and evidence hashes synchronized successfully.',
      });
    }, 1800);
  };

  // -------------------------------------------------------------
  // ZERO DEAD BUTTONS: HANDLERS FOR ALL ACTIONS
  // -------------------------------------------------------------

  const handleSelectHousehold = (familyId: string) => {
    setActiveFamilyId(familyId);
    const fam = families.find((f) => f.id === familyId) || activeFamily;
    setSelectedFamilyForModal(fam);
    playAudioChime('click');
  };

  const handleNewBaselineSurvey = () => {
    playAudioChime('click');
    setIsNewSurveyModalOpen(true);
  };

  const submitSurvey = (surveyData: any) => {
    const newId = `P4-BK-${(families.length + 1).toString().padStart(3, '0')}`;
    const newFamily: Family = {
      id: newId,
      familyName: surveyData.familyName || 'New Household',
      familyNameTe: surveyData.familyName || 'కొత్త కుటుంబం',
      headOfHousehold: surveyData.headOfHousehold || 'Head of Household',
      aadhaarMasked: surveyData.aadhaarMasked || 'XXXX-XXXX-4411',
      rationCardNo: surveyData.rationCardNo || `RC-P4-${Date.now().toString().slice(-8)}`,
      district: surveyData.district || 'Guntur Central Division',
      mandal: surveyData.mandal || 'Tenali Block',
      village: surveyData.village || 'Pinapadu Village',
      wardSecretariat: 'Ward Secretariat Unit #01',
      phone: surveyData.phone || '+91 94901 00000',
      povertyScore: surveyData.povertyScore || 75,
      povertyCategory: surveyData.povertyCategory || 'High Risk',
      povertyStatus: (surveyData.povertyScore || 75) <= 20 ? 'Self-Reliant (Poverty Exited)' : (surveyData.povertyScore || 75) <= 60 ? 'Graduating' : 'Extreme Vulnerability',
      monthlyIncome: surveyData.monthlyIncome || 3800,
      targetIncome: 18000,
      housingType: surveyData.housingType || 'Katcha Mud & Thatch',
      housingTypeTe: 'మట్టి ఇల్లు',
      landHoldings: '0.0 Acres (Landless)',
      assets: ['BPL Ration Card'],
      members: surveyData.members || [
        {
          id: 'M-1',
          name: surveyData.headOfHousehold || 'Beneficiary Head',
          relation: 'Self (Head)',
          age: 42,
          gender: 'Female',
          education: 'Primary (5th Class)',
          occupation: 'Casual Daily Wage',
          income: surveyData.monthlyIncome || 3800,
        },
      ],
      mentorId: null,
      mentorName: null,
      mentorGrantTotal: 0,
      assignedVolunteerId: 'VOL-01',
      assignedVolunteerName: 'K. Suresh (Community Field Worker)',
      volunteerPhone: '+91 98480 22334',
      journeyMilestones: [
        { id: 1, title: 'Household Registration & Baseline Survey', titleTe: 'కుటుంబ నమోదు & సర్వే', description: 'Verified by community worker', descriptionTe: 'ధృవీకరించబడింది', status: 'completed', date: new Date().toISOString().slice(0, 10), verifiedBy: 'VOL-01' },
        { id: 2, title: 'Checker Verification & Need Triage', titleTe: 'అవసరాల గుర్తింపు', description: 'Under Review by Mandal Officer', descriptionTe: 'పరిశీలనలో ఉంది', status: 'current' },
        { id: 3, title: 'Margadarsi Mentor Adoption', titleTe: 'మార్గదర్శి దత్తత', description: 'Awaiting mentor matching', descriptionTe: 'ఎంపిక పెండింగ్‌లో ఉంది', status: 'upcoming' },
        { id: 4, title: 'P4 Support Agreement & Escrow Deposit', titleTe: 'ఎస్క蓦 ఒప్పందం', description: 'Pledge capital lock', descriptionTe: 'నిధులు లాక్', status: 'upcoming' },
        { id: 5, title: 'Livelihood Asset Handover', titleTe: 'ఆస్తి పంపిణీ', description: 'Direct equipment delivery', descriptionTe: 'సామగ్రి డెలివరీ', status: 'upcoming' },
        { id: 6, title: 'Computer Vision Proof Verification', titleTe: 'ఫోటో ధృవీకరణ', description: 'YOLOv8 deep learning check', descriptionTe: 'AI చెక్', status: 'upcoming' },
        { id: 7, title: 'Controlled Escrow Vendor Release', titleTe: 'చెల్లింపు విడుదల', description: 'Disbursement to verified vendor', descriptionTe: 'వెండర్ కు విడుదల', status: 'upcoming' },
        { id: 8, title: 'Sustained Income Uplift Check', titleTe: 'ఆదాయం పెరుగుదల', description: 'Income stabilization check', descriptionTe: 'ఆదాయ పరీక్ష', status: 'upcoming' },
        { id: 9, title: 'Zero Poverty Graduation Certificate', titleTe: 'జీరో పావర్టీ సర్టిఫికేట్', description: 'MPI score drop below 20', descriptionTe: 'ధ్రువీకరణ పత్రం', status: 'upcoming' },
      ],
      needs: [
        {
          id: `NEED-${Date.now().toString().slice(-4)}`,
          category: 'Employment',
          title: 'Livelihood Asset Support Needed',
          titleTe: 'ఉపాధి పరికరం అవసరం',
          description: 'Baseline survey registered need for productive micro-enterprise asset.',
          urgency: 'High',
          status: 'Pending Review',
          requestedAt: new Date().toISOString().slice(0, 10),
        },
      ],
      schemes: [
        {
          id: 'SCH-01',
          name: 'P4 Rural Livelihood Asset Grant',
          nameTe: 'గ్రామీణ ఉపాధి ఆస్తి గ్రాంట్',
          dept: 'Rural Development',
          benefit: '100% Subsidized Production Equipment up to ₹35,000',
          benefitTe: '₹35,000 వరకు ఉచిత పరికరాలు',
          eligibility: 'BPL Household with Landless Casual Farm Labor status',
          eligibilityTe: 'భూమిలేని పేద కుటుంబం',
          requiredDocs: ['Aadhaar', 'White Ration Card', 'Bank Passbook'],
          status: 'Under Review',
          matchType: 'Eligible',
        },
      ],
      grievances: [],
      historicalScores: [
        { month: 'Oct 25', score: surveyData.povertyScore || 75, income: surveyData.monthlyIncome || 3800 },
        { month: 'Nov 25', score: surveyData.povertyScore || 75, income: surveyData.monthlyIncome || 3800 },
        { month: 'Dec 25', score: surveyData.povertyScore || 75, income: surveyData.monthlyIncome || 3800 },
        { month: 'Jan 26', score: surveyData.povertyScore || 75, income: surveyData.monthlyIncome || 3800 },
        { month: 'Feb 26', score: surveyData.povertyScore || 75, income: surveyData.monthlyIncome || 3800 },
        { month: 'Mar 26', score: surveyData.povertyScore || 75, income: surveyData.monthlyIncome || 3800 },
      ],
      lat: surveyData.lat || 16.244,
      lng: surveyData.lng || 80.64,
      hasAnomalyFlag: false,
      surveyCompletedDate: new Date().toISOString().slice(0, 10),
      eKycStatus: 'Verified',
    };

    setFamilies((prev) => [newFamily, ...prev]);
    setActiveFamilyId(newId);

    addAuditLogEntry(
      'SUBMIT_BASELINE_SURVEY',
      'Field Worker (VOL-01)',
      'Volunteer / Maker',
      `Captured baseline survey for ${newFamily.familyName} (MPI: ${newFamily.povertyScore}/100)`
    );

    addNotification({
      title: 'New Baseline Survey Received',
      message: `Household ${newId} (${newFamily.familyName}) submitted by Volunteer VOL-01. Queued for Checker approval.`,
      type: 'request',
      read: false,
      actionNav: 'field_surveys',
    });

    if (isOffline) {
      setPendingSyncCount((prev) => prev + 1);
    }

    playAudioChime('success');
    showToast({
      type: 'success',
      title: 'Baseline Survey Saved',
      message: `Survey for ${newFamily.familyName} recorded. HH ID: ${newId}.`,
    });
  };

  const handleSyncNow = () => {
    syncOfflineRecords();
  };

  const handleViewTimeline = (familyId?: string) => {
    const fid = familyId || activeFamilyId;
    setActiveFamilyId(fid);
    playAudioChime('click');
    setIsTimelineModalOpen(true);
  };

  const handleAdoptFamily = (familyId: string, mentorId?: string) => {
    const fam = families.find((f) => f.id === familyId) || activeFamily;
    setSelectedFamilyForAdopt(fam);
    setIsAdoptModalOpen(true);
    playAudioChime('click');
  };

  const adoptFamilyByMentor = (mentorId: string, familyId: string, pledgedAmount: number) => {
    confirmAdoption(familyId, mentorId, pledgedAmount);
  };

  const confirmAdoption = (familyId: string, mentorId: string, pledgedAmount: number) => {
    const mentor = mentors.find((m) => m.id === mentorId) || mentors[0];
    setFamilies((prev) =>
      prev.map((f) => {
        if (f.id === familyId) {
          return {
            ...f,
            mentorId: mentor.id,
            mentorName: mentor.name,
            mentorGrantTotal: pledgedAmount,
            povertyStatus: 'Graduating',
          };
        }
        return f;
      })
    );

    // Create escrow transaction
    const newEscrow: EscrowTransaction = {
      id: `ESCROW-${Date.now().toString().slice(-4)}`,
      householdId: familyId,
      mentorId: mentor.id,
      mentorName: mentor.name,
      totalPledged: pledgedAmount,
      fundsLocked: pledgedAmount,
      fundsReleased: 0,
      fundsRemaining: 0,
      currentMilestoneId: 3,
      currentMilestoneName: 'P4 Adoption Agreement Signed',
      status: 'Locked',
    };
    setEscrows((prev) => [newEscrow, ...prev]);

    addAuditLogEntry(
      'ADOPT_FAMILY_AGREEMENT',
      mentor.name,
      'Margadarsi Mentor',
      `Executed digital P4 adoption of ${familyId} with commitment of Rs. ${pledgedAmount.toLocaleString()}`
    );

    setIsAdoptModalOpen(false);
    playAudioChime('success');
    showToast({
      type: 'success',
      title: 'Family Adopted Successfully',
      message: `${mentor.name} adopted ${familyId}. Rs. ${pledgedAmount.toLocaleString()} locked in Controlled Escrow.`,
    });
  };

  const handleRunMatch = (familyId: string) => {
    playAudioChime('click');
    // Try backend API, fallback to client
    api.getMatch(familyId)
      .then((res) => {
        setMatchResultData(res);
        setIsMatchModalOpen(true);
      })
      .catch(() => {
        // Mock fallback
        setMatchResultData({
          familyId,
          mentorId: 'M-101',
          mentorName: 'Dr. K. Srinivas Rao',
          compatibilityScore: 92,
          reasons: [
            "92% Vector match on 'Dairy Farming & Micro-finance' specialization",
            "Located within same division for direct field inspections",
            "High capacity for capital grant contribution (Rs. 75,000)",
          ],
          alternativeMatches: [
            { mentorId: 'M-102', name: 'Smt. Anita Deshmukh', score: 86, expertise: 'Tailoring & Garment Units' },
            { mentorId: 'M-103', name: 'Sri Rajesh Verma', score: 79, expertise: 'Youth IT Hardware & Skills' },
          ],
        });
        setIsMatchModalOpen(true);
      });
  };

  const handleSubmitEvidence = (familyId: string, milestoneId?: number) => {
    playAudioChime('click');
    const mid = milestoneId || 5;
    const fam = families.find((f) => f.id === familyId) || activeFamily;
    const ms = fam.journeyMilestones.find((m) => m.id === mid) || fam.journeyMilestones[0];
    setSelectedMilestoneForEvidence({
      familyId,
      milestoneId: mid,
      title: ms?.title || 'Livelihood Asset Delivery',
    });
    setIsEvidenceModalOpen(true);
  };

  const handleVerifyEvidence = (familyId: string, milestoneId?: number) => {
    playAudioChime('click');
    handleSubmitEvidence(familyId, milestoneId);
  };

  const handleReleasePayment = (escrowId: string, amount: number) => {
    playAudioChime('click');
    setEscrows((prev) =>
      prev.map((e) => {
        if (e.id === escrowId) {
          return {
            ...e,
            fundsReleased: e.fundsReleased + amount,
            fundsLocked: Math.max(0, e.fundsLocked - amount),
            status: 'Released',
            lastDisbursedAt: new Date().toISOString().slice(0, 10),
          };
        }
        return e;
      })
    );

    addAuditLogEntry(
      'CONTROLLED_ESCROW_DISBURSEMENT',
      'Finance & Escrow Officer',
      'Mandal Officer',
      `Authorized release of Rs. ${amount.toLocaleString()} to verified livelihood vendor`
    );

    playAudioChime('success');
    showToast({
      type: 'success',
      title: 'Payment Released to Vendor',
      message: `Rs. ${amount.toLocaleString()} transferred from Controlled Escrow directly to Vendor account.`,
    });
  };

  const releaseEscrowPayment = (escrowId: string, amount: number) => {
    handleReleasePayment(escrowId, amount);
  };

  const handleViewMap = (_targetLat?: number, _targetLng?: number) => {
    setActiveNav('gis_map');
    playAudioChime('click');
  };

  const handleApplyScheme = (familyId: string, schemeId: string) => {
    playAudioChime('click');
    setFamilies((prev) =>
      prev.map((f) => {
        if (f.id === familyId) {
          const updatedSchemes = f.schemes.map((s) => {
            if (s.id === schemeId) {
              return { ...s, status: 'Applied' as const, appliedAt: new Date().toISOString().slice(0, 10) };
            }
            return s;
          });
          return { ...f, schemes: updatedSchemes };
        }
        return f;
      })
    );

    addAuditLogEntry(
      'GOVT_SCHEME_APPLY',
      'Citizen / Field Worker',
      'Bangaru Kutumbam',
      `Submitted direct application for scheme ${schemeId} for household ${familyId}`
    );

    addNotification({
      title: 'Scheme Application Lodged',
      message: `Direct application submitted for scheme ${schemeId} (Household: ${familyId}).`,
      type: 'info',
      actionNav: 'schemes',
    });

    playAudioChime('success');
    showToast({
      type: 'success',
      title: 'Scheme Application Submitted',
      message: `Application lodged for ${schemeId}. Track status in Schemes desk.`,
    });
  };

  const applyForScheme = (familyId: string, schemeId: string) => {
    handleApplyScheme(familyId, schemeId);
  };

  const sanctionScheme = (familyId: string, schemeId: string, amount: number) => {
    playAudioChime('success');
    setFamilies((prev) =>
      prev.map((f) => {
        if (f.id === familyId) {
          const updatedSchemes = f.schemes.map((s) => {
            if (s.id === schemeId) {
              return {
                ...s,
                status: 'Sanctioned' as const,
                sanctionAmount: amount,
                sanctionedAt: new Date().toISOString().slice(0, 10),
              };
            }
            return s;
          });
          return { ...f, schemes: updatedSchemes };
        }
        return f;
      })
    );

    addAuditLogEntry(
      'SCHEME_SANCTION_APPROVED',
      'Sri S. Ramanjaneyulu, BDO',
      'Block Development Officer',
      `Sanctioned scheme ${schemeId} for household ${familyId} with sanction amount Rs. ${amount.toLocaleString()}`
    );

    addNotification({
      title: 'Scheme Sanctioned',
      message: `Scheme ${schemeId} sanctioned (Rs. ${amount.toLocaleString()}) for household ${familyId}.`,
      type: 'success',
      actionNav: 'schemes',
    });

    showToast({
      type: 'success',
      title: 'Sanction Order Generated',
      message: `Scheme ${schemeId} sanctioned for Rs. ${amount.toLocaleString()}. Dispatched to treasury/escrow desk.`,
    });
  };

  const rejectScheme = (familyId: string, schemeId: string, reason: string) => {
    playAudioChime('alert');
    setFamilies((prev) =>
      prev.map((f) => {
        if (f.id === familyId) {
          const updatedSchemes = f.schemes.map((s) => {
            if (s.id === schemeId) {
              return {
                ...s,
                status: 'Rejected' as const,
                remarks: reason,
              };
            }
            return s;
          });
          return { ...f, schemes: updatedSchemes };
        }
        return f;
      })
    );

    addAuditLogEntry(
      'SCHEME_APPLICATION_REJECTED',
      'Sri S. Ramanjaneyulu, BDO',
      'Block Development Officer',
      `Rejected scheme ${schemeId} for household ${familyId}. Reason: ${reason}`
    );

    addNotification({
      title: 'Scheme Rejected',
      message: `Scheme ${schemeId} for ${familyId} was rejected: ${reason}`,
      type: 'warning',
      actionNav: 'schemes',
    });

    showToast({
      type: 'warning',
      title: 'Scheme Rejected',
      message: `Application rejected for ${schemeId}. Reason: ${reason}`,
    });
  };

  const requestCorrection = (familyId: string, remarks: string) => {
    playAudioChime('click');
    setFamilies((prev) =>
      prev.map((f) => {
        if (f.id === familyId) {
          const updatedSchemes = f.schemes.map((s) => {
            if (s.status === 'Under Review') {
              return { ...s, remarks: `Correction Requested: ${remarks}` };
            }
            return s;
          });
          return { ...f, schemes: updatedSchemes };
        }
        return f;
      })
    );

    addAuditLogEntry(
      'REQUEST_DOCUMENT_CORRECTION',
      'Sri S. Ramanjaneyulu, BDO',
      'Block Development Officer',
      `Requested correction for household ${familyId}: ${remarks}`
    );

    addNotification({
      title: 'Correction Requested',
      message: `Field verification note sent for ${familyId}: ${remarks}`,
      type: 'info',
      actionNav: 'schemes',
    });

    showToast({
      type: 'info',
      title: 'Correction Sent to Field Worker',
      message: `Household ${familyId} flagged for correction: ${remarks}`,
    });
  };

  const flagForInvestigation = (familyId: string, remarks: string) => {
    playAudioChime('alert');
    const fam = families.find((f) => f.id === familyId) || activeFamily;
    const newAnomaly: AnomalyItem = {
      id: `VIG-${Date.now().toString().slice(-4)}`,
      type: 'FIELD_DISCREPANCY',
      title: `Field Discrepancy Flag: ${fam.familyName}`,
      description: remarks,
      householdId: familyId,
      district: fam.district || 'Guntur Central Division',
      mandal: fam.mandal || 'Tenali Block',
      severity: 'High',
      status: 'Under Investigation',
      evidence: `Flagged by BDO Desk during scrutiny: ${remarks}`,
      flaggedAt: new Date().toISOString(),
    };
    setAnomalies((prev) => [newAnomaly, ...prev]);

    addAuditLogEntry(
      'FLAGGED_FOR_VIGILANCE',
      'Sri S. Ramanjaneyulu, BDO',
      'Block Development Officer',
      `Flagged household ${familyId} for vigilance inspection: ${remarks}`
    );

    addNotification({
      title: 'Vigilance Case Created',
      message: `Household ${familyId} flagged for Anti-Fraud inspection.`,
      type: 'error',
      actionNav: 'vigilance',
    });

    showToast({
      type: 'error',
      title: 'Flagged for Vigilance',
      message: `Case ${newAnomaly.id} registered with State Vigilance Bureau. Benefits frozen.`,
    });
  };

  const handleSchemeAction = (familyId: string, schemeId: string, action: string) => {
    playAudioChime('click');
    if (action === 'apply') {
      handleApplyScheme(familyId, schemeId);
    } else if (action === 'view') {
      const s = activeFamily.schemes.find((sch) => sch.id === schemeId);
      if (s) setSelectedSchemeForModal(s);
    } else if (action === 'track') {
      showToast({
        type: 'info',
        title: 'Tracking Application',
        message: `Scheme ${schemeId} application is Under Review at Mandal Development Office. SLA: 4 days remaining.`,
      });
    } else if (action === 'upload') {
      showToast({
        type: 'success',
        title: 'Documents Uploaded',
        message: 'Ration card copy & bank passbook attached and verified.',
      });
    }
  };

  const handleSubmitGrievance = (grievance: Partial<GrievanceItem>) => {
    const id = `GRV-${Date.now().toString().slice(-4)}`;
    const newG: GrievanceItem = {
      id,
      householdId: grievance.householdId || activeFamilyId,
      householdName: grievance.householdName || activeFamily.familyName,
      category: grievance.category || 'Benefit Access',
      priority: grievance.priority || 'High',
      description: grievance.description || 'Grievance registered',
      descriptionTe: '',
      channel: grievance.channel || 'Mobile App',
      status: 'Open',
      filedAt: new Date().toISOString().slice(0, 10),
      slaDeadline: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10),
      assignedOfficer: 'Mandal Revenue Inspector',
    };

    setFamilies((prev) =>
      prev.map((f) => {
        if (f.id === newG.householdId) {
          return { ...f, grievances: [newG, ...f.grievances] };
        }
        return f;
      })
    );

    addAuditLogEntry(
      'SUBMIT_GRIEVANCE',
      newG.householdName,
      'Bangaru Kutumbam',
      `Filed grievance ${id} under category '${newG.category}' (Priority: ${newG.priority})`
    );

    addNotification({
      title: 'Grievance Registered',
      message: `Token #${id} created under ${newG.category}. Assigned to Mandal Revenue Inspector.`,
      type: 'warning',
      actionNav: 'grievance',
    });

    setIsGrievanceModalOpen(false);
    playAudioChime('success');
    showToast({
      type: 'success',
      title: 'Grievance Lodged',
      message: `Token #${id} generated. SLA deadline assigned to Mandal Officer.`,
    });
  };

  const fileGrievance = (grievance: Partial<GrievanceItem>) => {
    handleSubmitGrievance(grievance);
  };

  const handleResolveGrievance = (grievanceId: string, remarks?: string) => {
    setFamilies((prev) =>
      prev.map((f) => ({
        ...f,
        grievances: f.grievances.map((g) => {
          if (g.id === grievanceId) {
            return {
              ...g,
              status: 'Resolved' as const,
              officerRemarks: remarks || 'Grievance investigated on site and resolved.',
            };
          }
          return g;
        }),
      }))
    );

    addAuditLogEntry(
      'RESOLVE_GRIEVANCE',
      'Mandal Revenue Inspector',
      'Mandal Officer',
      `Resolved grievance ${grievanceId}. Remarks: ${remarks || 'Resolved'}`
    );

    playAudioChime('success');
    showToast({
      type: 'success',
      title: 'Grievance Resolved',
      message: `Grievance #${grievanceId} marked as Resolved in citizen portal.`,
    });
  };

  const handleEscalateGrievance = (grievanceId: string, remarks?: string) => {
    setFamilies((prev) =>
      prev.map((f) => ({
        ...f,
        grievances: f.grievances.map((g) => {
          if (g.id === grievanceId) {
            return {
              ...g,
              status: 'Investigating' as const,
              priority: 'Critical' as const,
              officerRemarks: `Escalated to District Collector: ${remarks || 'Urgent intervention required'}`,
            };
          }
          return g;
        }),
      }))
    );

    addAuditLogEntry(
      'ESCALATE_GRIEVANCE',
      'Mandal Checker Desk',
      'Mandal Officer',
      `Escalated grievance ${grievanceId} to District Command Center`
    );

    playAudioChime('alert');
    showToast({
      type: 'warning',
      title: 'Grievance Escalated',
      message: `Grievance #${grievanceId} escalated to District Collectorate queue.`,
    });
  };

  const handleRunPrediction = (familyId: string) => {
    playAudioChime('click');
    api.predictFamilyRisk(familyId)
      .then((res) => {
        setPredictiveRisks((prev) => [res, ...prev.filter((r) => r.familyId !== familyId)]);
        playAudioChime('success');
        showToast({
          type: 'info',
          title: 'Prediction Updated',
          message: `ML Model calculated 6-month poverty regression risk: ${res.predictedRisk}% (Trend: ${res.trend})`,
        });
      })
      .catch(() => {
        // local simulation
        const fam = families.find((f) => f.id === familyId) || activeFamily;
        const simulatedRisk = Math.max(15, Math.min(92, Math.round(fam.povertyScore * 0.95)));
        const newPred: PredictivePovertyRisk = {
          id: `RISK-${Date.now().toString().slice(-4)}`,
          familyId: fam.id,
          familyName: fam.familyName,
          currentScore: fam.povertyScore,
          predictedRisk: simulatedRisk,
          trend: fam.mentorId ? 'Decreasing' : 'Increasing',
          reason: fam.mentorId
            ? 'Steady income generation from productive asset and mentor backing.'
            : 'Informal daily-wage labor vulnerability without emergency buffer.',
          recommendedAction: fam.mentorId
            ? 'Continue monthly livelihood graduation tracking.'
            : 'Urgent allocation of productive livelihood unit and SHG linkage.',
        };
        setPredictiveRisks((prev) => [newPred, ...prev.filter((r) => r.familyId !== familyId)]);
        playAudioChime('success');
        showToast({
          type: 'info',
          title: 'ML Risk Prediction Run',
          message: `Calculated poverty vulnerability risk: ${simulatedRisk}% (Trend: ${newPred.trend})`,
        });
      });
  };

  const handleSpeakYourNeed = () => {
    playAudioChime('click');
    setIsVoiceModalOpen(true);
  };

  const handleEmergencyHelp = () => {
    playAudioChime('alert');
    setIsEmergencyHelpModalOpen(true);
  };

  const triggerSOS = (familyId: string) => {
    setSosAlertActive(true);
    playAudioChime('alert');
    addAuditLogEntry(
      'EMERGENCY_SOS_TRIGGERED',
      'Citizen Beneficiary',
      'Bangaru Kutumbam',
      `Emergency SOS broadcast for family ${familyId}. Field worker and PHC notified.`
    );
    showToast({
      type: 'error',
      title: 'EMERGENCY SOS BROADCASTED',
      message: 'Mandal Emergency Response, Secretariat Field Worker & PHC notified.',
    });
  };

  const clearSOS = () => {
    setSosAlertActive(false);
    showToast({
      type: 'info',
      title: 'SOS Cleared',
      message: 'Emergency incident handled and logged into vigilance archive.',
    });
  };

  const handlePerformFraudAction = (alertId: string, action: 'Review' | 'Flag' | 'Request Evidence' | 'Freeze Workflow' | 'Resolve Alert') => {
    playAudioChime('click');
    setAnomalies((prev) =>
      prev.map((a) => {
        if (a.id === alertId) {
          const newStatus =
            action === 'Resolve Alert'
              ? 'Cleared'
              : action === 'Freeze Workflow'
              ? 'Frozen'
              : action === 'Flag'
              ? 'Fraud Confirmed'
              : 'Under Investigation';
          return { ...a, status: newStatus as any };
        }
        return a;
      })
    );

    addAuditLogEntry(
      `VIGILANCE_${action.toUpperCase().replace(' ', '_')}`,
      'Vigilance Officer',
      'Vigilance Officer',
      `Action '${action}' executed on vigilance anomaly ${alertId}`
    );

    playAudioChime(action === 'Resolve Alert' ? 'success' : 'alert');
    showToast({
      type: action === 'Resolve Alert' ? 'success' : 'warning',
      title: 'Vigilance Action Logged',
      message: `Anomaly #${alertId} updated to '${action}' status.`,
    });
  };

  const resolveAnomalyAction = (alertId: string, actionOrStatus: string) => {
    playAudioChime(actionOrStatus === 'Cleared' ? 'success' : 'alert');
    setAnomalies((prev) =>
      prev.map((a) => {
        if (a.id === alertId) {
          return {
            ...a,
            status: actionOrStatus as 'Under Investigation' | 'Frozen' | 'Cleared',
          };
        }
        return a;
      })
    );

    addAuditLogEntry(
      `VIGILANCE_STATUS_${actionOrStatus.toUpperCase()}`,
      'Sri V. Prasad',
      'State Vigilance Officer',
      `Vigilance Anomaly #${alertId} status updated to ${actionOrStatus}`
    );

    addNotification({
      title: `Vigilance Alert ${actionOrStatus}`,
      message: `Case #${alertId} marked as ${actionOrStatus}.`,
      type: actionOrStatus === 'Cleared' ? 'success' : 'warning',
      actionNav: 'vigilance',
    });

    showToast({
      type: actionOrStatus === 'Cleared' ? 'success' : 'warning',
      title: 'Vigilance Action Executed',
      message: `Case #${alertId} updated to ${actionOrStatus}.`,
    });
  };

  const redeemVoucherAction = (code: string, proofPhotoUrl?: string, geoLoc?: string): boolean => {
    const voucherIndex = vouchers.findIndex((v) => v.voucherCode.toUpperCase() === code.toUpperCase());
    if (voucherIndex === -1) {
      playAudioChime('alert');
      showToast({
        type: 'error',
        title: 'Invalid Voucher Code',
        message: `Voucher '${code}' was not found in P4 registry.`,
      });
      return false;
    }

    const targetVoucher = vouchers[voucherIndex];
    if (targetVoucher.status === 'Redeemed') {
      playAudioChime('alert');
      showToast({
        type: 'warning',
        title: 'Voucher Already Redeemed',
        message: `Voucher '${code}' was already redeemed on ${targetVoucher.redeemedDate || 'prior date'}.`,
      });
      return false;
    }

    const updatedVoucher: VoucherItem = {
      ...targetVoucher,
      status: 'Redeemed',
      redeemedDate: new Date().toISOString().slice(0, 10),
      proofPhotoUrl: proofPhotoUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
      geoTag: geoLoc || '16.2440 N, 80.6402 E',
    };

    setVouchers((prev) => prev.map((v) => (v.voucherCode.toUpperCase() === code.toUpperCase() ? updatedVoucher : v)));

    addAuditLogEntry(
      'VOUCHER_REDEEMED',
      'Sri Balaji Livelihood Tools',
      'Vendor',
      `Redeemed voucher ${code} (Rs. ${targetVoucher.amount.toLocaleString()}) for beneficiary ${targetVoucher.beneficiaryName}. Location: ${geoLoc || 'Tenali'}`
    );

    addNotification({
      title: 'Equipment Voucher Redeemed',
      message: `${targetVoucher.assetType} delivered to ${targetVoucher.beneficiaryName} (Rs. ${targetVoucher.amount.toLocaleString()}).`,
      type: 'payment',
      actionNav: 'vendor',
    });

    playAudioChime('success');
    showToast({
      type: 'success',
      title: 'Voucher Redeemed Successfully',
      message: `Rs. ${targetVoucher.amount.toLocaleString()} credited to vendor account. Geo-tag & physical proof verified.`,
    });

    return true;
  };

  const handleOpenRequestSupportModal = (category?: NeedCategory) => {
    setSelectedNeedCategoryForRequest(category || 'Food');
    setIsRequestSupportModalOpen(true);
    playAudioChime('click');
  };

  const addFamilyNeed = (familyId: string, need: Partial<NeedItem>) => {
    const newNeedItem: NeedItem = {
      id: `NEED-${Date.now().toString().slice(-4)}`,
      category: need.category || 'Employment',
      title: need.title || 'Family Need',
      titleTe: need.titleTe || '',
      description: need.description || '',
      urgency: (need.urgency as any) || 'High',
      status: 'Pending Review',
      requestedAt: new Date().toISOString().slice(0, 10),
      estimatedCost: need.estimatedCost,
    };

    setFamilies((prev) =>
      prev.map((f) => {
        if (f.id === familyId) {
          return { ...f, needs: [newNeedItem, ...f.needs] };
        }
        return f;
      })
    );

    addAuditLogEntry(
      'LOG_HOUSEHOLD_NEED',
      'Citizen / Field Worker',
      'Bangaru Kutumbam',
      `Logged need '${newNeedItem.title}' under category ${newNeedItem.category}`
    );

    addNotification({
      title: 'Support Need Registered',
      message: `Need '${newNeedItem.title}' (${newNeedItem.category}) queued for Maker/Checker triage.`,
      type: 'info',
      actionNav: 'family',
    });

    playAudioChime('success');
    showToast({
      type: 'success',
      title: 'Need Registered',
      message: `Need '${newNeedItem.title}' triaged and mapped to scheme recommendation engine.`,
    });
  };

  // Master Automated Demo (23 Steps)
  const startMasterDemo = () => {
    setIsMasterDemoRunning(true);
    setMasterDemoStep(1);
    setIsMasterDemoModalOpen(true);
    playAudioChime('click');
  };

  const stopMasterDemo = () => {
    setIsMasterDemoRunning(false);
    setIsMasterDemoModalOpen(false);
  };

  const handleRunCompleteDemo = () => {
    startMasterDemo();
  };

  const resetDemoData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY + '_fams');
    localStorage.removeItem(LOCAL_STORAGE_KEY + '_escrows');
    localStorage.removeItem(LOCAL_STORAGE_KEY + '_audit');
    localStorage.removeItem(LOCAL_STORAGE_KEY + '_anomalies');
    localStorage.removeItem(LOCAL_STORAGE_KEY + '_mentors');
    localStorage.removeItem(LOCAL_STORAGE_KEY + '_vouchers');
    localStorage.removeItem(LOCAL_STORAGE_KEY + '_notifs');
    setFamilies(INITIAL_FAMILIES);
    setMentors(INITIAL_MENTORS);
    setEscrows(INITIAL_ESCROWS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setAnomalies(INITIAL_ANOMALIES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setGisMarkers(INITIAL_GIS_MARKERS);
    setPendingSyncCount(4);
    setIsOffline(false);
    setSosAlertActive(false);
    playAudioChime('success');
    showToast({
      type: 'success',
      title: 'Demo State Reset',
      message: 'All synthetic databases restored to initial benchmark state.',
    });
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        viewMode,
        setViewMode,
        activeNav,
        setActiveNav,
        language,
        setLanguage,
        t,
        families,
        activeFamily,
        activeFamilyId,
        setActiveFamilyId,
        mentors,
        vouchers,
        anomalies,
        escrows,
        auditLogs,
        predictiveRisks,
        inactivityAlerts,
        districts,
        toasts,
        showToast,
        removeToast,
        isOffline,
        toggleOfflineMode,
        pendingSyncCount,
        syncOfflineRecords,
        isSyncing,
        selectedFamilyForModal,
        setSelectedFamilyForModal,
        isVoiceModalOpen,
        setIsVoiceModalOpen,
        isMasterDemoModalOpen,
        setIsMasterDemoModalOpen,
        isNewSurveyModalOpen,
        setIsNewSurveyModalOpen,
        isEvidenceModalOpen,
        setIsEvidenceModalOpen,
        selectedMilestoneForEvidence,
        setSelectedMilestoneForEvidence,
        isGrievanceModalOpen,
        setIsGrievanceModalOpen,
        isAdoptModalOpen,
        setIsAdoptModalOpen,
        selectedFamilyForAdopt,
        setSelectedFamilyForAdopt,
        isEmergencyHelpModalOpen,
        setIsEmergencyHelpModalOpen,
        isTimelineModalOpen,
        setIsTimelineModalOpen,
        selectedSchemeForModal,
        setSelectedSchemeForModal,
        isMatchModalOpen,
        setIsMatchModalOpen,
        matchResultData,
        setMatchResultData,
        isRequestSupportModalOpen,
        setIsRequestSupportModalOpen,
        selectedNeedCategoryForRequest,
        setSelectedNeedCategoryForRequest,
        handleOpenRequestSupportModal,
        selectedTransactionForModal,
        setSelectedTransactionForModal,
        gisMarkers,
        setGisMarkers,
        selectedMarkerForModal,
        setSelectedMarkerForModal,
        notifications,
        addNotification,
        markNotificationRead,
        clearAllNotifications,
        isMasterDemoRunning,
        masterDemoStep,
        startMasterDemo,
        stopMasterDemo,
        addAuditLogEntry,
        handleSelectHousehold,
        handleNewBaselineSurvey,
        submitSurvey,
        handleSyncNow,
        handleViewTimeline,
        handleAdoptFamily,
        adoptFamilyByMentor,
        confirmAdoption,
        handleRunMatch,
        handleSubmitEvidence,
        handleVerifyEvidence,
        handleReleasePayment,
        releaseEscrowPayment,
        handleViewMap,
        handleApplyScheme,
        applyForScheme,
        sanctionScheme,
        rejectScheme,
        requestCorrection,
        flagForInvestigation,
        handleSchemeAction,
        handleSubmitGrievance,
        fileGrievance,
        handleResolveGrievance,
        handleEscalateGrievance,
        handleRunPrediction,
        handleSpeakYourNeed,
        handleEmergencyHelp,
        handlePerformFraudAction,
        resolveAnomalyAction,
        redeemVoucherAction,
        addFamilyNeed,
        resetDemoData,
        triggerSOS,
        sosAlertActive,
        clearSOS,
        playAudioChime,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
