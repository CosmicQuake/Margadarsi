export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  education: string;
  occupation: string;
  income: number;
  healthCondition?: string;
}

export type NeedCategory =
  | 'Food'
  | 'Housing'
  | 'Education'
  | 'Employment'
  | 'Healthcare'
  | 'Skill Development'
  | 'Financial Support'
  | 'Other';

export interface NeedItem {
  id: string;
  category: NeedCategory;
  title: string;
  titleTe: string;
  description: string;
  urgency: 'High' | 'Medium' | 'Low';
  status: 'Pending Review' | 'Approved' | 'In Fulfillment' | 'Resolved';
  requestedAt: string;
  assignedTo?: string;
  actionTaken?: string;
  estimatedCost?: number;
}

export interface SchemeItem {
  id: string;
  name: string;
  nameTe: string;
  dept: string;
  benefit: string;
  benefitTe: string;
  eligibility: string;
  eligibilityTe: string;
  requiredDocs: string[];
  status: 'Eligible' | 'Applied' | 'Under Review' | 'Approved' | 'Sanctioned' | 'Disbursed' | 'Rejected';
  appliedAt?: string;
  sanctionAmount?: number;
  matchType?: 'Eligible' | 'Possibly Eligible' | 'Not Eligible';
  ineligibilityReason?: string;
  remarks?: string;
}

export interface JourneyMilestone {
  id: number;
  title: string;
  titleTe: string;
  description: string;
  descriptionTe: string;
  status: 'completed' | 'current' | 'upcoming';
  date?: string;
  verifiedBy?: string;
}

export interface GrievanceItem {
  id: string;
  householdId: string;
  householdName: string;
  category: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  descriptionTe: string;
  channel: 'Voice AI (Bhashini)' | 'Secretariat Desk' | 'Mobile App';
  status: 'Open' | 'Investigating' | 'Hearing Scheduled' | 'Resolved';
  filedAt: string;
  slaDeadline: string;
  assignedOfficer: string;
  officerRemarks?: string;
}

export interface VoucherItem {
  id: string;
  voucherCode: string;
  beneficiaryName: string;
  householdId: string;
  assetType: string;
  vendorName: string;
  vendorId: string;
  amount: number;
  status: 'Issued' | 'Redeemed' | 'Settlement Claimed' | 'Paid';
  issuedDate: string;
  redeemedDate?: string;
  proofPhotoUrl?: string;
  geoTag?: string;
}

export interface AnomalyItem {
  id: string;
  type: 'GEO_MISMATCH' | 'DUPLICATE_ID' | 'RAPID_SCORE_DROP' | 'VENDOR_ANOMALY' | 'FIELD_DISCREPANCY';
  severity: 'Critical' | 'High' | 'Medium';
  title: string;
  description: string;
  householdId: string;
  mandal: string;
  district: string;
  flaggedAt: string;
  status: 'Under Investigation' | 'Frozen' | 'Cleared' | 'Fraud Confirmed';
  evidence: string;
}

export interface EscrowTransaction {
  id: string;
  householdId: string;
  householdName?: string;
  projectName?: string;
  vendorId?: string;
  vendorName?: string;
  mentorId: string;
  mentorName: string;
  category?: string;
  purpose?: string;
  date?: string;
  amount?: number;
  totalPledged: number;
  fundsLocked: number;
  fundsReleased: number;
  fundsRemaining: number;
  currentMilestoneId: number;
  currentMilestoneName: string;
  status: 'Pending' | 'Approved' | 'Released' | 'Completed' | 'Rejected' | 'Locked' | 'Pledged' | 'Verification In Progress';
  lastDisbursedAt?: string;
  auditHash?: string;
  remarks?: string;
}

export interface GISMarker {
  id: string;
  type: 'family' | 'community' | 'need' | 'project' | 'school' | 'health' | 'employment';
  title: string;
  district: string;
  mandal: string;
  village: string;
  lat: number;
  lng: number;
  familyId?: string;
  povertyScore?: number;
  adoptionStatus?: string;
  currentMilestone?: string;
  needsSummary?: string;
  schoolName?: string;
  schoolType?: string;
  communityServed?: string;
  facilityType?: string;
  availability?: string;
  doctorOnDuty?: string;
  projectName?: string;
  projectStatus?: string;
  beneficiariesCount?: number;
  completionPct?: number;
  jobTitle?: string;
  employerName?: string;
  openings?: number;
  wage?: string;
  communityName?: string;
  population?: number;
  bplRatio?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'request' | 'approval' | 'evidence' | 'mentor' | 'milestone' | 'grievance' | 'payment' | 'fraud' | 'system' | 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  actionNav?: string;
}

export interface AssetVerificationProof {
  id: string;
  householdId: string;
  assetName: string;
  detectedObject: string;
  confidenceScore: number; // e.g. 94%
  gpsValid: boolean;
  timestampValid: boolean;
  exifValid: boolean;
  duplicateCheckClear: boolean;
  overallStatus: 'PROOF VALIDATED' | 'REQUIRES REVIEW' | 'FLAGGED';
  photoUrl: string;
  timestamp: string;
  geoCoordinates: string;
}

