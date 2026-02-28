import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Egg, Building2, DollarSign, Wallet, AlertCircle } from "lucide-react";

interface EggSaleSummaryProps {
  totalEggsSold: number;
  totalRevenue: number;
  totalReceived: number;
  totalDue: number;
  byFarm: Array<{
    farm: string;
    _sum: {
      eggsSold: number | null;
      totalAmount: number | null;
      paymentReceived: number | null;
      paymentDue: number | null;
    };
  }>;
}

export function EggSaleSummaryCard({
  totalEggsSold,
  totalRevenue,
  totalReceived,
  totalDue,
  byFarm,
}: EggSaleSummaryProps) {
  const topFarm = byFarm.length > 0 ? byFarm[0] : null;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Eggs Sold */}
      <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-800">
            Total Eggs Sold
          </CardTitle>
          <Egg className="h-5 w-5 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-800">
            {totalEggsSold.toLocaleString()}
          </div>
          <p className="text-xs text-green-700 mt-1">Across selected period</p>
        </CardContent>
      </Card>

      {/* Total Revenue */}
      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-emerald-800">
            Total Revenue
          </CardTitle>
          <DollarSign className="h-5 w-5 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-emerald-800">
            Rs.{" "}
            {totalRevenue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>
          <p className="text-xs text-emerald-700 mt-1">Gross sales amount</p>
        </CardContent>
      </Card>

      {/* Total Received vs Due */}
      <Card className="col-span-2 md:col-span-1 lg:col-span-2 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Wallet className="h-5 w-5 text-blue-600" />
            Payment Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Received</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">
              Rs.{" "}
              {totalReceived.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Due
              {totalDue > 0 && <AlertCircle className="h-4 w-4 text-red-500" />}
            </p>
            <p
              className={`text-2xl font-bold mt-1 ${totalDue > 0 ? "text-red-600" : "text-green-600"}`}
            >
              Rs.{" "}
              {totalDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Top Farm & Breakdown */}
      <Card className="col-span-2 lg:col-span-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Building2 className="h-5 w-5 text-purple-600" />
            Sales by Farm
          </CardTitle>
        </CardHeader>
        <CardContent>
          {byFarm.length > 0 ? (
            <div className="space-y-4">
              {/* Top Farm Highlight */}
              {topFarm && (
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-purple-800">
                      {topFarm.farm}
                    </span>
                    <span className="text-purple-700">
                      {topFarm._sum.eggsSold?.toLocaleString() || 0} eggs
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-purple-600">
                    Rs.{" "}
                    {(topFarm._sum.totalAmount || 0).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </div>
              )}

              {/* All Farms List */}
              {byFarm.map((item) => (
                <div
                  key={item.farm}
                  className="flex justify-between items-center py-2 border-b last:border-0"
                >
                  <span className="font-medium">{item.farm}</span>
                  <div className="text-right">
                    <div className="font-medium">
                      {item._sum.eggsSold?.toLocaleString() || 0} eggs
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Rs.{" "}
                      {(item._sum.totalAmount || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No farm-specific sales data
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
