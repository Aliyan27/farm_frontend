// src/components/Skeletons/EggProductionListSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EggProductionListSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header + Add Button placeholder */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-9 w-40" />
      </div>

      {/* Table */}
      <div className="border rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>
                <Skeleton className="h-4 w-20" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-16" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-28" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-24" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-32" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="h-4 w-16 ml-auto" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(6)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-5 w-28" />
                </TableCell>{" "}
                {/* Date */}
                <TableCell>
                  <Skeleton className="h-5 w-20" />
                </TableCell>{" "}
                {/* Farm */}
                <TableCell>
                  <Skeleton className="h-5 w-24" />
                </TableCell>{" "}
                {/* Chicken Eggs */}
                <TableCell>
                  <Skeleton className="h-5 w-20" />
                </TableCell>{" "}
                {/* Total Eggs */}
                <TableCell>
                  <Skeleton className="h-5 w-32" />
                </TableCell>{" "}
                {/* Notes */}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-8" /> {/* Edit */}
                    <Skeleton className="h-8 w-8" /> {/* Delete */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination placeholder */}
      <div className="flex justify-between items-center pt-4">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  );
};

export default EggProductionListSkeleton;
