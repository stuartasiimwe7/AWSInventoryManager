
"use client";

import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingUp, Cpu, MemoryStick, HardDrive, Wifi } from "lucide-react";
import React, { useState } from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/app/(components)/ClientOnlyChart";

const CardSystemPerformance = () => {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();
  const systemMetrics = data?.systemMetrics;

  const [timeframe, setTimeframe] = useState("1h");

  // Mock time series data for system metrics
  const systemData = [
    { time: "00:00", cpu: 45, memory: 67, disk: 23, network: 125 },
    { time: "00:15", cpu: 52, memory: 69, disk: 24, network: 142 },
    { time: "00:30", cpu: 48, memory: 71, disk: 25, network: 138 },
    { time: "00:45", cpu: 55, memory: 68, disk: 26, network: 156 },
    { time: "01:00", cpu: 49, memory: 70, disk: 27, network: 149 },
  ];

  if (isError) {
    return <div className="m-5">Failed to fetch data</div>;
  }

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              System Performance
            </h2>
            <hr />
          </div>

          {/* BODY */}
          <div>
            {/* METRICS OVERVIEW */}
            <div className="grid grid-cols-2 gap-4 px-7 mt-5 mb-6">
              <div className="flex items-center space-x-3">
                <Cpu className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-400">CPU Usage</p>
                  <p className="text-lg font-bold">{systemMetrics?.cpuUsage || 0}%</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MemoryStick className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-xs text-gray-400">Memory</p>
                  <p className="text-lg font-bold">{systemMetrics?.memoryUsage || 0}%</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <HardDrive className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-xs text-gray-400">Disk Usage</p>
                  <p className="text-lg font-bold">{systemMetrics?.diskUsage || 0}%</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Wifi className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-xs text-gray-400">Network I/O</p>
                  <p className="text-lg font-bold">{systemMetrics?.networkIO || 0} MB/s</p>
                </div>
              </div>
            </div>

            {/* CHART */}
            <ResponsiveContainer width="100%" height={300} className="px-7">
              <LineChart data={systemData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="memory" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="disk" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="network" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* FOOTER */}
          <div>
            <hr />
            <div className="flex justify-between items-center mt-6 text-sm px-7 mb-4">
              <p>Last updated: {new Date().toLocaleTimeString()}</p>
              <p className="text-sm">
                Status: <span className="font-bold text-green-500">Healthy</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardSystemPerformance;
