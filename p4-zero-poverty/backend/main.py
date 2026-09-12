from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any, Optional
from datetime import datetime

from models import (
    Family, HouseholdSurveyCreate, MPIDimensions, PovertyScoreResult, NeedItem, NeedCreate,
    SchemeItem, SchemeApplicationAction, Mentor, MatchResult, AdoptionAgreement,
    JourneyMilestone, EscrowTransaction, EscrowReleaseAction,
    EvidenceVerificationRequest, EvidenceVerificationResult,
    FraudAlert, FraudActionRequest, Vendor, VendorOrder,
    GrievanceItem, GrievanceCreate, GrievanceAction,
    NotificationItem, AuditLogEntry, PredictivePovertyRisk,
    GISLocationMarker, VoiceQueryRequest, VoiceQueryResponse
)
from database import db
from services.poverty_scoring import calculate_mpi_score
from services.ml_service import matchmaker_service, predictive_model_service, need_classifier_service
from services.cv_verification import cv_verifier_service
from services.anti_fraud import anti_fraud_service
from services.voice_service import voice_pipeline_service
from services.demo_orchestrator import demo_orchestrator_service

app = FastAPI(
    title="P4 – ZERO POVERTY API",
    description="Backend service for P4: People • Progress • Partnership • Poverty Exit",
    version="2.0.0"
)

# Enable CORS for frontend Vite development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "P4 – ZERO POVERTY Backend",
        "timestamp": datetime.now().isoformat(),
        "familiesCount": len(db.families),
        "mentorsCount": len(db.mentors),
        "auditLogsCount": len(db.audit_logs)
    }

# -------------------------------------------------------------
# FAMILIES & HOUSEHOLDS
# -------------------------------------------------------------
@app.get("/api/families", response_model=List[Family])
def get_all_families(district: Optional[str] = None, status: Optional[str] = None):
    with db.lock:
        fams = list(db.families.values())
        if district:
            fams = [f for f in fams if f.district.lower() == district.lower()]
        if status:
            fams = [f for f in fams if f.povertyCategory.lower() == status.lower()]
        return fams

@app.get("/api/families/{family_id}", response_model=Family)
def get_family_by_id(family_id: str):
    with db.lock:
        if family_id not in db.families:
            raise HTTPException(status_code=404, detail="Family not found")
        return db.families[family_id]

@app.post("/api/surveys", response_model=Family)
def submit_new_survey(survey: HouseholdSurveyCreate):
    with db.lock:
        new_id = f"P4-BK-{len(db.families) + 1:03d}"
        score_res = calculate_mpi_score(new_id, survey.dimensions)
        
        new_family = Family(
            id=new_id,
            familyName=survey.familyName,
            headOfHousehold=survey.headOfHousehold,
            aadhaarMasked=f"XXXX-XXXX-{1000 + len(db.families) * 17}",
            rationCardNo=f"RC-P4-0714088{len(db.families) + 1:02d}",
            district=survey.district,
            mandal=survey.mandal,
            village=survey.village,
            wardSecretariat="Ward Secretariat Unit #01",
            phone=survey.phone,
            povertyScore=score_res.overallPovertyScore,
            povertyCategory=score_res.category,
            povertyStatus="Extreme Vulnerability" if score_res.overallPovertyScore >= 70 else "Vulnerable",
            monthlyIncome=survey.monthlyIncome,
            targetIncome=survey.targetIncome,
            housingType=survey.housingType,
            landHoldings=survey.landHoldings,
            assets=["BPL Card"],
            members=survey.members,
            mentorId=None,
            mentorName=None,
            assignedVolunteerId="VOL-01",
            assignedVolunteerName="Community Field Worker",
            volunteerPhone="+91 94901 00000",
            lat=survey.lat or 16.3000,
            lng=survey.lng or 80.4500,
            surveyCompletedDate=datetime.now().strftime("%Y-%m-%d"),
            eKycStatus="Verified"
        )

        # Anti-fraud verification
        fraud_alert = anti_fraud_service.audit_family_registration(new_family, list(db.families.values()))
        if fraud_alert:
            db.fraud_alerts[fraud_alert.id] = fraud_alert
            new_family.hasAnomalyFlag = True

        db.families[new_id] = new_family
        db.log_audit(
            actor="Field Worker VOL-01",
            role="Community Field Worker",
            action="CREATE_HOUSEHOLD_SURVEY",
            entity=new_id,
            details=f"New baseline survey registered for {new_family.familyName} (MPI Score: {new_family.povertyScore})"
        )
        return new_family

