import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ConfirmationPoppup } from "@/components/Modals/ConfirmationPoppup";
import { EditModal } from "@/components/Modals/EditModal";
import { EggProductionForm } from "@/components/EggProduction/EggProductionForm";
import { cn } from "@/lib/utils";
import EggProductionListSkeleton from "@/components/Skeletons/EggProductionListSkeleton";
import { EggProductionSummaryCard } from "@/components/EggProduction/EggProductionSummary";
import type {
  IEggProduction,
  IEggProductionSummary,
} from "@/@types/eggProductionTypes";
import FormContainer from "@/components/ui/FormContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EggProductionSummarySkeleton } from "@/components/Skeletons/EggProductionSummarySkeleton";
import { useState } from "react";

interface EggProductionProps {
  showForm: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  error: string;
  records: IEggProduction[];
  summary: IEggProductionSummary | null;
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

export default function EggProduction(props: EggProductionProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Summary Section */}
      <section className="p-6 border-b">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <h2 className="text-2xl font-bold tracking-tight">
              Egg Production Summary
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
            <EggProductionSummaryCard {...props.summary} />
          ) : props.isLoadingSummary ? (
            <EggProductionSummarySkeleton />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No production summary available yet
            </div>
          )}
        </div>
      </section>

      {/* Main Content: Form or List */}
      {props.showForm ? (
        <section className="max-w-3xl mx-auto p-6">
          <FormContainer
            Header={{
              title: "Add New Egg Production Record",
              desc: "Record daily egg production for a specific farm",
            }}
            Body={{
              title: "Production Details",
              desc: "Enter the number of eggs produced today",
            }}
            Footer={{
              title: "Daily records help track farm performance over time",
            }}
          >
            <EggProductionForm
              onSubmit={props.onCreate}
              isLoading={props.isLoading}
              error={props.error}
            />

            <Button className="mt-6 w-full" onClick={props.toggleForm}>
              View All Production Records
            </Button>
          </FormContainer>
        </section>
      ) : (
        <section className="max-w-7xl mx-auto p-6">
          <EggProductionList
            records={props.records}
            onDelete={props.onDelete}
            onEdit={props.onEdit}
            isLoading={props.isLoading}
            isUpdating={props.isUpdating}
            error={props.error}
            toggleForm={props.toggleForm}
            pageNumber={props.pageNumber}
            totalPages={props.totalPages}
            onNextClick={props.onNextClick}
            onPrevClick={props.onPrevClick}
          />
        </section>
      )}
    </div>
  );
}

interface EggProductionListProps {
  records: any[];
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

export function EggProductionList({
  records,
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
}: EggProductionListProps) {
  if (isLoading) {
    return <EggProductionListSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Egg Production Records
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" onClick={toggleForm}>
            + Add New Record
          </Button>
        </div>
      </div>

      {/* Table / Empty / Error */}
      <div className="border rounded-xl overflow-hidden shadow-sm">
        {records.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Date</TableHead>
                <TableHead>Farm</TableHead>
                <TableHead>Chicken Eggs</TableHead>
                <TableHead>Total Eggs</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <EggProductionItem
                  key={record.id}
                  record={record}
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
              Error loading production records
            </div>
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : (
          <div className="text-center py-16 space-y-6">
            <h2 className="text-2xl font-bold text-muted-foreground">
              No egg production records yet
            </h2>
            <p className="text-muted-foreground">
              Add your first daily production entry
            </p>
            <Button size="lg" onClick={toggleForm}>
              + Add Production Record
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
          Page {pageNumber} {`of ${totalPages}`}
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

interface EggProductionItemProps {
  record: any;
  isUpdating: boolean;
  error: string;
  onEdit: (id: number, values: any) => Promise<void>;
  onDelete: (id: number) => void;
}

const EggProductionItem = ({
  record,
  isUpdating,
  error,
  onEdit,
  onDelete,
}: EggProductionItemProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <TableRow key={record.id} className="hover:bg-muted/30">
        <TableCell className="font-medium">
          {format(new Date(record.date), "dd MMM yyyy")}
        </TableCell>
        <TableCell>{record.farm}</TableCell>
        <TableCell className="font-medium">{record.chickenEggs}</TableCell>
        <TableCell className="font-medium">{record.totalEggs}</TableCell>
        <TableCell className="max-w-xs truncate">
          {record.notes || "-"}
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
        title="Delete Production Record"
        desc="Are you sure you want to delete this egg production entry?"
        onClick={async (flag: boolean) => {
          if (flag) onDelete(record.id);
          setOpenDelete(false);
        }}
      />

      <EditModal
        title="Edit Production Record"
        desc="Update the egg production details below"
        open={openEdit}
        onOpenChange={() => setOpenEdit(false)}
      >
        <EggProductionForm
          initialValues={record}
          onSubmit={async (values: any) => {
            await onEdit(record.id, values);
            setOpenEdit(false);
          }}
          isLoading={isUpdating}
          error={error}
        />
      </EditModal>
    </>
  );
};
