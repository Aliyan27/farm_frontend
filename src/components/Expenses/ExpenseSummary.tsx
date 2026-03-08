import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building2, Trophy, ArrowDownRight, Flame } from "lucide-react";

interface ExpenseSummaryProps {
  total: number;
  byHead: Array<{
    _sum: { expenseCost: number };
    head: string;
  }>;
  byFarm: Array<{
    _sum: { expenseCost: number };
    farm: string;
  }>;
}

const fmt = (v: number) =>
  `Rs. ${v.toLocaleString("en-PK", { minimumFractionDigits: 2 })}`;

const fmtShort = (v: number) => `Rs. ${v.toLocaleString("en-PK")}`;

export function ExpenseSummaryCard({ total, byHead, byFarm }: ExpenseSummaryProps) {
  const sortedByHead = [...byHead].sort(
    (a, b) => b._sum.expenseCost - a._sum.expenseCost
  );
  const topHead = sortedByHead[0] ?? null;

  const maxFarmCost = Math.max(
    ...byFarm.map((f) => f._sum.expenseCost ?? 0),
    1
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Expenses */}
      <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm rounded-xl overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-rose-500 to-red-400" />
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Total Expenses
            </span>
            <div className="h-7 w-7 rounded-full bg-rose-50 dark:bg-rose-950 flex items-center justify-center">
              <ArrowDownRight className="h-4 w-4 text-rose-500" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold tabular-nums text-rose-600 dark:text-rose-400">
              {fmt(total)}
            </p>
            <p className="text-xs text-zinc-400 mt-1 font-medium">
              All recorded expenses
            </p>
          </div>
          <Badge
            variant="secondary"
            className="text-[11px] border bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800"
          >
            Selected period
          </Badge>
        </CardContent>
      </Card>

      {/* Highest Category */}
      <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm rounded-xl overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-400" />
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Highest Category
            </span>
            <div className="h-7 w-7 rounded-full bg-amber-50 dark:bg-amber-950 flex items-center justify-center">
              <Flame className="h-4 w-4 text-amber-500" />
            </div>
          </div>

          {topHead ? (
            <div>
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50 capitalize">
                {topHead.head.replace(/_/g, " ")}
              </p>
              <p className="text-xl font-bold tabular-nums text-amber-600 dark:text-amber-400 mt-0.5">
                {fmtShort(topHead._sum.expenseCost)}
              </p>
              <p className="text-xs text-zinc-400 mt-1 font-medium">
                Largest expense head
              </p>
            </div>
          ) : (
            <p className="text-sm text-zinc-400 py-2">No data available</p>
          )}

          <Badge
            variant="secondary"
            className="text-[11px] border bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
          >
            Top category
          </Badge>
        </CardContent>
      </Card>

      {/* Breakdown by Farm */}
      <Card className="col-span-1 md:col-span-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm rounded-xl overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-indigo-400" />
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                Breakdown by Farm
              </span>
            </div>
            <Badge
              variant="secondary"
              className="text-[11px] border bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
            >
              {byFarm.length} farm{byFarm.length !== 1 ? "s" : ""}
            </Badge>
          </div>

          <Separator className="bg-zinc-100 dark:bg-zinc-800" />

          {byFarm.length > 0 ? (
            <div className="space-y-3">
              {byFarm.map((item, idx) => {
                const cost = item._sum.expenseCost ?? 0;
                const pct = Math.round((cost / maxFarmCost) * 100);
                const isTop = idx === 0;

                return (
                  <div key={item.farm} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        {isTop && (
                          <Trophy className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        )}
                        <span
                          className={`text-sm font-medium truncate ${
                            isTop
                              ? "text-zinc-900 dark:text-zinc-50"
                              : "text-zinc-600 dark:text-zinc-300"
                          }`}
                        >
                          {item.farm}
                        </span>
                      </div>
                      <span className="text-sm font-semibold tabular-nums text-rose-600 dark:text-rose-400 ml-4 shrink-0">
                        {fmtShort(cost)}
                      </span>
                    </div>

                    <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isTop
                            ? "bg-linear-to-r from-rose-400 to-red-400"
                            : "bg-linear-to-r from-blue-400 to-indigo-400"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 space-y-2">
              <Building2 className="h-8 w-8 text-zinc-300 dark:text-zinc-600" />
              <p className="text-sm text-zinc-400">No farm data available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}