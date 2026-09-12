from typing import List, Dict, Any, Tuple
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from models import Mentor, Family, MatchResult, PredictivePovertyRisk, NeedCategoryType

# -------------------------------------------------------------
# 1. AI MENTOR-FAMILY MATCHMAKING (Vector Space + Cosine Similarity)
# -------------------------------------------------------------
class MentorFamilyMatchmaker:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')

    def match_mentor_to_family(self, family: Family, mentors: List[Mentor]) -> MatchResult:
        if not mentors:
            raise ValueError("No mentors available for matching")

        # Build family feature profile text
        fam_needs_text = " ".join([
            f"{family.housingType} {family.landHoldings}",
            "dairy farming livestock cattle" if "Dairy" in str(family.assets) or "Cattle" in str(family.assets) else "",
            "agriculture farm labor" if "Labor" in str(family.members) else "",
            "tailoring sewing garment" if family.monthlyIncome < 5000 else "",
            "vocational youth employment education health"
        ])
        family_doc = f"{family.district} {family.povertyCategory} {fam_needs_text}"

        # Build mentor profile texts
        mentor_docs = [
            f"{m.location} {' '.join(m.focusAreas)} {' '.join(m.skills)} {m.organization}"
            for m in mentors
        ]

        # Calculate TF-IDF matrix & cosine similarity
        all_docs = [family_doc] + mentor_docs
        tfidf_matrix = self.vectorizer.fit_transform(all_docs)
        sim_scores = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()

        # Augment with location compatibility bonus
        final_scores = []
        for idx, m in enumerate(mentors):
            base_sim = float(sim_scores[idx]) # 0.0 to 1.0
            loc_bonus = 0.15 if m.location.lower() in family.district.lower() or family.district.lower() in m.location.lower() else 0.0
            capacity_bonus = 0.10 if len(m.adoptedFamilyIds) < 3 else 0.0
            
            # Scaled 0 to 100
            score = int(min(98, max(52, round((base_sim * 0.75 + loc_bonus + capacity_bonus) * 100))))
            final_scores.append((m, score))

        final_scores.sort(key=lambda x: x[1], reverse=True)
        top_mentor, top_score = final_scores[0]

        reasons = [
            f"High alignment ({top_score}%) between mentor focus on '{', '.join(top_mentor.focusAreas[:2])}' and household needs",
            f"Expertise in {', '.join(top_mentor.skills[:2])} directly accelerates family poverty exit target",
            f"Geographic proximity within {top_mentor.location} enables direct field monitoring"
        ]

        alternatives = [
            {
                "mentorId": m.id,
                "name": m.name,
                "score": score,
                "organization": m.organization,
                "expertise": ", ".join(m.focusAreas[:2])
            }
            for m, score in final_scores[1:4]
        ]

        return MatchResult(
            familyId=family.id,
            mentorId=top_mentor.id,
            mentorName=top_mentor.name,
            compatibilityScore=top_score,
            reasons=reasons,
            alternativeMatches=alternatives
        )