export interface FAISSMatchResult {
  familyId: string;
  mentorId: string;
  mentorName: string;
  compatibilityScore: number; // e.g. 92%
  reasons: string[];
  alternativeMatches: { mentorId: string; name: string; score: number; expertise: string }[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  previousHash: string;
  currentHash: string;
  details: string;
}

export interface PredictivePovertyRisk {
  id: string;
  familyId: string;
  familyName: string;
  currentScore: number;
  predictedRisk: number; // e.g. 82%
  trend: 'Increasing' | 'Stable' | 'Decreasing';
  reason: string;
  recommendedAction: string;
}

export interface AgenticInactivityAlert {
  id: string;
  familyId: string;
  familyName: string;
  village: string;
  lastUpdateDays: number; // >30 days
  assignedVolunteer: string;
  status: 'Requires Intervention' | 'Case Reassigned' | 'Action Scheduled';
  detectedAt: string;
}

export interface AdoptionAgreement {
  id: string;
  familyId: string;
  familyName: string;
  mentorId: string;
  mentorName: string;
  supportObjective: string;
  milestones: string[];
  pledgedAmount: number;
  durationMonths: number;
  status: 'Draft' | 'Accepted' | 'Active';
  createdAt: string;
}

export interface Family {
  id: string;
  familyName: string;
  familyNameTe: string;
  headOfHousehold: string;
  aadhaarMasked: string;
  rationCardNo: string;
  district: string;
  mandal: string;
  village: string;
  wardSecretariat: string;
  phone: string;
  povertyScore: number; // 0-100 MPI score
  povertyCategory: 'Self-Reliant' | 'Stabilizing' | 'Vulnerable' | 'High Risk' | 'Critical';
  povertyStatus: 'Extreme Vulnerability' | 'Vulnerable' | 'Graduating' | 'Self-Reliant (Poverty Exited)';
  monthlyIncome: number;
  targetIncome: number;
  housingType: string;
  housingTypeTe: string;
  landHoldings: string;
  assets: string[];
  members: FamilyMember[];
  mentorId: string | null;
  mentorName: string | null;
  mentorGrantTotal: number;
  assignedVolunteerId: string;
  assignedVolunteerName: string;
  volunteerPhone: string;
  journeyMilestones: JourneyMilestone[];
  needs: NeedItem[];
  schemes: SchemeItem[];
  grievances: GrievanceItem[];
  historicalScores: { month: string; score: number; income: number }[];
  lat: number;
  lng: number;
  hasAnomalyFlag: boolean;
  surveyCompletedDate: string;
  eKycStatus?: 'Verified' | 'Pending' | 'Rejected';
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  organization: string;
  email: string;
  phone: string;
  location: string;
  adoptedFamilyIds: string[];
  totalPledged: number;
  totalDisbursed: number;
  focusAreas: string[];
  avatarUrl: string;
}

export interface DistrictMetric {
  id: string;
  name: string;
  nameTe: string;
  headquarters: string;
  totalFamilies: number;
  surveyedFamilies: number;
  extremeVulnerableCount: number;
  graduatingCount: number;
  povertyExitedCount: number;
  exitRate: number;
  mentorsActive: number;
  csrFundsCr: number;
  lat: number;
  lng: number;
  color: string;
}

// -------------------------------------------------------------
// SEED 20+ REALISTIC SYNTHETIC FAMILIES
// -------------------------------------------------------------
export const INITIAL_FAMILIES: Family[] = [
  {
    id: 'P4-BK-001',
    familyName: 'Smt. K. Lakshmi Devi & Family',
    familyNameTe: 'శ్రీమతి కె. లక్ష్మీ దేవి కుటుంబం',
    headOfHousehold: 'K. Lakshmi Devi',
    aadhaarMasked: 'XXXX-XXXX-8921',
    rationCardNo: 'RC-P4-071408801',
    district: 'Guntur Division',
    mandal: 'Tenali Block',
    village: 'Pinapadu Village',
    wardSecretariat: 'Village Secretariat Unit #14',
    phone: '+91 98480 23145',
    povertyScore: 78,
    povertyCategory: 'High Risk',
    povertyStatus: 'Extreme Vulnerability',
    monthlyIncome: 4200,
    targetIncome: 18000,
    housingType: 'Katcha Thatch & Mud Floor',
    housingTypeTe: 'మట్టి గోడలు / పూరి గుడిసె',
    landHoldings: 'Landless Agricultural Laborer (0.00 Acres)',
    assets: ['1 Old Bicycle', 'BPL Ration Card', 'National Health Card'],
    members: [
      { id: 'M-1', name: 'K. Lakshmi Devi', relation: 'Self (Head)', age: 38, gender: 'Female', education: 'Primary (4th)', occupation: 'Daily Wage Farm Labor', income: 2800 },
      { id: 'M-2', name: 'K. Venkateswarlu', relation: 'Spouse', age: 44, gender: 'Male', education: 'Illiterate', occupation: 'Seasonal Casual Labor', income: 1400, healthCondition: 'Chronic Asthma' },
      { id: 'M-3', name: 'K. Divya', relation: 'Daughter', age: 14, gender: 'Female', education: 'Class 9', occupation: 'Student', income: 0 },
      { id: 'M-4', name: 'K. Rajesh', relation: 'Son', age: 11, gender: 'Male', education: 'Class 6', occupation: 'Student', income: 0 },
    ],
    mentorId: 'M-101',
    mentorName: 'Dr. K. R. Rao (CSR Philanthropy Alliance)',
    mentorGrantTotal: 25000,
    assignedVolunteerId: 'VOL-01',
    assignedVolunteerName: 'K. Suresh (Field Volunteer)',
    volunteerPhone: '+91 94401 77210',
    historicalScores: [
      { month: 'Oct', score: 85, income: 3800 },
      { month: 'Nov', score: 82, income: 4000 },
      { month: 'Dec', score: 80, income: 4100 },
      { month: 'Jan', score: 78, income: 4200 },
      { month: 'Feb', score: 74, income: 6800 },
      { month: 'Mar', score: 68, income: 8500 },
    ],
    journeyMilestones: [
      { id: 1, title: 'Baseline Survey Completed', titleTe: 'ప్రాథమిక సర్వే పూర్తి', description: '10-dimension MPI field assessment verified.', descriptionTe: '10 కొలమానాల ప్రాథమిక సర్వే పూర్తయింది.', status: 'completed', date: '12 Jan 2026', verifiedBy: 'K. Suresh (Volunteer)' },
      { id: 2, title: 'Needs Categorized', titleTe: 'అవసరాల గుర్తింపు', description: 'Sewing machine livelihood, education scholarship.', descriptionTe: 'కుట్టు మిషన్ మరియు స్కాలర్‌షిప్.', status: 'completed', date: '20 Jan 2026', verifiedBy: 'S. Ramanjaneyulu (BDO)' },
      { id: 3, title: 'Scheme Support Mapped', titleTe: 'పథకాల అనుసంధానం', description: 'National Livelihood Grant & PM SVANidhi linked.', descriptionTe: 'జీవనోపాధి గ్రాంట్ అనుసంధానం.', status: 'completed', date: '02 Feb 2026' },
      { id: 4, title: 'Margadarsi Mentor Adoption', titleTe: 'మెంటార్ దత్తత', description: 'Dr. K. R. Rao adopted family under P4 CSR Alliance.', descriptionTe: 'రూ. 25,000 ఆర్థిక సాయం నిబద్ధత.', status: 'completed', date: '15 Feb 2026' },
      { id: 5, title: 'Milestone 1: Livelihood Asset Delivered', titleTe: 'సామగ్రి అందజేత', description: 'Heavy duty sewing machine delivered via QR voucher.', descriptionTe: 'కుట్టు మిషన్ అందజేయబడింది.', status: 'completed', date: '28 Feb 2026', verifiedBy: 'Sri Balaji Machinery' },
      { id: 6, title: 'Milestone 2: Tailoring Skill Training', titleTe: 'నైపుణ్య శిక్షణ', description: '30-day garment stitching course underway.', descriptionTe: 'వస్త్ర తయారీ శిక్షణ కొనసాగుతోంది.', status: 'current', date: 'Target: 25 Mar 2026' },
      { id: 7, title: 'Income Uplift (>₹12,000/mo)', titleTe: 'ఆదాయ వృద్ధి', description: 'Retail garment order fulfillment.', descriptionTe: 'స్థిరమైన ఆదాయం సాధించడం.', status: 'upcoming' },
      { id: 8, title: 'Self-Reliant Transition', titleTe: 'స్వయం సమృద్ధి', description: 'Zero debt, active savings bank account.', descriptionTe: 'రుణ విముక్తి మరియు పొదుపు.', status: 'upcoming' },
      { id: 9, title: 'Poverty Exit Certification', titleTe: 'పేదరిక నిర్మూలన ధ్రువీకరణ', description: 'Conferred Official P4 Zero Poverty Exit Honor.', descriptionTe: 'అధికారిక జీరో పావర్టీ ధ్రువపత్రం.', status: 'upcoming' },
    ],
    needs: [
      { id: 'N-101', category: 'Skill Development', title: 'Advanced Tailoring & Garment Stitching Certification', titleTe: 'వస్త్ర తయారీ శిక్షణ', description: 'Intensive tailoring course at Skill Hub.', urgency: 'High', status: 'In Fulfillment', requestedAt: '2026-02-10', assignedTo: 'National Skill Development Hub' },
      { id: 'N-102', category: 'Education', title: 'Special Scholarship & Digital Tablet for Divya (Class 9)', titleTe: 'దివ్య చదువు కోసం స్కాలర్‌షిప్', description: 'Support for competitive exam coaching.', urgency: 'Medium', status: 'Approved', requestedAt: '2026-02-22', assignedTo: 'Margadarsi Dr. K. R. Rao Fund' },
      { id: 'N-103', category: 'Healthcare', title: 'Monthly Asthma Medication Subsidy for Spouse', titleTe: 'ఆస్తమా మందుల రాయితీ', description: 'Free monthly bronchodilators at PHC.', urgency: 'High', status: 'Pending Review', requestedAt: '2026-03-01', assignedTo: 'Community Health Centre' },
    ],
    schemes: [
      { id: 'SCH-01', name: 'P4 Livelihood Asset Support Grant', nameTe: 'పీ4 ప్రత్యేక జీవనోపాధి గ్రాంట్', dept: 'P4 Poverty Elimination Mission', benefit: '₹25,000 Micro-enterprise asset grant', benefitTe: 'రూ. 25,000 వ్యాపార సామగ్రి గ్రాంట్', eligibility: 'BPL families with MPI score > 60', eligibilityTe: 'పేదరిక స్కోర్ > 60 ఉన్న కుటుంబాలు', requiredDocs: ['Aadhaar', 'Ration Card', 'Survey Report'], status: 'Sanctioned', appliedAt: '2026-02-05', sanctionAmount: 25000, matchType: 'Eligible' },
      { id: 'SCH-02', name: 'PM Awas Yojana (Pucca Housing)', nameTe: 'పీఎం ఆవాస్ యోజన', dept: 'Ministry of Housing & Urban Affairs', benefit: '₹1,50,000 construction grant for permanent home', benefitTe: 'పక్కా ఇల్లు నిర్మాణం కోసం ₹1,50,000', eligibility: 'Homeless or katcha mud house dwellers', eligibilityTe: 'పక్కా ఇల్లు లేని పేద కుటుంబాలు', requiredDocs: ['Site Patta', 'Ration Card', 'Geo-tagged Photo'], status: 'Under Review', appliedAt: '2026-02-18', matchType: 'Eligible' },
      { id: 'SCH-03', name: 'National Girl Child Education Incentive', nameTe: 'బాలికల విద్యా ప్రోత్సాహకం', dept: 'Ministry of Women & Child Development', benefit: '₹12,000/yr education scholarship', benefitTe: 'ఏడాదికి ₹12,000 స్కాలర్‌షిప్', eligibility: 'Girl child enrolled in Govt secondary school', eligibilityTe: 'ప్రభుత్వ పాఠశాలల్లో చదివే బాలికలు', requiredDocs: ['School ID', 'Bank Passbook'], status: 'Sanctioned', appliedAt: '2026-01-20', sanctionAmount: 12000, matchType: 'Eligible' },
    ],
    grievances: [
      { id: 'GRV-2026-402', householdId: 'P4-BK-001', householdName: 'Smt. K. Lakshmi Devi', category: 'Healthcare Access', priority: 'High', description: 'Local PHC did not provide prescribed asthma inhalers for spouse.', descriptionTe: 'పీహెచ్‌సీలో భర్తకు కావలసిన మందులు అందలేదు.', channel: 'Voice AI (Bhashini)', status: 'Investigating', filedAt: '2026-03-08T10:15:00Z', slaDeadline: '2026-03-12T10:15:00Z', assignedOfficer: 'S. Ramanjaneyulu (BDO)', officerRemarks: 'Dispatched volunteer with emergency medical kit.' },
    ],
    lat: 16.2437,
    lng: 80.6401,
    hasAnomalyFlag: false,
    surveyCompletedDate: '2026-01-12',
  },
  {
    id: 'P4-BK-002',
    familyName: 'Sri B. Ramulu & Family',
    familyNameTe: 'శ్రీ బి. రాములు కుటుంబం',
    headOfHousehold: 'B. Ramulu',
    aadhaarMasked: 'XXXX-XXXX-3412',
    rationCardNo: 'RC-P4-120509914',
    district: 'Coastal Industrial Hub',
    mandal: 'Port Sector Block',
    village: 'Vemulavalasa',
    wardSecretariat: 'Village Secretariat Unit #08',
    phone: '+91 97012 88419',
    povertyScore: 84,
    povertyCategory: 'Critical',
    povertyStatus: 'Extreme Vulnerability',
    monthlyIncome: 3600,
    targetIncome: 16000,
    housingType: 'Semi-pucca leaky asbestos sheet',
    housingTypeTe: 'రేకుల ఇల్లు / మట్టి గోడలు',
    landHoldings: '0.15 Acres unproductive dry plot',
    assets: ['1 Damaged Pushcart', 'BPL Ration Card'],
    members: [
      { id: 'MB-1', name: 'B. Ramulu', relation: 'Self (Head)', age: 46, gender: 'Male', education: 'Illiterate', occupation: 'Clay brick worker', income: 2400 },
      { id: 'MB-2', name: 'B. Parvathi', relation: 'Spouse', age: 41, gender: 'Female', education: 'Primary (2nd)', occupation: 'Vegetable vendor', income: 1200 },
      { id: 'MB-3', name: 'B. Siva', relation: 'Son', age: 18, gender: 'Male', education: 'Intermediate Dropout', occupation: 'Unemployed youth', income: 0 },
    ],
    mentorId: null,
    mentorName: null,
    mentorGrantTotal: 0,
    assignedVolunteerId: 'VOL-02',
    assignedVolunteerName: 'M. Apparao (Field Volunteer)',
    volunteerPhone: '+91 99890 12345',
    historicalScores: [
      { month: 'Oct', score: 88, income: 3200 },
      { month: 'Nov', score: 86, income: 3400 },
      { month: 'Dec', score: 85, income: 3500 },
      { month: 'Jan', score: 84, income: 3600 },
    ],
    journeyMilestones: [
      { id: 1, title: 'Baseline Survey Completed', titleTe: 'ప్రాథమిక సర్వే', description: 'MPI score 84/100 confirmed.', descriptionTe: 'పేదరిక స్కోర్ 84.', status: 'completed', date: '18 Jan 2026' },
      { id: 2, title: 'Needs Categorized', titleTe: 'అవసరాల గుర్తింపు', description: 'Solar skilling for son, mobile pushcart for spouse.', descriptionTe: 'సోలార్ శిక్షణ, కూరగాయల బండి.', status: 'completed', date: '28 Jan 2026' },
      { id: 3, title: 'Scheme Mapped', titleTe: 'పథకం అనుసంధానం', description: 'PM SVANidhi zero interest credit.', descriptionTe: 'పీఎం స్వనిధి రుణం.', status: 'completed', date: '10 Feb 2026' },
      { id: 4, title: 'Margadarsi Adoption', titleTe: 'మెంటార్ దత్తత', description: 'Awaiting CSR / Mentor match.', descriptionTe: 'దాతల కోసం ఎదురుచూస్తున్నారు.', status: 'current' },
      { id: 5, title: 'Milestone 1: Asset Procurement', titleTe: 'సామగ్రి సేకరణ', description: 'Pending mentor pledge', descriptionTe: 'వేచిఉంది', status: 'upcoming' },
      { id: 6, title: 'Milestone 2: Skilling', titleTe: 'నైపుణ్య శిక్షణ', description: 'Pending', descriptionTe: 'వేచిఉంది', status: 'upcoming' },
      { id: 7, title: 'Income Uplift', titleTe: 'ఆదాయ వృద్ధి', description: 'Pending', descriptionTe: 'వేచిఉంది', status: 'upcoming' },
      { id: 8, title: 'Self-Reliant Transition', titleTe: 'స్వయం సమృద్ధి', description: 'Pending', descriptionTe: 'వేచిఉంది', status: 'upcoming' },
      { id: 9, title: 'Poverty Exit Certification', titleTe: 'ధ్రువీకరణ', description: 'Pending', descriptionTe: 'వేచిఉంది', status: 'upcoming' },
    ],
    needs: [
      { id: 'N-201', category: 'Skill Development', title: 'Solar Rooftop Technician Certified Course for B. Siva', titleTe: 'సోలార్ టెక్నీషియన్ కోర్సు', description: 'Guaranteed placement technical training.', urgency: 'High', status: 'Pending Review', requestedAt: '2026-02-25' },
      { id: 'N-202', category: 'Financial Support', title: 'Working Capital for Stainless-Steel Vegetable Pushcart (₹10,000)', titleTe: 'కూరగాయల బండి పెట్టుబడి', description: 'Purchase wholesale produce without moneylender debt.', urgency: 'High', status: 'Approved', requestedAt: '2026-02-14' },
    ],
    schemes: [
      { id: 'SCH-11', name: 'PM SVANidhi Micro-Credit', nameTe: 'పీఎం స్వనిధి', dept: 'Ministry of Housing & Urban Affairs', benefit: '₹10,000 interest-free working capital loan', benefitTe: 'రూ. 10,000 వడ్డీ లేని రుణం', eligibility: 'Urban and peri-urban street vendors', eligibilityTe: 'వీధి వ్యాపారులు', requiredDocs: ['Aadhaar', 'Vendor ID', 'Bank Account'], status: 'Approved', appliedAt: '2026-02-20', sanctionAmount: 10000, matchType: 'Eligible' },
    ],
    grievances: [],
    lat: 17.8931,
    lng: 83.3985,
    hasAnomalyFlag: false,
    surveyCompletedDate: '2026-01-18',
  },
  {
    id: 'P4-BK-003',
    familyName: 'Smt. T. Ananthamma & Family',
    familyNameTe: 'శ్రీమతి టి. అనంతమ్మ కుటుంబం',
    headOfHousehold: 'T. Ananthamma',
    aadhaarMasked: 'XXXX-XXXX-6155',
    rationCardNo: 'RC-P4-191204481',
    district: 'Western Plateau Region',
    mandal: 'Weaver Hub Block',
    village: 'Kothapeta',
    wardSecretariat: 'Village Secretariat Unit #03',
    phone: '+91 94903 55120',
    povertyScore: 71,
    povertyCategory: 'High Risk',
    povertyStatus: 'Vulnerable',
    monthlyIncome: 5100,
    targetIncome: 20000,
    housingType: 'Single Room Shed with Tin Roof',
    housingTypeTe: 'రేకుల షెడ్డు / ఒకే గది',
    landHoldings: 'Drought-prone Rainfed 0.5 Acres',
    assets: ['1 Handloom Frame (Needs Repair)', 'BPL Card'],
    members: [
      { id: 'MA-1', name: 'T. Ananthamma', relation: 'Self (Widow Head)', age: 42, gender: 'Female', education: '7th Class', occupation: 'Traditional Weaver', income: 3800 },
      { id: 'MA-2', name: 'T. Sai Kumar', relation: 'Son', age: 16, gender: 'Male', education: 'ITI Student', occupation: 'Part-time Weaver', income: 1300 },
    ],
    mentorId: 'M-102',
    mentorName: 'Smt. Vani Mohan (Artisan Craft Alliance)',
    mentorGrantTotal: 30000,
    assignedVolunteerId: 'VOL-03',
    assignedVolunteerName: 'P. Ravindra (Volunteer)',
    volunteerPhone: '+91 98492 44331',
    historicalScores: [
      { month: 'Nov', score: 79, income: 4500 },
      { month: 'Dec', score: 76, income: 4800 },
      { month: 'Jan', score: 74, income: 5000 },
      { month: 'Feb', score: 71, income: 5100 },
    ],
    journeyMilestones: [
      { id: 1, title: 'Baseline Survey Completed', titleTe: 'ప్రాథమిక సర్వే', description: 'Surveyed on 15 Jan 2026', descriptionTe: 'పూర్తయింది', status: 'completed', date: '15 Jan 2026' },
      { id: 2, title: 'Needs Categorized', titleTe: 'అవసరాల గుర్తింపు', description: 'Motorized Jacquard loom attachment', descriptionTe: 'మగ్గం మోటార్ సాయం', status: 'completed', date: '25 Jan 2026' },
      { id: 3, title: 'Scheme Mapped', titleTe: 'పథకం అనుసంధానం', description: 'National Handloom Livelihood Scheme', descriptionTe: 'చేనేత సంక్షేమ పథకం', status: 'completed', date: '04 Feb 2026' },
      { id: 4, title: 'Margadarsi Adoption', titleTe: 'మెంటార్ దత్తత', description: 'Adopted by Artisan Craft Alliance', descriptionTe: 'దత్తత పూర్తయింది', status: 'completed', date: '16 Feb 2026' },
      { id: 5, title: 'Milestone 1: Modern Loom Installed', titleTe: 'అధునాతన మగ్గం అమరిక', description: 'Motorized Jacquard fitted', descriptionTe: 'మగ్గం అమర్చబడింది', status: 'completed', date: '02 Mar 2026' },
      { id: 6, title: 'Milestone 2: Direct E-Commerce Tie-Up', titleTe: 'ఆన్‌లైన్ విక్రయాలు', description: 'Cataloging silk handloom on fair trade portals', descriptionTe: 'ఆన్‌లైన్ మార్కెటింగ్', status: 'current' },
      { id: 7, title: 'Income Uplift', titleTe: 'ఆదాయ వృద్ధి', description: 'Projected net ₹16,000+', descriptionTe: 'నెలకు ₹16,000+', status: 'upcoming' },
      { id: 8, title: 'Self-Reliant Transition', titleTe: 'స్వయం సమృద్ధి', description: 'Weaver cooperative leadership', descriptionTe: 'సహకార సంఘం', status: 'upcoming' },
      { id: 9, title: 'Poverty Exit Certification', titleTe: 'ధ్రువీకరణ', description: 'Zero Poverty Graduation', descriptionTe: 'ధ్రువీకరణ', status: 'upcoming' },
    ],
    needs: [
      { id: 'N-301', category: 'Financial Support', title: 'Raw Silk Yarn Working Capital Seed Fund (₹15,000)', titleTe: 'పట్టు నూలు కొనుగోలు పెట్టుబడి', description: 'Procure warp & weft silk directly without middleman cuts.', urgency: 'High', status: 'In Fulfillment', requestedAt: '2026-02-12' },
    ],
    schemes: [
      { id: 'SCH-21', name: 'National Handloom Weaver Livelihood Support', nameTe: 'జాతీయ చేనేత సాయం', dept: 'Ministry of Textiles', benefit: '₹24,000 / year direct equipment subsidy', benefitTe: 'ఏడాదికి ₹24,000 పరికరాల సాయం', eligibility: 'Operating handloom weaver household', eligibilityTe: 'చేనేత కార్మికులు', requiredDocs: ['Weaver Society Card', 'Aadhaar'], status: 'Sanctioned', appliedAt: '2026-01-20', sanctionAmount: 24000, matchType: 'Eligible' },
    ],
    grievances: [],
    lat: 14.4144,
    lng: 77.7183,
    hasAnomalyFlag: false,
    surveyCompletedDate: '2026-01-15',
  },
  {
    id: 'P4-BK-004',
    familyName: 'Sri K. Venkanna (Audit Flagged)',
    familyNameTe: 'శ్రీ కె. వెంకన్న (పరిశీలనలో ఉన్న ఖాతా)',
    headOfHousehold: 'K. Venkanna',
    aadhaarMasked: 'XXXX-XXXX-9933',
    rationCardNo: 'RC-P4-051108442',
    district: 'Central Capital Region',
    mandal: 'River Valley Block',
    village: 'Nowlur',
    wardSecretariat: 'Village Secretariat Unit #02',
    phone: '+91 91234 56789',
    povertyScore: 68,
    povertyCategory: 'High Risk',
    povertyStatus: 'Vulnerable',
    monthlyIncome: 6500,
    targetIncome: 18000,
    housingType: 'Rented Pucca Room',
    housingTypeTe: 'అద్దె పక్కా ఇల్లు',
    landHoldings: '0.00 Acres',
    assets: ['1 Two-Wheeler (Reported by neighbor)', 'BPL Ration Card'],
    members: [
      { id: 'MV-1', name: 'K. Venkanna', relation: 'Self', age: 39, gender: 'Male', education: '10th Pass', occupation: 'Shop assistant', income: 6500 },
    ],
    mentorId: null,
    mentorName: null,
    mentorGrantTotal: 0,
    assignedVolunteerId: 'VOL-04',
    assignedVolunteerName: 'D. Mahesh (Volunteer)',
    volunteerPhone: '+91 94411 99220',
    historicalScores: [{ month: 'Feb', score: 68, income: 6500 }],
    journeyMilestones: [
      { id: 1, title: 'Baseline Survey', titleTe: 'ప్రాథమిక సర్వే', description: 'Survey submitted', descriptionTe: 'సర్వే చేయబడింది', status: 'completed' },
      { id: 2, title: 'Need Identified', titleTe: 'అవసరాల గుర్తింపు', description: 'Vehicle loan subsidy', descriptionTe: 'వాహన రాయితీ', status: 'current' },
    ],
    needs: [],
    schemes: [],
    grievances: [],
    lat: 16.4357,
    lng: 80.5621,
    hasAnomalyFlag: true,
    surveyCompletedDate: '2026-02-01',
  },
  {
    id: 'P4-BK-005',
    familyName: 'Smt. P. Gowramma & Family (Poverty Exited)',
    familyNameTe: 'శ్రీమతి పి. గౌరమ్మ కుటుంబం (పేదరిక విముక్తి)',
    headOfHousehold: 'P. Gowramma',
    aadhaarMasked: 'XXXX-XXXX-1144',
    rationCardNo: 'RC-P4-081409228',
    district: 'Delta Agricultural Zone',
    mandal: 'Gannavaram Block',
    village: 'Veerapanenigudem',
    wardSecretariat: 'Village Secretariat Unit #01',
    phone: '+91 98850 44321',
    povertyScore: 16,
    povertyCategory: 'Self-Reliant',
    povertyStatus: 'Self-Reliant (Poverty Exited)',
    monthlyIncome: 24500,
    targetIncome: 18000,
    housingType: 'Pucca 2-Room Home with Solar Roof',
    housingTypeTe: 'సొంత పక్కా ఇల్లు / సోలార్ విద్యుత్',
    landHoldings: '1.2 Acres Irrigated Dairy Fodder Plot',
    assets: ['2 Murrah Buffaloes', '1 Milk Chiller Unit', 'Solar Inverter', 'Active SHG Bank Savings (₹65,000)'],
    members: [
      { id: 'MG-1', name: 'P. Gowramma', relation: 'Self (Head)', age: 41, gender: 'Female', education: 'Class 8', occupation: 'Dairy Micro-Entrepreneur & SHG Leader', income: 16000 },
      { id: 'MG-2', name: 'P. Srinivas', relation: 'Spouse', age: 45, gender: 'Male', education: 'Class 10', occupation: 'Milk Collection Operator', income: 8500 },
    ],
    mentorId: 'M-101',
    mentorName: 'Dr. K. R. Rao',
    mentorGrantTotal: 40000,
    assignedVolunteerId: 'VOL-05',
    assignedVolunteerName: 'Ch. Madhavi (Volunteer)',
    volunteerPhone: '+91 98481 00223',
    historicalScores: [
      { month: 'Oct 24', score: 82, income: 4200 },
      { month: 'Jan 25', score: 65, income: 8500 },
      { month: 'Jun 25', score: 44, income: 14200 },
      { month: 'Dec 25', score: 26, income: 19800 },
      { month: 'Jan 26', score: 16, income: 24500 },
    ],
    journeyMilestones: [
      { id: 1, title: 'Baseline Survey', titleTe: 'ప్రాథమిక సర్వే', description: 'Oct 2024 completed', descriptionTe: 'పూర్తయింది', status: 'completed', date: '10 Oct 2024' },
      { id: 2, title: 'Need Identified', titleTe: 'అవసరాల గుర్తింపు', description: 'Dairy cattle & fodder', descriptionTe: 'పాడి సంపద', status: 'completed', date: '25 Oct 2024' },
      { id: 3, title: 'Scheme Mapped', titleTe: 'పథకం అనుసంధానం', description: 'Dairy & micro-grant linkage', descriptionTe: 'పాడి రాయితీ', status: 'completed', date: '10 Nov 2024' },
      { id: 4, title: 'Mentor Adoption', titleTe: 'మెంటార్ దత్తత', description: 'CSR seed capital', descriptionTe: 'సీడ్ క్యాపిటల్', status: 'completed', date: '01 Dec 2024' },
      { id: 5, title: 'Milestone 1: Dairy Asset Procured', titleTe: 'సామగ్రి సేకరణ', description: '2 Murrah high-yield buffaloes bought', descriptionTe: '2 ముర్రా పాడి గేదెలు', status: 'completed', date: '15 Jan 2025' },
      { id: 6, title: 'Milestone 2: Milk Collection Supply', titleTe: 'పాల విక్రయం', description: 'Supplying 25 Liters/day to cooperative', descriptionTe: 'రోజుకు 25 లీటర్ల పాలు', status: 'completed', date: '20 Apr 2025' },
      { id: 7, title: 'Income Uplift (>₹20,000/mo)', titleTe: 'ఆదాయ వృద్ధి', description: '6 consecutive months above target', descriptionTe: 'నిలకడైన లాభం', status: 'completed', date: '10 Oct 2025' },
      { id: 8, title: 'Self-Reliant Transition', titleTe: 'స్వయం సమృద్ధి', description: 'Repaid debts, opened bank fixed deposit', descriptionTe: 'రుణ విముక్తి', status: 'completed', date: '15 Dec 2025' },
      { id: 9, title: 'Poverty Exit Certification', titleTe: 'జీరో పావర్టీ ధ్రువపత్రం', description: 'Conferred Official "P4 Zero Poverty Exit" Honor by Collector', descriptionTe: 'అధికారిక జీరో పావర్టీ అవార్డు', status: 'completed', date: '26 Jan 2026' },
    ],
    needs: [],
    schemes: [],
    grievances: [],
    lat: 16.5417,
    lng: 80.7981,
    hasAnomalyFlag: false,
    surveyCompletedDate: '2024-10-10',
  },
  // Adding synthetic families 6 to 20 across diverse sectors
  {
    id: 'P4-BK-006',
    familyName: 'Sri R. Shankar & Family',
    familyNameTe: 'శ్రీ ఆర్. శంకర్ కుటుంబం',
    headOfHousehold: 'R. Shankar',
    aadhaarMasked: 'XXXX-XXXX-4512',
    rationCardNo: 'RC-P4-00192841',
    district: 'Southern Rayalaseema Sector',
    mandal: 'Dryland Agriculture Block',
    village: 'Chandragiri Rural',
    wardSecretariat: 'Panchayat Unit #05',
    phone: '+91 94402 11982',
    povertyScore: 76,
    povertyCategory: 'High Risk',
    povertyStatus: 'Vulnerable',
    monthlyIncome: 4800,
    targetIncome: 17500,
    housingType: 'Mud brick shed',
    housingTypeTe: 'మట్టి గోడల ఇల్లు',
    landHoldings: '0.4 Acres rainfed',
    assets: ['1 Spade', 'BPL Card'],
    members: [
      { id: 'M6-1', name: 'R. Shankar', relation: 'Self', age: 43, gender: 'Male', education: '5th Pass', occupation: 'Farm laborer', income: 3000 },
      { id: 'M6-2', name: 'R. Kamala', relation: 'Spouse', age: 39, gender: 'Female', education: 'Illiterate', occupation: 'Beedi rolling', income: 1800 },
    ],
    mentorId: null,
    mentorName: null,
    mentorGrantTotal: 0,
    assignedVolunteerId: 'VOL-06',
    assignedVolunteerName: 'S. Naresh (Volunteer)',
    volunteerPhone: '+91 94400 33211',
    historicalScores: [{ month: 'Jan', score: 76, income: 4800 }],
    journeyMilestones: [
      { id: 1, title: 'Baseline Survey Completed', titleTe: 'ప్రాథమిక సర్వే', description: 'Verified', descriptionTe: 'పూర్తయింది', status: 'completed' },
      { id: 2, title: 'Needs Categorized', titleTe: 'అవసరాల గుర్తింపు', description: 'Solar drip kit & poultry unit', descriptionTe: 'సోలార్ డ్రిప్ కిట్', status: 'current' },
    ],
    needs: [
      { id: 'N-601', category: 'Employment', title: 'Backyard Poultry Farming Unit (50 Chicks + Feed)', titleTe: 'కోళ్ల పెంపకం యూనిట్', description: 'Small backyard layer unit.', urgency: 'High', status: 'Pending Review', requestedAt: '2026-02-28' },
    ],
    schemes: [],
    grievances: [],
    lat: 13.6288,
    lng: 79.4192,
    hasAnomalyFlag: false,
    surveyCompletedDate: '2026-02-15',
  },
  {
    id: 'P4-BK-007',
    familyName: 'Smt. M. Saraswathi & Family',
    familyNameTe: 'శ్రీమతి ఎం. సరస్వతి కుటుంబం',
    headOfHousehold: 'M. Saraswathi',
    aadhaarMasked: 'XXXX-XXXX-9912',
    rationCardNo: 'RC-P4-00281923',
    district: 'Northern Hill Region',
    mandal: 'Forest Fringe Block',
    village: 'Seethampeta',
    wardSecretariat: 'Tribal Secretariat Unit #02',
    phone: '+91 98481 99281',
    povertyScore: 89,
    povertyCategory: 'Critical',
    povertyStatus: 'Extreme Vulnerability',
    monthlyIncome: 2900,
    targetIncome: 15000,
    housingType: 'Thatched Bamboo Hut',
    housingTypeTe: 'వెదురు గుడిసె',
    landHoldings: '0.00 Acres',
    assets: ['Sickle', 'BPL Card'],
    members: [
      { id: 'M7-1', name: 'M. Saraswathi', relation: 'Self', age: 36, gender: 'Female', education: 'Illiterate', occupation: 'Non-Timber Forest Produce Collector', income: 2900 },
      { id: 'M7-2', name: 'M. Chinna', relation: 'Son', age: 12, gender: 'Male', education: 'Class 7', occupation: 'Student', income: 0 },
    ],
    mentorId: null,
    mentorName: null,
    mentorGrantTotal: 0,
    assignedVolunteerId: 'VOL-07',
    assignedVolunteerName: 'K. Prasad (Volunteer)',
    volunteerPhone: '+91 97011 44552',
    historicalScores: [{ month: 'Jan', score: 89, income: 2900 }],
    journeyMilestones: [
      { id: 1, title: 'Baseline Survey Completed', titleTe: 'ప్రాథమిక సర్వే', description: 'Urgent hunger & shelter deprivation', descriptionTe: 'తీవ్ర పేదరికం', status: 'completed' },
      { id: 2, title: 'Needs Categorized', titleTe: 'అవసరాల గుర్తింపు', description: 'NTFP honey processing & grain support', descriptionTe: 'తేనె ప్రాసెసింగ్', status: 'current' },
    ],
    needs: [
      { id: 'N-701', category: 'Food', title: 'Emergency Grain Ration & Nutri-Kit Support', titleTe: 'పోషకాహార కిట్', description: 'Immediate seasonal nutrition kit.', urgency: 'High', status: 'In Fulfillment', requestedAt: '2026-03-02' },
    ],
    schemes: [],
    grievances: [],
    lat: 18.6652,
    lng: 83.8541,
    hasAnomalyFlag: false,
    surveyCompletedDate: '2026-02-12',
  },
  {
    id: 'P4-BK-008',
    familyName: 'Sri D. Nageswara Rao & Family',
    familyNameTe: 'శ్రీ డి. నాగేశ్వరరావు కుటుంబం',
    headOfHousehold: 'D. Nageswara Rao',
    aadhaarMasked: 'XXXX-XXXX-7721',
    rationCardNo: 'RC-P4-00391823',
    district: 'Delta Agricultural Zone',
    mandal: 'Canal Irrigated Block',
    village: 'Vuyyuru',
    wardSecretariat: 'Panchayat Unit #09',
    phone: '+91 98490 66554',
    povertyScore: 54,
    povertyCategory: 'Vulnerable',
    povertyStatus: 'Vulnerable',
    monthlyIncome: 7800,
    targetIncome: 18000,
    housingType: 'Semi-pucca Brick Tiled Roof',
    housingTypeTe: 'పెంకుటిల్లు',
    landHoldings: '0.00 Acres',
    assets: ['1 Cycle', 'SHG Loan Account'],
    members: [
      { id: 'M8-1', name: 'D. Nageswara Rao', relation: 'Self', age: 48, gender: 'Male', education: '8th Pass', occupation: 'Carpenter assistant', income: 5200 },
      { id: 'M8-2', name: 'D. Bhavani', relation: 'Spouse', age: 42, gender: 'Female', education: '7th Pass', occupation: 'Tailoring assistant', income: 2600 },
    ],
    mentorId: 'M-103',
    mentorName: 'Sri S. Chandrasekhar (Global Diaspora Fund)',
    mentorGrantTotal: 20000,
    assignedVolunteerId: 'VOL-08',
    assignedVolunteerName: 'G. Suresh (Volunteer)',
    volunteerPhone: '+91 98492 88441',
    historicalScores: [{ month: 'Jan', score: 58, income: 7200 }, { month: 'Feb', score: 54, income: 7800 }],
    journeyMilestones: [
      { id: 1, title: 'Baseline Survey Completed', titleTe: 'ప్రాథమిక సర్వే', description: 'Done', descriptionTe: 'పూర్తయింది', status: 'completed' },
      { id: 2, title: 'Needs Categorized', titleTe: 'అవసరాల గుర్తింపు', description: 'Electric carpentry power tool set', descriptionTe: 'వడ్రంగి విద్యుత్ పరికరాలు', status: 'completed' },
      { id: 3, title: 'Scheme Mapped', titleTe: 'పథకం అనుసంధానం', description: 'National Artisan Skilling', descriptionTe: 'చేతివృత్తుల సాయం', status: 'completed' },
      { id: 4, title: 'Mentor Adoption', titleTe: 'మెంటార్ దత్తత', description: 'Diaspora fund sponsor', descriptionTe: 'దత్తత పూర్తయింది', status: 'completed' },
      { id: 5, title: 'Milestone 1: Toolset Delivered', titleTe: 'పరికరాల అందజేత', description: 'Power saw and planer supplied', descriptionTe: 'విద్యుత్ పరికరాలు అందజేత', status: 'current' },
    ],
    needs: [],
    schemes: [],
    grievances: [],
    lat: 16.3688,
    lng: 80.8492,
    hasAnomalyFlag: false,
    surveyCompletedDate: '2026-01-20',
  },
  {
    id: 'P4-BK-009',
    familyName: 'Smt. S. Mariyamma & Family',
    familyNameTe: 'శ్రీమతి ఎస్. మరియమ్మ కుటుంబం',
    headOfHousehold: 'S. Mariyamma',
    aadhaarMasked: 'XXXX-XXXX-3341',
    rationCardNo: 'RC-P4-00481920',
    district: 'Western Plateau Region',
    mandal: 'Semi-Arid Block',
    village: 'Dhone Rural',
    wardSecretariat: 'Panchayat Unit #04',
    phone: '+91 94412 88331',
    povertyScore: 79,
    povertyCategory: 'High Risk',
    povertyStatus: 'Vulnerable',
    monthlyIncome: 3900,
    targetIncome: 16500,
    housingType: 'Thatched hut',
    housingTypeTe: 'గుడిసె',
    landHoldings: '0.00 Acres',
    assets: ['BPL Card'],
    members: [
      { id: 'M9-1', name: 'S. Mariyamma', relation: 'Self (Widow)', age: 40, gender: 'Female', education: 'Illiterate', occupation: 'Cotton field picker', income: 3900 },
      { id: 'M9-2', name: 'S. Anusha', relation: 'Daughter', age: 15, gender: 'Female', education: 'Class 10', occupation: 'Student', income: 0 },
    ],
    mentorId: null,
    mentorName: null,
    mentorGrantTotal: 0,
    assignedVolunteerId: 'VOL-09',
    assignedVolunteerName: 'B. Raju (Volunteer)',
    volunteerPhone: '+91 98488 22119',
    historicalScores: [{ month: 'Jan', score: 79, income: 3900 }],
    journeyMilestones: [
      { id: 1, title: 'Baseline Survey Completed', titleTe: 'ప్రాథమిక సర్వే', description: 'Done', descriptionTe: 'పూర్తయింది', status: 'completed' },
      { id: 2, title: 'Needs Categorized', titleTe: 'అవసరాల గుర్తింపు', description: 'Milch goat unit & scholarship', descriptionTe: 'మేకల పెంపకం', status: 'current' },
    ],
    needs: [
      { id: 'N-901', category: 'Employment', title: '5-Goat Grazing Unit for Livelihood Seed', titleTe: 'మేకల పెంపకం యూనిట్', description: 'Income from kid sales and milk.', urgency: 'High', status: 'Pending Review', requestedAt: '2026-03-01' },
    ],
    schemes: [],
    grievances: [],
    lat: 15.4124,
    lng: 77.8712,
    hasAnomalyFlag: false,
    surveyCompletedDate: '2026-02-18',
  },
  {
    id: 'P4-BK-010',
    familyName: 'Sri K. Veerabhadrappa & Family',
    familyNameTe: 'శ్రీ కె. వీరభద్రప్ప కుటుంబం',
    headOfHousehold: 'K. Veerabhadrappa',
    aadhaarMasked: 'XXXX-XXXX-8822',
    rationCardNo: 'RC-P4-00591821',
    district: 'Southern Rayalaseema Sector',
    mandal: 'Granite Quarry Block',
    village: 'Chimakurthy',
    wardSecretariat: 'Panchayat Unit #07',
    phone: '+91 97003 44112',
    povertyScore: 73,
    povertyCategory: 'High Risk',
    povertyStatus: 'Vulnerable',
    monthlyIncome: 5600,
    targetIncome: 18000,
    housingType: 'Stone rubble single room',
    housingTypeTe: 'రాతి ఇల్లు / రేకులు',
    landHoldings: '0.00 Acres',
    assets: ['Quarry hammer', 'BPL Card'],
    members: [
      { id: 'M10-1', name: 'K. Veerabhadrappa', relation: 'Self', age: 47, gender: 'Male', education: 'Illiterate', occupation: 'Stone cutter', income: 4200, healthCondition: 'Silicosis risk' },
      { id: 'M10-2', name: 'K. Savitri', relation: 'Spouse', age: 43, gender: 'Female', education: 'Primary', occupation: 'Agri labor', income: 1400 },
    ],
    mentorId: null,
    mentorName: null,
    mentorGrantTotal: 0,
    assignedVolunteerId: 'VOL-10',
    assignedVolunteerName: 'Y. Ramesh (Volunteer)',
    volunteerPhone: '+91 98499 11002',
    historicalScores: [{ month: 'Jan', score: 73, income: 5600 }],
    journeyMilestones: [
      { id: 1, title: 'Baseline Survey Completed', titleTe: 'ప్రాథమిక సర్వే', description: 'Done', descriptionTe: 'పూర్తయింది', status: 'completed' },
      { id: 2, title: 'Needs Categorized', titleTe: 'అవసరాల గుర్తింపు', description: 'Occupational rehabilitation & tea kiosk', descriptionTe: 'టీ దుకాణం పెట్టుబడి', status: 'current' },
    ],
    needs: [
      { id: 'N-1001', category: 'Financial Support', title: 'Roadside Tea & Snack Stall Equipment Kit', titleTe: 'టీ స్టాల్ సామగ్రి', description: 'Transition away from hazardous stone dust quarry work.', urgency: 'High', status: 'Pending Review', requestedAt: '2026-02-27' },
    ],
    schemes: [],
    grievances: [],
    lat: 15.5833,
    lng: 79.8667,
    hasAnomalyFlag: false,
    surveyCompletedDate: '2026-02-14',
  },
  // Additional families 11 to 20
  ...Array.from({ length: 10 }, (_, i) => {
    const idx = i + 11;
    const scores = [82, 77, 69, 58, 45, 38, 29, 18, 64, 71];
    const score = scores[i] || 65;
    const cat = score > 80 ? 'Critical' : score > 60 ? 'High Risk' : score > 40 ? 'Vulnerable' : score > 20 ? 'Stabilizing' : 'Self-Reliant';
    return {
      id: `P4-BK-0${idx}`,
      familyName: `Beneficiary Family #${idx} (Verified BPL)`,
      familyNameTe: `లబ్ధిదారు కుటుంబం #${idx}`,
      headOfHousehold: `Head Person #${idx}`,
      aadhaarMasked: `XXXX-XXXX-${3000 + idx}`,
      rationCardNo: `RC-P4-${2000000 + idx}`,
      district: idx % 2 === 0 ? 'Central Capital Region' : 'Western Plateau Region',
      mandal: `Block Sector #${(idx % 4) + 1}`,
      village: `Model Panchayat #${idx}`,
      wardSecretariat: `Secretariat Unit #${idx}`,
      phone: `+91 98480 ${40000 + idx}`,
      povertyScore: score,
      povertyCategory: cat as Family['povertyCategory'],
      povertyStatus: (score < 20 ? 'Self-Reliant (Poverty Exited)' : score < 45 ? 'Graduating' : 'Vulnerable') as Family['povertyStatus'],
      monthlyIncome: 3500 + idx * 800,
      targetIncome: 18000,
      housingType: idx % 3 === 0 ? 'Pucca Brick Room' : 'Katcha Mud Structure',
      housingTypeTe: idx % 3 === 0 ? 'పక్కా ఇల్లు' : 'మట్టి ఇల్లు',
      landHoldings: '0.00 Acres (Landless)',
      assets: ['BPL Ration Card', 'Jan Dhan Account'],
      members: [
        { id: `M${idx}-1`, name: `Head Person #${idx}`, relation: 'Self', age: 35 + (idx % 15), gender: 'Female' as const, education: 'Primary', occupation: 'Casual Labor', income: 3500 + idx * 500 },
        { id: `M${idx}-2`, name: `Child #${idx}`, relation: 'Child', age: 10 + (idx % 6), gender: 'Male' as const, education: 'School Student', occupation: 'Student', income: 0 },
      ],
      mentorId: idx % 3 === 0 ? 'M-101' : null,
      mentorName: idx % 3 === 0 ? 'Dr. K. R. Rao' : null,
      mentorGrantTotal: idx % 3 === 0 ? 25000 : 0,
      assignedVolunteerId: `VOL-0${(idx % 5) + 1}`,
      assignedVolunteerName: `Volunteer Officer #${(idx % 5) + 1}`,
      volunteerPhone: '+91 94400 00123',
      historicalScores: [{ month: 'Jan', score, income: 3500 + idx * 800 }],
      journeyMilestones: [
        { id: 1, title: 'Baseline Survey', titleTe: 'ప్రాథమిక సర్వే', description: 'Completed', descriptionTe: 'పూర్తయింది', status: 'completed' as const },
        { id: 2, title: 'Need Identification', titleTe: 'అవసరాల గుర్తింపు', description: 'Assessed', descriptionTe: 'గుర్తించబడింది', status: 'completed' as const },
      ],
      needs: [
        { id: `N-${idx}01`, category: 'Employment' as const, title: 'Livelihood Toolset Support', titleTe: 'జీవనోపాధి సాయం', description: 'Self-employment kit.', urgency: 'High' as const, status: 'Pending Review' as const, requestedAt: '2026-03-01' },
      ],
      schemes: [],
      grievances: [],
      lat: 15.5 + (idx * 0.15),
      lng: 78.5 + (idx * 0.2),
      hasAnomalyFlag: idx === 17, // 1 flagged case for anomaly radar
      surveyCompletedDate: '2026-02-10',
    };
  }),
];

// -------------------------------------------------------------
// 10 SEED MENTORS (MARGADARSI)
// -------------------------------------------------------------
export const INITIAL_MENTORS: Mentor[] = [
  {
    id: 'M-101',
    name: 'Dr. K. R. Rao',
    title: 'Founder & CEO, Tech Innovations',
    organization: 'Corporate Philanthropy Alliance',
    email: 'kr.rao@alliance.org',
    phone: '+91 98490 11223',
    location: 'Metropolitan Tech Corridor',
    adoptedFamilyIds: ['P4-BK-001', 'P4-BK-005', 'P4-BK-012', 'P4-BK-015'],
    totalPledged: 350000,
    totalDisbursed: 175000,
    focusAreas: ['Livelihood Skilling', 'Girl Child Education', 'Micro-Dairy'],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'M-102',
    name: 'Smt. Vani Mohan',
    title: 'Managing Trustee',
    organization: 'Artisan Craft Alliance Foundation',
    email: 'vani.mohan@craftalliance.org',
    phone: '+91 97000 44556',
    location: 'Heritage & Handloom Hub',
    adoptedFamilyIds: ['P4-BK-003', 'P4-BK-018'],
    totalPledged: 220000,
    totalDisbursed: 95000,
    focusAreas: ['Traditional Weaving Upgrades', 'Artisan Women Empowerment', 'Direct Market Linkage'],
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'M-103',
    name: 'Sri S. Chandrasekhar',
    title: 'Global Diaspora Partner',
    organization: 'National Diaspora Zero Poverty Fund',
    email: 'chandra@globalfund.io',
    phone: '+1 408 555 0192',
    location: 'Silicon Valley & National Hub',
    adoptedFamilyIds: ['P4-BK-008'],
    totalPledged: 500000,
    totalDisbursed: 140000,
    focusAreas: ['Digital Skilling', 'Solar Micro-Grids', 'Agri-Tech Livelihoods'],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'M-104',
    name: 'Dr. Anita Sharma',
    title: 'Executive Director',
    organization: 'Health For All Foundation',
    email: 'anita.sharma@healthfirst.org',
    phone: '+91 98111 22334',
    location: 'National Capital Region',
    adoptedFamilyIds: [],
    totalPledged: 200000,
    totalDisbursed: 50000,
    focusAreas: ['Elderly Healthcare', 'Preventive Nutrition', 'Disability Support'],
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'M-105',
    name: 'Sri Vikramaditya Bajaj',
    title: 'CSR Head, Industrial Heavy Tools Ltd',
    organization: 'Bajaj Livelihood Trust',
    email: 'vbajaj@heavytools.com',
    phone: '+91 99220 55441',
    location: 'Industrial Corridor',
    adoptedFamilyIds: [],
    totalPledged: 400000,
    totalDisbursed: 120000,
    focusAreas: ['Mechanical Skilling', 'Automobile Apprenticeship', 'Toolkits'],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'M-106',
    name: 'Smt. Deepa Nair',
    title: 'FinTech Lead & Angel Philanthropist',
    organization: 'Inclusive Micro-Finance Alliance',
    email: 'deepa@fintechalliance.org',
    phone: '+91 98450 77112',
    location: 'Southern Tech Hub',
    adoptedFamilyIds: [],
    totalPledged: 300000,
    totalDisbursed: 80000,
    focusAreas: ['Financial Literacy', 'SHG Scaling', 'Digital Payments'],
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'M-107',
    name: 'Sri Rajesh Agrawal',
    title: 'Agri-Business Founder',
    organization: 'Kisan Samridhi Foundation',
    email: 'ragrawal@kisansamridhi.org',
    phone: '+91 94120 33441',
    location: 'Central Agricultural Belt',
    adoptedFamilyIds: [],
    totalPledged: 250000,
    totalDisbursed: 60000,
    focusAreas: ['Drip Irrigation', 'Organic Farming', 'Cold Storage Access'],
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'M-108',
    name: 'Smt. Kavita Reddy',
    title: 'EdTech Social Impact Director',
    organization: 'Vidya Shiksha Mission',
    email: 'kavita@vidyashiksha.org',
    phone: '+91 98860 11992',
    location: 'Tech Hub',
    adoptedFamilyIds: [],
    totalPledged: 180000,
    totalDisbursed: 40000,
    focusAreas: ['STEM Scholarships', 'Digital Classrooms', 'Language Mentoring'],
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'M-109',
    name: 'Sri Harish Patel',
    title: 'Green Energy Entrepreneur',
    organization: 'Clean Energy For All Foundation',
    email: 'hpatel@greenenergy.org',
    phone: '+91 98250 88221',
    location: 'Western Industrial Hub',
    adoptedFamilyIds: [],
    totalPledged: 350000,
    totalDisbursed: 90000,
    focusAreas: ['Solar Pumping', 'Rooftop Solar For Micro-Enterprises', 'Clean Cooking'],
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'M-110',
    name: 'Smt. Preeti Sengupta',
    title: 'Artisan & Textile Designer',
    organization: 'Eastern Handloom Alliance',
    email: 'preeti@easternweaves.org',
    phone: '+91 98310 99441',
    location: 'Eastern Cultural Hub',
    adoptedFamilyIds: [],
    totalPledged: 150000,
    totalDisbursed: 45000,
    focusAreas: ['Natural Dye Training', 'Handloom Design', 'Eco-Packaging'],
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200',
  },
];

// -------------------------------------------------------------
// CONTROLLED ESCROW SEED TRANSACTIONS
// -------------------------------------------------------------
export const INITIAL_ESCROWS: EscrowTransaction[] = [
  {
    id: 'ESC-2026-01',
    householdId: 'P4-BK-001',
    householdName: 'Smt. K. Lakshmi Devi',
    projectName: 'Mission Tailoring & Micro-Enterprise Unit',
    vendorId: 'VND-01',
    vendorName: 'Sri Balaji Livelihood Supplies & Machinery',
    mentorId: 'M-101',
    mentorName: 'Dr. K. R. Rao',
    category: 'Livelihood Asset',
    purpose: 'Industrial Motorized Sewing Machine & Tailoring Toolset',
    date: '2026-02-28',
    amount: 14500,
    totalPledged: 25000,
    fundsLocked: 10500,
    fundsReleased: 14500,
    fundsRemaining: 10500,
    currentMilestoneId: 2,
    currentMilestoneName: 'Tailoring & Business Skilling',
    status: 'Released',
    lastDisbursedAt: '2026-02-28',
    auditHash: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
    remarks: 'Disbursed directly to Sri Balaji Machinery upon YOLOv8 photo proof validation.',
  },
  {
    id: 'ESC-2026-02',
    householdId: 'P4-BK-002',
    householdName: 'Sri B. Ramulu & Family',
    projectName: 'Mobile Agri-Vending Pushcart Setup',
    vendorId: 'VND-02',
    vendorName: 'Agro Machinery & Tools Corp',
    mentorId: 'M-101',
    mentorName: 'Dr. K. R. Rao',
    category: 'Livelihood Asset',
    purpose: 'Stainless Steel Mobile Vegetable Pushcart & Digital Scale',
    date: '2026-03-02',
    amount: 11000,
    totalPledged: 20000,
    fundsLocked: 9000,
    fundsReleased: 11000,
    fundsRemaining: 9000,
    currentMilestoneId: 1,
    currentMilestoneName: 'Pushcart Delivery & Licensing',
    status: 'Completed',
    lastDisbursedAt: '2026-03-02',
    auditHash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    remarks: 'Asset handed over to beneficiary. Vendor settlement cleared.',
  },
  {
    id: 'ESC-2026-03',
    householdId: 'P4-BK-003',
    householdName: 'Smt. T. Ananthamma',
    projectName: 'Handloom Electronic Jacquard Modernization',
    vendorId: 'VND-03',
    vendorName: 'Weaver Tech Solutions Ltd',
    mentorId: 'M-102',
    mentorName: 'Smt. Vani Mohan',
    category: 'Skill Training',
    purpose: 'Motorized Electronic Jacquard Attachment for Handloom',
    date: '2026-03-05',
    amount: 22000,
    totalPledged: 30000,
    fundsLocked: 8000,
    fundsReleased: 22000,
    fundsRemaining: 8000,
    currentMilestoneId: 2,
    currentMilestoneName: 'Direct E-Commerce Tie-Up',
    status: 'Released',
    lastDisbursedAt: '2026-03-05',
    auditHash: '3a1c2299de87bc1284fa920204859aef10029341857c093a102bcad02948cbb1',
    remarks: 'Installation completed in weaver cluster. Direct market linkage enabled.',
  },
  {
    id: 'ESC-2026-04',
    householdId: 'P4-BK-004',
    householdName: 'Sri K. Venkanna',
    projectName: 'Commercial Logistics & Driving Skilling',
    vendorId: 'VND-04',
    vendorName: 'P4 National Driving & Logistics Academy',
    mentorId: 'M-103',
    mentorName: 'Sri Rajesh Verma',
    category: 'Skill Training',
    purpose: 'Commercial Vehicle Driving License & Logistics Certification Fee',
    date: '2026-03-08',
    amount: 15000,
    totalPledged: 25000,
    fundsLocked: 25000,
    fundsReleased: 0,
    fundsRemaining: 25000,
    currentMilestoneId: 1,
    currentMilestoneName: 'Driving School Enrollment',
    status: 'Approved',
    auditHash: '992a014bc8712390841285091240192840192401824091824091284091284091',
    remarks: 'Approved by Mandal Officer. Tranche scheduled for release upon enrollment attendance.',
  },
  {
    id: 'ESC-2026-05',
    householdId: 'P4-BK-005',
    householdName: 'Smt. P. Mary & Children',
    projectName: 'Higher Education Digital Learning Kit',
    vendorId: 'VND-05',
    vendorName: 'Apex Educational Electronics & Books',
    mentorId: 'M-101',
    mentorName: 'Dr. K. R. Rao',
    category: 'Education',
    purpose: 'Digital Learning Tablet + Higher Secondary STEM Study Material',
    date: '2026-03-10',
    amount: 12000,
    totalPledged: 18000,
    fundsLocked: 18000,
    fundsReleased: 0,
    fundsRemaining: 18000,
    currentMilestoneId: 1,
    currentMilestoneName: 'Merit Verification & Device Allocation',
    status: 'Pending',
    auditHash: '1102938475610293847561029384756102938475610293847561029384756102',
    remarks: 'Submitted for Mandal Checker verification. SLA deadline: 48 hours.',
  },
  {
    id: 'ESC-2026-06',
    householdId: 'P4-BK-006',
    householdName: 'Sri R. Shankar',
    projectName: 'Dairy Animal Husbandry Starter Kit',
    vendorId: 'VND-01',
    vendorName: 'Sri Balaji Livelihood Supplies & Machinery',
    mentorId: 'M-102',
    mentorName: 'Smt. Vani Mohan',
    category: 'Livelihood Asset',
    purpose: 'Murrah Buffalo Unit & First Month Cattle Feed',
    date: '2026-03-09',
    amount: 40000,
    totalPledged: 40000,
    fundsLocked: 40000,
    fundsReleased: 0,
    fundsRemaining: 40000,
    currentMilestoneId: 1,
    currentMilestoneName: 'Veterinary Certification',
    status: 'Rejected',
    auditHash: '8839201948572019485720194857201948572019485720194857201948572019',
    remarks: 'Rejected: Discrepancy observed in shed availability certificate. Re-survey required.',
  },
  {
    id: 'ESC-2026-07',
    householdId: 'P4-BK-007',
    householdName: 'Sri G. Venkatesh',
    projectName: 'Rural Electrical Repair & Solar Tooling',
    vendorId: 'VND-02',
    vendorName: 'Agro Machinery & Tools Corp',
    mentorId: 'M-103',
    mentorName: 'Sri Rajesh Verma',
    category: 'Skill Training',
    purpose: 'Complete Solar Inverter Diagnostic & Toolbag Kit',
    date: '2026-03-04',
    amount: 16500,
    totalPledged: 22000,
    fundsLocked: 5500,
    fundsReleased: 16500,
    fundsRemaining: 5500,
    currentMilestoneId: 2,
    currentMilestoneName: 'Skill Certification & Field Practice',
    status: 'Completed',
    lastDisbursedAt: '2026-03-04',
    auditHash: '7721908472910847291084729108472910847291084729108472910847291084',
    remarks: 'Tooling delivered. Beneficiary now earning ₹600/day on village electrical calls.',
  },
  {
    id: 'ESC-2026-08',
    householdId: 'P4-BK-008',
    householdName: 'Smt. D. Subbamma',
    projectName: 'Poultry Backyard Farm Seed Capital',
    vendorId: 'VND-01',
    vendorName: 'Sri Balaji Livelihood Supplies & Machinery',
    mentorId: 'M-101',
    mentorName: 'Dr. K. R. Rao',
    category: 'Livelihood Asset',
    purpose: '50-Bird Broiler Unit with Automated Feeders & Night Lamps',
    date: '2026-03-11',
    amount: 18000,
    totalPledged: 25000,
    fundsLocked: 25000,
    fundsReleased: 0,
    fundsRemaining: 25000,
    currentMilestoneId: 1,
    currentMilestoneName: 'Shed Inspection & Delivery',
    status: 'Approved',
    auditHash: '5519203847591029384759102938475910293847591029384759102938475910',
    remarks: 'Sanction approved by Block Officer. Awaiting vendor dispatch.',
  },
];

// -------------------------------------------------------------
// SEED VENDORS & VOUCHERS
// -------------------------------------------------------------
export const INITIAL_VOUCHERS: VoucherItem[] = [
  {
    id: 'VCH-01',
    voucherCode: 'P4-SEW-9912',
    beneficiaryName: 'K. Lakshmi Devi',
    householdId: 'P4-BK-001',
    assetType: 'Industrial Heavy-Duty Stitching Machine & Toolset',
    vendorName: 'Sri Balaji Livelihood Supplies & Machinery',
    vendorId: 'VND-01',
    amount: 14500,
    status: 'Redeemed',
    issuedDate: '2026-02-24',
    redeemedDate: '2026-02-28',
    proofPhotoUrl: 'https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?auto=format&fit=crop&q=80&w=400',
    geoTag: '16.2439 N, 80.6405 E (Verified GPS)',
  },
  {
    id: 'VCH-02',
    voucherCode: 'P4-KIT-4410',
    beneficiaryName: 'B. Parvathi',
    householdId: 'P4-BK-002',
    assetType: 'Stainless Steel Mobile Vegetable Pushcart & Digital Scale',
    vendorName: 'Agro Machinery & Tools Corp',
    vendorId: 'VND-02',
    amount: 11000,
    status: 'Issued',
    issuedDate: '2026-03-02',
  },
  {
    id: 'VCH-03',
    voucherCode: 'P4-LOOM-7703',
    beneficiaryName: 'T. Ananthamma',
    householdId: 'P4-BK-003',
    assetType: 'Motorized Electronic Jacquard Attachment for Handloom',
    vendorName: 'Weaver Tech Solutions Ltd',
    vendorId: 'VND-03',
    amount: 22000,
    status: 'Redeemed',
    issuedDate: '2026-02-26',
    redeemedDate: '2026-03-02',
    proofPhotoUrl: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&q=80&w=400',
    geoTag: '14.4140 N, 77.7180 E (Verified GPS)',
  },
];

// -------------------------------------------------------------
// SEED VIGILANCE ANOMALIES
// -------------------------------------------------------------
export const INITIAL_ANOMALIES: AnomalyItem[] = [
  {
    id: 'ANOM-01',
    type: 'GEO_MISMATCH',
    severity: 'High',
    title: 'Geo-fence Mismatch on Household Survey Submission',
    description: 'Volunteer GPS coordinates recorded 42 km outside the assigned Panchayat boundary during submission.',
    householdId: 'P4-BK-004',
    mandal: 'River Valley Block',
    district: 'Central Capital Region',
    flaggedAt: '2026-03-04T14:22:00Z',
    status: 'Under Investigation',
    evidence: 'Recorded GPS: 16.5122, 80.6214 vs Panchayat Centroid: 16.4357, 80.5621. Discrepancy: +42.1 km.',
  },
  {
    id: 'ANOM-02',
    type: 'DUPLICATE_ID',
    severity: 'Critical',
    title: 'Duplicate Ration Card Beneficiary Detected Across 2 Blocks',
    description: 'Ration card RC-P4-051108442 matched in two separate welfare disbursement rosters.',
    householdId: 'P4-BK-004',
    mandal: 'River Valley Block',
    district: 'Central Capital Region',
    flaggedAt: '2026-03-05T09:10:00Z',
    status: 'Frozen',
    evidence: 'Cross-block biometric vault match. Direct benefit payout halted automatically.',
  },
  {
    id: 'ANOM-03',
    type: 'RAPID_SCORE_DROP',
    severity: 'Medium',
    title: 'Vulnerability Score Drop Audit Alert',
    description: 'Household MPI score dropped from 78 to 22 within 48 hours without corresponding asset voucher issuance.',
    householdId: 'P4-BK-001',
    mandal: 'Tenali Block',
    district: 'Guntur Division',
    flaggedAt: '2026-03-09T18:40:00Z',
    status: 'Cleared',
    evidence: 'Audit confirmed valid family adjustment after formal elder daughter marriage. Verification signed.',
  },
  {
    id: 'ANOM-04',
    type: 'VENDOR_ANOMALY',
    severity: 'High',
    title: 'Sequential Duplicate Equipment Serial Numbers in Vendor Invoices',
    description: 'Vendor VND-02 submitted duplicate serial numbers for 3 solar water pump installations.',
    householdId: 'P4-BK-002',
    mandal: 'Port Sector Block',
    district: 'Coastal Industrial Hub',
    flaggedAt: '2026-03-10T11:05:00Z',
    status: 'Under Investigation',
    evidence: 'Manufacturer barcode serial #SLR-994112 duplicated on two claims. Payout frozen.',
  },
];

// -------------------------------------------------------------
// TAMPER-EVIDENT AUDIT TRAIL
// -------------------------------------------------------------
export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'AUD-001',
    timestamp: '2026-01-12T09:30:00Z',
    actor: 'K. Suresh (VOL-01)',
    role: 'Maker (Volunteer)',
    action: 'FAMILY_BASELINE_SURVEY_CREATED',
    previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
    currentHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    details: 'Survey submitted for Household P4-BK-001. MPI calculated: 78/100.',
  },
  {
    id: 'AUD-002',
    timestamp: '2026-01-20T14:15:00Z',
    actor: 'S. Ramanjaneyulu (BDO)',
    role: 'Checker (Officer)',
    action: 'SCHEME_SANCTION_APPROVED',
    previousHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    currentHash: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
    details: 'Sanctioned P4 Livelihood Asset Support Grant (₹25,000) for Household P4-BK-001.',
  },
  {
    id: 'AUD-003',
    timestamp: '2026-02-15T11:00:00Z',
    actor: 'Dr. K. R. Rao (M-101)',
    role: 'Mentor (Margadarsi)',
    action: 'MENTOR_ADOPTION_PLEDGE',
    previousHash: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
    currentHash: '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce',
    details: 'Pledged ₹25,000 micro-grant locked into Controlled Escrow for P4-BK-001.',
  },
  {
    id: 'AUD-004',
    timestamp: '2026-02-28T16:20:00Z',
    actor: 'YOLOv8 CV Service',
    role: 'Automated AI Verifier',
    action: 'EVIDENCE_PROOF_VALIDATED',
    previousHash: '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce',
    currentHash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    details: 'Detected Sewing Machine with 94.2% confidence. GPS & EXIF validated.',
  },
  {
    id: 'AUD-005',
    timestamp: '2026-02-28T16:22:00Z',
    actor: 'Controlled Escrow Engine',
    role: 'Financial Escrow',
    action: 'VENDOR_PAYMENT_DISBURSED',
    previousHash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    currentHash: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
    details: '₹14,500 transferred to Sri Balaji Machinery (VND-01) for voucher P4-SEW-9912.',
  },
];

