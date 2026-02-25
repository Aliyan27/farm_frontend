import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ConfirmationPoppup } from "@/components/Modals/ConfirmationPoppup";
import { EditModal } from "@/components/Modals/EditModal";
import { FeedForm } from "@/components/Feed/FeedForm";
import { cn } from "@/lib/utils";
import FeedPurchaseListSkeleton from "@/components/Skeletons/FeedPurchaseListSkeleton";
import { FeedSummaryCard } from "@/components/Feed/FeedSummary";
import type { IFeed, IFeedSummary } from "@/@types/feedPurchaseTypes";
import FormContainer from "@/components/ui/FormContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FeedSummarySkeleton } from "@/components/Skeletons/FeedSummarySkeleton";

interface FeedPurchasesProps {
  showForm: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  error: string;
  feedPurchases: IFeed[];
  feedSummary: IFeedSummary | null;
  onCreate: (values: any) => Promise<void>;
  onEdit: (id: number, values: any) => Promise<void>;
  onDelete: (id: number) => void;
  toggleForm: () => void;
  selectedFarm: string;
  startDate: string;
  endDate: string;
  isLoadingSummary: boolean;
  pageNumber: number;
  totalPages: number;
  onSelectStartDate: (date: string) => void;
  onSelectEndDate: (date: string) => void;
  onSelectFarm: (farm: string) => void;
  onNextClick: () => void;
  onPrevClick: () => void;
}

export default function Feed(props: FeedPurchasesProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Summary Section */}
      <section className="p-6 border-b">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <h2 className="text-2xl font-bold tracking-tight">Feed Summary</h2>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="startDate"
                  className="text-sm font-medium text-muted-foreground whitespace-nowrap"
                >
                  Start
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={props.startDate}
                  disabled={props.isLoadingSummary}
                  onChange={(e) => props.onSelectStartDate(e.target.value)}
                  className="h-9 w-40"
                />
              </div>

              <div className="flex items-center gap-2">
                <Label
                  htmlFor="endDate"
                  className="text-sm font-medium text-muted-foreground whitespace-nowrap"
                >
                  End
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  disabled={props.isLoadingSummary}
                  value={props.endDate}
                  onChange={(e) => props.onSelectEndDate(e.target.value)}
                  className="h-9 w-40"
                />
              </div>

              <div className="flex items-center gap-2">
                <Label
                  htmlFor="farmFilter"
                  className="text-sm font-medium text-muted-foreground whitespace-nowrap"
                >
                  Farm
                </Label>
                <select
                  id="farmFilter"
                  value={props.selectedFarm}
                  onChange={(e) => props.onSelectFarm(e.target.value)}
                  disabled={props.isLoadingSummary}
                  className={cn(
                    "h-9 rounded-md border border-input bg-background px-3 py-1 text-sm",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  )}
                >
                  <option value="">All Farms</option>
                  <option value="MATITAL">MATITAL</option>
                  <option value="KAASI_19">KAASI_19</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>
            </div>
          </div>

          {props.feedSummary ? (
            <FeedSummaryCard {...props.feedSummary} />
          ) : props.isLoadingSummary ? (
            <FeedSummarySkeleton />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No summary data available yet
            </div>
          )}
        </div>
      </section>

      {/* Main Content: Form or List */}
      {props.showForm ? (
        <section className="max-w-3xl mx-auto p-6">
          <FormContainer
            Header={{
              title: "Add New Feed Purchase / Payment",
              desc: "Record feed purchases, payments, or adjustments (IN/OUT)",
            }}
            Body={{
              title: "Purchase Details",
              desc: "Enter the feed purchase or payment details below",
            }}
            Footer={{
              title:
                "All feed records are tracked for monthly statements and reports",
            }}
          >
            <FeedForm
              onSubmit={props.onCreate}
              isLoading={props.isLoading}
              error={props.error}
            />

            <Button className="mt-6 w-full" onClick={props.toggleForm}>
              View All Feed Records
            </Button>
          </FormContainer>
        </section>
      ) : (
        <section className="max-w-7xl mx-auto p-6">
          <FeedList
            feedPurchases={props.feedPurchases}
            onDelete={props.onDelete}
            onEdit={props.onEdit}
            isLoading={props.isLoading}
            isUpdating={props.isUpdating}
            error={props.error}
            pageNumber={props.pageNumber}
            totalPages={props.totalPages}
            toggleForm={props.toggleForm}
            onNextClick={props.onNextClick}
            onPrevClick={props.onPrevClick}
          />
        </section>
      )}
    </div>
  );
}

