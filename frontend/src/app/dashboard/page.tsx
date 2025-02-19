import CardSystemPerformance from "./CardSalesSummary";
import CardApplicationMetrics from "./CardPurchaseSummary";
import CardExpenseSummary from "./CardExpenseSummary";
import CardPopularProducts from "./CardPopularProducts";
import StatCard from "./StatCard";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Real-Time Metrics - Full Width */}
      <div className="w-full">
        <RealTimeMetrics />
      </div>
      
      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 custom-grid-rows">
        {/* System Performance - Large Card */}
        <div className="md:col-span-2 xl:col-span-2">
          <CardSystemPerformance />
        </div>
        
        {/* Application Metrics */}
        <div className="md:col-span-2 xl:col-span-2">
          <CardApplicationMetrics />
        </div>
        
        {/* Business Metrics Cards */}
        <StatCard
          title="Business Overview"
          primaryIcon={<DollarSign className="w-8 h-8 text-green-500" />}
          details={[
            {
              title: "Total Revenue",
              amount: "$125,430",
              changePercentage: 12.5,
              IconComponent: TrendingUp
            },
            {
              title: "Active Users",
              amount: "1,250",
              changePercentage: 8.2,
              IconComponent: Users
            },
            {
              title: "Conversion Rate",
              amount: "3.2%",
              changePercentage: -2.1,
              IconComponent: Activity
            }
          ]}
          dateRange="Last 30 days"
        />
        
        {/* Expense Summary */}
        <div className="md:col-span-2 xl:col-span-1">
          <CardExpenseSummary />
        </div>
        
        {/* Popular Products */}
        <div className="md:col-span-2 xl:col-span-1">
          <CardPopularProducts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;