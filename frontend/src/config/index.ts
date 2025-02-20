// Frontend Configuration
export const CONFIG = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api/v1',
  },
  
  // Grafana Configuration
  grafana: {
    baseUrl: process.env.NEXT_PUBLIC_GRAFANA_URL || 'http://localhost:3001',
    orgId: process.env.NEXT_PUBLIC_GRAFANA_ORG_ID || '1',
    defaultLogin: {
      username: 'admin',
      password: 'admin'
    }
  },
  
  // Application Configuration
  app: {
    name: 'System Pulse',
    version: '1.0.0',
    description: 'Monitoring and Observability Platform'
  }
};

// Re-export Grafana config for convenience
export { GRAFANA_DASHBOARDS, getGrafanaUrl, getGrafanaHomeUrl } from './grafana';