// -------------------------------------------------------------
// PREDICTIVE POVERTY RISK SEED
// -------------------------------------------------------------
export const INITIAL_PREDICTIVE_RISKS: PredictivePovertyRisk[] = [
  {
    id: 'P4-BK-002',
    familyId: 'P4-BK-002',
    familyName: 'Sri B. Ramulu & Family',
    currentScore: 84,
    predictedRisk: 88,
    trend: 'Increasing',
    reason: 'Informal debt burden (36% interest) + seasonal brick kiln shutdown.',
    recommendedAction: 'Immediate micro-credit seed capital under PM SVANidhi to prevent distress migration.',
  },
  {
    id: 'P4-BK-004',
    familyId: 'P4-BK-004',
    familyName: 'Sri K. Venkanna',
    currentScore: 68,
    predictedRisk: 74,
    trend: 'Increasing',
    reason: 'Single-income casual employment vulnerable to retail shop contraction.',
    recommendedAction: 'Skill upgrade in logistics & commercial driving certification.',
  },
  {
    id: 'P4-BK-001',
    familyId: 'P4-BK-001',
    familyName: 'Smt. K. Lakshmi Devi',
    currentScore: 78,
    predictedRisk: 34,
    trend: 'Decreasing',
    reason: 'Industrial sewing machine deployed; tailoring training generating regular local orders.',
    recommendedAction: 'Proceed with Milestone 2 training completion & bulk garment retail tie-up.',
  },
];

