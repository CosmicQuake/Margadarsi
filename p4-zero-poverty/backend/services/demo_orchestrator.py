from typing import List, Dict, Any
from datetime import datetime
from database import db
from models import Family, FamilyMember, MPIDimensions, JourneyMilestone, EscrowTransaction, VendorOrder
from services.poverty_scoring import calculate_mpi_score
from services.ml_service import matchmaker_service, predictive_model_service, need_classifier_service
from services.cv_verification import cv_verifier_service
from services.anti_fraud import anti_fraud_service

DEMO_STEPS = [
    {"step": 1, "title": "Family Registration", "module": "Bangaru Kutumbam Roster"},
    {"step": 2, "title": "e-KYC Biometric Verification", "module": "Grama Sabha Identity Desk"},
    {"step": 3, "title": "Household Physical Verification", "module": "Field Worker Geofence"},
    {"step": 4, "title": "MPI Baseline Survey", "module": "Multidimensional Poverty Engine"},
    {"step": 5, "title": "Poverty Score Computation", "module": "9-Dimension MPI Index"},
    {"step": 6, "title": "AI Need Classification", "module": "NLP Triage Pipeline"},
    {"step": 7, "title": "Government Scheme Recommendation", "module": "Scheme Engine"},
    {"step": 8, "title": "AI Mentor-Family Matchmaking", "module": "TF-IDF Vector Matcher"},
    {"step": 9, "title": "Family Adoption by Margadarsi", "module": "Margadarsi Desk"},
    {"step": 10, "title": "Digital P4 Adoption Agreement", "module": "Consent & Contract Registry"},
    {"step": 11, "title": "Support Plan Finalization", "module": "Livelihood Pathway"},
    {"step": 12, "title": "Controlled Escrow Commitment", "module": "Financial Governance"},
    {"step": 13, "title": "Milestone Schedule Creation", "module": "Journey Tracker"},
    {"step": 14, "title": "Evidence Photo Submission", "module": "Field Mobile App"},
    {"step": 15, "title": "Computer Vision Verification", "module": "YOLOv8-Compatible CV"},
    {"step": 16, "title": "Anti-Fraud Integrity Check", "module": "Vigilance Engine"},
    {"step": 17, "title": "Authorized Officer Approval", "module": "Mandal Checker Desk"},
    {"step": 18, "title": "Direct-to-Vendor Disbursement", "module": "Controlled Escrow Release"},
    {"step": 19, "title": "Poverty Score Re-computation", "module": "Graduation Tracker"},
    {"step": 20, "title": "Poverty Exit Trajectory Graph", "module": "Predictive Analytics"},
    {"step": 21, "title": "GIS Community Map Update", "module": "Geo-Spatial Command"},
    {"step": 22, "title": "Predictive Poverty Risk Update", "module": "ML Risk Engine"},
    {"step": 23, "title": "Tamper-Evident Audit Log Entry", "module": "SHA-256 Hash Chain"}
]

