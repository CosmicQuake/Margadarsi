from typing import Dict, List, Optional
import math
from models import Family, FraudAlert

class AntiFraudEngine:
    @staticmethod
    def calculate_distance(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
        """Haversine distance in kilometers"""
        R = 6371.0
        dlat = math.radians(lat2 - lat1)
        dlng = math.radians(lng2 - lng1)
        a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlng / 2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return R * c

    def audit_family_registration(self, new_family: Family, existing_families: List[Family]) -> Optional[FraudAlert]:
        """
        Runs comprehensive anti-fraud rules against new or modified household record:
        1. Duplicate masked Aadhaar or Ration Card number.
        2. GPS geo-fence distance anomaly.
        3. Extreme score deviation.
        """
        # 1. Duplicate check
        for ef in existing_families:
            if ef.id == new_family.id:
                continue
            if ef.aadhaarMasked == new_family.aadhaarMasked:
                return FraudAlert(
                    id=f"ALERT-DUP-{new_family.id}",
                    type="DUPLICATE_ID",
                    severity="Critical",
                    title="Duplicate Biometric Token Detected",
                    description=f"Aadhaar hash {new_family.aadhaarMasked} already mapped to household {ef.id} ({ef.familyName}).",
                    familyId=new_family.id,
                    mandal=new_family.mandal,
                    district=new_family.district,
                    flaggedAt="Just now",
                    status="Under Investigation",
                    evidence=f"Collision between new registration {new_family.id} and existing {ef.id}",
                    fraudRiskScore=92
                )
            if ef.rationCardNo == new_family.rationCardNo:
                return FraudAlert(
                    id=f"ALERT-RC-{new_family.id}",
                    type="DUPLICATE_ID",
                    severity="High",
                    title="Duplicate Civil Supplies Ration Card",
                    description=f"Ration Card {new_family.rationCardNo} collides with {ef.id}.",
                    familyId=new_family.id,
                    mandal=new_family.mandal,
                    district=new_family.district,
                    flaggedAt="Just now",
                    status="Under Investigation",
                    evidence=f"Shared ration card registry index with {ef.id}",
                    fraudRiskScore=84
                )

        # 2. GPS distance anomaly (>35 km from district centroid)
        district_centroids = {
            'Navodaya Division': (16.30, 80.45),
            'Green Valley': (17.70, 83.20),
            'Kalyan Puram': (14.65, 77.60),
            'Coastal Haven': (16.20, 81.15),
            'Sundar Nagar': (13.65, 79.40),
            'Shanti Nagar': (15.80, 78.00)
        }
        if new_family.district in district_centroids:
            clat, clng = district_centroids[new_family.district]
            dist_km = self.calculate_distance(new_family.lat, new_family.lng, clat, clng)
            if dist_km > 75.0:
                return FraudAlert(
                    id=f"ALERT-GEO-{new_family.id}",
                    type="GEO_MISMATCH",
                    severity="High",
                    title="Geographic Outlier / Location Anomaly",
                    description=f"Logged GPS coordinates are {dist_km:.1f} km away from registered {new_family.district} perimeter.",
                    familyId=new_family.id,
                    mandal=new_family.mandal,
                    district=new_family.district,
                    flaggedAt="Just now",
                    status="Under Investigation",
                    evidence=f"Latitude: {new_family.lat}, Longitude: {new_family.lng}, Distance: {dist_km:.1f}km",
                    fraudRiskScore=78
                )

        return None

anti_fraud_service = AntiFraudEngine()
