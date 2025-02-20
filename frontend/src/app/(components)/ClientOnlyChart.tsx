"use client";

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// Dynamically import Recharts components with no SSR
const AreaChart = dynamic(
  () => import('recharts').then((mod) => mod.AreaChart),
  { ssr: false }
);

const LineChart = dynamic(
  () => import('recharts').then((mod) => mod.LineChart),
  { ssr: false }
);

const ResponsiveContainer = dynamic(
  () => import('recharts').then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);

const Area = dynamic(
  () => import('recharts').then((mod) => mod.Area),
  { ssr: false }
);

const Line = dynamic(
  () => import('recharts').then((mod) => mod.Line),
  { ssr: false }
);

const XAxis = dynamic(
  () => import('recharts').then((mod) => mod.XAxis),
  { ssr: false }
);

const YAxis = dynamic(
  () => import('recharts').then((mod) => mod.YAxis),
  { ssr: false }
);

const CartesianGrid = dynamic(
  () => import('recharts').then((mod) => mod.CartesianGrid),
  { ssr: false }
);

const Tooltip = dynamic(
  () => import('recharts').then((mod) => mod.Tooltip),
  { ssr: false }
);

const Legend = dynamic(
  () => import('recharts').then((mod) => mod.Legend),
  { ssr: false }
);

// Export all components
export {
  AreaChart,
  LineChart,
  ResponsiveContainer,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
};