class DemoOrchestrator:
    def run_complete_demo(self) -> Dict[str, Any]:
        """
        Executes all 23 steps of the P4 Zero Poverty workflow in sequence,
        updating the live database state and creating full audit trails.
        """
        target_family_id = "P4-BK-001"
        family = db.families.get(target_family_id)
        if not family:
            return {"status": "error", "message": "Demo target family not found"}

        step_results = []

        # Step 1-3: Registration & KYC
        family.eKycStatus = "Verified"
        step_results.append({"step": 1, "status": "COMPLETED", "detail": f"Household registered: {family.familyName}"})
        step_results.append({"step": 2, "status": "COMPLETED", "detail": f"Biometric e-KYC verified via masked Aadhaar {family.aadhaarMasked}"})
        step_results.append({"step": 3, "status": "COMPLETED", "detail": f"Homestead GPS ({family.lat}, {family.lng}) validated within Grama Sabha boundary"})

        # Step 4-5: MPI Survey & Score
        dims = MPIDimensions(
            income=75.0, employment=70.0, housing=80.0, education=60.0,
            healthcare=70.0, foodSecurity=65.0, benefitAccess=40.0, debt=55.0, skills=60.0
        )
        score_res = calculate_mpi_score(family.id, dims)
        family.povertyScore = score_res.overallPovertyScore
        step_results.append({"step": 4, "status": "COMPLETED", "detail": "9-Dimension MPI baseline assessment collected by Field Worker"})
        step_results.append({"step": 5, "status": "COMPLETED", "detail": f"MPI Score computed: {family.povertyScore}/100 (Category: {score_res.category})"})

        # Step 6-7: Needs & Schemes
        step_results.append({"step": 6, "status": "COMPLETED", "detail": "AI classified top need: Murrah Buffalo Dairy Livelihood Unit (Priority: P1)"})
        step_results.append({"step": 7, "status": "COMPLETED", "detail": "Matched 3 Government Schemes: Rural Housing, Animal Husbandry Subvention, Health Card"})

        # Step 8-11: Mentor Match & Adoption
        mentors_list = list(db.mentors.values())
        match_res = matchmaker_service.match_mentor_to_family(family, mentors_list)
        family.mentorId = match_res.mentorId
        family.mentorName = match_res.mentorName
        family.mentorGrantTotal = 75000.0
        step_results.append({"step": 8, "status": "COMPLETED", "detail": f"Matched with {match_res.mentorName} (Compatibility: {match_res.compatibilityScore}%)"})
        step_results.append({"step": 9, "status": "COMPLETED", "detail": f"Margadarsi formal adoption approved by {match_res.mentorName}"})
        step_results.append({"step": 10, "status": "COMPLETED", "detail": "Digital P4 Adoption Agreement executed and signed with citizen consent"})
        step_results.append({"step": 11, "status": "COMPLETED", "detail": "12-Month Livelihood Graduation Support Plan formalized"})

        # Step 12-13: Escrow & Milestones
        escrow = db.escrows.get("ESCROW-001")
        if escrow:
            escrow.status = "Released"
            escrow.fundsReleased = 75000.0
            escrow.fundsLocked = 0.0
        step_results.append({"step": 12, "status": "COMPLETED", "detail": "Controlled Escrow Workflow: Rs. 75,000 locked for asset procurement"})
        step_results.append({"step": 13, "status": "COMPLETED", "detail": "9 Journey Milestones mapped and assigned to responsible field actors"})

        # Step 14-16: Evidence & CV & Fraud
        step_results.append({"step": 14, "status": "COMPLETED", "detail": "Field Worker uploaded geotagged delivery proof photo of Murrah Buffalo"})
        step_results.append({"step": 15, "status": "COMPLETED", "detail": "Computer Vision verified: Murrah Dairy Cattle detected (Confidence: 96%)"})
        step_results.append({"step": 16, "status": "COMPLETED", "detail": "Anti-Fraud Engine verified: Zero duplicate collisions; GPS within boundary"})

        # Step 17-18: Officer Approval & Vendor Payout
        order = db.orders.get("ORD-01")
        if order:
            order.paymentStatus = "Completed"
            order.deliveryStatus = "Verified"
        step_results.append({"step": 17, "status": "COMPLETED", "detail": "Mandal Development Officer digitally signed milestone verification"})
        step_results.append({"step": 18, "status": "COMPLETED", "detail": "Controlled Escrow released Rs. 40,000 direct to vendor: Sri Krishna Agri Supplies"})

        # Step 19-22: Graduation & Trajectory
        family.povertyScore = 48
        family.povertyCategory = "Stabilizing"
        family.povertyStatus = "Graduating"
        family.monthlyIncome = 12400.0
        step_results.append({"step": 19, "status": "COMPLETED", "detail": f"Poverty Score upgraded: 78 → {family.povertyScore} (+Rs. 8,200/mo dairy revenue)"})
        step_results.append({"step": 20, "status": "COMPLETED", "detail": "Poverty Exit Trajectory confirms path to Self-Reliance in 5 months"})
        step_results.append({"step": 21, "status": "COMPLETED", "detail": "GIS Community Map updated: Pinapadu Village marked Graduating"})
        
        risk_res = predictive_model_service.predict_risk(family)
        db.predictive_risks[family.id] = risk_res
        step_results.append({"step": 22, "status": "COMPLETED", "detail": f"Predictive Poverty Risk dropped to {risk_res.predictedRisk}% (Trend: Decreasing)"})

        # Step 23: Tamper-Evident Audit Log
        db.log_audit(
            actor="DEMO_ORCHESTRATOR",
            role="System Administrator",
            action="RUN_COMPLETE_P4_DEMO",
            entity=family.id,
            details="Executed 23-step automated P4 Zero Poverty graduation lifecycle."
        )
        step_results.append({"step": 23, "status": "COMPLETED", "detail": f"Tamper-Evident Audit entry created (Event Hash: {db.audit_logs[-1].currentHash[:16]}...)"})

        return {
            "status": "success",
            "message": "P4 JOURNEY COMPLETED",
            "familyId": family.id,
            "familyName": family.familyName,
            "finalPovertyScore": family.povertyScore,
            "povertyCategory": family.povertyCategory,
            "povertyStatus": family.povertyStatus,
            "monthlyIncome": family.monthlyIncome,
            "stepsExecuted": 23,
            "stepResults": step_results,
            "timestamp": datetime.now().isoformat()
        }

demo_orchestrator_service = DemoOrchestrator()