interface FeedListProps {
  feedPurchases: any[];
  isLoading: boolean;
  isUpdating: boolean;
  error: string;
  pageNumber: number;
  totalPages: number;
  onEdit: (id: number, values: any) => Promise<void>;
  onDelete: (id: number) => void;
  toggleForm: () => void;
  onNextClick: () => void;
  onPrevClick: () => void;
}

export function FeedList({
  feedPurchases,
  isLoading,
  isUpdating,
  error,
  pageNumber,
  totalPages,
  onEdit,
  onDelete,
  toggleForm,
  onNextClick,
  onPrevClick,
}: FeedListProps) {
  if (isLoading) {
    return <FeedPurchaseListSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header + Filter + Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Feed Purchases & Payments
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" onClick={toggleForm}>
            Add New Record
          </Button>
        </div>
      </div>

      {/* Table / Empty / Error */}
      <div className="border rounded-xl overflow-hidden shadow-sm">
        {feedPurchases.length > 0 ? (
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
              {feedPurchases.map((purchase) => (
                <FeedItem
                  key={purchase.id}
                  purchase={purchase}
                  isUpdating={isUpdating}
                  error={error}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
            </TableBody>
          </Table>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-600 font-medium mb-2">
              Error loading feed records
            </div>
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : (
          <div className="text-center py-16 space-y-6">
            <h2 className="text-2xl font-bold text-muted-foreground">
              No feed purchases recorded yet
            </h2>
            <p className="text-muted-foreground">
              Add your first feed purchase or payment record
            </p>
            <Button size="lg" onClick={toggleForm}>
              + Add Feed Record
            </Button>
          </div>
        )}
      </div>

      {/* Next Button – right below the list */}
      <div className="flex justify-between">
        <Button
          onClick={onPrevClick}
          disabled={isLoading || isUpdating || pageNumber > 0}
          variant="default"
          size="lg"
        >
          Prev Page
        </Button>

        <span className="text-sm text-muted-foreground">
          Page {pageNumber} {`of ${totalPages}`}
        </span>

        <Button
          onClick={onNextClick}
          disabled={isLoading || isUpdating || pageNumber <= totalPages}
          variant="default"
          size="lg"
        >
          Next Page
        </Button>
      </div>
    </div>
  );
}

// FeedItem remains unchanged
interface FeedItemProps {
  purchase: any;
  isUpdating: boolean;
  error: string;
  onEdit: (id: number, values: any) => Promise<void>;
  onDelete: (id: number) => void;
}

const FeedItem = ({
  purchase,
  isUpdating,
  error,
  onEdit,
  onDelete,
}: FeedItemProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <TableRow key={purchase.id} className="hover:bg-muted/30">
        <TableCell className="font-medium">
          {format(new Date(purchase.date), "dd MMM yyyy")}
        </TableCell>
        <TableCell>
          <Badge
            variant={purchase.voucherType === "IN" ? "success" : "destructive"}
          >
            {purchase.voucherType}
          </Badge>
        </TableCell>
        <TableCell>{purchase.feedType}</TableCell>
        <TableCell>{purchase.farm}</TableCell>
        <TableCell>{purchase.bags}</TableCell>
        <TableCell className="font-medium text-red-600">
          {purchase.debit ? `Rs. ${purchase.debit.toLocaleString()}` : "-"}
        </TableCell>
        <TableCell className="font-medium text-green-600">
          {purchase.credit ? `Rs. ${purchase.credit.toLocaleString()}` : "-"}
        </TableCell>
        <TableCell className="text-right space-x-2">
          <Button variant="ghost" size="icon" onClick={() => setOpenEdit(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive/90"
            onClick={() => setOpenDelete(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>

      <ConfirmationPoppup
        open={openDelete}
        title="Delete Feed Record"
        desc="Are you sure you want to delete this feed purchase/payment?"
        onClick={async (flag: boolean) => {
          if (flag) onDelete(purchase.id);
          setOpenDelete(false);
        }}
      />

      <EditModal
        title="Edit Feed"
        desc="Update the feed details below"
        open={openEdit}
        onOpenChange={() => setOpenEdit(false)}
      >
        <FeedForm
          initialValues={purchase}
          onSubmit={async (values: any) => {
            await onEdit(purchase.id, values);
            setOpenEdit(false);
          }}
          isLoading={isUpdating}
          error={error}
        />
      </EditModal>
    </>
  );
};
