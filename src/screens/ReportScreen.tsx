import { useCallback, useEffect, useState } from "react";
import { getIncomeStatementService } from "@/services/commonService";
import { cn, generateIncomeStatementPdf, getErrorDataCase } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp,
  TrendingDown,
  Download,
  RefreshCw,
  Calendar,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";
import toast from "react-hot-toast";

interface IncomeStatement {
  period: string;
  grossRevenue: number;
  otherIncome: number;
  totalRevenue: number;
  cogs: {
    chicken: number;
    feed: number;
    medicine: number;
    vaccine: number;
    total: number;
  };
  operatingExpenses: {
    rent: number;
    utilities: number;
    salariesPayments: number;
    mess: number;
    powerElectric: number;
    pol: number;
    packingMaterial: number;
    repairMaintenance: number;
    officeExpenses: number;
    meetingRefreshment: number;
    travellingLogistics: number;
    miscellaneous: number;
    total: number;
  };
  totalExpenses: number;
  netIncome: number;
  notes: string;
}

const formatCurrency = (value: number) =>
  `Rs. ${value.toLocaleString("en-PK")}`;

const profitMargin = (net: number, total: number) =>
  total > 0 ? ((net / total) * 100).toFixed(1) : "0.0";

export default function IncomeStatementScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [statement, setStatement] = useState<IncomeStatement | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const fetchIncomeStatement = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getIncomeStatementService({ startDate, endDate });
      if (response.message === "success") {
        setStatement(response.data);
      } else {
        toast.error("Failed to load income statement");
      }
    } catch (err) {
      toast.error(getErrorDataCase(err));
    } finally {
      setIsLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchIncomeStatement();
  }, [fetchIncomeStatement]);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-zinc-950">
      {/* Top gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400" />

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="h-5 w-5 text-amber-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Financial Report
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
              Income Statement
            </h1>
            {statement?.period && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                {statement.period}
              </p>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="startDate" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="h-3 w-3" /> From
              </Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-40 h-9 text-sm bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:ring-amber-400 focus:border-amber-400"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="endDate" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="h-3 w-3" /> To
              </Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-40 h-9 text-sm bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:ring-amber-400 focus:border-amber-400"
              />
            </div>
            <Button
              onClick={fetchIncomeStatement}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="h-9 gap-2 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <RefreshCw className={cn("h-3.5 w-3.5", isLoading && "animate-spin")} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : statement ? (
          <StatementView data={statement} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

function StatementView({ data }: { data: IncomeStatement }) {
  const { grossRevenue, otherIncome, totalRevenue, cogs, operatingExpenses, totalExpenses, netIncome, notes } = data;
  const isProfit = netIncome >= 0;
  const margin = profitMargin(netIncome, totalRevenue);

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard
          label="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon={<ArrowUpRight className="h-4 w-4 text-emerald-500" />}
          accent="emerald"
          sub={`Gross: ${formatCurrency(grossRevenue)}`}
        />
        <KpiCard
          label="Total Expenses"
          value={formatCurrency(totalExpenses)}
          icon={<ArrowDownRight className="h-4 w-4 text-rose-500" />}
          accent="rose"
          sub={`COGS + Operating`}
        />
        <KpiCard
          label="Net Income"
          value={formatCurrency(netIncome)}
          icon={isProfit
            ? <TrendingUp className="h-4 w-4 text-emerald-500" />
            : <TrendingDown className="h-4 w-4 text-rose-500" />
          }
          accent={isProfit ? "emerald" : "rose"}
          sub={`Margin: ${margin}%`}
          highlight
          profit={isProfit}
        />
      </div>

      {/* Revenue Breakdown */}
      <SectionCard title="Revenue" badge="Income">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-zinc-100 dark:divide-zinc-800">
          <LineItem label="Gross Revenue" value={formatCurrency(grossRevenue)} />
          <LineItem label="Other Income" value={formatCurrency(otherIncome)} className="sm:px-6" />
          <LineItem label="Total Revenue" value={formatCurrency(totalRevenue)} className="sm:pl-6" bold />
        </div>
      </SectionCard>

      {/* COGS */}
      <SectionCard title="Cost of Goods Sold" badge="COGS" badgeVariant="destructive">
        <div className="space-y-1">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 pb-4">
            {[
              { label: "Chicken", value: cogs.chicken },
              { label: "Feed", value: cogs.feed },
              { label: "Medicine", value: cogs.medicine },
              { label: "Vaccine", value: cogs.vaccine },
            ].map(({ label, value }) => (
              <MiniStat key={label} label={label} value={formatCurrency(value)} />
            ))}
          </div>
          <Separator className="bg-zinc-100 dark:bg-zinc-800" />
          <div className="pt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Total COGS</span>
              <span className="text-base font-bold text-rose-600">{formatCurrency(cogs.total)}</span>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Operating Expenses" badge="OpEx" badgeVariant="destructive">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4 pb-4">
          {[
            { label: "Rent", value: operatingExpenses.rent },
            { label: "Utilities", value: operatingExpenses.utilities },
            { label: "Salaries", value: operatingExpenses.salariesPayments },
            { label: "Mess", value: operatingExpenses.mess },
            { label: "Power / Electric", value: operatingExpenses.powerElectric },
            { label: "POL", value: operatingExpenses.pol },
            { label: "Packing Material", value: operatingExpenses.packingMaterial },
            { label: "Repair & Maintenance", value: operatingExpenses.repairMaintenance },
            { label: "Office Expenses", value: operatingExpenses.officeExpenses },
            { label: "Meeting Refreshment", value: operatingExpenses.meetingRefreshment },
            { label: "Travelling & Logistics", value: operatingExpenses.travellingLogistics },
            { label: "Miscellaneous", value: operatingExpenses.miscellaneous },
          ].map(({ label, value }) => (
            <MiniStat key={label} label={label} value={formatCurrency(value)} />
          ))}
        </div>
        <Separator className="bg-zinc-100 dark:bg-zinc-800" />
        <div className="pt-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Total Operating Expenses</span>
            <span className="text-base font-bold text-rose-600">{formatCurrency(operatingExpenses.total)}</span>
          </div>
        </div>
      </SectionCard>

      <Card className="bg-zinc-900 dark:bg-zinc-800 border-0 text-white shadow-xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Summary</p>
              <p className="text-sm text-zinc-300 max-w-md">{notes}</p>
            </div>
            <div className="flex flex-col sm:items-end gap-1 shrink-0">
              <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Net Income</span>
              <span className={cn(
                "text-3xl font-bold tabular-nums",
                isProfit ? "text-emerald-400" : "text-rose-400"
              )}>
                {formatCurrency(netIncome)}
              </span>
              <Badge
                variant="outline"
                className={cn(
                  "text-xs border",
                  isProfit
                    ? "border-emerald-500 text-emerald-400"
                    : "border-rose-500 text-rose-400"
                )}
              >
                {isProfit ? "▲" : "▼"} {Math.abs(Number(margin))}% margin
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>


      <div className="flex justify-end">
        <Button
          onClick={() => generateIncomeStatementPdf(data)}
          className="gap-2 bg-amber-500 hover:bg-amber-600 text-white shadow-md font-semibold px-6"
        >
          <Download className="h-4 w-4" />
          Download PDF Report
        </Button>
      </div>
    </div>
  );
}