// -------------------------------------------------------------
// AGENTIC INACTIVITY ALERTS (Cases > 30 days without update)
// -------------------------------------------------------------
export const INITIAL_INACTIVITY_ALERTS: AgenticInactivityAlert[] = [
  {
    id: 'ACT-01',
    familyId: 'P4-BK-006',
    familyName: 'Sri R. Shankar & Family',
    village: 'Chandragiri Rural',
    lastUpdateDays: 38,
    assignedVolunteer: 'S. Naresh (VOL-06)',
    status: 'Requires Intervention',
    detectedAt: '2026-03-10',
  },
  {
    id: 'ACT-02',
    familyId: 'P4-BK-009',
    familyName: 'Smt. S. Mariyamma',
    village: 'Dhone Rural',
    lastUpdateDays: 34,
    assignedVolunteer: 'B. Raju (VOL-09)',
    status: 'Requires Intervention',
    detectedAt: '2026-03-08',
  },
  {
    id: 'ACT-03',
    familyId: 'P4-BK-010',
    familyName: 'Sri K. Veerabhadrappa',
    village: 'Chimakurthy',
    lastUpdateDays: 31,
    assignedVolunteer: 'Y. Ramesh (VOL-10)',
    status: 'Action Scheduled',
    detectedAt: '2026-03-09',
  },
];

