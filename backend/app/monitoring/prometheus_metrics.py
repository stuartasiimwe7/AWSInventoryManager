from prometheus_client import Counter, Histogram, Gauge, start_http_server
import time

# HTTP Metrics
REQUEST_COUNT = Counter(
    'http_requests_total', 
    'Total HTTP requests', 
    ['method', 'endpoint', 'status']
)

REQUEST_DURATION = Histogram(
    'http_request_duration_seconds', 
    'HTTP request duration'
)

# System Metrics
ACTIVE_CONNECTIONS = Gauge(
    'active_connections', 
    'Number of active connections'
)

DATABASE_CONNECTIONS = Gauge(
    'database_connections_active', 
    'Active database connections'
)

# Business Metrics
USER_REGISTRATIONS = Counter(
    'user_registrations_total', 
    'Total user registrations'
)

API_CALLS = Counter(
    'api_calls_total', 
    'Total API calls', 
    ['service', 'endpoint']
)

ERROR_RATE = Gauge(
    'error_rate_percentage', 
    'Error rate percentage'
)

# Application Metrics
INVENTORY_LEVELS = Gauge(
    'inventory_levels', 
    'Current inventory levels', 
    ['product_id', 'category']
)

SALES_VOLUME = Counter(
    'sales_volume_total', 
    'Total sales volume', 
    ['product_category']
)

# Performance Metrics
RESPONSE_TIME_P95 = Gauge(
    'response_time_p95_seconds',
    '95th percentile response time'
)

THROUGHPUT = Gauge(
    'requests_per_second',
    'Current requests per second'
)

def start_metrics_server(port: int = 8001):
    start_http_server(port)
