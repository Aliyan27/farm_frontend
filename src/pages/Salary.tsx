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
import { SalaryForm } from "@/components/Salary/SalaryForm";
import { cn } from "@/lib/utils";
import SalaryListSkeleton from "@/components/Skeletons/SalaryListSkeleton";
import { SalarySummaryCard } from "@/components/Salary/SalarySummary";
import type { ISalary, ISalarySummary } from "@/@types/salaryTypes";
import FormContainer from "@/components/ui/FormContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SalarySummarySkeleton } from "@/components/Skeletons/SalarySummarySkeleton";
import { useState } from "react";

interface SalaryProps {
  showForm: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  salaries: ISalary[];
  summary: ISalarySummary | null;
  isLoadingSummary: boolean;
  selectedFarm: string;
  search: string;
  pageNumber: number;
  totalPages: number;
  onCreate: (values: any) => Promise<void>;
  onEdit: (id: number, values: any) => Promise<void>;
  onDelete: (id: number) => void;
  toggleForm: () => void;
  onSearch: (date: string) => void;
  onSelectFarm: (farm: string) => void;
  onNextClick: () => void;
  onPrevClick: () => void;
}

export default function Salary(props: SalaryProps) {
  return (
    <div className="bg-background">
      {/* Summary Section */}
      <section className="p-6 border-b">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <h2 className="text-2xl font-bold tracking-tight">
              Salary Summary
            </h2>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
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
            <SalarySummaryCard {...props.summary} />
          ) : props.isLoadingSummary ? (
            <SalarySummarySkeleton />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No salary summary available yet
            </div>
          )}
        </div>
      </section>

      {/* Main Content: Form or List */}
      {props.showForm ? (
        <section className="max-w-3xl mx-auto p-6">
          <FormContainer
            Header={{
              title: "Add New Salary Record",
              desc: "Record salary payments, advances, or adjustments",
            }}
            Body={{
              title: "Salary Details",
              desc: "Enter the salary information below",
            }}
            Footer={{
              title: "All salary records are tracked for monthly reports",
            }}
          >
            <SalaryForm onSubmit={props.onCreate} isLoading={props.isLoading} />

            <Button className="mt-6 w-full" onClick={props.toggleForm}>
              View All Salary Records
            </Button>
          </FormContainer>
        </section>
      ) : (
        <section className="max-w-7xl mx-auto p-6">
          <SalaryList
            salaries={props.salaries}
            onDelete={props.onDelete}
            onEdit={props.onEdit}
            isLoading={props.isLoading}
            isUpdating={props.isUpdating}
            search={props.search}
            onSearch={props.onSearch}
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

interface SalaryListProps {
  salaries: ISalary[];
  isLoading: boolean;
  isUpdating: boolean;
  search: string;
  pageNumber: number;
  totalPages: number;
  onEdit: (id: number, values: any) => Promise<void>;
  onDelete: (id: number) => void;
  onSearch: (date: string) => void;
  toggleForm: () => void;
  onNextClick: () => void;
  onPrevClick: () => void;
}

export function SalaryList({
  salaries,
  isLoading,
  isUpdating,
  search,
  pageNumber,
  totalPages,
  onEdit,
  onDelete,
  onSearch,
  toggleForm,
  onNextClick,
  onPrevClick,
}: SalaryListProps) {
  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Salary Records</h2>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Label
              htmlFor="search"
              className="text-sm font-medium text-muted-foreground whitespace-nowrap"
            >
              Search by Name or Designation
            </Label>
            <Input
              id="search"
              type="text"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              className="h-9 w-40"
              placeholder="Search"
            />
          </div>
          <Button variant="outline" size="sm" onClick={toggleForm}>
            + Add New Salary
          </Button>
        </div>
      </div>

      {/* Table / Empty / Error */}
      <div className="border rounded-xl overflow-hidden shadow-sm">
        {isLoading ? (
          <SalaryListSkeleton />
        ) : salaries.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Date</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Farm</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Advance</TableHead>
                <TableHead>Salary Paid</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salaries.map((salary) => (
                <SalaryItem
                  key={salary.id}
                  salary={salary}
                  isUpdating={isUpdating}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-16 space-y-6">
            <h2 className="text-2xl font-bold text-muted-foreground">
              No salary records yet
            </h2>
            <p className="text-muted-foreground">
              Add your first salary payment or advance
            </p>
            <Button size="lg" onClick={toggleForm}>
              + Add Salary Record
            </Button>
          </div>
        )}
      </div>

      {/* Pagination Controls – exactly like Feed */}
      <div className="flex justify-between items-center pt-4">
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

interface SalaryItemProps {
  salary: any;
  isUpdating: boolean;

  onEdit: (id: number, values: any) => Promise<void>;
  onDelete: (id: number) => void;
}

const SalaryItem = ({
  salary,
  isUpdating,
  onEdit,
  onDelete,
}: SalaryItemProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <TableRow key={salary.id} className="hover:bg-muted/30">
        <TableCell className="font-medium">
          {format(new Date(salary.createdAt), "dd MMM yyyy")}
        </TableCell>
        <TableCell>{salary.month || "-"}</TableCell>
        <TableCell className="font-medium">{salary.employeeName}</TableCell>
        <TableCell>{salary.designation}</TableCell>
        <TableCell>{salary.farm || "-"}</TableCell>
        <TableCell className="font-medium text-blue-600">
          Rs. {salary.total.toLocaleString()}
        </TableCell>
        <TableCell className="font-medium text-orange-600">
          {salary.advance ? `Rs. ${salary.advance.toLocaleString()}` : "-"}
        </TableCell>
        <TableCell className="font-medium text-green-600">
          Rs. {salary.salaryAmount.toLocaleString()}
        </TableCell>
        <TableCell className="max-w-xs truncate">
          {salary.remarks || "-"}
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
        title="Delete Salary Record"
        desc="Are you sure you want to delete this salary entry?"
        onClick={async (flag: boolean) => {
          if (flag) onDelete(salary.id);
          setOpenDelete(false);
        }}
      />

      <EditModal
        title="Edit Salary Record"
        desc="Update the salary details below"
        open={openEdit}
        onOpenChange={() => setOpenEdit(false)}
      >
        <SalaryForm
          initialValues={salary}
          onSubmit={async (values: any) => {
            await onEdit(salary.id, values);
            setOpenEdit(false);
          }}
          isLoading={isUpdating}
        />
      </EditModal>
    </>
  );
};