# -------------------------------------------------------------
# 2. PREDICTIVE POVERTY RISK SERVICE
# -------------------------------------------------------------
class PredictivePovertyModel:
    def predict_risk(self, family: Family) -> PredictivePovertyRisk:
        """
        Calculates the probability of household regressing deeper into poverty
        based on multidimensional vulnerabilities, income volatility, and debt indicators.
        """
        # Feature computation
        has_health_crisis = any(m.healthCondition for m in family.members)
        is_landless = "landless" in family.landHoldings.lower() or "0.00" in family.landHoldings
        income_ratio = family.monthlyIncome / max(1.0, family.targetIncome)
        dependency_ratio = len([m for m in family.members if m.age < 15 or m.age > 60]) / max(1, len(family.members))

        risk_score = 0.0
        risk_score += (family.povertyScore / 100.0) * 40.0
        risk_score += (1.0 - min(1.0, income_ratio)) * 25.0
        risk_score += 15.0 if has_health_crisis else 0.0
        risk_score += 10.0 if is_landless else 0.0
        risk_score += dependency_ratio * 10.0

        risk_pct = int(min(96, max(12, round(risk_score))))

        if risk_pct >= 70:
            trend = 'Increasing'
            reason = "High vulnerability due to single-earner informal dependency and lack of productive capital buffer."
            action = "Immediate allocation of productive asset, SHG loan swap, and priority ration guarantee."
        elif risk_pct >= 45:
            trend = 'Stable'
            reason = "Moderate stability; requires sustained income generation to guard against seasonal shocks."
            action = "Enroll adult youth in certified technical skill training and facilitate bank linkage."
        else:
            trend = 'Decreasing'
            reason = "Positive economic momentum with steady daily asset revenues and active mentor backing."
            action = "Transition household towards formal enterprise registration and savings graduation."

        return PredictivePovertyRisk(
            id=f"RISK-{family.id}",
            familyId=family.id,
            familyName=family.familyName,
            currentScore=family.povertyScore,
            predictedRisk=risk_pct,
            trend=trend,
            reason=reason,
            recommendedAction=action
        )

# -------------------------------------------------------------
# 3. AI NEED CLASSIFIER & INTENT EXTRACTOR
# -------------------------------------------------------------
class NeedClassifier:
    KEYWORDS = {
        'Food': ['food', 'ration', 'hunger', 'grain', 'rice', 'meal', 'nutrition', 'feed'],
        'Housing': ['house', 'roof', 'shelter', 'wall', 'katcha', 'mud', 'rain', 'tin', 'leak'],
        'Employment': ['job', 'work', 'labor', 'employment', 'wage', 'earn', 'daily wage', 'unemployed'],
        'Education': ['school', 'college', 'book', 'fees', 'student', 'child', 'study', 'class'],
        'Healthcare': ['health', 'hospital', 'medicine', 'sick', 'asthma', 'doctor', 'treatment', 'surgery'],
        'Sanitation': ['toilet', 'latrine', 'drain', 'water', 'hygiene', 'tap', 'sewage'],
        'Financial Support': ['debt', 'loan', 'money', 'cash', 'pension', 'subsidy', 'grant'],
        'Skill Development': ['skill', 'training', 'learn', 'course', 'computer', 'electrician', 'mechanic'],
        'Livelihood': ['cow', 'buffalo', 'sewing', 'machine', 'cart', 'goat', 'dairy', 'poultry', 'business', 'shop'],
        'Emergency': ['sos', 'emergency', 'help', 'danger', 'flood', 'collapse', 'urgent', 'starving']
    }

    def classify_text(self, text: str) -> Tuple[NeedCategoryType, str, str, str]:
        text_lower = text.lower()
        matched_cat: NeedCategoryType = 'Livelihood'
        max_matches = 0

        for cat, kw_list in self.KEYWORDS.items():
            matches = sum(1 for kw in kw_list if kw in text_lower)
            if matches > max_matches:
                max_matches = matches
                matched_cat = cat  # type: ignore

        if matched_cat == 'Emergency':
            severity = 'Critical'
            priority = 'P1'
            intervention = "Immediate dispatch of Village Field Worker and emergency relief package"
        elif matched_cat in ['Food', 'Healthcare', 'Housing']:
            severity = 'High'
            priority = 'P1'
            intervention = f"Expedited linkage with {matched_cat} Department scheme and priority review"
        elif matched_cat in ['Livelihood', 'Employment']:
            severity = 'High'
            priority = 'P2'
            intervention = "Direct-to-Vendor productive asset procurement through Margadarsi escrow"
        else:
            severity = 'Medium'
            priority = 'P3'
            intervention = "Skill development hub enrollment and counseling"

        return matched_cat, severity, priority, intervention

matchmaker_service = MentorFamilyMatchmaker()
predictive_model_service = PredictivePovertyModel()
need_classifier_service = NeedClassifier()
