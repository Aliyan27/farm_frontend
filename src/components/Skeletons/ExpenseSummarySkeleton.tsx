import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ExpenseSummarySkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Expenses Skeleton */}
      <Card className="bg-gradient-to-br from-red-50/50 to-red-100/30 border-red-200/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-10 w-40 rounded" />
          <Skeleton className="h-3 w-48 rounded" />
        </CardContent>
      </Card>

      {/* Highest Category Skeleton */}
      <Card className="bg-gradient-to-br from-amber-50/50 to-amber-100/30 border-amber-200/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-7 w-36 rounded" />
          <Skeleton className="h-8 w-28 rounded" />
          <Skeleton className="h-3 w-40 rounded" />
        </CardContent>
      </Card>

      {/* Breakdown by Farm Skeleton */}
      <Card className="col-span-2 md:col-span-1 lg:col-span-2">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-6 w-40 rounded" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <Skeleton className="h-5 w-24 rounded" />
              <Skeleton className="h-5 w-32 rounded" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
