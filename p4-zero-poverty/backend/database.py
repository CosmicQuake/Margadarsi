import threading
from typing import List, Dict, Optional, Any
from datetime import datetime
import hashlib
from models import (
    Family, FamilyMember, Mentor, SchemeItem, NeedItem,
    EscrowTransaction, JourneyMilestone, Vendor, VendorOrder,
    FraudAlert, GrievanceItem, NotificationItem, AuditLogEntry,
    PredictivePovertyRisk, InactivityAlert, GISLocationMarker
)

class InMemoryDatabase:
    def __init__(self):
        self.lock = threading.Lock()
        self.families: Dict[str, Family] = {}
        self.mentors: Dict[str, Mentor] = {}
        self.schemes: Dict[str, SchemeItem] = {}
        self.needs: Dict[str, NeedItem] = {}
        self.escrows: Dict[str, EscrowTransaction] = {}
        self.milestones: Dict[str, List[JourneyMilestone]] = {}
        self.vendors: Dict[str, Vendor] = {}
        self.orders: Dict[str, VendorOrder] = {}
        self.fraud_alerts: Dict[str, FraudAlert] = {}
        self.grievances: Dict[str, GrievanceItem] = {}
        self.notifications: List[NotificationItem] = []
        self.audit_logs: List[AuditLogEntry] = []
        self.predictive_risks: Dict[str, PredictivePovertyRisk] = {}
        self.inactivity_alerts: Dict[str, InactivityAlert] = {}
        self.gis_markers: List[GISLocationMarker] = []
        self._seed_initial_data()

    def _hash_event(self, prev_hash: str, text: str) -> str:
        h = hashlib.sha256()
        h.update(f"{prev_hash}|{text}|{datetime.now().isoformat()}".encode('utf-8'))
        return h.hexdigest()

    def log_audit(self, actor: str, role: str, action: str, entity: str, details: str):
        prev_hash = self.audit_logs[-1].currentHash if self.audit_logs else "0" * 64
        curr_hash = self._hash_event(prev_hash, f"{actor}:{action}:{entity}")
        entry = AuditLogEntry(
            id=f"AUDIT-{len(self.audit_logs) + 1:04d}",
            timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            actor=actor,
            role=role,
            action=action,
            entity=entity,
            previousHash=prev_hash,
            currentHash=curr_hash,
            details=details,
            ipAddress="192.168.1.104"
        )
        self.audit_logs.append(entry)

    def _seed_initial_data(self):
        # 1. Government Schemes
        schemes_list = [
            SchemeItem(
                id="SCHEME-01",
                name="Pradhan Mantri Awas Housing Mission",
                dept="Department of Rural Housing",
                benefit="Financial assistance up to Rs. 2,50,000 for pucca house construction with sanitary toilet",
                eligibility="BPL households living in katcha or dilapidated thatch houses",
                requiredDocs=["Ration Card", "Aadhaar Card", "Land Possession Certificate", "Bank Account Passbook"],
                status="Eligible",
                nextAction="Submit land possession document to Ward Secretariat"
            ),
            SchemeItem(
                id="SCHEME-02",
                name="National Rural Livelihood Skill Mission",
                dept="Ministry of Rural Development",
                benefit="Free certified vocational training with Rs. 3,500 monthly stipend and job placement assistance",
                eligibility="Unemployed youth aged 18-35 from registered BPL families",
                requiredDocs=["Aadhaar Card", "School Transfer Certificate", "Income Certificate"],
                status="Applied",
                appliedAt="2026-02-14",
                nextAction="Attend biometric verification at Mandal Skill Hub"
            ),
            SchemeItem(
                id="SCHEME-03",
                name="Ayushman Universal Health Protection Guarantee",
                dept="National Health Authority",
                benefit="Cashless secondary and tertiary hospitalization cover up to Rs. 10,00,000 per family per year",
                eligibility="Identified vulnerable households based on SECC socioeconomic deprivation indicators",
                requiredDocs=["National Health Card", "Aadhaar Card"],
                status="Sanctioned",
                appliedAt="2026-01-10",
                sanctionAmount=1000000,
                nextAction="Digital e-Card issued; active for network hospitals"
            ),
            SchemeItem(
                id="SCHEME-04",
                name="Micro-Enterprise Animal Husbandry Subvention",
                dept="Department of Animal Husbandry",
                benefit="75% capital subsidy on milch cow/goat rearing unit with veterinary support",
                eligibility="Small and marginal landless women SHG members",
                requiredDocs=["SHG Membership Card", "Aadhaar Card", "Bank Account"],
                status="Eligible",
                nextAction="Apply through Community Field Worker roster"
            ),
            SchemeItem(
                id="SCHEME-05",
                name="National Solar Rooftop & Lighting Scheme",
                dept="Ministry of New & Renewable Energy",
                benefit="100% subsidized 1kW solar rooftop lighting system for off-grid rural households",
                eligibility="Rural households lacking regular electricity supply",
                requiredDocs=["Electricity Meter Bill or No-Connection Certificate", "Aadhaar Card"],
                status="Under Review",
                appliedAt="2026-02-28",
                nextAction="Site survey pending by District Energy Officer"
            ),
            SchemeItem(
                id="SCHEME-06",
                name="PM Swanidhi Street Vendor Support",
                dept="Ministry of Housing & Urban Affairs",
                benefit="Collateral-free working capital loan of Rs. 10,000 with 7% interest subsidy",
                eligibility="Identified urban/semi-urban micro-vendors and craftspersons",
                requiredDocs=["Vendor ID Card", "Aadhaar Card", "UPI QR Proof"],
                status="Approved",
                appliedAt="2026-01-20",
                sanctionAmount=10000,
                nextAction="Disbursement pending digital KYC confirmation"
            )
        ]
        for s in schemes_list:
            self.schemes[s.id] = s

        # 2. Mentors (Margadarsi CSR / Individual Donors)
        mentors_list = [
            Mentor(
                id="M-101",
                name="Dr. K. Srinivas Rao",
                title="Director of CSR & Community Development",
                organization="Tata Social Welfare Initiatives",
                email="srinivas.rao@tatasocial.org",
                phone="+91 94401 55678",
                location="Navodaya Division",
                adoptedFamilyIds=["P4-BK-001"],
                totalPledged=250000.0,
                totalDisbursed=120000.0,
                focusAreas=["Dairy Farming", "Women Micro-Enterprises", "Healthcare Support"],
                skills=["Agri-Business", "Micro-finance", "Veterinary Guidance", "Market Linkages"],
                avatarUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
            ),
            Mentor(
                id="M-102",
                name="Smt. Anita Deshmukh",
                title="Managing Trustee",
                organization="Deshmukh Educational Foundation",
                email="anita@deshmukhfoundation.in",
                phone="+91 98220 44321",
                location="Kalyan Puram",
                adoptedFamilyIds=["P4-BK-003"],
                totalPledged=180000.0,
                totalDisbursed=60000.0,
                focusAreas=["Vocational Tailoring", "Children Higher Education", "Sanitation"],
                skills=["Skill Development", "Apparel Manufacturing", "Higher Education Scholarships"],
                avatarUrl="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
            ),
            Mentor(
                id="M-103",
                name="Sri Rajesh Verma",
                title="VP of Digital Inclusion",
                organization="Infosys Tech For Good Foundation",
                email="rajesh.verma@infosysfoundation.org",
                phone="+91 99800 12345",
                location="Green Valley",
                adoptedFamilyIds=["P4-BK-002"],
                totalPledged=320000.0,
                totalDisbursed=150000.0,
                focusAreas=["Digital Literacy", "Youth Employment", "Computer Centers"],
                skills=["IT Training", "Job Placements", "Entrepreneurship Mentorship"],
                avatarUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
            ),
            Mentor(
                id="M-104",
                name="Dr. Meenakshi Sundaram",
                title="Founder & Social Entrepreneur",
                organization="Arogya Rural Medical Trust",
                email="meenakshi@arogyatrust.org",
                phone="+91 94440 98765",
                location="Coastal Haven",
                adoptedFamilyIds=[],
                totalPledged=400000.0,
                totalDisbursed=0.0,
                focusAreas=["Chronic Disease Management", "Nutrition for Children", "Elderly Care"],
                skills=["Medical Diagnostics", "Nutrition Planning", "Health Camp Management"],
                avatarUrl="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150"
            ),
            Mentor(
                id="M-105",
                name="Sri Vikramaditya Bajaj",
                title="Chairman",
                organization="Bajaj Rural Mobility & Crafts Foundation",
                email="vikram@bajajcrafts.org",
                phone="+91 98190 65432",
                location="Central Plateau",
                adoptedFamilyIds=[],
                totalPledged=500000.0,
                totalDisbursed=0.0,
                focusAreas=["Artisans & Handicrafts", "E-Commerce Onboarding", "Toolkits Support"],
                skills=["Artisan Marketing", "Credit Facilitation", "Supply Chain Optimization"],
                avatarUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
            )
        ]
        for m in mentors_list:
            self.mentors[m.id] = m

        # 3. Livelihood Vendors
        vendors_list = [
            Vendor(
                id="VEND-01",
                name="Sri Krishna Agri-Equipment & Dairy Supplies",
                category="Dairy & Livestock Machinery",
                contactPerson="M. Krishna Murthy",
                phone="+91 98480 99887",
                location="Navodaya Division",
                settledAmount=185000.0,
                pendingSettlement=45000.0
            ),
            Vendor(
                id="VEND-02",
                name="Saraswati Sewing & Garment Machinery Mart",
                category="Apparel & Tailoring Units",
                contactPerson="P. Ramanathan",
                phone="+91 94400 11223",
                location="Kalyan Puram",
                settledAmount=95000.0,
                pendingSettlement=32000.0
            ),
            Vendor(
                id="VEND-03",
                name="Bharat Solar Rooftop & Clean Energy Ltd",
                category="Solar Panels & Clean Cookstoves",
                contactPerson="V. Narayana Swamy",
                phone="+91 98850 44556",
                location="Green Valley",
                settledAmount=240000.0,
                pendingSettlement=60000.0
            ),
            Vendor(
                id="VEND-04",
                name="Navodaya Mobile Food Cart & Kiosk Fabricators",
                category="Food Carts & Retailing Units",
                contactPerson="Syed Farooq",
                phone="+91 97000 88990",
                location="Coastal Haven",
                settledAmount=120000.0,
                pendingSettlement=25000.0
            )
        ]
        for v in vendors_list:
            self.vendors[v.id] = v

        # 4. 25+ Realistic Synthetic Families (Districts: Navodaya, Shanti Nagar, Kalyan Puram, Sundar Nagar, Green Valley, Coastal Haven)
        families_raw = [
            {
                "id": "P4-BK-001",
                "familyName": "Smt. K. Lakshmi Devi & Family",
                "headOfHousehold": "K. Lakshmi Devi",
                "aadhaarMasked": "XXXX-XXXX-8921",
                "rationCardNo": "RC-P4-071408801",
                "district": "Navodaya Division",
                "mandal": "Tenali Block",
                "village": "Pinapadu Village",
                "wardSecretariat": "Ward Secretariat Unit #14",
                "phone": "+91 98480 23145",
                "povertyScore": 78,
                "povertyCategory": "High Risk",
                "povertyStatus": "Extreme Vulnerability",
                "monthlyIncome": 4200.0,
                "targetIncome": 18000.0,
                "housingType": "Katcha Thatch & Mud Floor",
                "landHoldings": "Landless Agricultural Laborer (0.00 Acres)",
                "assets": ["1 Old Bicycle", "BPL Ration Card", "National Health Card"],
                "members": [
                    FamilyMember(id="M-1", name="K. Lakshmi Devi", relation="Self (Head)", age=38, gender="Female", education="Primary (4th)", occupation="Daily Wage Farm Labor", income=2800.0),
                    FamilyMember(id="M-2", name="K. Venkateswarlu", relation="Spouse", age=44, gender="Male", education="Illiterate", occupation="Seasonal Casual Labor", income=1400.0, healthCondition="Chronic Asthma"),
                    FamilyMember(id="M-3", name="K. Divya", relation="Daughter", age=14, gender="Female", education="Class 9", occupation="Student", income=0.0),
                    FamilyMember(id="M-4", name="K. Rajesh", relation="Son", age=11, gender="Male", education="Class 6", occupation="Student", income=0.0)
                ],
                "mentorId": "M-101",
                "mentorName": "Dr. K. Srinivas Rao",
                "mentorGrantTotal": 75000.0,
                "assignedVolunteerId": "VOL-01",
                "assignedVolunteerName": "Ch. Naveen Kumar",
                "volunteerPhone": "+91 94901 88231",
                "lat": 16.2415,
                "lng": 80.6482,
                "surveyCompletedDate": "2026-01-15",
                "eKycStatus": "Verified",
                "inactivityDays": 4
            },
            {
                "id": "P4-BK-002",
                "familyName": "Sri M. Ramanaiah & Family",
                "headOfHousehold": "M. Ramanaiah",
                "aadhaarMasked": "XXXX-XXXX-4532",
                "rationCardNo": "RC-P4-071408802",
                "district": "Green Valley",
                "mandal": "Anakapalle Block",
                "village": "Munagapaka Village",
                "wardSecretariat": "Ward Secretariat Unit #08",
                "phone": "+91 97012 34567",
                "povertyScore": 64,
                "povertyCategory": "Vulnerable",
                "povertyStatus": "Vulnerable",
                "monthlyIncome": 6500.0,
                "targetIncome": 22000.0,
                "housingType": "Semi-Pucca Asbestos Roof",
                "landHoldings": "0.35 Acres Rainfed Marginal Land",
                "assets": ["Small 2-Wheeler (Damaged)", "Ration Card"],
                "members": [
                    FamilyMember(id="M-5", name="M. Ramanaiah", relation="Self (Head)", age=48, gender="Male", education="7th Pass", occupation="Tenant Jaggery Worker", income=4000.0),
                    FamilyMember(id="M-6", name="M. Parvathi", relation="Spouse", age=42, gender="Female", education="Primary (3rd)", occupation="Domestic Helper", income=2500.0),
                    FamilyMember(id="M-7", name="M. Suresh", relation="Son", age=19, gender="Male", education="Diploma Incomplete", occupation="Unemployed Youth", income=0.0)
                ],
                "mentorId": "M-103",
                "mentorName": "Sri Rajesh Verma",
                "mentorGrantTotal": 60000.0,
                "assignedVolunteerId": "VOL-02",
                "assignedVolunteerName": "P. Sirisha",
                "volunteerPhone": "+91 94902 44556",
                "lat": 17.6892,
                "lng": 82.9834,
                "surveyCompletedDate": "2026-01-20",
                "eKycStatus": "Verified",
                "inactivityDays": 8
            },
            {
                "id": "P4-BK-003",
                "familyName": "Smt. Shaik Fatima Bi & Family",
                "headOfHousehold": "Shaik Fatima Bi",
                "aadhaarMasked": "XXXX-XXXX-7123",
                "rationCardNo": "RC-P4-071408803",
                "district": "Kalyan Puram",
                "mandal": "Kadiri Block",
                "village": "Talupula Village",
                "wardSecretariat": "Ward Secretariat Unit #03",
                "phone": "+91 98855 67890",
                "povertyScore": 85,
                "povertyCategory": "Critical",
                "povertyStatus": "Extreme Vulnerability",
                "monthlyIncome": 3200.0,
                "targetIncome": 15000.0,
                "housingType": "Dilapidated Mud House",
                "landHoldings": "Landless",
                "assets": ["BPL Card", "1 Singer Manual Sewing Machine (Non-functional)"],
                "members": [
                    FamilyMember(id="M-8", name="Shaik Fatima Bi", relation="Self (Head/Widow)", age=41, gender="Female", education="Illiterate", occupation="Casual Beedi Rolling & Tailoring", income=3200.0),
                    FamilyMember(id="M-9", name="Shaik Yasmin", relation="Daughter", age=16, gender="Female", education="10th Class", occupation="Student", income=0.0),
                    FamilyMember(id="M-10", name="Shaik Arshad", relation="Son", age=13, gender="Male", education="8th Class", occupation="Student", income=0.0)
                ],
                "mentorId": "M-102",
                "mentorName": "Smt. Anita Deshmukh",
                "mentorGrantTotal": 45000.0,
                "assignedVolunteerId": "VOL-03",
                "assignedVolunteerName": "K. Harish",
                "volunteerPhone": "+91 94903 77889",
                "lat": 14.2891,
                "lng": 78.2764,
                "surveyCompletedDate": "2026-02-02",
                "eKycStatus": "Verified",
                "inactivityDays": 2
            },
            {
                "id": "P4-BK-004",
                "familyName": "Sri G. Govindaiah & Family",
                "headOfHousehold": "G. Govindaiah",
                "aadhaarMasked": "XXXX-XXXX-1994",
                "rationCardNo": "RC-P4-071408804",
                "district": "Coastal Haven",
                "mandal": "Bhimavaram Block",
                "village": "Undi Village",
                "wardSecretariat": "Ward Secretariat Unit #21",
                "phone": "+91 96180 55443",
                "povertyScore": 42,
                "povertyCategory": "Stabilizing",
                "povertyStatus": "Graduating",
                "monthlyIncome": 11500.0,
                "targetIncome": 25000.0,
                "housingType": "Pucca Brick House (Tiled Roof)",
                "landHoldings": "0.5 Acres Fish Pond Lease",
                "assets": ["Smart Phone", "Ration Card", "2 Cows"],
                "members": [
                    FamilyMember(id="M-11", name="G. Govindaiah", relation="Self (Head)", age=50, gender="Male", education="10th Pass", occupation="Aquaculture Pond Caretaker", income=7500.0),
                    FamilyMember(id="M-12", name="G. Subhadra", relation="Spouse", age=45, gender="Female", education="8th Pass", occupation="Dairy Cattle Rearing", income=4000.0),
                    FamilyMember(id="M-13", name="G. Praveen", relation="Son", age=21, gender="Male", education="ITI Electrician", occupation="Apprentice", income=0.0)
                ],
                "mentorId": None,
                "mentorName": None,
                "mentorGrantTotal": 0.0,
                "assignedVolunteerId": "VOL-04",
                "assignedVolunteerName": "T. Bhavani",
                "volunteerPhone": "+91 94904 11223",
                "lat": 16.5412,
                "lng": 81.5234,
                "surveyCompletedDate": "2026-01-10",
                "eKycStatus": "Verified",
                "inactivityDays": 12
            },
            {
                "id": "P4-BK-005",
                "familyName": "Smt. B. Nagamma & Family",
                "headOfHousehold": "B. Nagamma",
                "aadhaarMasked": "XXXX-XXXX-9844",
                "rationCardNo": "RC-P4-071408805",
                "district": "Sundar Nagar",
                "mandal": "Chandragiri Block",
                "village": "A. Rangampet",
                "wardSecretariat": "Ward Secretariat Unit #05",
                "phone": "+91 98499 12340",
                "povertyScore": 55,
                "povertyCategory": "Vulnerable",
                "povertyStatus": "Vulnerable",
                "monthlyIncome": 7800.0,
                "targetIncome": 20000.0,
                "housingType": "Semi-Pucca Tin Sheet Roof",
                "landHoldings": "Landless",
                "assets": ["Handloom Charkha", "BPL Ration Card"],
                "members": [
                    FamilyMember(id="M-14", name="B. Nagamma", relation="Self (Head)", age=46, gender="Female", education="5th Pass", occupation="Handloom Silk Weaver", income=4800.0),
                    FamilyMember(id="M-15", name="B. Chennaiah", relation="Spouse", age=52, gender="Male", education="Illiterate", occupation="Handloom Weaver", income=3000.0, healthCondition="Low Vision"),
                    FamilyMember(id="M-16", name="B. Sandhya", relation="Daughter", age=17, gender="Female", education="Intermediate 2nd Year", occupation="Student", income=0.0)
                ],
                "mentorId": None,
                "mentorName": None,
                "mentorGrantTotal": 0.0,
                "assignedVolunteerId": "VOL-05",
                "assignedVolunteerName": "V. Prasad",
                "volunteerPhone": "+91 94905 66778",
                "lat": 13.5821,
                "lng": 79.3145,
                "surveyCompletedDate": "2026-02-18",
                "eKycStatus": "Verified",
                "inactivityDays": 15
            },
            {
                "id": "P4-BK-006",
                "familyName": "Sri T. Sreeramulu & Family",
                "headOfHousehold": "T. Sreeramulu",
                "aadhaarMasked": "XXXX-XXXX-3341",
                "rationCardNo": "RC-P4-071408806",
                "district": "Shanti Nagar",
                "mandal": "Dhone Block",
                "village": "Jalalpuram",
                "wardSecretariat": "Ward Secretariat Unit #12",
                "phone": "+91 94411 22334",
                "povertyScore": 88,
                "povertyCategory": "Critical",
                "povertyStatus": "Extreme Vulnerability",
                "monthlyIncome": 3000.0,
                "targetIncome": 16000.0,
                "housingType": "Stone Slab Katcha Hut",
                "landHoldings": "Landless Dryland Farm Labor",
                "assets": ["BPL Card"],
                "members": [
                    FamilyMember(id="M-17", name="T. Sreeramulu", relation="Self (Head)", age=55, gender="Male", education="Illiterate", occupation="Drought Casual Labor", income=2000.0),
                    FamilyMember(id="M-18", name="T. Ramanamma", relation="Spouse", age=50, gender="Female", education="Illiterate", occupation="MGNREGA Earth Worker", income=1000.0),
                    FamilyMember(id="M-19", name="T. Mahesh", relation="Son", age=15, gender="Male", education="Class 8 (Dropout)", occupation="Daily Wage Helper", income=0.0)
                ],
                "mentorId": None,
                "mentorName": None,
                "mentorGrantTotal": 0.0,
                "assignedVolunteerId": "VOL-06",
                "assignedVolunteerName": "G. Madhu",
                "volunteerPhone": "+91 94906 99001",
                "lat": 15.4218,
                "lng": 77.8732,
                "surveyCompletedDate": "2026-01-28",
                "eKycStatus": "Requires Review",
                "hasAnomalyFlag": True,
                "inactivityDays": 36
            }
        ]

        # Populate remaining families to total 25
        for idx in range(7, 26):
            dist_name = ["Navodaya Division", "Green Valley", "Kalyan Puram", "Coastal Haven", "Sundar Nagar", "Shanti Nagar"][idx % 6]
            mandal_name = f"Block Sector #{idx % 5 + 1}"
            village_name = f"Gram Panchayat #{idx:02d}"
            fam_id = f"P4-BK-{idx:03d}"
            score = 30 + (idx * 3) % 65
            cat = "Critical" if score >= 80 else ("High Risk" if score >= 70 else ("Vulnerable" if score >= 50 else ("Stabilizing" if score >= 35 else "Self-Reliant")))
            status = "Extreme Vulnerability" if score >= 70 else ("Vulnerable" if score >= 50 else ("Graduating" if score >= 35 else "Self-Reliant (Poverty Exited)"))
            income = 3500.0 + (idx * 450.0)
            target = income * 2.8

            fam_obj = Family(
                id=fam_id,
                familyName=f"Family of Citizen #{idx:02d}",
                headOfHousehold=f"Resident Head #{idx:02d}",
                aadhaarMasked=f"XXXX-XXXX-{1000 + idx * 37}",
                rationCardNo=f"RC-P4-0714088{idx:02d}",
                district=dist_name,
                mandal=mandal_name,
                village=village_name,
                wardSecretariat=f"Ward Secretariat Unit #{idx % 15 + 1:02d}",
                phone=f"+91 98480 {idx:02d}901",
                povertyScore=score,
                povertyCategory=cat,
                povertyStatus=status,
                monthlyIncome=income,
                targetIncome=target,
                housingType="Katcha Brick & Thatch" if score > 50 else "Pucca Brick RCC",
                landHoldings="0.00 Acres (Landless)" if score > 60 else "0.45 Acres",
                assets=["BPL Ration Card", "Ayushman Health Card"],
                members=[
                    FamilyMember(id=f"M-{idx}-1", name=f"Head #{idx}", relation="Head", age=42, gender="Male" if idx % 2 == 0 else "Female", education="Primary", occupation="Daily Wage Laborer", income=income * 0.7),
                    FamilyMember(id=f"M-{idx}-2", name=f"Spouse #{idx}", relation="Spouse", age=39, gender="Female" if idx % 2 == 0 else "Male", education="Illiterate", occupation="Casual Laborer", income=income * 0.3)
                ],
                mentorId="M-101" if idx == 7 else None,
                mentorName="Dr. K. Srinivas Rao" if idx == 7 else None,
                mentorGrantTotal=50000.0 if idx == 7 else 0.0,
                assignedVolunteerId=f"VOL-{idx % 8 + 1:02d}",
                assignedVolunteerName=f"Field Worker #{idx % 8 + 1}",
                volunteerPhone=f"+91 94900 {idx % 8 + 1}2345",
                lat=15.0 + (idx * 0.12) % 3.0,
                lng=78.0 + (idx * 0.19) % 4.0,
                surveyCompletedDate=f"2026-01-{10 + (idx % 20):02d}",
                eKycStatus="Verified" if idx % 5 != 0 else "Under Verification",
                hasAnomalyFlag=(idx == 11 or idx == 19),
                inactivityDays=34 if idx == 8 else (idx % 25)
            )
            self.families[fam_id] = fam_obj

        for f_dict in families_raw:
            fam_obj = Family(**f_dict)
            self.families[fam_obj.id] = fam_obj

        # 5. Support Milestones for Families
        for fam_id in self.families.keys():
            self.milestones[fam_id] = [
                JourneyMilestone(id=1, familyId=fam_id, title="Baseline MPI Verification", description="Field worker survey, GPS geotagging, e-KYC consent validation", status="completed", date="2026-01-18", verifiedBy="Ch. Naveen Kumar (VOL-01)", verificationStatus="Verified"),
                JourneyMilestone(id=2, familyId=fam_id, title="Need Identification & Triage", description="AI classification of livelihood, nutrition, and housing requirements", status="completed", date="2026-01-25", verifiedBy="Mandal Development Officer", verificationStatus="Verified"),
                JourneyMilestone(id=3, familyId=fam_id, title="P4 Adoption Agreement Signed", description="Margadarsi mentor matching, commitment pledge, and escrow locking", status="completed" if self.families[fam_id].mentorId else "current", date="2026-02-05" if self.families[fam_id].mentorId else None, verifiedBy="State P4 Mission Directorate", verificationStatus="Verified" if self.families[fam_id].mentorId else "Pending"),
                JourneyMilestone(id=4, familyId=fam_id, title="Controlled Escrow Resource Allocation", description="Locking earmarked grant in controlled escrow with vendor voucher allocation", status="completed" if self.families[fam_id].mentorId else "upcoming", date="2026-02-12" if self.families[fam_id].mentorId else None, verifiedBy="Finance & Escrow Desk", verificationStatus="Verified" if self.families[fam_id].mentorId else None),
                JourneyMilestone(id=5, familyId=fam_id, title="Livelihood Asset Delivery", description="Direct-to-vendor delivery of productive capital asset (Milch cow / Sewing unit)", status="current" if self.families[fam_id].mentorId else "upcoming", date=None, verifiedBy="Livelihood Vendor VEND-01", verificationStatus="Under Review" if self.families[fam_id].mentorId else None),
                JourneyMilestone(id=6, familyId=fam_id, title="Skill & Enterprise Mentorship", description="Market linkages, veterinary care, and micro-savings coaching", status="upcoming"),
                JourneyMilestone(id=7, familyId=fam_id, title="Follow-up & Income Verification", description="Field worker monthly audit of monthly cash flow and asset maintenance", status="upcoming"),
                JourneyMilestone(id=8, familyId=fam_id, title="Impact Verification & Exit Audit", description="Multidimensional MPI re-survey to confirm self-reliance score >= 65", status="upcoming"),
                JourneyMilestone(id=9, familyId=fam_id, title="Formal Poverty Exit Certification", description="Sustainable graduation out of BPL status into Bangaru Kutumbam self-reliance", status="upcoming")
            ]

        # 6. Escrow Transactions
        self.escrows["ESCROW-001"] = EscrowTransaction(
            id="ESCROW-001",
            familyId="P4-BK-001",
            mentorId="M-101",
            mentorName="Dr. K. Srinivas Rao",
            totalPledged=75000.0,
            fundsLocked=35000.0,
            fundsReleased=40000.0,
            fundsRemaining=0.0,
            currentMilestoneId=5,
            currentMilestoneName="Livelihood Asset Delivery",
            status="Verification In Progress",
            lastDisbursedAt="2026-02-14",
            vendorId="VEND-01",
            vendorName="Sri Krishna Agri-Equipment & Dairy Supplies"
        )
        self.escrows["ESCROW-002"] = EscrowTransaction(
            id="ESCROW-002",
            familyId="P4-BK-003",
            mentorId="M-102",
            mentorName="Smt. Anita Deshmukh",
            totalPledged=45000.0,
            fundsLocked=25000.0,
            fundsReleased=20000.0,
            fundsRemaining=0.0,
            currentMilestoneId=4,
            currentMilestoneName="Controlled Escrow Resource Allocation",
            status="Locked",
            lastDisbursedAt="2026-02-10",
            vendorId="VEND-02",
            vendorName="Saraswati Sewing & Garment Machinery Mart"
        )

        # 7. Vendor Orders
        self.orders["ORD-01"] = VendorOrder(
            id="ORD-01",
            voucherCode="P4-VOUCHER-7841",
            beneficiaryName="Smt. K. Lakshmi Devi",
            familyId="P4-BK-001",
            assetType="High-Yield Murrah Buffalo Unit with Feed Kit",
            vendorName="Sri Krishna Agri-Equipment & Dairy Supplies",
            vendorId="VEND-01",
            amount=40000.0,
            paymentStatus="Released",
            deliveryStatus="Delivered",
            issuedDate="2026-02-10",
            redeemedDate="2026-02-14",
            geoTag="16.2415°N, 80.6482°E",
            proofPhotoUrl="https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=500"
        )
        self.orders["ORD-02"] = VendorOrder(
            id="ORD-02",
            voucherCode="P4-VOUCHER-9923",
            beneficiaryName="Shaik Fatima Bi",
            familyId="P4-BK-003",
            assetType="Commercial Electric Overlock Sewing Machine & Cloth Kit",
            vendorName="Saraswati Sewing & Garment Machinery Mart",
            vendorId="VEND-02",
            amount=20000.0,
            paymentStatus="Authorized",
            deliveryStatus="Dispatched",
            issuedDate="2026-02-25",
            geoTag="14.2891°N, 78.2764°E"
        )

        # 8. Needs
        needs_list = [
            NeedItem(
                id="NEED-01",
                familyId="P4-BK-001",
                category="Livelihood",
                title="Dairy Cattle Livelihood Unit",
                description="Needs productive asset (milch cow) and dairy federation supply chain tie-up to generate steady daily cash flow.",
                severity="High",
                priority="P1",
                status="In Fulfillment",
                requestedAt="2026-01-16",
                assignedTo="Dr. K. Srinivas Rao (Margadarsi M-101)",
                actionTaken="Vendor Voucher Issued; Delivery Completed",
                recommendedIntervention="Direct-to-Vendor Murrah Buffalo Procurement"
            ),
            NeedItem(
                id="NEED-02",
                familyId="P4-BK-001",
                category="Healthcare",
                title="Chronic Asthma Medical Treatment for Spouse",
                description="Husband suffers from severe seasonal asthma, preventing continuous farm labor.",
                severity="High",
                priority="P2",
                status="Approved",
                requestedAt="2026-01-16",
                assignedTo="Medical Officer, Tenali PHC",
                actionTaken="Enrolled in Ayushman Health Protection Program",
                recommendedIntervention="Primary Health Center Monthly Pulmonology Follow-up"
            ),
            NeedItem(
                id="NEED-03",
                familyId="P4-BK-003",
                category="Employment",
                title="Vocational Apparel & Sewing Unit",
                description="Skilled in stitching; requires heavy-duty motor sewing machine to stitch uniforms for local schools.",
                severity="Critical",
                priority="P1",
                status="In Fulfillment",
                requestedAt="2026-02-04",
                assignedTo="Smt. Anita Deshmukh (M-102)",
                actionTaken="Controlled Escrow Locked; Order placed with Saraswati Machinery",
                recommendedIntervention="High-speed sewing machine + School uniform SHG contract"
            ),
            NeedItem(
                id="NEED-04",
                familyId="P4-BK-002",
                category="Skill Development",
                title="Youth IT Certification & Apprenticeship",
                description="19-year old Suresh completed 12th; seeks certified computer training and placement.",
                severity="Medium",
                priority="P2",
                status="Pending Review",
                requestedAt="2026-02-20",
                assignedTo="Field Worker VOL-02",
                recommendedIntervention="Enroll in Skill Mission 3-month IT Hardware Course"
            )
        ]
        for n in needs_list:
            self.needs[n.id] = n

        # 9. Fraud & Vigilance Alerts
        self.fraud_alerts["ALERT-01"] = FraudAlert(
            id="ALERT-01",
            type="GEO_MISMATCH",
            severity="Critical",
            title="GPS Geo-Fence Discrepancy Detected",
            description="Survey coordinates (15.4218, 77.8732) deviate by 42.6 km from registered village administrative boundaries.",
            familyId="P4-BK-006",
            mandal="Dhone Block",
            district="Shanti Nagar",
            flaggedAt="2026-02-24 14:12",
            status="Under Investigation",
            evidence="Surveyor mobile EXIF location logged at Highway Toll Plaza, not inside beneficiary hamlet.",
            fraudRiskScore=88
        )
        self.fraud_alerts["ALERT-02"] = FraudAlert(
            id="ALERT-02",
            type="DUPLICATE_ID",
            severity="High",
            title="Duplicate Beneficiary Ration Card Hash",
            description="Ration card number RC-P4-071408806 is partially mapped to existing profile in adjacent division.",
            familyId="P4-BK-006",
            mandal="Dhone Block",
            district="Shanti Nagar",
            flaggedAt="2026-02-24 14:15",
            status="Under Investigation",
            evidence="Civil Supplies database collision flagged on head of household biometric token.",
            fraudRiskScore=79
        )
        self.fraud_alerts["ALERT-03"] = FraudAlert(
            id="ALERT-03",
            type="REUSED_DOCS",
            severity="Medium",
            title="Image Hash Collision in Asset Proof",
            description="Uploaded cattle geotagged photo matches 99.4% perceptual hash of evidence uploaded for BK-019.",
            familyId="P4-BK-011",
            mandal="Block Sector #2",
            district="Green Valley",
            flaggedAt="2026-03-01 11:30",
            status="Under Investigation",
            evidence="Perceptual Image Hash: d41d8cd98f00b204e9800998ecf8427e duplicate detected.",
            fraudRiskScore=65
        )

        # 10. Grievances
        self.grievances["GRV-101"] = GrievanceItem(
            id="GRV-101",
            familyId="P4-BK-001",
            familyName="Smt. K. Lakshmi Devi",
            category="Benefit Access",
            priority="Critical",
            description="Local ration shop dealer refused Antyodaya food grain quota citing biometric server timeout.",
            channel="Voice AI (Bhashini)",
            status="Investigating",
            filedAt="2026-03-02 09:40",
            slaDeadline="2026-03-05 18:00",
            assignedOfficer="Mandal Revenue Inspector",
            officerRemarks="Dealer directed to perform offline OTP distribution; spot inspection scheduled."
        )
        self.grievances["GRV-102"] = GrievanceItem(
            id="GRV-102",
            familyId="P4-BK-003",
            familyName="Shaik Fatima Bi",
            category="Housing",
            priority="High",
            description="Rainwater inundation during monsoon damaged mud wall; housing inspection requested.",
            channel="Mobile App",
            status="Open",
            filedAt="2026-03-04 15:10",
            slaDeadline="2026-03-08 18:00",
            assignedOfficer="Assistant Executive Engineer, Rural Housing"
        )

        # 11. Notifications
        self.notifications = [
            NotificationItem(id="NOTIF-01", title="Asset Proof Validated", message="Computer Vision validated milch cow asset proof for Smt. K. Lakshmi Devi (BK-001).", type="verification", channel="In-App", timestamp="10 mins ago"),
            NotificationItem(id="NOTIF-02", title="Controlled Escrow Released", message="Authorized disbursement of Rs. 40,000 released to Sri Krishna Agri Supplies.", type="payment", channel="SMS Simulation", timestamp="25 mins ago"),
            NotificationItem(id="NOTIF-03", title="Vigilance Alert Flagged", message="Suspicious GPS geo-fence deviation detected on survey BK-006 in Shanti Nagar.", type="fraud", channel="Email Simulation", timestamp="1 hour ago"),
            NotificationItem(id="NOTIF-04", title="Autonomous Follow-up Required", message="Household BK-006 has had no field worker visit for 36 days. Auto-escalated.", type="followup", channel="Voice/IVR Simulation", timestamp="3 hours ago")
        ]

        # 12. Predictive Poverty Risks
        self.predictive_risks["P4-BK-001"] = PredictivePovertyRisk(
            id="RISK-01",
            familyId="P4-BK-001",
            familyName="Smt. K. Lakshmi Devi",
            currentScore=78,
            predictedRisk=35,
            trend="Decreasing",
            reason="Productive dairy asset generating daily milk income (+Rs. 8,200/mo projected).",
            recommendedAction="Complete dairy co-operative procurement agreement; monitor veterinary vaccinations."
        )
        self.predictive_risks["P4-BK-006"] = PredictivePovertyRisk(
            id="RISK-02",
            familyId="P4-BK-006",
            familyName="Sri T. Sreeramulu",
            currentScore=88,
            predictedRisk=89,
            trend="Increasing",
            reason="High household debt (Rs. 65,000 at 36% private interest) and seasonal farm labor loss.",
            recommendedAction="Urgent debt swap via SHG Stree Nidhi loan and immediate MGNREGA job card enrollment."
        )

        # 13. Inactivity Alerts
        self.inactivity_alerts["ACT-01"] = InactivityAlert(
            id="ACT-01",
            familyId="P4-BK-006",
            familyName="Sri T. Sreeramulu",
            village="Jalalpuram",
            lastUpdateDays=36,
            assignedVolunteer="G. Madhu (VOL-06)",
            status="Requires Intervention",
            detectedAt="2026-03-07"
        )
        self.inactivity_alerts["ACT-02"] = InactivityAlert(
            id="ACT-02",
            familyId="P4-BK-008",
            familyName="Citizen Resident #08",
            village="Gram Panchayat #08",
            lastUpdateDays=34,
            assignedVolunteer="Field Worker #01",
            status="Case Reassigned",
            detectedAt="2026-03-08"
        )

        # 14. GIS Location Markers
        for f in self.families.values():
            self.gis_markers.append(GISLocationMarker(
                id=f"GIS-{f.id}",
                type="family",
                name=f.familyName,
                district=f.district,
                mandal=f.mandal,
                village=f.village,
                lat=f.lat,
                lng=f.lng,
                status=f.povertyCategory,
                details={
                    "familyId": f.id,
                    "povertyScore": f.povertyScore,
                    "monthlyIncome": f.monthlyIncome,
                    "mentor": f.mentorName or "Unassigned",
                    "eKyc": f.eKycStatus
                }
            ))

        # Add facility markers
        facilities = [
            ("FAC-01", "school", "Navodaya Model Higher Secondary School", "Navodaya Division", "Tenali Block", "Pinapadu", 16.2480, 80.6520, "Active", {"students": 420, "vocationalLabs": 2}),
            ("FAC-02", "health_facility", "Tenali Community Health Center", "Navodaya Division", "Tenali Block", "Tenali HQ", 16.2390, 80.6410, "Operational", {"beds": 50, "ayushmanNetwork": True}),
            ("FAC-03", "vendor", "Sri Krishna Agri Equipment Hub", "Navodaya Division", "Tenali Block", "Industrial Estate", 16.2450, 80.6450, "Authorized", {"settlements": 185000})
        ]
        for fid, ftype, fname, fdist, fman, fvil, flat, flng, fstat, fdet in facilities:
            self.gis_markers.append(GISLocationMarker(
                id=fid, type=ftype, name=fname, district=fdist, mandal=fman, village=fvil, lat=flat, lng=flng, status=fstat, details=fdet
            ))

        # Initial Audit Log Seed
        self.log_audit("SYSTEM_INIT", "System Administrator", "SEED_DATABASE", "GLOBAL_SYSTEM", "Initial synthetic database loaded with 25 families, 5 mentors, 4 vendors, and 6 schemes.")

db = InMemoryDatabase()
