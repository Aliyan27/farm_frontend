import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Building2, Pill } from "lucide-react";

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

export function ExpenseSummaryCard({
  total,
  byHead,
  byFarm,
}: ExpenseSummaryProps) {
  const sortedByHead = [...byHead].sort(
    (a, b) => b._sum.expenseCost - a._sum.expenseCost,
  );

  const topHead = sortedByHead[0];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Expenses */}
      <Card className="bg-gradient-to-br from-red-50 to-red-100/50 border-red-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-red-800">
            Total Expenses
          </CardTitle>
          <DollarSign className="h-5 w-5 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-red-800">
            Rs. {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-red-700 mt-1">
            All recorded expenses in selected period
          </p>
        </CardContent>
      </Card>

      {/* Top Expense Category */}
      <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-amber-800">
            Highest Category
          </CardTitle>
          <Pill className="h-5 w-5 text-amber-600" />
        </CardHeader>
        <CardContent>
          {topHead ? (
            <>
              <div className="text-2xl font-bold text-amber-800">
                {topHead.head.replace(/_/g, " ")}
              </div>
              <div className="text-xl font-semibold text-amber-700 mt-1">
                Rs. {topHead._sum.expenseCost.toLocaleString()}
              </div>
              <p className="text-xs text-amber-700 mt-1">
                Largest expense head
              </p>
            </>
          ) : (
            <div className="text-lg text-amber-700">No data</div>
          )}
        </CardContent>
      </Card>

      {/* Expenses by Farm */}
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
                    Rs. {(item._sum.expenseCost || 0).toLocaleString()}
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
