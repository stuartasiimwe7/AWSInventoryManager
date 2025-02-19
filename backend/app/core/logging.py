"""
Centralized logging configuration for the monitoring application.
"""

import logging
import sys
from datetime import datetime
from typing import Dict, Any
import json
from pathlib import Path

# Create logs directory if it doesn't exist
log_dir = Path("logs")
log_dir.mkdir(exist_ok=True)

class JSONFormatter(logging.Formatter):
    """Custom JSON formatter for structured logging."""
    
    def format(self, record: logging.LogRecord) -> str:
        log_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno,
        }
        
        # Add exception info if present
        if record.exc_info:
            log_entry["exception"] = self.formatException(record.exc_info)
        
        # Add extra fields
        if hasattr(record, 'extra_fields'):
            log_entry.update(record.extra_fields)
            
        return json.dumps(log_entry)

class MonitoringLogger:
    """Centralized logger for the monitoring application."""
    
    def __init__(self, name: str = "aws_monitor"):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(logging.INFO)
        
        # Prevent duplicate handlers
        if not self.logger.handlers:
            self._setup_handlers()
    
    def _setup_handlers(self):
        """Set up logging handlers."""
        
        # Console handler with colored output
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setLevel(logging.INFO)
        console_formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        console_handler.setFormatter(console_formatter)
        
        # File handler with JSON format
        file_handler = logging.FileHandler(
            log_dir / "application.log",
            mode='a'
        )
        file_handler.setLevel(logging.DEBUG)
        file_handler.setFormatter(JSONFormatter())
        
        # Error file handler
        error_handler = logging.FileHandler(
            log_dir / "errors.log",
            mode='a'
        )
        error_handler.setLevel(logging.ERROR)
        error_handler.setFormatter(JSONFormatter())
        
        # Add handlers
        self.logger.addHandler(console_handler)
        self.logger.addHandler(file_handler)
        self.logger.addHandler(error_handler)
    
    def info(self, message: str, **kwargs):
        """Log info message with optional extra fields."""
        self.logger.info(message, extra={'extra_fields': kwargs})
    
    def warning(self, message: str, **kwargs):
        """Log warning message with optional extra fields."""
        self.logger.warning(message, extra={'extra_fields': kwargs})
    
    def error(self, message: str, **kwargs):
        """Log error message with optional extra fields."""
        self.logger.error(message, extra={'extra_fields': kwargs})
    
    def critical(self, message: str, **kwargs):
        """Log critical message with optional extra fields."""
        self.logger.critical(message, extra={'extra_fields': kwargs})
    
    def debug(self, message: str, **kwargs):
        """Log debug message with optional extra fields."""
        self.logger.debug(message, extra={'extra_fields': kwargs})
    
    def log_metric(self, metric_name: str, value: float, **kwargs):
        """Log metric data."""
        self.info(
            f"Metric recorded: {metric_name}",
            metric_name=metric_name,
            metric_value=value,
            **kwargs
        )
    
    def log_api_request(self, method: str, path: str, status_code: int, 
                       response_time: float, **kwargs):
        """Log API request details."""
        self.info(
            f"API Request: {method} {path} - {status_code}",
            request_method=method,
            request_path=path,
            status_code=status_code,
            response_time_ms=response_time * 1000,
            **kwargs
        )
    
    def log_alert(self, alert_name: str, severity: str, message: str, **kwargs):
        """Log alert information."""
        self.warning(
            f"Alert triggered: {alert_name}",
            alert_name=alert_name,
            alert_severity=severity,
            alert_message=message,
            **kwargs
        )

# Global logger instance
logger = MonitoringLogger()

def get_logger(name: str = None) -> MonitoringLogger:
    """Get a logger instance."""
    if name:
        return MonitoringLogger(name)
    return logger
