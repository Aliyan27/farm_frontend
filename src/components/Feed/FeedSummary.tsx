import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Package, DollarSign } from "lucide-react";

interface FeedSummaryProps {
  totalDebit: number;
  totalCredit: number;
  totalBags: number;
  currentBalance: number;
}

export function FeedSummaryCard({
  totalDebit,
  totalCredit,
  totalBags,
  currentBalance,
}: FeedSummaryProps) {
  const netBalance = totalDebit - totalCredit;
  const isNegative = currentBalance < 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Debit */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Debit</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            Rs. {totalDebit.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Total amount paid for feed purchases
          </p>
        </CardContent>
      </Card>

      {/* Total Credit */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Credit</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            Rs. {totalCredit.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Total amount received/refunded
          </p>
        </CardContent>
      </Card>

      {/* Total Bags */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bags</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBags.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Total quantity of feed purchased
          </p>
        </CardContent>
      </Card>

      {/* Current Balance */}
      <Card
        className={isNegative ? "border-destructive/50 bg-destructive/5" : ""}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          {isNegative ? (
            <TrendingDown className="h-4 w-4 text-destructive" />
          ) : (
            <TrendingUp className="h-4 w-4 text-green-600" />
          )}
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${isNegative ? "text-destructive" : "text-green-600"}`}
          >
            Rs. {currentBalance.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Net outstanding balance (negative = payable)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
