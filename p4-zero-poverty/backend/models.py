from typing import List, Optional, Dict, Any, Literal
from pydantic import BaseModel, Field

# -------------------------------------------------------------
# USER & RBAC MODELS
# -------------------------------------------------------------
UserRoleType = Literal[
    'bangaru-kutumbam',
    'volunteer',
    'mandal-officer',
    'margadarsi',
    'vigilance-officer',
    'state-admin',
    'vendor',
    'system-admin'
]

class UserProfile(BaseModel):
    id: str
    name: str
    role: UserRoleType
    email: str
    phone: str
    district: str
    mandal: Optional[str] = None
    village: Optional[str] = None
    organization: Optional[str] = None

# -------------------------------------------------------------
# FAMILY & DEMOGRAPHIC MODELS
# -------------------------------------------------------------
class FamilyMember(BaseModel):
    id: str
    name: str
    relation: str
    age: int
    gender: Literal['Female', 'Male', 'Other']
    education: str
    occupation: str
    income: float
    healthCondition: Optional[str] = None

class Family(BaseModel):
    id: str
    familyName: str
    headOfHousehold: str
    aadhaarMasked: str
    rationCardNo: str
    district: str
    mandal: str
    village: str
    wardSecretariat: str
    phone: str
    povertyScore: int # 0-100 MPI score
    povertyCategory: Literal['Self-Reliant', 'Stabilizing', 'Vulnerable', 'High Risk', 'Critical']
    povertyStatus: Literal['Extreme Vulnerability', 'Vulnerable', 'Graduating', 'Self-Reliant (Poverty Exited)']
    monthlyIncome: float
    targetIncome: float
    housingType: str
    landHoldings: str
    assets: List[str]
    members: List[FamilyMember]
    mentorId: Optional[str] = None
    mentorName: Optional[str] = None
    mentorGrantTotal: float = 0.0
    assignedVolunteerId: str
    assignedVolunteerName: str
    volunteerPhone: str
    eKycStatus: Literal['Pending', 'Under Verification', 'Verified', 'Rejected', 'Requires Review'] = 'Verified'
    lat: float
    lng: float
    hasAnomalyFlag: bool = False
    surveyCompletedDate: str
    consentProvided: bool = True
    inactivityDays: int = 0

# -------------------------------------------------------------
# MPI 9-DIMENSION SURVEY & SCORING
# -------------------------------------------------------------
class MPIDimensions(BaseModel):
    income: float = Field(..., ge=0, le=100)
    employment: float = Field(..., ge=0, le=100)
    housing: float = Field(..., ge=0, le=100)
    education: float = Field(..., ge=0, le=100)
    healthcare: float = Field(..., ge=0, le=100)
    foodSecurity: float = Field(..., ge=0, le=100)
    benefitAccess: float = Field(..., ge=0, le=100)
    debt: float = Field(..., ge=0, le=100)
    skills: float = Field(..., ge=0, le=100)

class HouseholdSurveyCreate(BaseModel):
    familyName: str
    headOfHousehold: str
    phone: str
    district: str
    mandal: str
    village: str
    housingType: str
    monthlyIncome: float
    targetIncome: float
    landHoldings: str
    members: List[FamilyMember]
    dimensions: MPIDimensions
    lat: Optional[float] = None
    lng: Optional[float] = None
    consentGiven: bool = True

class PovertyScoreResult(BaseModel):
    familyId: str
    overallPovertyScore: int
    vulnerabilityScore: int
    povertyRiskLevel: Literal['Low', 'Medium', 'High', 'Critical']
    povertyExitScore: int
    category: Literal['Self-Reliant', 'Stabilizing', 'Vulnerable', 'High Risk', 'Critical']
    dimensionScores: Dict[str, float]
    historicalTrend: List[Dict[str, Any]]
    improvementAreas: List[str]
    recommendedActions: List[str]

# -------------------------------------------------------------
# AI NEED CLASSIFICATION
# -------------------------------------------------------------
NeedCategoryType = Literal[
    'Food',
    'Housing',
    'Employment',
    'Education',
    'Healthcare',
    'Sanitation',
    'Financial Support',
    'Skill Development',
    'Livelihood',
    'Government Services',
    'Emergency'
]

class NeedItem(BaseModel):
    id: str
    familyId: str
    category: NeedCategoryType
    title: str
    description: str
    severity: Literal['Low', 'Medium', 'High', 'Critical']
    priority: Literal['P1', 'P2', 'P3', 'P4']
    status: Literal['Pending Review', 'Approved', 'In Fulfillment', 'Resolved']
    requestedAt: str
    assignedTo: Optional[str] = None
    actionTaken: Optional[str] = None
    recommendedIntervention: Optional[str] = None

