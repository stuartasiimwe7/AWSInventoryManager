from fastapi import APIRouter
from app.api.v1.endpoints import health, metrics, dashboard

api_router = APIRouter()

api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(metrics.router, prefix="/metrics", tags=["metrics"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
