import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, Package, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface FeedSummaryProps {
  totalDebit: number;
  totalCredit: number;
  totalBags: number;
  currentBalance: number;
}

const fmt = (v: number) => `Rs. ${v.toLocaleString("en-PK")}`;

export function FeedSummaryCard({
  totalDebit,
  totalCredit,
  totalBags,
  currentBalance,
}: FeedSummaryProps) {
  const isNegative = currentBalance < 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Debit */}
      <FeedKpiCard
        label="Total Debit"
        value={fmt(totalDebit)}
        sub="Paid for feed purchases"
        gradientFrom="from-rose-400"
        gradientTo="to-red-400"
        iconBg="bg-rose-50 dark:bg-rose-950"
        icon={<ArrowUpRight className="h-4 w-4 text-rose-500" />}
        badge={{ label: "Outflow", className: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800" }}
      />

      {/* Total Credit */}
      <FeedKpiCard
        label="Total Credit"
        value={fmt(totalCredit)}
        sub="Received / refunded"
        gradientFrom="from-emerald-400"
        gradientTo="to-teal-400"
        iconBg="bg-emerald-50 dark:bg-emerald-950"
        icon={<ArrowDownRight className="h-4 w-4 text-emerald-500" />}
        badge={{ label: "Inflow", className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800" }}
      />

      {/* Total Bags */}
      <FeedKpiCard
        label="Total Bags"
        value={totalBags.toLocaleString()}
        sub="Feed quantity purchased"
        gradientFrom="from-amber-400"
        gradientTo="to-orange-400"
        iconBg="bg-amber-50 dark:bg-amber-950"
        icon={<Package className="h-4 w-4 text-amber-500" />}
        badge={{ label: "Inventory", className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800" }}
        valueClass="text-zinc-900 dark:text-zinc-50"
      />

      {/* Current Balance */}
      <FeedKpiCard
        label="Current Balance"
        value={fmt(currentBalance)}
        sub={isNegative ? "Amount payable" : "Net surplus"}
        gradientFrom={isNegative ? "from-rose-500" : "from-emerald-400"}
        gradientTo={isNegative ? "to-red-500" : "to-teal-400"}
        iconBg={isNegative ? "bg-rose-50 dark:bg-rose-950" : "bg-emerald-50 dark:bg-emerald-950"}
        icon={isNegative
          ? <TrendingDown className="h-4 w-4 text-rose-500" />
          : <TrendingUp className="h-4 w-4 text-emerald-500" />
        }
        badge={isNegative
          ? { label: "Payable", className: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800" }
          : { label: "Surplus", className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800" }
        }
        valueClass={isNegative ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}
        highlight
        negative={isNegative}
      />
    </div>
  );
}

interface FeedKpiCardProps {
  label: string;
  value: string;
  sub: string;
  gradientFrom: string;
  gradientTo: string;
  iconBg: string;
  icon: React.ReactNode;
  badge: { label: string; className: string };
  valueClass?: string;
  highlight?: boolean;
  negative?: boolean;
}

function FeedKpiCard({
  label,
  value,
  sub,
  gradientFrom,
  gradientTo,
  iconBg,
  icon,
  badge,
  valueClass = "text-zinc-900 dark:text-zinc-50",
  highlight = false,
  negative,
}: FeedKpiCardProps) {
  return (
    <Card className={[
      "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm rounded-xl overflow-hidden",
      highlight && negative ? "ring-1 ring-rose-200 dark:ring-rose-900" : "",
      highlight && !negative ? "ring-1 ring-emerald-200 dark:ring-emerald-900" : "",
    ].join(" ")}>
      <div className={`h-1 w-full bg-gradient-to-r ${gradientFrom} ${gradientTo}`} />
      <CardContent className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            {label}
          </span>
          <div className={`h-7 w-7 rounded-full ${iconBg} flex items-center justify-center`}>
            {icon}
          </div>
        </div>
        <div>
          <p className={`text-2xl font-bold tabular-nums ${valueClass}`}>
            {value}
          </p>
          <p className="text-xs text-zinc-400 mt-1 font-medium">{sub}</p>
        </div>
        <Badge
          variant="secondary"
          className={`text-[11px] border ${badge.className}`}
        >
          {badge.label}
        </Badge>
      </CardContent>
    </Card>
  );
}