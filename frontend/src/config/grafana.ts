// Grafana Configuration
export const GRAFANA_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_GRAFANA_URL || 'http://localhost:3001',
  orgId: process.env.NEXT_PUBLIC_GRAFANA_ORG_ID || '1',
  defaultLogin: {
    username: 'admin',
    password: 'admin'
  }
};

// Dashboard configurations
export const GRAFANA_DASHBOARDS = {
  system: {
    id: 'system',
    title: 'System Overview',
    type: 'system' as const,
    uid: 'system-overview',
    description: 'CPU, memory, disk, and network metrics'
  },
  application: {
    id: 'application',
    title: 'Application Performance',
    type: 'application' as const,
    uid: 'application-performance',
    description: 'Request rate, response time, and error metrics'
  },
  business: {
    id: 'business',
    title: 'Business Intelligence',
    type: 'business' as const,
    uid: 'business-intelligence',
    description: 'User growth, sales, and business KPIs'
  },
  alerts: {
    id: 'alerts',
    title: 'Alerting Dashboard',
    type: 'alerts' as const,
    uid: 'alerting-dashboard',
    description: 'Active alerts and incident management'
  }
};

// Helper function to generate Grafana URLs
export const getGrafanaUrl = (dashboardUid: string, kioskMode = false) => {
  const baseUrl = GRAFANA_CONFIG.baseUrl;
  const orgId = GRAFANA_CONFIG.orgId;
  const kioskParam = kioskMode ? '&kiosk=tv' : '';
  
  return `${baseUrl}/d/${dashboardUid}/${dashboardUid}?orgId=${orgId}${kioskParam}`;
};

// Helper function to get dashboard home URL
export const getGrafanaHomeUrl = () => {
  return GRAFANA_CONFIG.baseUrl;
};