// -------------------------------------------------------------
// GEOGRAPHIC REGIONS & DISTRICT BENCHMARKS (Universal Civic-Tech)
// -------------------------------------------------------------
export const DISTRICTS_DATA: DistrictMetric[] = [
  {
    id: 'DIST-01',
    name: 'Guntur Central Division',
    nameTe: 'గుంటూరు డివిజన్',
    headquarters: 'Guntur City HQ',
    totalFamilies: 184500,
    surveyedFamilies: 179200,
    extremeVulnerableCount: 22400,
    graduatingCount: 14200,
    povertyExitedCount: 8900,
    exitRate: 39.7,
    mentorsActive: 142,
    csrFundsCr: 18.5,
    lat: 16.3067,
    lng: 80.4365,
    color: '#059669',
  },
  {
    id: 'DIST-02',
    name: 'Coastal Industrial Hub',
    nameTe: 'కోస్టల్ హబ్',
    headquarters: 'Port Metro City',
    totalFamilies: 162000,
    surveyedFamilies: 158400,
    extremeVulnerableCount: 19800,
    graduatingCount: 16500,
    povertyExitedCount: 11200,
    exitRate: 56.5,
    mentorsActive: 210,
    csrFundsCr: 32.4,
    lat: 17.6868,
    lng: 83.2185,
    color: '#059669',
  },
  {
    id: 'DIST-03',
    name: 'Western Plateau Region',
    nameTe: 'పశ్చిమ పీఠభూమి ప్రాంతం',
    headquarters: 'Plateau District HQ',
    totalFamilies: 198000,
    surveyedFamilies: 191000,
    extremeVulnerableCount: 38200,
    graduatingCount: 12100,
    povertyExitedCount: 6400,
    exitRate: 28.3,
    mentorsActive: 88,
    csrFundsCr: 12.1,
    lat: 14.6819,
    lng: 77.6006,
    color: '#D97706',
  },
  {
    id: 'DIST-04',
    name: 'Delta Agricultural Zone',
    nameTe: 'డెల్టా వ్యవసాయ జోన్',
    headquarters: 'Delta River HQ',
    totalFamilies: 172000,
    surveyedFamilies: 169800,
    extremeVulnerableCount: 18200,
    graduatingCount: 15400,
    povertyExitedCount: 12400,
    exitRate: 68.1,
    mentorsActive: 175,
    csrFundsCr: 24.8,
    lat: 16.1875,
    lng: 81.1389,
    color: '#059669',
  },
  {
    id: 'DIST-05',
    name: 'Southern Rayalaseema Sector',
    nameTe: 'రాయలసీమ సెక్టార్',
    headquarters: 'Tirupati Command',
    totalFamilies: 188000,
    surveyedFamilies: 182500,
    extremeVulnerableCount: 26400,
    graduatingCount: 13900,
    povertyExitedCount: 9100,
    exitRate: 41.2,
    mentorsActive: 130,
    csrFundsCr: 19.3,
    lat: 13.6288,
    lng: 79.4192,
    color: '#059669',
  },
  {
    id: 'DIST-06',
    name: 'Kurnool Basin District',
    nameTe: 'కర్నూలు బేసిన్',
    headquarters: 'Kurnool City HQ',
    totalFamilies: 215000,
    surveyedFamilies: 204000,
    extremeVulnerableCount: 42100,
    graduatingCount: 11400,
    povertyExitedCount: 5800,
    exitRate: 24.1,
    mentorsActive: 74,
    csrFundsCr: 9.8,
    lat: 15.8281,
    lng: 78.0373,
    color: '#DC2626',
  },
];