# -------------------------------------------------------------
# MPI POVERTY SCORING
# -------------------------------------------------------------
@app.get("/api/poverty-score/{family_id}", response_model=PovertyScoreResult)
def get_poverty_score(family_id: str):
    with db.lock:
        fam = db.families.get(family_id)
        if not fam:
            raise HTTPException(status_code=404, detail="Family not found")
        
        # Calculate simulated dimension values based on family record
        dims = MPIDimensions(
            income=float(max(10, min(100, fam.povertyScore + 4))),
            employment=float(max(10, min(100, fam.povertyScore - 2))),
            housing=75.0 if "Katcha" in fam.housingType else 35.0,
            education=55.0,
            healthcare=68.0 if any(m.healthCondition for m in fam.members) else 40.0,
            foodSecurity=60.0 if fam.monthlyIncome < 6000 else 30.0,
            benefitAccess=35.0,
            debt=70.0 if fam.povertyScore > 70 else 30.0,
            skills=55.0
        )
        return calculate_mpi_score(family_id, dims)

# -------------------------------------------------------------
# AI NEED CLASSIFICATION
# -------------------------------------------------------------
@app.get("/api/needs", response_model=List[NeedItem])
def get_all_needs(family_id: Optional[str] = None):
    with db.lock:
        needs = list(db.needs.values())
        if family_id:
            needs = [n for n in needs if n.familyId == family_id]
        return needs

@app.post("/api/needs", response_model=NeedItem)
def create_need(need_data: NeedCreate):
    with db.lock:
        cat, sev, prio, rec = need_classifier_service.classify_text(
            need_data.rawText or f"{need_data.title} {need_data.description}"
        )
        new_need = NeedItem(
            id=f"NEED-{len(db.needs) + 1:03d}",
            familyId=need_data.familyId,
            category=need_data.category or cat,
            title=need_data.title,
            description=need_data.description,
            severity=sev,
            priority=prio,
            status="Pending Review",
            requestedAt=datetime.now().strftime("%Y-%m-%d"),
            recommendedIntervention=rec
        )
        db.needs[new_need.id] = new_need
        db.log_audit(
            actor="Citizen / Field Worker",
            role="Bangaru Kutumbam",
            action="SUBMIT_NEED",
            entity=new_need.id,
            details=f"Need registered: '{new_need.title}' (Category: {new_need.category}, Priority: {new_need.priority})"
        )
        return new_need

# -------------------------------------------------------------
# GOVERNMENT SCHEMES
# -------------------------------------------------------------
@app.get("/api/schemes", response_model=List[SchemeItem])
def get_all_schemes():
    with db.lock:
        return list(db.schemes.values())

@app.post("/api/schemes/action")
def perform_scheme_action(action_req: SchemeApplicationAction):
    with db.lock:
        scheme = db.schemes.get(action_req.schemeId)
        if not scheme:
            raise HTTPException(status_code=404, detail="Scheme not found")
        
        if action_req.action == 'apply':
            scheme.status = "Applied"
            scheme.appliedAt = datetime.now().strftime("%Y-%m-%d")
        elif action_req.action == 'upload_docs':
            scheme.status = "Under Review"
        elif action_req.action == 'sanction':
            scheme.status = "Sanctioned"
            scheme.sanctionAmount = action_req.amount or 50000.0
        elif action_req.action == 'reject':
            scheme.status = "Eligible"
            scheme.ineligibilityReason = action_req.reason

        db.log_audit(
            actor="Citizen / Mandal Officer",
            role="Mandal Officer",
            action=f"SCHEME_{action_req.action.upper()}",
            entity=scheme.id,
            details=f"Scheme action '{action_req.action}' executed for family {action_req.familyId}"
        )
        return {"status": "success", "scheme": scheme}

# -------------------------------------------------------------
# MENTORS & AI MATCHMAKING
# -------------------------------------------------------------
@app.get("/api/mentors", response_model=List[Mentor])
def get_all_mentors():
    with db.lock:
        return list(db.mentors.values())

@app.get("/api/matches/{family_id}", response_model=MatchResult)
def get_mentor_match(family_id: str):
    with db.lock:
        fam = db.families.get(family_id)
        if not fam:
            raise HTTPException(status_code=404, detail="Family not found")
        mentors = list(db.mentors.values())
        return matchmaker_service.match_mentor_to_family(fam, mentors)

