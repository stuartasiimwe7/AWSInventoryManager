from fastapi import APIRouter, Request
from app.monitoring.prometheus_metrics import API_CALLS
import json
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/webhook")
async def alertmanager_webhook(request: Request):
    """
    Handle AlertManager webhook notifications
    """
    try:
        body = await request.json()
        
        # Log the alert for debugging
        logger.info(f"Received alert webhook: {json.dumps(body, indent=2)}")
        
        # Process different alert types
        for alert in body.get("alerts", []):
            alert_name = alert.get("labels", {}).get("alertname", "unknown")
            severity = alert.get("labels", {}).get("severity", "unknown")
            status = alert.get("status", "unknown")
            
            # Record webhook call in metrics
            API_CALLS.labels(service="webhook", endpoint="/webhook").inc()
            
            # Log alert details
            logger.info(f"Alert: {alert_name}, Severity: {severity}, Status: {status}")
            
            # Here you could integrate with external systems:
            # - Send to Slack
            # - Create JIRA tickets
            # - Update status pages
            # - Send SMS notifications
            
            if severity == "critical" and status == "firing":
                logger.critical(f"CRITICAL ALERT: {alert_name}")
                # Implement critical alert handling logic
                
        return {"status": "success", "message": "Webhook processed"}
        
    except Exception as e:
        logger.error(f"Error processing webhook: {str(e)}")
        return {"status": "error", "message": str(e)}

@router.get("/webhook/health")
async def webhook_health():
    """
    Health check for webhook endpoint
    """
    return {"status": "healthy", "service": "webhook"}
