# Frontend Configuration

## Environment Variables

The frontend application uses environment variables for configuration. Create a `.env.local` file in the frontend directory with the following variables:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api/v1

# Grafana Configuration
NEXT_PUBLIC_GRAFANA_URL=http://localhost:3001
NEXT_PUBLIC_GRAFANA_ORG_ID=1
```

## Configuration Files

### `/src/config/index.ts`
Main configuration file that exports all configuration objects and environment variables.

### `/src/config/grafana.ts`
Grafana-specific configuration including:
- Dashboard definitions
- URL generation helpers
- Default login credentials

## Usage

```typescript
import { CONFIG, getGrafanaUrl, GRAFANA_DASHBOARDS } from '@/config';

// Access configuration
const apiUrl = CONFIG.api.baseUrl;
const grafanaUrl = CONFIG.grafana.baseUrl;

// Generate Grafana URLs
const dashboardUrl = getGrafanaUrl('system-overview', true); // with kiosk mode
const homeUrl = getGrafanaHomeUrl();

// Access dashboard definitions
const systemDashboard = GRAFANA_DASHBOARDS.system;
```

## Production Deployment

For production deployments, update the environment variables to point to your actual servers:

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/api/v1
NEXT_PUBLIC_GRAFANA_URL=https://grafana.yourdomain.com
```

## Benefits

- ✅ No hardcoded URLs in components
- ✅ Easy environment-specific configuration
- ✅ Centralized configuration management
- ✅ Type-safe configuration access
- ✅ Easy to maintain and update
