'use client';

import { useState, useEffect } from 'react';
import Header from "@/app/(components)/Header";
import { 
  Webhook, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  RefreshCw,
  ExternalLink,
  Activity,
  Bell,
  Zap
} from "lucide-react";

interface WebhookEvent {
  id: string;
  timestamp: string;
  source: string;
  status: 'success' | 'error' | 'pending';
  alertName: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  responseTime: number;
}

interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  status: 'active' | 'inactive' | 'error';
  lastTriggered: string;
  totalTriggers: number;
  successRate: number;
}

const WebhookManagement = () => {
  const [webhookEvents, setWebhookEvents] = useState<WebhookEvent[]>([]);
  const [webhookConfigs, setWebhookConfigs] = useState<WebhookConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'events' | 'config'>('events');

  // Mock data for demonstration
  useEffect(() => {
    const mockEvents: WebhookEvent[] = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        source: 'AlertManager',
        status: 'success',
        alertName: 'High CPU Usage',
        severity: 'critical',
        message: 'CPU usage exceeded 90% for 5 minutes',
        responseTime: 245
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        source: 'Prometheus',
        status: 'success',
        alertName: 'Memory Leak Detected',
        severity: 'warning',
        message: 'Memory usage growing continuously',
        responseTime: 189
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        source: 'Grafana',
        status: 'error',
        alertName: 'Database Connection Failed',
        severity: 'critical',
        message: 'Unable to connect to primary database',
        responseTime: 5000
      }
    ];

    const mockConfigs: WebhookConfig[] = [
      {
        id: '1',
        name: 'Slack Notifications',
        url: 'https://hooks.slack.com/services/...',
        status: 'active',
        lastTriggered: new Date().toISOString(),
        totalTriggers: 1247,
        successRate: 98.5
      },
      {
        id: '2',
        name: 'Email Alerts',
        url: 'https://api.sendgrid.com/v3/mail/send',
        status: 'active',
        lastTriggered: new Date(Date.now() - 1800000).toISOString(),
        totalTriggers: 892,
        successRate: 99.2
      },
      {
        id: '3',
        name: 'PagerDuty Integration',
        url: 'https://events.pagerduty.com/v2/enqueue',
        status: 'inactive',
        lastTriggered: new Date(Date.now() - 86400000).toISOString(),
        totalTriggers: 156,
        successRate: 95.8
      }
    ];

    setTimeout(() => {
      setWebhookEvents(mockEvents);
      setWebhookConfigs(mockConfigs);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'pending':
      case 'inactive':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const testWebhook = (configId: string) => {
    // Mock webhook test
    console.log(`Testing webhook ${configId}`);
  };

  if (loading) {
    return (
      <div className="p-6">
        <Header name="Webhook Management" />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Header name="Webhook Management" />
        <button
          onClick={handleRefresh}
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <RefreshCw className="w-5 h-5 mr-2" /> Refresh
        </button>
      </div>

      {/* TABS */}
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'events'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Bell className="w-4 h-4 inline mr-2" />
          Recent Events
        </button>
        <button
          onClick={() => setActiveTab('config')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'config'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Webhook className="w-4 h-4 inline mr-2" />
          Webhook Configs
        </button>
      </div>

      {/* EVENTS TAB */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="flex items-center">
                <Bell className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Total Events</p>
                  <p className="text-2xl font-bold text-blue-600">{webhookEvents.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Successful</p>
                  <p className="text-2xl font-bold text-green-600">
                    {webhookEvents.filter(e => e.status === 'success').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Failed</p>
                  <p className="text-2xl font-bold text-red-600">
                    {webhookEvents.filter(e => e.status === 'error').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="flex items-center">
                <Zap className="w-8 h-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Avg Response</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {(webhookEvents.reduce((acc, e) => acc + e.responseTime, 0) / webhookEvents.length).toFixed(0)}ms
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Recent Webhook Events</h3>
            </div>
            <div className="divide-y">
              {webhookEvents.map((event) => (
                <div key={event.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(event.status)}
                      <div>
                        <h4 className="font-medium text-gray-900">{event.alertName}</h4>
                        <p className="text-sm text-gray-600">{event.message}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">{event.source}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">
                            {new Date(event.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(event.severity)}`}>
                        {event.severity.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">{event.responseTime}ms</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONFIG TAB */}
      {activeTab === 'config' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="flex items-center">
                <Webhook className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Total Webhooks</p>
                  <p className="text-2xl font-bold text-blue-600">{webhookConfigs.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-green-600">
                    {webhookConfigs.filter(c => c.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="flex items-center">
                <Activity className="w-8 h-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Avg Success Rate</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {(webhookConfigs.reduce((acc, c) => acc + c.successRate, 0) / webhookConfigs.length).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {webhookConfigs.map((config) => (
              <div key={config.id} className="bg-white rounded-lg shadow border p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    {getStatusIcon(config.status)}
                    <h3 className="text-lg font-semibold text-gray-900 ml-2">
                      {config.name}
                    </h3>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    config.status === 'active' ? 'bg-green-100 text-green-800' :
                    config.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {config.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="text-sm">
                    <span className="text-gray-500">URL:</span>
                    <div className="font-mono text-xs bg-gray-100 p-2 rounded mt-1 break-all">
                      {config.url}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Triggers:</span>
                    <span className="font-medium">{config.totalTriggers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Success Rate:</span>
                    <span className="font-medium">{config.successRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Last Triggered:</span>
                    <span className="font-medium text-xs">
                      {new Date(config.lastTriggered).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => testWebhook(config.id)}
                    className="flex-1 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded"
                  >
                    Test
                  </button>
                  <button className="flex-1 bg-gray-500 hover:bg-gray-700 text-white text-sm font-medium py-2 px-3 rounded">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WebhookManagement;
