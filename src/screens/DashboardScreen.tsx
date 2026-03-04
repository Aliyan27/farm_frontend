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
import { Badge } from "@/components/ui/badge";
import {
  RefreshCw,
  AlertCircle,
  DollarSign,
  Egg,
  Package,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
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

interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
  iconBg: string;
  prefix?: string;
  badge?: string;
  loading?: boolean;
}

function MetricCard({
  title,
  value,
  icon,
  gradient,
  iconBg,
  prefix = "Rs.",
  badge,
  loading = false,
}: MetricCardProps) {
  if (loading) {
    return (
      <Card className="overflow-hidden border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-8 w-36" />
            </div>
            <Skeleton className="h-12 w-12 rounded-2xl" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group",
        gradient,
      )}
    >
      {/* Decorative background orb */}
      <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full opacity-10 bg-white blur-xl pointer-events-none" />
      <div className="absolute -right-2 -bottom-4 w-20 h-20 rounded-full opacity-5 bg-white blur-lg pointer-events-none" />

      <CardContent className="p-6 relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
              {title}
            </p>
            <p className="text-2xl font-bold text-white leading-none mt-2 truncate">
              {prefix} {value.toLocaleString()}
            </p>
            {badge && (
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="w-3 h-3 text-white/80" />
                <span className="text-xs text-white/80 font-medium">
                  {badge}
                </span>
              </div>
            )}
          </div>

          <div
            className={cn(
              "flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg",
              iconBg,
            )}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ChartCard({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <CardHeader className="pb-2 pt-5 px-6 flex flex-row items-center justify-between">
        <div className="space-y-0.5">
          <CardTitle className="text-base font-semibold tracking-tight text-foreground">
            {title}
          </CardTitle>
        </div>
        {badge && (
          <Badge
            variant="secondary"
            className="text-xs font-medium rounded-full px-2.5"
          >
            {badge}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="px-2 pb-4">{children}</CardContent>
    </Card>
  );
}

export default function DashboardScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className=" mx-auto space-y-8">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Farm Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Track production, sales, and expenses at a glance
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-lg px-3 py-1.5">
              <Label
                htmlFor="startDate"
                className="whitespace-nowrap text-xs font-medium text-muted-foreground"
              >
                From
              </Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-36 border-0 bg-transparent p-0 h-auto text-sm shadow-none focus-visible:ring-0"
              />
            </div>

            <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-lg px-3 py-1.5">
              <Label
                htmlFor="endDate"
                className="whitespace-nowrap text-xs font-medium text-muted-foreground"
              >
                To
              </Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-36 border-0 bg-transparent p-0 h-auto text-sm shadow-none focus-visible:ring-0"
              />
            </div>

            <Button
              onClick={fetchAllSummaries}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RefreshCw
                className={cn("h-3.5 w-3.5", isLoading && "animate-spin")}
              />
              Refresh
            </Button>
          </div>
        </div>

        {/* ── Error State ── */}
        {error && (
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="flex flex-col items-center py-12 gap-3 text-destructive">
              <AlertCircle className="h-10 w-10" />
              <p className="text-base font-medium">{error}</p>
              <Button
                onClick={fetchAllSummaries}
                variant="destructive"
                size="sm"
                className="mt-1"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ── Metric Cards ── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Egg Sales Revenue"
            value={eggSaleSummary?.totalRevenue ?? 0}
            icon={<DollarSign className="h-5 w-5 text-white" />}
            gradient="bg-gradient-to-br from-emerald-500 to-emerald-700"
            iconBg="bg-white/20"
            loading={isLoading}
          />
          <MetricCard
            title="Total Eggs Produced"
            value={eggProductionSummary?.totalProduced ?? 0}
            icon={<Egg className="h-5 w-5 text-white" />}
            gradient="bg-gradient-to-br from-amber-400 to-amber-600"
            iconBg="bg-white/20"
            prefix=""
            loading={isLoading}
          />
          <MetricCard
            title="Feed Purchase Cost"
            value={feedPurchaseSummary?.totalDebit ?? 0}
            icon={<Package className="h-5 w-5 text-white" />}
            gradient="bg-gradient-to-br from-orange-500 to-orange-700"
            iconBg="bg-white/20"
            loading={isLoading}
          />
          <MetricCard
            title="Total Expenses"
            value={expenseSummary?.totalExpenses ?? 0}
            icon={<TrendingUp className="h-5 w-5 text-white" />}
            gradient="bg-gradient-to-br from-rose-500 to-rose-700"
            iconBg="bg-white/20"
            loading={isLoading}
          />
        </div>

        {/* ── Charts ── */}
        {!isLoading && (
          <div className="grid gap-6 lg:grid-cols-2">
            <ChartCard title="Egg Sales Revenue" badge="Daily">
              <div className="h-72 mt-2">
                {eggSaleSummary?.graphData?.dailyRevenue?.length ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={eggSaleSummary.graphData.dailyRevenue}
                      margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="revenueGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10b981"
                            stopOpacity={0.15}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10b981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                      />
                      <XAxis
                        dataKey="date"
                        tick={{
                          fontSize: 11,
                          fill: "hsl(var(--muted-foreground))",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{
                          fontSize: 11,
                          fill: "hsl(var(--muted-foreground))",
                        }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `Rs.${(v / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                          fontSize: "12px",
                        }}
                        formatter={(value) => [
                          `Rs. ${Number(value).toLocaleString()}`,
                          "Revenue",
                        ]}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#10b981"
                        strokeWidth={2.5}
                        dot={{ r: 3, fill: "#10b981", strokeWidth: 0 }}
                        activeDot={{ r: 5, fill: "#10b981" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
                    <DollarSign className="h-8 w-8 opacity-30" />
                    <p className="text-sm">No sales data for this period</p>
                  </div>
                )}
              </div>
            </ChartCard>

            <ChartCard title="Monthly Expenses" badge="By Month">
              <div className="h-72 mt-2">
                {expenseSummary?.graphData?.monthlyTotals?.length ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={expenseSummary.graphData.monthlyTotals}
                      margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="expenseGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#f43f5e"
                            stopOpacity={0.9}
                          />
                          <stop
                            offset="100%"
                            stopColor="#e11d48"
                            stopOpacity={0.7}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                      />
                      <XAxis
                        dataKey="month"
                        tick={{
                          fontSize: 11,
                          fill: "hsl(var(--muted-foreground))",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{
                          fontSize: 11,
                          fill: "hsl(var(--muted-foreground))",
                        }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `Rs.${(v / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                          fontSize: "12px",
                        }}
                        formatter={(value) => [
                          `Rs. ${Number(value).toLocaleString()}`,
                          "Expenses",
                        ]}
                        cursor={{ fill: "hsl(var(--muted))", opacity: 0.5 }}
                      />
                      <Bar
                        dataKey="total"
                        fill="url(#expenseGrad)"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={48}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
                    <Package className="h-8 w-8 opacity-30" />
                    <p className="text-sm">No expense data for this period</p>
                  </div>
                )}
              </div>
            </ChartCard>
          </div>
        )}
      </div>
    </div>
  );
}
