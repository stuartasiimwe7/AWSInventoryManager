"use client";

import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingDown, TrendingUp, Activity, Clock, Users, AlertTriangle } from "lucide-react";
import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/app/(components)/ClientOnlyChart";

const CardApplicationMetrics = () => {
  const { data, isLoading } = useGetDashboardMetricsQuery();
  const appMetrics = data?.applicationMetrics;

  // Mock time series data for application metrics
  const appData = [
    { time: "00:00", requests: 120, responseTime: 0.25, errors: 2 },
    { time: "00:15", requests: 135, responseTime: 0.28, errors: 1 },
    { time: "00:30", requests: 142, responseTime: 0.31, errors: 3 },
    { time: "00:45", requests: 158, responseTime: 0.29, errors: 2 },
    { time: "01:00", requests: 145, responseTime: 0.27, errors: 1 },
  ];

  return (
    <div className="flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Application Metrics
            </h2>
            <hr />
          </div>

          {/* BODY */}
          <div>
            {/* METRICS OVERVIEW */}
            <div className="grid grid-cols-2 gap-3 px-7 mt-5 mb-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-400">Request Rate</p>
                  <p className="text-sm font-bold">{appMetrics?.requestRate || 0}/s</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-xs text-gray-400">Response Time</p>
                  <p className="text-sm font-bold">{appMetrics?.responseTimeP95 || 0}ms</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-500" />
                <div>
                  <p className="text-xs text-gray-400">Active Users</p>
                  <p className="text-sm font-bold">{appMetrics?.activeUsers || 0}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <div>
                  <p className="text-xs text-gray-400">Error Rate</p>
                  <p className="text-sm font-bold">{appMetrics?.errorRate || 0}%</p>
                </div>
              </div>
            </div>

            {/* CHART */}
            <ResponsiveContainer width="100%" height={150} className="p-2">
              <AreaChart
                data={appData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="time" tick={false} axisLine={false} />
                <YAxis tickLine={false} tick={false} axisLine={false} />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    value,
                    name === "requests" ? "Requests" : 
                    name === "responseTime" ? "Response Time (s)" : "Errors"
                  ]}
                />
                <Area
                  type="linear"
                  dataKey="requests"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default CardApplicationMetrics;