"use client";

import { useState, useEffect } from "react";
import Header from "@/app/(components)/Header";
import { 
  ExternalLink, 
  RefreshCw, 
  Maximize2, 
  Settings,
  BarChart3,
  Activity,
  AlertTriangle,
  TrendingUp
} from "lucide-react";

interface GrafanaPanel {
  id: string;
  title: string;
  type: 'system' | 'application' | 'business' | 'alerts';
  url: string;
  description: string;
  icon: React.ReactNode;
}

const GrafanaIntegration = () => {
  const [activePanel, setActivePanel] = useState<string>('system');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const grafanaPanels: GrafanaPanel[] = [
    {
      id: 'system',
      title: 'System Overview',
      type: 'system',
      url: 'http://localhost:3000/d/system-overview/system-overview?orgId=1&kiosk=tv',
      description: 'CPU, memory, disk, and network metrics',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: 'application',
      title: 'Application Performance',
      type: 'application', 
      url: 'http://localhost:3000/d/application-performance/application-performance?orgId=1&kiosk=tv',
      description: 'Request rate, response time, and error metrics',
      icon: <Activity className="w-5 h-5" />
    },
    {
      id: 'business',
      title: 'Business Intelligence',
      type: 'business',
      url: 'http://localhost:3000/d/business-intelligence/business-intelligence?orgId=1&kiosk=tv',
      description: 'User growth, sales, and business KPIs',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: 'alerts',
      title: 'Alerting Dashboard',
      type: 'alerts',
      url: 'http://localhost:3000/d/alerting-dashboard/alerting-dashboard?orgId=1&kiosk=tv',
      description: 'Active alerts and incident management',
      icon: <AlertTriangle className="w-5 h-5" />
    }
  ];

  const currentPanel = grafanaPanels.find(panel => panel.id === activePanel);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const openInGrafana = () => {
    if (currentPanel) {
      window.open(currentPanel.url.replace('&kiosk=tv', ''), '_blank');
    }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`mx-auto pb-5 w-full ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Grafana Dashboards" />
        <div className="flex items-center gap-2">
          <button
            className="flex items-center bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleRefresh}
          >
            <RefreshCw className="w-5 h-5 mr-2" /> Refresh
          </button>
          <button
            className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={openInGrafana}
          >
            <ExternalLink className="w-5 h-5 mr-2" /> Open in Grafana
          </button>
          <button
            className="flex items-center bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleFullscreen}
          >
            <Maximize2 className="w-5 h-5 mr-2" /> 
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>

      {/* PANEL SELECTOR */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {grafanaPanels.map((panel) => (
          <button
            key={panel.id}
            onClick={() => setActivePanel(panel.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              activePanel === panel.id
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center mb-2">
              <div className={`mr-3 ${
                activePanel === panel.id ? 'text-blue-600' : 'text-gray-600'
              }`}>
                {panel.icon}
              </div>
              <h3 className={`font-semibold ${
                activePanel === panel.id ? 'text-blue-900' : 'text-gray-900'
              }`}>
                {panel.title}
              </h3>
            </div>
            <p className={`text-sm ${
              activePanel === panel.id ? 'text-blue-700' : 'text-gray-600'
            }`}>
              {panel.description}
            </p>
          </button>
        ))}
      </div>

      {/* GRAFANA IFRAME */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3 text-gray-600">
                {currentPanel?.icon}
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                {currentPanel?.title}
              </h2>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Settings className="w-4 h-4 mr-1" />
              Auto-refresh: 30s
            </div>
          </div>
        </div>
        
        <div className="relative" style={{ height: isFullscreen ? 'calc(100vh - 200px)' : '600px' }}>
          {currentPanel && (
            <iframe
              key={`${currentPanel.id}-${refreshKey}`}
              src={currentPanel.url}
              className="w-full h-full border-0"
              title={currentPanel.title}
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          )}
          
          {/* Loading overlay */}
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-2" />
              <p className="text-gray-600">Loading Grafana dashboard...</p>
            </div>
          </div>
        </div>
      </div>

      {/* CONNECTION STATUS */}
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">
              Grafana Connection Required
            </h3>
            <p className="text-sm text-yellow-700 mt-1">
              Make sure Grafana is running on localhost:3000. Start the monitoring stack with: 
              <code className="bg-yellow-100 px-2 py-1 rounded ml-2">
                docker-compose -f docker-compose.monitoring.yml up -d
              </code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrafanaIntegration;
