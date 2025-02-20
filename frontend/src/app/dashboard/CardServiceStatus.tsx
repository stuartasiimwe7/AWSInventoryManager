'use client';

import { useGetDashboardMetricsQuery } from "@/state/api";
import { Server, Database, Globe, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import React from "react";

const CardServiceStatus = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  return (
    <div className="pb-4">
      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <>
          <div className="overflow-auto h-full">
            {[
              { name: "API Gateway", status: "healthy", icon: Server },
              { name: "Database", status: "healthy", icon: Database },
              { name: "Prometheus", status: "healthy", icon: Globe },
              { name: "Grafana", status: "warning", icon: Globe },
              { name: "AlertManager", status: "healthy", icon: Server }
            ].map((service, index) => {
              const IconComponent = service.icon;
              const getStatusIcon = (status: string) => {
                switch (status) {
                  case 'healthy':
                    return <CheckCircle className="w-4 h-4 text-green-500" />;
                  case 'warning':
                    return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
                  case 'critical':
                    return <XCircle className="w-4 h-4 text-red-500" />;
                  default:
                    return <CheckCircle className="w-4 h-4 text-gray-500" />;
                }
              };
              
              return (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 px-5 py-7 border-b"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex flex-col justify-between gap-1">
                      <div className="font-bold text-gray-700">
                        {service.name}
                      </div>
                      <div className="flex text-sm items-center">
                        <span className="text-gray-500 text-xs">
                          Monitoring Service
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs flex items-center">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(service.status)}
                      <span className={`text-sm font-medium ${
                        service.status === 'healthy' ? 'text-green-600' :
                        service.status === 'warning' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {service.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CardServiceStatus;