@app.post("/api/adoptions", response_model=AdoptionAgreement)
def adopt_family(agreement: AdoptionAgreement):
    with db.lock:
        fam = db.families.get(agreement.familyId)
        mentor = db.mentors.get(agreement.mentorId)
        if not fam or not mentor:
            raise HTTPException(status_code=404, detail="Family or Mentor not found")
        
        fam.mentorId = mentor.id
        fam.mentorName = mentor.name
        fam.mentorGrantTotal = agreement.pledgedAmount
        if fam.id not in mentor.adoptedFamilyIds:
            mentor.adoptedFamilyIds.append(fam.id)
            mentor.totalPledged += agreement.pledgedAmount

        db.log_audit(
            actor=mentor.name,
            role="Margadarsi",
            action="EXECUTE_ADOPTION_AGREEMENT",
            entity=agreement.id,
            details=f"Mentor {mentor.name} formally adopted {fam.familyName} with Rs. {agreement.pledgedAmount:,.0f} commitment"
        )
        return agreement

# -------------------------------------------------------------
# MILESTONES & CONTROLLED ESCROW
# -------------------------------------------------------------
@app.get("/api/milestones/{family_id}", response_model=List[JourneyMilestone])
def get_milestones(family_id: str):
    with db.lock:
        return db.milestones.get(family_id, [])

@app.get("/api/escrow", response_model=List[EscrowTransaction])
def get_all_escrow_transactions():
    with db.lock:
        return list(db.escrows.values())

@app.post("/api/escrow/release")
def release_escrow_funds(action: EscrowReleaseAction):
    with db.lock:
        escrow = db.escrows.get(action.escrowId)
        if not escrow:
            raise HTTPException(status_code=404, detail="Escrow transaction not found")
        
        escrow.fundsReleased += action.amount
        escrow.fundsLocked = max(0.0, escrow.fundsLocked - action.amount)
        escrow.status = "Released"
        escrow.lastDisbursedAt = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        db.log_audit(
            actor="Finance & Escrow Desk",
            role="Mandal Officer",
            action="CONTROLLED_ESCROW_RELEASE",
            entity=escrow.id,
            details=f"Authorized release of Rs. {action.amount:,.0f} to Vendor {action.vendorId}. Remarks: {action.officerRemarks}"
        )
        return {"status": "success", "escrow": escrow}

# -------------------------------------------------------------
# COMPUTER VISION VERIFICATION
# -------------------------------------------------------------
@app.post("/api/evidence/verify", response_model=EvidenceVerificationResult)
def verify_asset_evidence(req: EvidenceVerificationRequest):
    with db.lock:
        result = cv_verifier_service.verify_evidence(req)
        db.log_audit(
            actor="YOLOv8_CV_ENGINE",
            role="System Administrator",
            action="COMPUTER_VISION_VERIFICATION",
            entity=req.familyId,
            details=f"CV evidence scan result: {result.overallStatus} ({result.confidenceScore}% confidence for {result.detectedObject})"
        )
        return result

# -------------------------------------------------------------
# FRAUD & VIGILANCE
# -------------------------------------------------------------
@app.get("/api/fraud", response_model=List[FraudAlert])
def get_fraud_alerts():
    with db.lock:
        return list(db.fraud_alerts.values())

@app.post("/api/fraud/action")
def perform_fraud_action(action_req: FraudActionRequest):
    with db.lock:
        alert = db.fraud_alerts.get(action_req.alertId)
        if not alert:
            raise HTTPException(status_code=404, detail="Alert not found")
        
        if action_req.action == 'Resolve Alert':
            alert.status = "Cleared"
        elif action_req.action == 'Freeze Workflow':
            alert.status = "Frozen"
        elif action_req.action == 'Flag':
            alert.status = "Fraud Confirmed"

        db.log_audit(
            actor="Vigilance Officer",
            role="Vigilance Officer",
            action=f"VIGILANCE_{action_req.action.upper().replace(' ', '_')}",
            entity=alert.id,
            details=f"Vigilance action '{action_req.action}' taken. Notes: {action_req.officerNotes}"
        )
        return {"status": "success", "alert": alert}

# -------------------------------------------------------------
# VENDORS
# -------------------------------------------------------------
@app.get("/api/vendors", response_model=List[Vendor])
def get_all_vendors():
    with db.lock:
        return list(db.vendors.values())

@app.get("/api/vendors/orders", response_model=List[VendorOrder])
def get_vendor_orders(vendor_id: Optional[str] = None):
    with db.lock:
        orders = list(db.orders.values())
        if vendor_id:
            orders = [o for o in orders if o.vendorId == vendor_id]
        return orders

