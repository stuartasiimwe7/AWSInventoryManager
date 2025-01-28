from fastapi import APIRouter
from app.monitoring.prometheus_metrics import ACTIVE_CONNECTIONS

router = APIRouter()

@router.get("/")
async def health_check():
    ACTIVE_CONNECTIONS.inc()
    return {
        "status": "healthy",
        "service": "monitoring-api",
        "timestamp": "2025-01-27T10:00:00Z"
    }

@router.get("/ready")
async def readiness_check():
    return {"status": "ready"}

@router.get("/live")
async def liveness_check():
    return {"status": "alive"}
