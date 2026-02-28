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
import { EggSaleForm } from "@/components/EggSale/EggSaleForm";
import { cn } from "@/lib/utils";
import EggSaleListSkeleton from "@/components/Skeletons/EggSaleListSkeleton";
import { EggSaleSummaryCard } from "@/components/EggSale/EggSaleSummary";
import type { IEggSale, IEggSaleSummary } from "@/@types/eggSaleTypes";
import FormContainer from "@/components/ui/FormContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EggSaleSummarySkeleton } from "@/components/Skeletons/EggSaleSummarySkeleton";
import { useState } from "react";

interface EggSaleProps {
  showForm: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  error: string;
  sales: IEggSale[];
  summary: IEggSaleSummary | null;
  isLoadingSummary: boolean;
  selectedFarm: string;
  startDate: string;
  endDate: string;
  pageNumber: number;
  totalPages: number;
  onCreate: (values: any) => Promise<void>;
  onEdit: (id: number, values: any) => Promise<void>;
  onDelete: (id: number) => void;
  toggleForm: () => void;
  onSelectStartDate: (date: string) => void;
  onSelectEndDate: (date: string) => void;
  onSelectFarm: (farm: string) => void;
  onNextClick: () => void;
  onPrevClick: () => void;
}

export default function EggSale(props: EggSaleProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Summary Section */}
      <section className="p-6 border-b">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <h2 className="text-2xl font-bold tracking-tight">
              Egg Sales Summary
            </h2>

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
                  value={props.endDate}
                  disabled={props.isLoadingSummary}
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

          {props.summary ? (
            <EggSaleSummaryCard {...props.summary} />
          ) : props.isLoadingSummary ? (
            <EggSaleSummarySkeleton />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No sales summary available yet
            </div>
          )}
        </div>
      </section>

      {/* Main Content: Form or List */}
      {props.showForm ? (
        <section className="max-w-3xl mx-auto p-6">
          <FormContainer
            Header={{
              title: "Add New Egg Sale",
              desc: "Record egg sales (quantity, price, payment details)",
            }}
            Body={{
              title: "Sale Details",
              desc: "Enter the sale information below",
            }}
            Footer={{
              title: "Sales are tracked for revenue and inventory reports",
            }}
          >
            <EggSaleForm
              onSubmit={props.onCreate}
              isLoading={props.isLoading}
              error={props.error}
            />

            <Button className="mt-6 w-full" onClick={props.toggleForm}>
              View All Egg Sales
            </Button>
          </FormContainer>
        </section>
      ) : (
        <section className="max-w-7xl mx-auto p-6">
          <EggSaleList
            sales={props.sales}
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

interface EggSaleListProps {
  sales: IEggSale[];
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

export function EggSaleList({
  sales,
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
}: EggSaleListProps) {
  if (isLoading) {
    return <EggSaleListSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Egg Sales Records</h2>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" onClick={toggleForm}>
            + Add New Sale
          </Button>
        </div>
      </div>

      {/* Table / Empty / Error */}
      <div className="border rounded-xl overflow-hidden shadow-sm">
        {sales.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Date</TableHead>
                <TableHead>Challan No.</TableHead>
                <TableHead>Farm</TableHead>
                <TableHead>Eggs Sold</TableHead>
                <TableHead>Price/Egg</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Received</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <EggSaleItem
                  key={sale.id}
                  sale={sale}
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
              Error loading sales records
            </div>
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : (
          <div className="text-center py-16 space-y-6">
            <h2 className="text-2xl font-bold text-muted-foreground">
              No egg sales recorded yet
            </h2>
            <p className="text-muted-foreground">Add your first sale entry</p>
            <Button size="lg" onClick={toggleForm}>
              + Add Sale
            </Button>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center pt-4">
        <Button
          size="lg"
          disabled={isLoading || isUpdating || pageNumber <= 1}
          onClick={onPrevClick}
        >
          Prev Page
        </Button>

        <span className="text-sm text-muted-foreground">
          {`Page ${pageNumber} of ${totalPages}`}
        </span>

        <Button
          size="lg"
          disabled={isLoading || isUpdating || pageNumber >= totalPages}
          onClick={onNextClick}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
}

interface EggSaleItemProps {
  sale: IEggSale;
  isUpdating: boolean;
  error: string;
  onEdit: (id: number, values: any) => Promise<void>;
  onDelete: (id: number) => void;
}

export const EggSaleItem = ({
  sale,
  isUpdating,
  error,
  onEdit,
  onDelete,
}: EggSaleItemProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <TableRow key={sale.id} className="hover:bg-muted/30">
        {/* Date */}
        <TableCell className="font-medium">
          {format(new Date(sale.saleDate), "dd MMM yyyy")}
        </TableCell>

        {/* Challan Number */}
        <TableCell>{sale.challanNumber || "-"}</TableCell>

        {/* Farm */}
        <TableCell>{sale.farm}</TableCell>

        {/* Eggs Sold */}
        <TableCell className="font-medium">{sale.eggsSold ?? 0}</TableCell>

        {/* Price per Egg */}
        <TableCell>
          {sale.pricePerEgg ? `Rs. ${sale.pricePerEgg.toLocaleString()}` : "-"}
        </TableCell>

        {/* Total Amount */}
        <TableCell className="font-medium text-blue-600">
          {sale.totalAmount ? `Rs. ${sale.totalAmount.toLocaleString()}` : "-"}
        </TableCell>

        {/* Amount Received */}
        <TableCell className="font-medium text-green-600">
          Rs. {sale.amountReceived.toLocaleString()}
        </TableCell>

        {/* Payment Due */}
        <TableCell className="font-medium text-red-600">
          {sale.paymentDue ? `Rs. ${sale.paymentDue.toLocaleString()}` : "-"}
        </TableCell>

        {/* Notes */}
        <TableCell className="max-w-xs truncate">{sale.notes || "-"}</TableCell>

        {/* Type */}
        <TableCell>
          <Badge variant="outline">{sale.type || "Eggs"}</Badge>
        </TableCell>

        {/* Actions */}
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

      {/* Delete Confirmation */}
      <ConfirmationPoppup
        open={openDelete}
        title="Delete Sale Record"
        desc="Are you sure you want to delete this egg sale entry? This action cannot be undone."
        onClick={async (flag: boolean) => {
          if (flag) onDelete(sale.id);
          setOpenDelete(false);
        }}
      />

      {/* Edit Modal */}
      <EditModal
        title="Edit Egg Sale"
        desc="Update the sale details below"
        open={openEdit}
        onOpenChange={() => setOpenEdit(false)}
      >
        <EggSaleForm
          initialValues={sale}
          onSubmit={async (values: any) => {
            await onEdit(sale.id, values);
            setOpenEdit(false);
          }}
          isLoading={isUpdating}
          error={error}
        />
      </EditModal>
    </>
  );
};