// -------------------------------------------------------------
// GIS COMMUNITY MAP SEED DATA (Requirement 3)
// -------------------------------------------------------------
export const INITIAL_GIS_MARKERS: GISMarker[] = [
  // Families
  {
    id: 'GIS-FAM-01',
    type: 'family',
    title: 'Smt. K. Lakshmi Devi (Adopted BPL Family)',
    district: 'Guntur Central Division',
    mandal: 'Tenali Block',
    village: 'Pinapadu Village',
    lat: 16.2415,
    lng: 80.6482,
    familyId: 'P4-BK-001',
    povertyScore: 78,
    adoptionStatus: 'Adopted by Dr. K. R. Rao',
    currentMilestone: 'Milestone 2: Tailoring & Business Skilling',
    needsSummary: 'Motorized sewing machine delivered. Earning regular micro-enterprise income.',
  },
  {
    id: 'GIS-FAM-02',
    type: 'family',
    title: 'Sri B. Ramulu (Vulnerable Farm Labor)',
    district: 'Guntur Central Division',
    mandal: 'Tenali Block',
    village: 'Pinapadu Village',
    lat: 16.248,
    lng: 80.651,
    familyId: 'P4-BK-002',
    povertyScore: 84,
    adoptionStatus: 'Adopted by Dr. K. R. Rao',
    currentMilestone: 'Milestone 1: Pushcart Delivery',
    needsSummary: 'Stainless steel pushcart operational. Daily vegetable vending active.',
  },
  {
    id: 'GIS-FAM-03',
    type: 'family',
    title: 'Smt. T. Ananthamma (Weaver Household)',
    district: 'Western Plateau Region',
    mandal: 'Dharmavaram Block',
    village: 'Kothacheruvu',
    lat: 14.414,
    lng: 77.718,
    familyId: 'P4-BK-003',
    povertyScore: 62,
    adoptionStatus: 'Adopted by Smt. Vani Mohan',
    currentMilestone: 'Milestone 2: E-Commerce Silk Tie-Up',
    needsSummary: 'Electronic jacquard attachment active; handloom productivity up 60%.',
  },
  {
    id: 'GIS-FAM-04',
    type: 'family',
    title: 'Sri K. Venkanna (Casual Transport Worker)',
    district: 'Coastal Industrial Hub',
    mandal: 'Port Sector Block',
    village: 'Mindi Village',
    lat: 17.692,
    lng: 83.21,
    familyId: 'P4-BK-004',
    povertyScore: 68,
    adoptionStatus: 'Awaiting Adoption (AI Match 86%)',
    currentMilestone: 'Milestone 1: Baseline Verification',
    needsSummary: 'Needs commercial driving academy certification and heavy license.',
  },

  // Communities
  {
    id: 'GIS-COM-01',
    type: 'community',
    title: 'Pinapadu Dalitawada Community Settlement',
    district: 'Guntur Central Division',
    mandal: 'Tenali Block',
    village: 'Pinapadu Village',
    lat: 16.244,
    lng: 80.645,
    communityName: 'Pinapadu Dalitawada',
    population: 420,
    bplRatio: '78% BPL Density',
  },
  {
    id: 'GIS-COM-02',
    type: 'community',
    title: 'Narakodur Agricultural Workers Hamlet',
    district: 'Guntur Central Division',
    mandal: 'Tenali Block',
    village: 'Narakodur',
    lat: 16.221,
    lng: 80.592,
    communityName: 'Narakodur South Ward',
    population: 680,
    bplRatio: '64% BPL Density',
  },

  // Unresolved Needs
  {
    id: 'GIS-NEED-01',
    type: 'need',
    title: 'Unresolved Need: Drinking Water Reverse Osmosis Plant',
    district: 'Guntur Central Division',
    mandal: 'Tenali Block',
    village: 'Pinapadu Village',
    lat: 16.242,
    lng: 80.642,
    needsSummary: 'High fluoride content in groundwater affecting 68 BPL families. Community filtration requested.',
  },
  {
    id: 'GIS-NEED-02',
    type: 'need',
    title: 'Unresolved Need: Flood Bund Reinforcement & Sanitation Drain',
    district: 'Coastal Industrial Hub',
    mandal: 'Port Sector Block',
    village: 'Mindi Village',
    lat: 17.688,
    lng: 83.205,
    needsSummary: 'Monsoon flooding damages low-lying mud dwellings. Drainage civil works needed.',
  },

  // Completed Projects
  {
    id: 'GIS-PROJ-01',
    type: 'project',
    title: 'Completed: Solar Street Lighting & Micro-Grid',
    district: 'Guntur Central Division',
    mandal: 'Tenali Block',
    village: 'Pinapadu Village',
    lat: 16.246,
    lng: 80.649,
    projectName: 'Pinapadu Clean Energy & Safety Initiative',
    projectStatus: 'Completed',
    beneficiariesCount: 140,
    completionPct: 100,
  },
  {
    id: 'GIS-PROJ-02',
    type: 'project',
    title: 'In Progress: Community Skill & Tailoring Production Hub',
    district: 'Guntur Central Division',
    mandal: 'Tenali Block',
    village: 'Pinapadu Village',
    lat: 16.2435,
    lng: 80.6475,
    projectName: 'Margadarsi Women Tailoring Cluster',
    projectStatus: 'In Progress (85% Built)',
    beneficiariesCount: 45,
    completionPct: 85,
  },

  // Schools
  {
    id: 'GIS-SCH-01',
    type: 'school',
    title: 'Mandal Parishad Primary School (MPPS Pinapadu)',
    district: 'Guntur Central Division',
    mandal: 'Tenali Block',
    village: 'Pinapadu Village',
    lat: 16.2455,
    lng: 80.6465,
    schoolName: 'MPPS Pinapadu',
    schoolType: 'Government Primary School (Grades 1-5)',
    communityServed: 'Serving 94 BPL students with Midday Meal & Digital Classroom',
  },
  {
    id: 'GIS-SCH-02',
    type: 'school',
    title: 'Zilla Parishad High School (ZPHS Narakodur)',
    district: 'Guntur Central Division',
    mandal: 'Tenali Block',
    village: 'Narakodur',
    lat: 16.223,
    lng: 80.595,
    schoolName: 'ZPHS Narakodur',
    schoolType: 'High School (Grades 6-10)',
    communityServed: 'STEM lab & Girl Child Scholarship linkage active',
  },

  // Health Facilities
  {
    id: 'GIS-HLT-01',
    type: 'health',
    title: 'Pinapadu Village Health Clinic (YSR/National Health Clinic)',
    district: 'Guntur Central Division',
    mandal: 'Tenali Block',
    village: 'Pinapadu Village',
    lat: 16.2425,
    lng: 80.647,
    facilityType: 'Village Health Clinic / Ayushman Arogya Mandir',
    availability: '24x7 Emergency Delivery & First Aid',
    doctorOnDuty: 'Dr. S. Anusha, MBBS (Community Medical Officer)',
  },
  {
    id: 'GIS-HLT-02',
    type: 'health',
    title: 'Tenali Community Health Centre (CHC)',
    district: 'Guntur Central Division',
    mandal: 'Tenali Block',
    village: 'Tenali Town',
    lat: 16.239,
    lng: 80.638,
    facilityType: 'Community Health Centre (CHC)',
    availability: '30-Bed Hospital with Diagnostics & Surgical Care',
    doctorOnDuty: 'Duty Civil Surgeon + 4 Specialists',
  },

  // Employment Opportunities
  {
    id: 'GIS-EMP-01',
    type: 'employment',
    title: 'Employment Hub: Sri Balaji Garment Stitching Workshop',
    district: 'Guntur Central Division',
    mandal: 'Tenali Block',
    village: 'Pinapadu Village',
    lat: 16.247,
    lng: 80.643,
    jobTitle: 'Tailor / Garment Finisher (Piece-rate contract)',
    employerName: 'Sri Balaji Livelihood Supplies & Vendor Network',
    openings: 12,
    wage: '₹450 - ₹700 / day based on production output',
  },
  {
    id: 'GIS-EMP-02',
    type: 'employment',
    title: 'Employment Hub: Guntur Cold Storage & Agri Logistics',
    district: 'Guntur Central Division',
    mandal: 'Tenali Block',
    village: 'Narakodur',
    lat: 16.226,
    lng: 80.589,
    jobTitle: 'Chilli Sorting, Grading & Packaging Specialist',
    employerName: 'Kisan Agri Hub Cooperative',
    openings: 25,
    wage: '₹550 / day + seasonal production bonus',
  },
];

