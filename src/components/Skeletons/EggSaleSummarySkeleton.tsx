import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EggSaleSummarySkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Eggs Sold Skeleton */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-10 w-40 rounded" />
          <Skeleton className="h-3 w-48 rounded" />
        </CardContent>
      </Card>

      {/* Total Revenue Skeleton */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-10 w-48 rounded" />
          <Skeleton className="h-3 w-44 rounded" />
        </CardContent>
      </Card>

      {/* Payment Overview Skeleton */}
      <Card className="col-span-2 md:col-span-1 lg:col-span-2">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-6 w-40 rounded" />
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-32" />
          </div>
        </CardContent>
      </Card>

      {/* Sales by Farm Breakdown Skeleton */}
      <Card className="col-span-2 lg:col-span-4">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-6 w-40 rounded" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Top farm highlight */}
          <div className="p-4 rounded-lg border">
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-28" />
            </div>
            <Skeleton className="h-4 w-40 mt-2" />
          </div>

          {/* List of farms */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-2 border-b last:border-0"
            >
              <Skeleton className="h-5 w-24" />
              <div className="text-right space-y-1">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
