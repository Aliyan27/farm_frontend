import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Egg, Building2, Trophy, TrendingUp } from "lucide-react";

interface EggProductionSummaryProps {
  totalEggs: number;
  byFarm: Array<{
    farm: string;
    _sum: {
      chickenEggs: number | null;
      totalEggs: number | null;
    };
  }>;
}

export function EggProductionSummaryCard({
  totalEggs,
  byFarm,
}: EggProductionSummaryProps) {
  const topFarm = byFarm[0] ?? null;
  const maxEggs = Math.max(
    ...byFarm.map((f) => f._sum.chickenEggs ?? 0),
    1
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Eggs KPI */}
      <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm rounded-xl overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-400" />
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Total Production
            </span>
            <div className="h-7 w-7 rounded-full bg-amber-50 dark:bg-amber-950 flex items-center justify-center">
              <Egg className="h-4 w-4 text-amber-500" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold tabular-nums text-zinc-900 dark:text-zinc-50">
              {totalEggs.toLocaleString()}
            </p>
            <p className="text-xs text-zinc-400 mt-1 font-medium">
              eggs across all farms
            </p>
          </div>
          <Badge
            variant="secondary"
            className="text-[11px] bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
          >
            <TrendingUp className="h-3 w-3 mr-1" />
            Selected period
          </Badge>
        </CardContent>
      </Card>

      {/* Top Farm KPI */}
      <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm rounded-xl overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-teal-400" />
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Top Farm
            </span>
            <div className="h-7 w-7 rounded-full bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center">
              <Trophy className="h-4 w-4 text-emerald-500" />
            </div>
          </div>

          {topFarm ? (
            <div>
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50 truncate">
                {topFarm.farm}
              </p>
              <p className="text-2xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400 mt-0.5">
                {(topFarm._sum.chickenEggs ?? 0).toLocaleString()}
              </p>
              <p className="text-xs text-zinc-400 mt-1 font-medium">
                eggs produced
              </p>
            </div>
          ) : (
            <p className="text-sm text-zinc-400 py-2">No data available</p>
          )}

          <Badge
            variant="secondary"
            className="text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
          >
            Highest production
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
              className="text-[11px] bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
            >
              {byFarm.length} farm{byFarm.length !== 1 ? "s" : ""}
            </Badge>
          </div>

          <Separator className="bg-zinc-100 dark:bg-zinc-800" />

          {byFarm.length > 0 ? (
            <div className="space-y-3">
              {byFarm.map((item, idx) => {
                const eggs = item._sum.chickenEggs ?? 0;
                const pct = Math.round((eggs / maxEggs) * 100);
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
                      <span className="text-sm font-semibold tabular-nums text-blue-600 dark:text-blue-400 ml-4 shrink-0">
                        {eggs.toLocaleString()}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isTop
                            ? "bg-linear-to-r from-amber-400 to-orange-400"
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