// -------------------------------------------------------------
// LIVE DYNAMIC NOTIFICATIONS (Requirement 16)
// -------------------------------------------------------------
export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'NOTIF-01',
    title: 'Asset Proof Validated by AI',
    message: 'Computer Vision verified milch cow & equipment proof for Smt. K. Lakshmi Devi (P4-BK-001).',
    type: 'evidence',
    timestamp: '10m ago',
    read: false,
    actionNav: 'milestones',
  },
  {
    id: 'NOTIF-02',
    title: 'Controlled Escrow Tranche Disbursed',
    message: 'Authorized payment of ₹14,500 released directly to Sri Balaji Machinery for voucher P4-SEW-9912.',
    type: 'payment',
    timestamp: '25m ago',
    read: false,
    actionNav: 'funds',
  },
  {
    id: 'NOTIF-03',
    title: 'Margadarsi Family Adoption Confirmed',
    message: 'Dr. K. R. Rao adopted Smt. K. Lakshmi Devi with ₹25,000 grant locked in escrow.',
    type: 'mentor',
    timestamp: '1h ago',
    read: false,
    actionNav: 'adoptions',
  },
  {
    id: 'NOTIF-04',
    title: 'Vigilance Geo-Fence Warning',
    message: 'Survey coordinates deviation flag generated for household P4-BK-004. Investigation initiated.',
    type: 'fraud',
    timestamp: '3h ago',
    read: true,
    actionNav: 'fraud_vigilance',
  },
];

