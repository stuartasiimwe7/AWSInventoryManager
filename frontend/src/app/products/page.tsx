"use client";

import { useGetDashboardMetricsQuery } from "@/state/api";
import { 
  Server, 
  Database, 
  Globe, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Activity,
  Clock,
  RefreshCw
} from "lucide-react";
import { useState, useEffect } from "react";
import Header from "@/app/(components)/Header";

interface ServiceStatus {
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  uptime: string;
  responseTime: number;
  lastCheck: string;
  description: string;
}

const ServiceHealth = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const { data: metrics, isLoading, isError } = useGetDashboardMetricsQuery();

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const services: ServiceStatus[] = [
    {
      name: "API Gateway",
      status: metrics?.applicationMetrics?.errorRate && metrics.applicationMetrics.errorRate > 0.05 ? 'critical' : 'healthy',
      uptime: "99.9%",
      responseTime: metrics?.applicationMetrics?.responseTimeP95 || 0.25,
      lastCheck: new Date().toLocaleTimeString(),
      description: "Main API endpoint for all requests"
    },
    {
      name: "Database",
      status: 'healthy',
      uptime: "99.8%",
      responseTime: 0.12,
      lastCheck: new Date().toLocaleTimeString(),
      description: "PostgreSQL database cluster"
    },
    {
      name: "Prometheus",
      status: 'healthy',
      uptime: "100%",
      responseTime: 0.08,
      lastCheck: new Date().toLocaleTimeString(),
      description: "Metrics collection and storage"
    },
    {
      name: "Grafana",
      status: 'healthy',
      uptime: "99.9%",
      responseTime: 0.15,
      lastCheck: new Date().toLocaleTimeString(),
      description: "Monitoring dashboards and visualization"
    },
    {
      name: "AlertManager",
      status: 'warning',
      uptime: "98.5%",
      responseTime: 0.22,
      lastCheck: new Date().toLocaleTimeString(),
      description: "Alert routing and notification system"
    },
    {
      name: "Node Exporter",
      status: 'healthy',
      uptime: "99.7%",
      responseTime: 0.05,
      lastCheck: new Date().toLocaleTimeString(),
      description: "System metrics collection"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'critical':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (isLoading) {
    return <div className="py-4">Loading service health...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch service health data
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Service Health" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleRefresh}
        >
          <RefreshCw className="w-5 h-5 mr-2" /> Refresh
        </button>
      </div>

      {/* OVERVIEW STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Healthy Services</p>
              <p className="text-2xl font-bold text-green-600">
                {services.filter(s => s.status === 'healthy').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Warnings</p>
              <p className="text-2xl font-bold text-yellow-600">
                {services.filter(s => s.status === 'warning').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <XCircle className="w-8 h-8 text-red-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-red-600">
                {services.filter(s => s.status === 'critical').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Avg Response</p>
              <p className="text-2xl font-bold text-blue-600">
                {(services.reduce((acc, s) => acc + s.responseTime, 0) / services.length).toFixed(2)}s
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className={`border-2 rounded-lg p-4 shadow-sm ${getStatusColor(service.status)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                {getStatusIcon(service.status)}
                <h3 className="text-lg font-semibold text-gray-900 ml-2">
                  {service.name}
                </h3>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                service.status === 'healthy' ? 'bg-green-100 text-green-800' :
                service.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {service.status.toUpperCase()}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{service.description}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Uptime:</span>
                <span className="font-medium">{service.uptime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Response Time:</span>
                <span className="font-medium">{service.responseTime}s</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Last Check:</span>
                <span className="font-medium">{service.lastCheck}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceHealth;