import { useCallback, useEffect, useState } from "react";
import { getIncomeStatementService } from "@/services/commonService";
import { cn, generateIncomeStatementPdf, getErrorDataCase } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, TrendingUp, AlertCircle } from "lucide-react";

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

export default function IncomeStatementScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [statement, setStatement] = useState<IncomeStatement | null>(null);

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const fetchIncomeStatement = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getIncomeStatementService({ startDate, endDate });

      if (response.message === "Income statement generated") {
        setStatement(response.data);
      } else {
        setError("Failed to load income statement");
      }
    } catch (err) {
      setError(getErrorDataCase(err));
    } finally {
      setIsLoading(false);
    }
  }, [startDate, endDate]);

  // Initial load + when dates change
  useEffect(() => {
    fetchIncomeStatement();
  }, [fetchIncomeStatement]);

  const handleRefresh = () => {
    fetchIncomeStatement();
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header + Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Income Statement
          </h1>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="startDate" className="whitespace-nowrap">
                From
              </Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-40"
              />
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="endDate" className="whitespace-nowrap">
                To
              </Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-40"
              />
            </div>

            <Button
              onClick={handleRefresh}
              disabled={isLoading}
              variant="outline"
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Loading / Error / Content */}
        {isLoading ? (
          <IncomeStatementSkeleton />
        ) : error ? (
          <div className="text-center py-12 text-red-600">
            <AlertCircle className="h-12 w-12 mx-auto mb-4" />
            <p className="text-lg font-medium">{error}</p>
            <Button onClick={handleRefresh} className="mt-4">
              Try Again
            </Button>
          </div>
        ) : statement ? (
          <IncomeStatementView data={statement} />
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No income statement data available for this period
          </div>
        )}
      </div>
    </div>
  );
}

function IncomeStatementSkeleton() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

interface IncomeStatementViewProps {
  data: IncomeStatement;
}

function IncomeStatementView({ data }: IncomeStatementViewProps) {
  const {
    period,
    grossRevenue,
    otherIncome,
    totalRevenue,
    cogs,
    operatingExpenses,
    totalExpenses,
    netIncome,
    notes,
  } = data;

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">
          Income Statement
        </CardTitle>
        <p className="text-sm text-muted-foreground">{period}</p>
      </CardHeader>

      <CardContent className="space-y-8 pt-4">
        {/* Revenue Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Revenue</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Gross Revenue"
              value={grossRevenue}
              color="text-green-600"
            />
            <StatCard
              title="Other Income"
              value={otherIncome}
              color="text-green-600"
            />
            <StatCard
              title="Total Revenue"
              value={totalRevenue}
              color="text-green-700 font-bold"
              large
            />
          </div>
        </div>

        {/* COGS */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Cost of Goods Sold</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <SmallStat title="Chicken" value={cogs.chicken} />
            <SmallStat title="Feed" value={cogs.feed} />
            <SmallStat title="Medicine" value={cogs.medicine} />
            <SmallStat title="Vaccine" value={cogs.vaccine} />
            <SmallStat
              title="Total COGS"
              value={cogs.total}
              bold
              color="text-red-600"
            />
          </div>
        </div>

        {/* Operating Expenses */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Operating Expenses</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SmallStat title="Rent" value={operatingExpenses.rent} />
            <SmallStat title="Utilities" value={operatingExpenses.utilities} />
            <SmallStat
              title="Salaries"
              value={operatingExpenses.salariesPayments}
            />
            <SmallStat title="Mess" value={operatingExpenses.mess} />
            <SmallStat
              title="Power/Electric"
              value={operatingExpenses.powerElectric}
            />
            <SmallStat title="POL" value={operatingExpenses.pol} />
            <SmallStat
              title="Packing Material"
              value={operatingExpenses.packingMaterial}
            />
            <SmallStat
              title="Repair & Maintenance"
              value={operatingExpenses.repairMaintenance}
            />
            <SmallStat
              title="Office Expenses"
              value={operatingExpenses.officeExpenses}
            />
            <SmallStat
              title="Meeting Refreshment"
              value={operatingExpenses.meetingRefreshment}
            />
            <SmallStat
              title="Travelling & Logistics"
              value={operatingExpenses.travellingLogistics}
            />
            <SmallStat
              title="Miscellaneous"
              value={operatingExpenses.miscellaneous}
            />
            <div className="col-span-2 md:col-span-4">
              <SmallStat
                title="Total Operating Expenses"
                value={operatingExpenses.total}
                bold
                color="text-red-600"
              />
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="pt-6 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard
              title="Total Expenses"
              value={totalExpenses}
              color="text-red-700"
              large
            />
            <StatCard
              title="Net Income"
              value={netIncome}
              color={netIncome >= 0 ? "text-green-700" : "text-red-700"}
              large
              icon={netIncome >= 0 ? TrendingUp : AlertCircle}
            />
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium">
              <span className="font-semibold">Summary:</span> {notes}
            </p>
          </div>
        </div>

        <Button
          onClick={() => {
            if (data) {
              generateIncomeStatementPdf(data);
            } else {
              alert("No report data available to download");
            }
          }}
          disabled={!data}
          className="mt-6"
        >
          Download PDF Report
        </Button>
      </CardContent>
    </Card>
  );
}

// Reusable small stat component
function SmallStat({
  title,
  value,
  bold = false,
  color = "text-foreground",
}: {
  title: string;
  value: number;
  bold?: boolean;
  color?: string;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className={cn("text-lg", bold && "font-semibold", color)}>
        Rs. {value.toLocaleString()}
      </p>
    </div>
  );
}

function StatCard({
  title,
  value,
  color = "text-foreground",
  large = false,
  icon: Icon = DollarSign,
}: {
  title: string;
  value: number;
  color?: string;
  large?: boolean;
  icon?: any;
}) {
  return (
    <div className="bg-card border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <Icon className={cn("h-5 w-5", color)} />
      </div>
      <p className={cn("text-3xl font-bold", large && "text-4xl", color)}>
        Rs. {value.toLocaleString()}
      </p>
    </div>
  );
}
