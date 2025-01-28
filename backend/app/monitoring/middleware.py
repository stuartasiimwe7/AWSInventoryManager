from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
import time
from .prometheus_metrics import REQUEST_COUNT, REQUEST_DURATION

class PrometheusMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        response = await call_next(request)
        
        # Record metrics
        REQUEST_COUNT.labels(
            method=request.method,
            endpoint=request.url.path,
            status=response.status_code
        ).inc()
        
        REQUEST_DURATION.observe(time.time() - start_time)
        
        return response
