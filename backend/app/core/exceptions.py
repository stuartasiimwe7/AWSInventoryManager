"""
Custom exceptions and error handling for the monitoring application.
"""

from typing import Any, Dict, Optional
from fastapi import HTTPException, Request, status
from fastapi.responses import JSONResponse
import traceback
from .logging import get_logger

logger = get_logger("exceptions")

class MonitoringException(Exception):
    """Base exception for monitoring application."""
    
    def __init__(self, message: str, error_code: str = None, details: Dict[str, Any] = None):
        self.message = message
        self.error_code = error_code or "MONITORING_ERROR"
        self.details = details or {}
        super().__init__(self.message)

class MetricsCollectionError(MonitoringException):
    """Raised when metrics collection fails."""
    
    def __init__(self, message: str, metric_name: str = None, details: Dict[str, Any] = None):
        super().__init__(message, "METRICS_COLLECTION_ERROR", details)
        self.metric_name = metric_name

class DatabaseConnectionError(MonitoringException):
    """Raised when database connection fails."""
    
    def __init__(self, message: str, details: Dict[str, Any] = None):
        super().__init__(message, "DATABASE_CONNECTION_ERROR", details)

class PrometheusConnectionError(MonitoringException):
    """Raised when Prometheus connection fails."""
    
    def __init__(self, message: str, details: Dict[str, Any] = None):
        super().__init__(message, "PROMETHEUS_CONNECTION_ERROR", details)

class GrafanaConnectionError(MonitoringException):
    """Raised when Grafana connection fails."""
    
    def __init__(self, message: str, details: Dict[str, Any] = None):
        super().__init__(message, "GRAFANA_CONNECTION_ERROR", details)

class AlertProcessingError(MonitoringException):
    """Raised when alert processing fails."""
    
    def __init__(self, message: str, alert_id: str = None, details: Dict[str, Any] = None):
        super().__init__(message, "ALERT_PROCESSING_ERROR", details)
        self.alert_id = alert_id

class ValidationError(MonitoringException):
    """Raised when data validation fails."""
    
    def __init__(self, message: str, field: str = None, details: Dict[str, Any] = None):
        super().__init__(message, "VALIDATION_ERROR", details)
        self.field = field

class ConfigurationError(MonitoringException):
    """Raised when configuration is invalid."""
    
    def __init__(self, message: str, config_key: str = None, details: Dict[str, Any] = None):
        super().__init__(message, "CONFIGURATION_ERROR", details)
        self.config_key = config_key

async def monitoring_exception_handler(request: Request, exc: MonitoringException):
    """Handle custom monitoring exceptions."""
    
    logger.error(
        f"Monitoring exception: {exc.error_code}",
        error_code=exc.error_code,
        error_message=exc.message,
        request_path=str(request.url),
        request_method=request.method,
        details=exc.details
    )
    
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": {
                "code": exc.error_code,
                "message": exc.message,
                "details": exc.details,
                "timestamp": logger.logger.handlers[0].formatter.formatTime(
                    logger.logger.handlers[0].formatter.converter()
                )
            }
        }
    )

async def http_exception_handler(request: Request, exc: HTTPException):
    """Handle HTTP exceptions with logging."""
    
    logger.warning(
        f"HTTP exception: {exc.status_code}",
        status_code=exc.status_code,
        detail=exc.detail,
        request_path=str(request.url),
        request_method=request.method
    )
    
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": f"HTTP_{exc.status_code}",
                "message": exc.detail,
                "timestamp": logger.logger.handlers[0].formatter.formatTime(
                    logger.logger.handlers[0].formatter.converter()
                )
            }
        }
    )

async def general_exception_handler(request: Request, exc: Exception):
    """Handle general exceptions with full traceback logging."""
    
    logger.critical(
        f"Unhandled exception: {type(exc).__name__}",
        exception_type=type(exc).__name__,
        exception_message=str(exc),
        request_path=str(request.url),
        request_method=request.method,
        traceback=traceback.format_exc()
    )
    
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "An unexpected error occurred",
                "timestamp": logger.logger.handlers[0].formatter.formatTime(
                    logger.logger.handlers[0].formatter.converter()
                )
            }
        }
    )

def validate_required_fields(data: Dict[str, Any], required_fields: list) -> None:
    """Validate that required fields are present in data."""
    
    missing_fields = [field for field in required_fields if field not in data or data[field] is None]
    
    if missing_fields:
        raise ValidationError(
            f"Missing required fields: {', '.join(missing_fields)}",
            field=missing_fields[0] if len(missing_fields) == 1 else None,
            details={"missing_fields": missing_fields}
        )

def validate_metric_value(value: Any, metric_name: str) -> float:
    """Validate and convert metric value to float."""
    
    try:
        float_value = float(value)
        if float_value < 0:
            raise ValidationError(
                f"Metric value cannot be negative: {metric_name}",
                field=metric_name,
                details={"value": value, "metric_name": metric_name}
            )
        return float_value
    except (ValueError, TypeError):
        raise ValidationError(
            f"Invalid metric value: {metric_name}",
            field=metric_name,
            details={"value": value, "metric_name": metric_name}
        )

def safe_divide(numerator: float, denominator: float, default: float = 0.0) -> float:
    """Safely divide two numbers, returning default if denominator is zero."""
    
    try:
        if denominator == 0:
            return default
        return numerator / denominator
    except (TypeError, ValueError):
        return default
