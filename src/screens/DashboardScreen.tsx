// src/pages/Dashboard.tsx

import { useCallback, useEffect, useState } from "react";
import {
  getExpenseSummaryService,
  getEggProductionSummaryService,
  getEggSaleSummaryService,
  getFeedPurchaseSummaryService,
} from "@/services/dashboardService";
import { getErrorDataCase } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, AlertCircle, DollarSign, Egg, Package } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  loading?: boolean;
}

function SummaryCard({
  title,
  value,
  icon,
  color,
  loading = false,
}: SummaryCardProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-3 w-48 mt-1" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", color)}>
          Rs. {value.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Summary states
  const [expenseSummary, setExpenseSummary] = useState<any>(null);
  const [eggProductionSummary, setEggProductionSummary] = useState<any>(null);
  const [eggSaleSummary, setEggSaleSummary] = useState<any>(null);
  const [feedPurchaseSummary, setFeedPurchaseSummary] = useState<any>(null);

  const fetchAllSummaries = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const [expenses, eggProd, eggSales, feedPurchases] = await Promise.all([
        getExpenseSummaryService(startDate, endDate),
        getEggProductionSummaryService(startDate, endDate),
        getEggSaleSummaryService(startDate, endDate),
        getFeedPurchaseSummaryService(startDate, endDate),
      ]);

      setExpenseSummary(expenses.data);
      setEggProductionSummary(eggProd.data);
      setEggSaleSummary(eggSales.data);
      setFeedPurchaseSummary(feedPurchases.data);
    } catch (err) {
      setError(getErrorDataCase(err));
    } finally {
      setIsLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchAllSummaries();
  }, [fetchAllSummaries]);

  const handleRefresh = () => {
    fetchAllSummaries();
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header + Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <h1 className="text-3xl font-bold tracking-tight">Farm Dashboard</h1>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="startDate" className="whitespace-nowrap">
                From
              </Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-40"
              />
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="endDate" className="whitespace-nowrap">
                To
              </Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-40"
              />
            </div>

            <Button
              onClick={handleRefresh}
              disabled={isLoading}
              variant="outline"
              size="icon"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12 text-red-600">
            <AlertCircle className="h-12 w-12 mx-auto mb-4" />
            <p className="text-lg font-medium">{error}</p>
            <Button onClick={handleRefresh} className="mt-4">
              Try Again
            </Button>
          </div>
        )}

        {/* Loading / Content */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : (
          <div className="space-y-10">
            {/* Key Metrics – 4 Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <SummaryCard
                title="Egg Sales Revenue"
                value={eggSaleSummary?.totalRevenue ?? 0}
                icon={<DollarSign className="h-5 w-5 text-green-600" />}
                color="text-green-700"
                loading={isLoading}
              />

              <SummaryCard
                title="Total Eggs Produced"
                value={eggProductionSummary?.totalProduced ?? 0}
                icon={<Egg className="h-5 w-5 text-yellow-600" />}
                color="text-yellow-700"
                loading={isLoading}
              />

              <SummaryCard
                title="Feed Purchases Cost"
                value={feedPurchaseSummary?.totalDebit ?? 0}
                icon={<Package className="h-5 w-5 text-orange-600" />}
                color="text-orange-700"
                loading={isLoading}
              />

              <SummaryCard
                title="Total Expenses"
                value={expenseSummary?.totalExpenses ?? 0}
                icon={<AlertCircle className="h-5 w-5 text-red-600" />}
                color="text-red-700"
                loading={isLoading}
              />
            </div>

            {/* Graphs Section */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Egg Sales Revenue Over Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Egg Sales Revenue (Daily)</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  {eggSaleSummary?.graphData?.dailyRevenue?.length ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={eggSaleSummary.graphData.dailyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) =>
                            `Rs. ${value?.toLocaleString()}`
                          }
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      No sales data for this period
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Expenses by Month */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Expenses</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  {expenseSummary?.graphData?.monthlyTotals?.length ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={expenseSummary.graphData.monthlyTotals}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) =>
                            `Rs. ${value?.toLocaleString()}`
                          }
                        />
                        <Legend />
                        <Bar
                          dataKey="total"
                          fill="#ef4444"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      No expense data for this period
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
