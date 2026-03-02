import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Wallet, Building2 } from "lucide-react";

interface SalarySummaryCardProps {
  totalPaid: number;
  totalAdvance: number;
  totalSalaryAmount: number;
  byFarm: Array<{
    farm: string;
    _sum: {
      total: number | null;
      advance: number | null;
      salaryAmount: number | null;
    };
  }>;
}

export function SalarySummaryCard({
  totalPaid,
  totalAdvance,
  totalSalaryAmount,
  byFarm,
}: SalarySummaryCardProps) {
  const topFarm = byFarm.length > 0 ? byFarm[0] : null;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Paid */}
      <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-800">
            Total Paid
          </CardTitle>
          <DollarSign className="h-5 w-5 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-800">
            Rs.{" "}
            {totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-green-700 mt-1">Net salary disbursed</p>
        </CardContent>
      </Card>

      {/* Total Advance */}
      <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-orange-800">
            Total Advance
          </CardTitle>
          <Wallet className="h-5 w-5 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-orange-800">
            Rs.{" "}
            {totalAdvance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>
          <p className="text-xs text-orange-700 mt-1">Advance payments</p>
        </CardContent>
      </Card>

      {/* Total Salary Amount (net after advance) */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-800">
            Net Salary Paid
          </CardTitle>
          <DollarSign className="h-5 w-5 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-800">
            Rs.{" "}
            {totalSalaryAmount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>
          <p className="text-xs text-blue-700 mt-1">After advance deduction</p>
        </CardContent>
      </Card>

      {/* By Farm Breakdown */}
      <Card className="col-span-2 lg:col-span-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Building2 className="h-5 w-5 text-purple-600" />
            Salary by Farm
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
                      Rs.{" "}
                      {(topFarm._sum.total || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-purple-600">
                    Advance: Rs.{" "}
                    {(topFarm._sum.advance || 0).toLocaleString(undefined, {
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
                      Rs.{" "}
                      {(item._sum.total || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Advance: Rs.{" "}
                      {(item._sum.advance || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No farm-specific salary data
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
