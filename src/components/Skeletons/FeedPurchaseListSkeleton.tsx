import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FeedPurchaseListSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header with title + button placeholder */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <Skeleton className="h-8 w-64" />{" "}
        {/* Title: "Feed Purchases & Payments" */}
        <Skeleton className="h-9 w-40" /> {/* Add button placeholder */}
      </div>

      {/* Table */}
      <div className="border rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Feed Type</TableHead>
              <TableHead>Farm</TableHead>
              <TableHead>Bags</TableHead>
              <TableHead>Debit</TableHead>
              <TableHead>Credit</TableHead>
              <TableHead className="text-right">Actions</TableHead>
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
                {/* Type badge */}
                <TableCell>
                  <Skeleton className="h-5 w-32" />
                </TableCell>{" "}
                {/* Feed Type */}
                <TableCell>
                  <Skeleton className="h-5 w-20" />
                </TableCell>{" "}
                {/* Farm */}
                <TableCell>
                  <Skeleton className="h-5 w-12" />
                </TableCell>{" "}
                {/* Bags */}
                <TableCell>
                  <Skeleton className="h-5 w-28" />
                </TableCell>{" "}
                {/* Debit */}
                <TableCell>
                  <Skeleton className="h-5 w-20" />
                </TableCell>{" "}
                {/* Credit */}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-8" /> {/* Edit icon */}
                    <Skeleton className="h-8 w-8" /> {/* Delete icon */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FeedPurchaseListSkeleton;
