import { useState } from "react";
import FormContainer from "@/components/ui/FormContainer";
import { Button } from "@/components/ui/button";

interface FeedPurchasesProps {
  showForm: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  error: string;
  feedPurchases: any[]; // IFeedPurchase[]
  onCreate: (values: any) => Promise<void>;
  onEdit: (id: number, values: any) => Promise<void>;
  onDelete: (id: number) => void;
  toggleForm: () => void;
  selectedFarm: string;
  onSelectFarm: (farm: string) => void;
}

export default function Feed(props: FeedPurchasesProps) {
  return (
    <>
      {props.showForm ? (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
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
            <Button className="my-4 w-full" onClick={props.toggleForm}>
              View All Feed Records
            </Button>
          </FormContainer>
        </div>
      ) : (
        <div className="min-h-screen bg-background p-4 md:p-6">
          <FeedList
            feedPurchases={props.feedPurchases}
            onDelete={props.onDelete}
            onEdit={props.onEdit}
            isLoading={props.isLoading}
            isUpdating={props.isUpdating}
            error={props.error}
            toggleForm={props.toggleForm}
            selectedFarm={props.selectedFarm}
            onSelectFarm={props.onSelectFarm}
          />
        </div>
      )}
    </>
  );
}

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

interface FeedListProps {
  feedPurchases: any[];
  isLoading: boolean;
  isUpdating: boolean;
  error: string;
  selectedFarm: string;
  onSelectFarm: (farm: string) => void;
  onEdit: (id: number, values: any) => Promise<void>;
  onDelete: (id: number) => void;
  toggleForm: () => void;
}

export function FeedList({
  feedPurchases,
  isLoading,
  isUpdating,
  error,
  selectedFarm,
  onSelectFarm,
  onEdit,
  onDelete,
  toggleForm,
}: FeedListProps) {
  if (isLoading) {
    return <FeedPurchaseListSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Feed Purchases & Payments
        </h2>{" "}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label
              htmlFor="farmFilter"
              className="text-sm font-medium text-muted-foreground"
            >
              Farm:
            </label>
            <select
              id="farmFilter"
              value={selectedFarm}
              onChange={(e) => onSelectFarm(e.target.value)}
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
          <Button variant="outline" size="sm" onClick={toggleForm}>
            Add New Record
          </Button>
        </div>
      </div>

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
        ) : error.length > 0 ? (
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
    </div>
  );
}

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
