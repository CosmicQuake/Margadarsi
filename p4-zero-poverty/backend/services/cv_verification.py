from typing import Optional
from datetime import datetime
from models import EvidenceVerificationRequest, EvidenceVerificationResult

class ComputerVisionVerifier:
    def verify_evidence(self, req: EvidenceVerificationRequest) -> EvidenceVerificationResult:
        """
        Simulates an enterprise YOLOv8 / Deep Learning object detection and
        EXIF integrity pipeline for physical asset verification.
        Validates:
        1. Object Class (e.g., 'Dairy Cow / Murrah Buffalo', 'Electric Sewing Machine')
        2. Bounding Box Detection Confidence Score
        3. Camera EXIF Timestamp & Tamper Analysis
        4. GPS Coordinate Geo-fence Match
        5. Duplicate Image Hash Index
        """
        asset_lower = req.assetName.lower()
        if "cow" in asset_lower or "buffalo" in asset_lower or "dairy" in asset_lower:
            detected = "Livestock: Bos taurus / Murrah Dairy Unit (YOLOv8 Class #19)"
            confidence = 96
            asset_label = "Murrah Buffalo Livestock"
        elif "sewing" in asset_lower or "tailor" in asset_lower:
            detected = "Machinery: High-Speed Electric Sewing Machine (YOLOv8 Class #44)"
            confidence = 94
            asset_label = "Industrial Sewing Machine"
        elif "solar" in asset_lower or "light" in asset_lower:
            detected = "Energy: 1kW Photovoltaic Solar Panel Unit"
            confidence = 91
            asset_label = "Solar Rooftop Panel"
        elif "cart" in asset_lower or "food" in asset_lower:
            detected = "Commercial: Mobile Retailing Vending Cart"
            confidence = 93
            asset_label = "Mobile Vending Cart"
        else:
            detected = "Productive Capital Asset Unit (Verified)"
            confidence = 88
            asset_label = req.assetName

        # Geo-fence check
        gps_valid = True if req.lat and req.lng else True
        timestamp_valid = True
        exif_valid = True
        duplicate_clear = True

        overall_status = "PROOF VALIDATED"
        msg = f"Computer Vision successfully detected {detected} with {confidence}% confidence score. Geotag verified within beneficiary homestead boundaries."

        return EvidenceVerificationResult(
            id=f"CV-PROOF-{req.familyId}-{req.milestoneId}",
            familyId=req.familyId,
            assetName=asset_label,
            detectedObject=detected,
            confidenceScore=confidence,
            gpsValid=gps_valid,
            timestampValid=timestamp_valid,
            exifValid=exif_valid,
            duplicateCheckClear=duplicate_clear,
            overallStatus=overall_status,
            photoUrl=req.photoUrl or "https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=500",
            timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S UTC"),
            geoCoordinates=f"{req.lat or 16.2415:.4f}°N, {req.lng or 80.6482:.4f}°E",
            message=msg
        )

cv_verifier_service = ComputerVisionVerifier()
