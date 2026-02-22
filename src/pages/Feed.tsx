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
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ConfirmationPoppup } from "@/components/Modals/ConfirmationPoppup";
import { EditModal } from "@/components/Modals/EditModal";
import { FeedForm } from "@/components/Feed/FeedForm";

interface FeedListProps {
  feedPurchases: any[];
  isLoading: boolean;
  isUpdating: boolean;
  error: string;
  onEdit: (id: number, values: any) => Promise<void>;
  onDelete: (id: number) => void;
  toggleForm: () => void;
}

export function FeedList({
  feedPurchases,
  isLoading,
  isUpdating,
  error,
  onEdit,
  onDelete,
  toggleForm,
}: FeedListProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Feed Purchases & Payments</h2>
          <Button variant="outline" size="sm" onClick={toggleForm}>
            Add New
          </Button>
        </div>

        <div className="border rounded-xl overflow-hidden">
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
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-20 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 font-medium mb-2">
          Error loading feed records
        </div>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (feedPurchases.length === 0) {
    return (
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
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Feed Purchases & Payments
        </h2>
        <Button variant="outline" size="sm" onClick={toggleForm}>
          Add New Record
        </Button>
      </div>

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
          submitText="Save Changes"
          title="Edit Feed Record"
        />
      </EditModal>
    </>
  );
};
