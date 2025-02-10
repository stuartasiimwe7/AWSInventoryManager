from fastapi import APIRouter
from app.api.v1.endpoints import health, metrics, dashboard, webhook

api_router = APIRouter()

api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(metrics.router, prefix="/metrics", tags=["metrics"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(webhook.router, prefix="/webhook", tags=["webhook"])
