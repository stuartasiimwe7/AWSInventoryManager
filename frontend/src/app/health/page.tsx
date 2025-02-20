'use client';

import { useState, useEffect } from 'react';

interface HealthStatus {
  status: string;
  service: string;
  timestamp: string;
}

interface ReadinessStatus {
  status: string;
}

interface LivenessStatus {
  status: string;
}

export default function HealthPage() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [readinessStatus, setReadinessStatus] = useState<ReadinessStatus | null>(null);
  const [livenessStatus, setLivenessStatus] = useState<LivenessStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealthData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [healthRes, readinessRes, livenessRes] = await Promise.all([
        fetch('/api/v1/health/'),
        fetch('/api/v1/health/ready'),
        fetch('/api/v1/health/live')
      ]);

      if (!healthRes.ok || !readinessRes.ok || !livenessRes.ok) {
        throw new Error('Failed to fetch health data');
      }

      const [health, readiness, liveness] = await Promise.all([
        healthRes.json(),
        readinessRes.json(),
        livenessRes.json()
      ]);

      setHealthStatus(health);
      setReadinessStatus(readiness);
      setLivenessStatus(liveness);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthData();
    const interval = setInterval(fetchHealthData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'healthy':
      case 'ready':
      case 'alive':
        return 'text-green-600 bg-green-100';
      case 'unhealthy':
      case 'not ready':
      case 'dead':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">System Health Monitoring</h1>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">System Health Monitoring</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
        <button
          onClick={fetchHealthData}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">System Health Monitoring</h1>
        <button
          onClick={fetchHealthData}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Health Check */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Health Check</h2>
          {healthStatus && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Status:</span>
                <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(healthStatus.status)}`}>
                  {healthStatus.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Service:</span>
                <span className="text-gray-600">{healthStatus.service}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Timestamp:</span>
                <span className="text-gray-600 text-sm">
                  {new Date(healthStatus.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Readiness Check */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Readiness Check</h2>
          {readinessStatus && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Status:</span>
                <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(readinessStatus.status)}`}>
                  {readinessStatus.status}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Liveness Check */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Liveness Check</h2>
          {livenessStatus && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Status:</span>
                <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(livenessStatus.status)}`}>
                  {livenessStatus.status}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        Last updated: {new Date().toLocaleString()}
      </div>
    </div>
  );
}