class NeedCreate(BaseModel):
    familyId: str
    rawText: Optional[str] = None
    category: Optional[NeedCategoryType] = None
    title: str
    description: str
    severity: Optional[Literal['Low', 'Medium', 'High', 'Critical']] = 'High'

# -------------------------------------------------------------
# GOVERNMENT SCHEMES & RECOMMENDATIONS
# -------------------------------------------------------------
class SchemeItem(BaseModel):
    id: str
    name: str
    dept: str
    benefit: str
    eligibility: str
    requiredDocs: List[str]
    status: Literal['Eligible', 'Applied', 'Under Review', 'Approved', 'Sanctioned', 'Disbursed']
    appliedAt: Optional[str] = None
    sanctionAmount: Optional[float] = None
    matchType: Literal['Eligible', 'Possibly Eligible', 'Not Eligible'] = 'Eligible'
    ineligibilityReason: Optional[str] = None
    nextAction: str = 'Submit application with ration card copy'

class SchemeApplicationAction(BaseModel):
    familyId: str
    schemeId: str
    action: Literal['apply', 'upload_docs', 'track', 'sanction', 'reject']
    docName: Optional[str] = None
    reason: Optional[str] = None
    amount: Optional[float] = None

# -------------------------------------------------------------
# MENTOR & MARGADARSI MATCHMAKING
# -------------------------------------------------------------
class Mentor(BaseModel):
    id: str
    name: str
    title: str
    organization: str
    email: str
    phone: str
    location: str
    adoptedFamilyIds: List[str]
    totalPledged: float
    totalDisbursed: float
    focusAreas: List[str]
    skills: List[str]
    avatarUrl: str

class MatchResult(BaseModel):
    familyId: str
    mentorId: str
    mentorName: str
    compatibilityScore: int # e.g. 92%
    reasons: List[str]
    alternativeMatches: List[Dict[str, Any]]

class AdoptionAgreement(BaseModel):
    id: str
    familyId: str
    familyName: str
    mentorId: str
    mentorName: str
    supportObjective: str
    milestones: List[str]
    pledgedAmount: float
    durationMonths: int
    status: Literal['Draft', 'Accepted', 'Active', 'Completed']
    createdAt: str

# -------------------------------------------------------------
# CONTROLLED ESCROW & MILESTONE MANAGEMENT
# -------------------------------------------------------------
class JourneyMilestone(BaseModel):
    id: int
    familyId: str
    title: str
    description: str
    status: Literal['completed', 'current', 'upcoming']
    date: Optional[str] = None
    verifiedBy: Optional[str] = None
    responsiblePerson: str = 'Community Field Worker'
    evidenceUrl: Optional[str] = None
    verificationStatus: Optional[Literal['Verified', 'Under Review', 'Pending']] = None
    comments: Optional[str] = None

class EscrowTransaction(BaseModel):
    id: str
    familyId: str
    mentorId: str
    mentorName: str
    totalPledged: float
    fundsLocked: float
    fundsReleased: float
    fundsRemaining: float
    currentMilestoneId: int
    currentMilestoneName: str
    status: Literal['Pledged', 'Locked', 'Verification In Progress', 'Released', 'Completed']
    lastDisbursedAt: Optional[str] = None
    vendorId: Optional[str] = None
    vendorName: Optional[str] = None

class EscrowReleaseAction(BaseModel):
    escrowId: str
    amount: float
    milestoneId: int
    vendorId: str
    officerRemarks: str

# -------------------------------------------------------------
# COMPUTER VISION & EVIDENCE VERIFICATION
# -------------------------------------------------------------
class EvidenceVerificationRequest(BaseModel):
    familyId: str
    milestoneId: int
    assetName: str
    photoBase64: Optional[str] = None
    photoUrl: Optional[str] = None
    lat: Optional[float] = None
    lng: Optional[float] = None

class EvidenceVerificationResult(BaseModel):
    id: str
    familyId: str
    assetName: str
    detectedObject: str
    confidenceScore: int
    gpsValid: bool
    timestampValid: bool
    exifValid: bool
    duplicateCheckClear: bool
    overallStatus: Literal['PROOF VALIDATED', 'REQUIRES REVIEW', 'FLAGGED']
    photoUrl: str
    timestamp: str
    geoCoordinates: str
    message: str

# -------------------------------------------------------------
# ANTI-FRAUD & VIGILANCE
# -------------------------------------------------------------
class FraudAlert(BaseModel):
    id: str
    type: Literal['GEO_MISMATCH', 'DUPLICATE_ID', 'RAPID_SCORE_DROP', 'VENDOR_ANOMALY', 'IMPOSSIBLE_TRAVEL', 'REUSED_DOCS']
    severity: Literal['Critical', 'High', 'Medium', 'Low']
    title: str
    description: str
    familyId: str
    mandal: str
    district: str
    flaggedAt: str
    status: Literal['Under Investigation', 'Frozen', 'Cleared', 'Fraud Confirmed']
    evidence: str
    fraudRiskScore: int

