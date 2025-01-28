from fastapi import APIRouter
from app.monitoring.prometheus_metrics import (
    USER_REGISTRATIONS, API_CALLS, INVENTORY_LEVELS, 
    SALES_VOLUME, RESPONSE_TIME_P95, THROUGHPUT
)

router = APIRouter()

@router.get("/metrics")
async def get_dashboard_metrics():
    # Simulate some business metrics
    USER_REGISTRATIONS.inc(5)
    API_CALLS.labels(service="dashboard", endpoint="/metrics").inc()
    
    # Mock data for dashboard
    return {
        "system_metrics": {
            "cpu_usage": 45.2,
            "memory_usage": 67.8,
            "disk_usage": 23.1,
            "network_io": 125.5
        },
        "application_metrics": {
            "request_rate": 150.5,
            "response_time_p95": 0.25,
            "error_rate": 0.02,
            "active_users": 1250
        },
        "business_metrics": {
            "total_users": 5420,
            "daily_active_users": 1250,
            "revenue_today": 12500.50,
            "conversion_rate": 3.2
        }
    }
