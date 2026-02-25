// EggProductionSummarySkeleton.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EggProductionSummarySkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Eggs */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-3 w-48" />
        </CardContent>
      </Card>

      {/* Top Farm */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-7 w-36" />
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-3 w-40" />
        </CardContent>
      </Card>

      {/* By Farm Breakdown */}
      <Card className="col-span-2 md:col-span-1 lg:col-span-2">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-6 w-40" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-32" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
