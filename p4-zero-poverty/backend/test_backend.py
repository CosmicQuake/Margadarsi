import sys
import os

# Ensure backend directory is on sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from main import app, get_poverty_score
from database import db
from services.demo_orchestrator import demo_orchestrator_service

print("App Title:", app.title)
print("Families count:", len(db.families))
print("Mentors count:", len(db.mentors))

score = get_poverty_score("P4-BK-001")
assert score.familyId == "P4-BK-001"
assert 0 <= score.overallPovertyScore <= 100
assert score.category in {"Self-Reliant", "Stabilizing", "Vulnerable", "High Risk", "Critical"}
print("Poverty score endpoint:", score.overallPovertyScore, score.category)

print("Running demo orchestrator test...")
result = demo_orchestrator_service.run_complete_demo()
print("Demo execution status:", result["status"])
print("Steps executed:", result["stepsExecuted"])
print("Audit logs count:", len(db.audit_logs))
print("ALL BACKEND CHECKS PASSED!")
