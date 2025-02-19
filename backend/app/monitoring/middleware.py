from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
import time
import traceback
from .prometheus_metrics import REQUEST_COUNT, REQUEST_DURATION, ERROR_COUNT
from app.core.logging import get_logger

logger = get_logger("middleware")

class PrometheusMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        request_id = id(request)
        
        # Log incoming request
        logger.info(
            f"Request started: {request.method} {request.url.path}",
            request_id=request_id,
            method=request.method,
            path=request.url.path,
            client_ip=request.client.host if request.client else None,
            user_agent=request.headers.get("user-agent")
        )
        
        try:
            response = await call_next(request)
            duration = time.time() - start_time
            
            # Record success metrics
            REQUEST_COUNT.labels(
                method=request.method,
                endpoint=request.url.path,
                status=response.status_code
            ).inc()
            
            REQUEST_DURATION.observe(duration)
            
            # Log successful request
            logger.log_api_request(
                method=request.method,
                path=request.url.path,
                status_code=response.status_code,
                response_time=duration,
                request_id=request_id
            )
            
            return response
            
        except Exception as e:
            duration = time.time() - start_time
            
            # Record error metrics
            ERROR_COUNT.labels(
                method=request.method,
                endpoint=request.url.path,
                error_type=type(e).__name__
            ).inc()
            
            # Log error
            logger.error(
                f"Request failed: {request.method} {request.url.path}",
                request_id=request_id,
                method=request.method,
                path=request.url.path,
                error_type=type(e).__name__,
                error_message=str(e),
                response_time=duration,
                traceback=traceback.format_exc()
            )
            
            # Re-raise the exception to be handled by exception handlers
            raise
