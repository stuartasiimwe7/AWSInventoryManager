"use client";

import { useState, useEffect, useCallback } from "react";
import { useGetDashboardMetricsQuery } from "@/state/api";
import { 
  Activity, 
  RefreshCw, 
  Wifi, 
  WifiOff,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";

interface MetricTrend {
  value: number;
  previousValue: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}

interface RealTimeMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: MetricTrend;
  color: string;
  icon: React.ReactNode;
}

const RealTimeMetrics = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5000); // 5 seconds
  const [previousMetrics, setPreviousMetrics] = useState<any>(null);

  const { data: metrics, isLoading, isError, refetch } = useGetDashboardMetricsQuery();

  // Calculate trends
  const calculateTrend = useCallback((current: number, previous: number): MetricTrend => {
    if (previous === 0) {
      return {
        value: current,
        previousValue: previous,
        trend: 'stable',
        changePercent: 0
      };
    }

    const changePercent = ((current - previous) / previous) * 100;
    const trend = changePercent > 1 ? 'up' : changePercent < -1 ? 'down' : 'stable';

    return {
      value: current,
      previousValue: previous,
      trend,
      changePercent: Math.abs(changePercent)
    };
  }, []);

  // Auto-refresh effect
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      if (isConnected) {
        refetch();
        setLastUpdate(new Date());
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, isConnected, refetch]);

  // Connection status simulation
  useEffect(() => {
    const connectionInterval = setInterval(() => {
      setIsConnected(Math.random() > 0.1); // 90% uptime simulation
    }, 30000);

    return () => clearInterval(connectionInterval);
  }, []);

  // Calculate metrics with trends
  const realTimeMetrics: RealTimeMetric[] = metrics ? [
    {
      id: 'cpu',
      name: 'CPU Usage',
      value: metrics.systemMetrics?.cpuUsage || 0,
      unit: '%',
      trend: calculateTrend(
        metrics.systemMetrics?.cpuUsage || 0,
        previousMetrics?.systemMetrics?.cpuUsage || 0
      ),
      color: 'text-blue-600',
      icon: <Activity className="w-5 h-5" />
    },
    {
      id: 'memory',
      name: 'Memory Usage',
      value: metrics.systemMetrics?.memoryUsage || 0,
      unit: '%',
      trend: calculateTrend(
        metrics.systemMetrics?.memoryUsage || 0,
        previousMetrics?.systemMetrics?.memoryUsage || 0
      ),
      color: 'text-green-600',
      icon: <Activity className="w-5 h-5" />
    },
    {
      id: 'requests',
      name: 'Request Rate',
      value: metrics.applicationMetrics?.requestRate || 0,
      unit: 'req/s',
      trend: calculateTrend(
        metrics.applicationMetrics?.requestRate || 0,
        previousMetrics?.applicationMetrics?.requestRate || 0
      ),
      color: 'text-purple-600',
      icon: <Activity className="w-5 h-5" />
    },
    {
      id: 'response_time',
      name: 'Response Time',
      value: metrics.applicationMetrics?.responseTimeP95 || 0,
      unit: 's',
      trend: calculateTrend(
        metrics.applicationMetrics?.responseTimeP95 || 0,
        previousMetrics?.applicationMetrics?.responseTimeP95 || 0
      ),
      color: 'text-orange-600',
      icon: <Activity className="w-5 h-5" />
    },
    {
      id: 'error_rate',
      name: 'Error Rate',
      value: (metrics.applicationMetrics?.errorRate || 0) * 100,
      unit: '%',
      trend: calculateTrend(
        (metrics.applicationMetrics?.errorRate || 0) * 100,
        (previousMetrics?.applicationMetrics?.errorRate || 0) * 100
      ),
      color: 'text-red-600',
      icon: <Activity className="w-5 h-5" />
    },
    {
      id: 'active_users',
      name: 'Active Users',
      value: metrics.applicationMetrics?.activeUsers || 0,
      unit: 'users',
      trend: calculateTrend(
        metrics.applicationMetrics?.activeUsers || 0,
        previousMetrics?.applicationMetrics?.activeUsers || 0
      ),
      color: 'text-indigo-600',
      icon: <Activity className="w-5 h-5" />
    }
  ] : [];

  // Update previous metrics for trend calculation
  useEffect(() => {
    if (metrics) {
      setPreviousMetrics(metrics);
    }
  }, [metrics]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleManualRefresh = () => {
    refetch();
    setLastUpdate(new Date());
  };

  const handleRefreshIntervalChange = (interval: number) => {
    setRefreshInterval(interval);
  };

  if (isLoading && !metrics) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center">
          <RefreshCw className="w-6 h-6 text-gray-400 animate-spin mr-2" />
          <span className="text-gray-600">Loading real-time metrics...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center text-red-500">
          <WifiOff className="w-6 h-6 mr-2" />
          <span>Failed to load metrics</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Activity className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Real-Time Metrics</h2>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Connection Status */}
          <div className="flex items-center">
            {isConnected ? (
              <Wifi className="w-5 h-5 text-green-500 mr-1" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-500 mr-1" />
            )}
            <span className={`text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>

          {/* Auto-refresh Toggle */}
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-1 rounded text-sm font-medium ${
              autoRefresh 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            Auto-refresh: {autoRefresh ? 'ON' : 'OFF'}
          </button>

          {/* Refresh Interval */}
          <select
            value={refreshInterval}
            onChange={(e) => handleRefreshIntervalChange(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded text-sm"
            disabled={!autoRefresh}
          >
            <option value={1000}>1s</option>
            <option value={5000}>5s</option>
            <option value={10000}>10s</option>
            <option value={30000}>30s</option>
          </select>

          {/* Manual Refresh */}
          <button
            onClick={handleManualRefresh}
            className="flex items-center px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </button>
        </div>
      </div>

      {/* LAST UPDATE */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Clock className="w-4 h-4 mr-1" />
        Last updated: {lastUpdate.toLocaleTimeString()}
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {realTimeMetrics.map((metric) => (
          <div
            key={metric.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className={`mr-2 ${metric.color}`}>
                  {metric.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {metric.name}
                </span>
              </div>
              <div className="flex items-center">
                {getTrendIcon(metric.trend.trend)}
                <span className={`text-xs ml-1 ${getTrendColor(metric.trend.trend)}`}>
                  {metric.trend.changePercent.toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="flex items-baseline">
              <span className={`text-2xl font-bold ${metric.color}`}>
                {metric.value.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                {metric.unit}
              </span>
            </div>

            {metric.trend.previousValue !== 0 && (
              <div className="text-xs text-gray-500 mt-1">
                Previous: {metric.trend.previousValue.toFixed(2)} {metric.unit}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* STATUS BAR */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span>Live data streaming</span>
          </div>
          <div>
            Refresh interval: {refreshInterval / 1000}s
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMetrics;
