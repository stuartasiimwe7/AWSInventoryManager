"use client";

import { useGetDashboardMetricsQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Play, 
  Pause,
  BarChart3,
  TrendingUp,
  Activity
} from "lucide-react";

interface MetricQuery {
  id: string;
  name: string;
  query: string;
  value: number;
  unit: string;
  status: 'active' | 'paused' | 'error';
  lastUpdate: string;
  description: string;
}

const MetricsExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const { data: metrics, isLoading, isError } = useGetDashboardMetricsQuery();

  const metricQueries: MetricQuery[] = [
    {
      id: "1",
      name: "http_requests_total",
      query: "rate(http_requests_total[5m])",
      value: metrics?.applicationMetrics?.requestRate || 0,
      unit: "req/s",
      status: 'active',
      lastUpdate: new Date().toLocaleTimeString(),
      description: "Total HTTP requests per second"
    },
    {
      id: "2", 
      name: "http_request_duration_seconds",
      query: "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
      value: metrics?.applicationMetrics?.responseTimeP95 || 0,
      unit: "s",
      status: 'active',
      lastUpdate: new Date().toLocaleTimeString(),
      description: "95th percentile response time"
    },
    {
      id: "3",
      name: "http_requests_errors",
      query: "rate(http_requests_total{status=~\"5..\"}[5m]) / rate(http_requests_total[5m])",
      value: (metrics?.applicationMetrics?.errorRate || 0) * 100,
      unit: "%",
      status: 'active',
      lastUpdate: new Date().toLocaleTimeString(),
      description: "Error rate percentage"
    },
    {
      id: "4",
      name: "node_cpu_usage",
      query: "100 - (avg by (instance) (rate(node_cpu_seconds_total{mode=\"idle\"}[5m])) * 100)",
      value: metrics?.systemMetrics?.cpuUsage || 0,
      unit: "%",
      status: 'active',
      lastUpdate: new Date().toLocaleTimeString(),
      description: "CPU usage percentage"
    },
    {
      id: "5",
      name: "node_memory_usage",
      query: "(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100",
      value: metrics?.systemMetrics?.memoryUsage || 0,
      unit: "%",
      status: 'active',
      lastUpdate: new Date().toLocaleTimeString(),
      description: "Memory usage percentage"
    },
    {
      id: "6",
      name: "node_disk_usage",
      query: "100 - ((node_filesystem_avail_bytes * 100) / node_filesystem_size_bytes)",
      value: metrics?.systemMetrics?.diskUsage || 0,
      unit: "%",
      status: 'active',
      lastUpdate: new Date().toLocaleTimeString(),
      description: "Disk usage percentage"
    },
    {
      id: "7",
      name: "active_users",
      query: "sum(active_users_total)",
      value: metrics?.applicationMetrics?.activeUsers || 0,
      unit: "users",
      status: 'active',
      lastUpdate: new Date().toLocaleTimeString(),
      description: "Currently active users"
    },
    {
      id: "8",
      name: "total_users",
      query: "sum(user_registrations_total)",
      value: metrics?.businessMetrics?.totalUsers || 0,
      unit: "users",
      status: 'active',
      lastUpdate: new Date().toLocaleTimeString(),
      description: "Total registered users"
    }
  ];

  const filteredMetrics = metricQueries.filter(metric =>
    metric.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    metric.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: GridColDef[] = [
    { 
      field: "name", 
      headerName: "Metric Name", 
      width: 200,
      renderCell: (params) => (
        <div className="flex items-center">
          <Activity className="w-4 h-4 mr-2 text-blue-500" />
          <span className="font-mono text-sm">{params.value}</span>
        </div>
      )
    },
    { 
      field: "query", 
      headerName: "PromQL Query", 
      width: 300,
      renderCell: (params) => (
        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
          {params.value}
        </span>
      )
    },
    {
      field: "value",
      headerName: "Current Value",
      width: 120,
      type: "number",
      renderCell: (params) => (
        <div className="flex items-center">
          <span className="font-bold text-lg">{params.value.toFixed(2)}</span>
          <span className="text-sm text-gray-500 ml-1">{params.row.unit}</span>
        </div>
      )
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          params.value === 'active' ? 'bg-green-100 text-green-800' :
          params.value === 'paused' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {params.value.toUpperCase()}
        </span>
      )
    },
    {
      field: "lastUpdate",
      headerName: "Last Update",
      width: 120,
      renderCell: (params) => (
        <span className="text-sm text-gray-600">{params.value}</span>
      )
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      renderCell: (params) => (
        <span className="text-sm text-gray-700">{params.value}</span>
      )
    }
  ];

  const handleExportMetrics = () => {
    const csvContent = [
      ['Metric Name', 'Query', 'Value', 'Unit', 'Status', 'Last Update', 'Description'],
      ...filteredMetrics.map(metric => [
        metric.name,
        metric.query,
        metric.value,
        metric.unit,
        metric.status,
        metric.lastUpdate,
        metric.description
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'metrics-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return <div className="py-4">Loading metrics...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch metrics data
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Metrics Explorer" />
      
      {/* SEARCH AND FILTER BAR */}
      <div className="flex items-center gap-4 mb-4 mt-5">
        <div className="flex items-center border-2 border-gray-200 rounded flex-1">
          <Search className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search metrics by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleExportMetrics}
        >
          <Download className="w-5 h-5 mr-2" /> Export
        </button>
      </div>

      {/* METRICS OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <BarChart3 className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Metrics</p>
              <p className="text-2xl font-bold text-blue-600">{metricQueries.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Active Queries</p>
              <p className="text-2xl font-bold text-green-600">
                {metricQueries.filter(m => m.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <Activity className="w-8 h-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Filtered Results</p>
              <p className="text-2xl font-bold text-purple-600">{filteredMetrics.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <Play className="w-8 h-8 text-orange-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Selected</p>
              <p className="text-2xl font-bold text-orange-600">{selectedMetrics.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* METRICS TABLE */}
      <DataGrid
        rows={filteredMetrics}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => setSelectedMetrics(newSelection as string[])}
        className="bg-white shadow rounded-lg border border-gray-200 !text-gray-700"
        autoHeight
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default MetricsExplorer;