# -------------------------------------------------------------
# GRIEVANCES
# -------------------------------------------------------------
@app.get("/api/grievances", response_model=List[GrievanceItem])
def get_all_grievances():
    with db.lock:
        return list(db.grievances.values())

@app.post("/api/grievances", response_model=GrievanceItem)
def create_grievance(g_data: GrievanceCreate):
    with db.lock:
        fam = db.families.get(g_data.familyId)
        fam_name = fam.familyName if fam else "Citizen Beneficiary"
        new_g = GrievanceItem(
            id=f"GRV-{len(db.grievances) + 101:03d}",
            familyId=g_data.familyId,
            familyName=fam_name,
            category=g_data.category,
            priority=g_data.priority or "High",
            description=g_data.description,
            channel=g_data.channel or "Mobile App",
            status="Open",
            filedAt=datetime.now().strftime("%Y-%m-%d %H:%M"),
            slaDeadline=datetime.now().strftime("%Y-%m-%d 18:00"),
            assignedOfficer="Mandal Development Officer"
        )
        db.grievances[new_g.id] = new_g
        db.log_audit(
            actor=fam_name,
            role="Bangaru Kutumbam",
            action="FILE_GRIEVANCE",
            entity=new_g.id,
            details=f"Grievance filed under category '{new_g.category}' (Priority: {new_g.priority})"
        )
        return new_g

@app.post("/api/grievances/action")
def perform_grievance_action(action_req: GrievanceAction):
    with db.lock:
        g = db.grievances.get(action_req.grievanceId)
        if not g:
            raise HTTPException(status_code=404, detail="Grievance not found")
        
        if action_req.action == 'Resolve':
            g.status = "Resolved"
            g.officerRemarks = action_req.remarks
        elif action_req.action == 'Escalate':
            g.status = "Escalated"
            g.officerRemarks = f"Escalated to District Collector: {action_req.remarks}"
        elif action_req.action == 'Assign':
            g.status = "Investigating"
            if action_req.assignedOfficer:
                g.assignedOfficer = action_req.assignedOfficer

        db.log_audit(
            actor="Grievance Redressal Officer",
            role="Mandal Officer",
            action=f"GRIEVANCE_{action_req.action.upper()}",
            entity=g.id,
            details=f"Grievance status updated to '{g.status}'. Remarks: {action_req.remarks}"
        )
        return {"status": "success", "grievance": g}

# -------------------------------------------------------------
# GIS COMMUNITY MAPPING
# -------------------------------------------------------------
@app.get("/api/gis/markers", response_model=List[GISLocationMarker])
def get_gis_markers():
    with db.lock:
        return db.gis_markers

# -------------------------------------------------------------
# ANALYTICS & PREDICTIVE RISK
# -------------------------------------------------------------
@app.get("/api/analytics/predictive-risks", response_model=List[PredictivePovertyRisk])
def get_predictive_risks():
    with db.lock:
        return list(db.predictive_risks.values())

@app.post("/api/analytics/predict/{family_id}", response_model=PredictivePovertyRisk)
def predict_family_risk(family_id: str):
    with db.lock:
        fam = db.families.get(family_id)
        if not fam:
            raise HTTPException(status_code=404, detail="Family not found")
        res = predictive_model_service.predict_risk(fam)
        db.predictive_risks[family_id] = res
        return res

# -------------------------------------------------------------
# TAMPER-EVIDENT AUDIT LOG
# -------------------------------------------------------------
@app.get("/api/audit", response_model=List[AuditLogEntry])
def get_audit_logs():
    with db.lock:
        return list(reversed(db.audit_logs))

# -------------------------------------------------------------
# NOTIFICATIONS
# -------------------------------------------------------------
@app.get("/api/notifications", response_model=List[NotificationItem])
def get_notifications():
    with db.lock:
        return db.notifications

# -------------------------------------------------------------
# MULTILINGUAL VOICE AGENT PIPELINE
# -------------------------------------------------------------
@app.post("/api/voice", response_model=VoiceQueryResponse)
def process_voice_query(req: VoiceQueryRequest):
    return voice_pipeline_service.process_voice_query(req)

# -------------------------------------------------------------
# MASTER 23-STEP END-TO-END DEMO
# -------------------------------------------------------------
@app.post("/api/demo/run-complete")
def run_complete_demo():
    with db.lock:
        return demo_orchestrator_service.run_complete_demo()
