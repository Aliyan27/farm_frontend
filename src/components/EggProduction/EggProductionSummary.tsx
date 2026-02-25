import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Egg, Building2 } from "lucide-react";

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
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Eggs */}
      <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-800">
            Total Eggs Produced
          </CardTitle>
          <Egg className="h-5 w-5 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-800">
            {totalEggs.toLocaleString()}
          </div>
          <p className="text-xs text-green-700 mt-1">
            Across all farms in selected period
          </p>
        </CardContent>
      </Card>

      {/* Top Farm */}
      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-emerald-800">
            Top Producing Farm
          </CardTitle>
          <Building2 className="h-5 w-5 text-emerald-600" />
        </CardHeader>
        <CardContent>
          {byFarm.length > 0 ? (
            (() => {
              const top = byFarm[0];
              return (
                <>
                  <div className="text-2xl font-bold text-emerald-800">
                    {top.farm}
                  </div>
                  <div className="text-xl font-semibold text-emerald-700 mt-1">
                    {top._sum.chickenEggs?.toLocaleString() || 0} eggs
                  </div>
                  <p className="text-xs text-emerald-700 mt-1">
                    Highest production farm
                  </p>
                </>
              );
            })()
          ) : (
            <div className="text-lg text-emerald-700">No data</div>
          )}
        </CardContent>
      </Card>

      {/* Breakdown by Farm */}
      <Card className="col-span-2 md:col-span-1 lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            Breakdown by Farm
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {byFarm.length > 0 ? (
              byFarm.map((item) => (
                <div
                  key={item.farm}
                  className="flex justify-between items-center"
                >
                  <span className="font-medium">{item.farm}</span>
                  <span className="font-semibold text-blue-700">
                    {item._sum.chickenEggs?.toLocaleString() || 0} eggs
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-4">
                No farm-specific data
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