function KpiCard({
  label,
  value,
  icon,
  sub,
  highlight = false,
  profit,
  accent,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  sub?: string;
  highlight?: boolean;
  profit?: boolean;
  accent: "emerald" | "rose";
}) {
  return (
    <div className={cn(
      "rounded-xl border p-5 shadow-sm bg-white dark:bg-zinc-900 flex flex-col gap-3 transition-all",
      highlight && profit && "ring-1 ring-emerald-200 dark:ring-emerald-900",
      highlight && !profit && "ring-1 ring-rose-200 dark:ring-rose-900",
    )}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">{label}</span>
        <div className={cn(
          "h-7 w-7 rounded-full flex items-center justify-center",
          accent === "emerald" ? "bg-emerald-50 dark:bg-emerald-950" : "bg-rose-50 dark:bg-rose-950"
        )}>
          {icon}
        </div>
      </div>
      <span className={cn(
        "text-2xl font-bold tabular-nums tracking-tight",
        highlight && profit ? "text-emerald-600 dark:text-emerald-400"
          : highlight && !profit ? "text-rose-600 dark:text-rose-400"
          : "text-zinc-800 dark:text-zinc-100"
      )}>
        {value}
      </span>
      {sub && <span className="text-xs text-zinc-400">{sub}</span>}
    </div>
  );
}

function SectionCard({
  title,
  badge,
  badgeVariant = "secondary",
  children,
}: {
  title: string;
  badge?: string;
  badgeVariant?: "secondary" | "destructive";
  children: React.ReactNode;
}) {
  return (
    <Card className="border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">{title}</h3>
          {badge && (
            <Badge variant={badgeVariant} className="text-xs tracking-wider font-semibold px-2.5">
              {badge}
            </Badge>
          )}
        </div>
        <Separator className="bg-zinc-100 dark:bg-zinc-800" />
        {children}
      </CardContent>
    </Card>
  );
}

function LineItem({
  label,
  value,
  bold = false,
  className,
}: {
  label: string;
  value: string;
  bold?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("py-3 space-y-1", className)}>
      <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{label}</p>
      <p className={cn("text-lg tabular-nums", bold ? "font-bold text-zinc-900 dark:text-zinc-50" : "font-medium text-zinc-700 dark:text-zinc-200")}>
        {value}
      </p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <p className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider truncate">{label}</p>
      <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 tabular-nums">{value}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-3">
      <div className="h-14 w-14 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
        <Minus className="h-6 w-6 text-zinc-400" />
      </div>
      <p className="font-semibold text-zinc-600 dark:text-zinc-300">No data for this period</p>
      <p className="text-sm text-zinc-400">Adjust the date range and hit Refresh</p>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-28 rounded-xl" />
        <Skeleton className="h-28 rounded-xl" />
        <Skeleton className="h-28 rounded-xl" />
      </div>
      <Skeleton className="h-28 rounded-xl" />
      <Skeleton className="h-52 rounded-xl" />
      <Skeleton className="h-72 rounded-xl" />
      <Skeleton className="h-20 rounded-xl" />
    </div>
  );
}