class FraudActionRequest(BaseModel):
    alertId: str
    action: Literal['Review', 'Flag', 'Request Evidence', 'Freeze Workflow', 'Resolve Alert']
    officerNotes: str

# -------------------------------------------------------------
# LIVELIHOOD VENDOR WORKFLOW
# -------------------------------------------------------------
class Vendor(BaseModel):
    id: str
    name: str
    category: str
    contactPerson: str
    phone: str
    location: str
    settledAmount: float
    pendingSettlement: float

class VendorOrder(BaseModel):
    id: str
    voucherCode: str
    beneficiaryName: str
    familyId: str
    assetType: str
    vendorName: str
    vendorId: str
    amount: float
    paymentStatus: Literal['Pending', 'Authorized', 'Released', 'Completed']
    deliveryStatus: Literal['Ordered', 'Dispatched', 'Delivered', 'Verified']
    issuedDate: str
    redeemedDate: Optional[str] = None
    proofPhotoUrl: Optional[str] = None
    geoTag: Optional[str] = None

# -------------------------------------------------------------
# PREDICTIVE POVERTY RISK & INACTIVITY
# -------------------------------------------------------------
class PredictivePovertyRisk(BaseModel):
    id: str
    familyId: str
    familyName: str
    currentScore: int
    predictedRisk: int
    trend: Literal['Increasing', 'Stable', 'Decreasing']
    reason: str
    recommendedAction: str

class InactivityAlert(BaseModel):
    id: str
    familyId: str
    familyName: str
    village: str
    lastUpdateDays: int
    assignedVolunteer: str
    status: Literal['Requires Intervention', 'Case Reassigned', 'Action Scheduled']
    detectedAt: str

# -------------------------------------------------------------
# GRIEVANCES & NOTIFICATIONS
# -------------------------------------------------------------
class GrievanceItem(BaseModel):
    id: str
    familyId: str
    familyName: str
    category: str
    priority: Literal['Critical', 'High', 'Medium', 'Low']
    description: str
    channel: Literal['Voice AI (Bhashini)', 'Secretariat Desk', 'Mobile App']
    status: Literal['Open', 'Investigating', 'Hearing Scheduled', 'Resolved', 'Escalated']
    filedAt: str
    slaDeadline: str
    assignedOfficer: str
    officerRemarks: Optional[str] = None

class GrievanceCreate(BaseModel):
    familyId: str
    category: str
    priority: Optional[Literal['Critical', 'High', 'Medium', 'Low']] = 'High'
    description: str
    channel: Optional[Literal['Voice AI (Bhashini)', 'Secretariat Desk', 'Mobile App']] = 'Mobile App'

class GrievanceAction(BaseModel):
    grievanceId: str
    action: Literal['Assign', 'Resolve', 'Escalate', 'Give Feedback']
    assignedOfficer: Optional[str] = None
    remarks: str

class NotificationItem(BaseModel):
    id: str
    title: str
    message: str
    type: Literal['verification', 'scheme', 'mentor', 'milestone', 'payment', 'grievance', 'followup', 'fraud']
    channel: Literal['In-App', 'SMS Simulation', 'Voice/IVR Simulation', 'Email Simulation']
    timestamp: str
    read: bool = False

# -------------------------------------------------------------
# TAMPER-EVIDENT AUDIT LOG
# -------------------------------------------------------------
class AuditLogEntry(BaseModel):
    id: str
    timestamp: str
    actor: str
    role: str
    action: str
    entity: str
    previousHash: str
    currentHash: str
    details: str
    ipAddress: Optional[str] = '127.0.0.1'

# -------------------------------------------------------------
# GIS MODELS
# -------------------------------------------------------------
class GISLocationMarker(BaseModel):
    id: str
    type: Literal['family', 'mentor', 'project', 'school', 'health_facility', 'vendor']
    name: str
    district: str
    mandal: str
    village: str
    lat: float
    lng: float
    status: str
    details: Dict[str, Any]

# -------------------------------------------------------------
# VOICE ASSISTANT MODELS
# -------------------------------------------------------------
class VoiceQueryRequest(BaseModel):
    speechText: str
    language: Optional[Literal['en', 'te', 'hi']] = None
    familyId: Optional[str] = None

class VoiceQueryResponse(BaseModel):
    detectedLanguage: str
    intent: str
    priority: str
    recognizedText: str
    recommendedNextAction: str
    categorizedNeed: Optional[str] = None
    ttsAudioSimulation: str
