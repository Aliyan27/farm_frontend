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
import { ExpenseForm } from "@/components/Expenses/ExpensesForm";
import { cn } from "@/lib/utils";
import ExpenseListSkeleton from "@/components/Skeletons/ExpenseListSkeleton";
import { ExpenseSummaryCard } from "@/components/Expenses/ExpenseSummary"; // ← your new card
import type { IExpense } from "@/@types/expenseTypes";
import type { IExpenseSummary } from "@/@types/expenseTypes"; // adjust if needed
import FormContainer from "@/components/ui/FormContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExpenseSummarySkeleton } from "@/components/Skeletons/ExpenseSummarySkeleton";
import { useState } from "react";

interface ExpensesProps {
  showForm: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  error: string;
  expenses: IExpense[];
  expenseSummary: IExpenseSummary | null;
  isLoadingSummary: boolean;
  selectedFarm: string;
  startDate: string;
  endDate: string;
  pageNumber: number;
  totalPages: number;
  onCreate: (values: any) => Promise<void>;
  onEdit: (id: number, expense: IExpense) => Promise<void>;
  onDelete: (id: number) => void;
  toggleForm: () => void;
  onSelectStartDate: (date: string) => void;
  onSelectEndDate: (date: string) => void;
  onSelectFarm: (farm: string) => void;
  onNextClick: () => void;
  onPrevClick: () => void;
}

export default function Expenses(props: ExpensesProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Summary Section */}
      <section className="p-6 border-b">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <h2 className="text-2xl font-bold tracking-tight">
              Expense Summary
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

          {props.expenseSummary ? (
            <ExpenseSummaryCard {...props.expenseSummary} />
          ) : props.isLoadingSummary ? (
            <ExpenseSummarySkeleton />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No expense summary available yet
            </div>
          )}
        </div>
      </section>

      {/* Main Content: Form or List */}
      {props.showForm ? (
        <section className="max-w-3xl mx-auto p-6">
          <FormContainer
            Header={{
              title: "Add New Expense",
              desc: "Record farm expenses (feed, medicine, salaries, rent, etc.)",
            }}
            Body={{
              title: "Expense Details",
              desc: "Fill in the form below to log a new expense entry",
            }}
            Footer={{
              title:
                "All expenses are tracked securely and used for monthly reports",
            }}
          >
            <ExpenseForm
              onSubmit={props.onCreate}
              isLoading={props.isLoading}
              error={props.error}
            />

            <Button className="mt-6 w-full" onClick={props.toggleForm}>
              View All Expenses
            </Button>
          </FormContainer>
        </section>
      ) : (
        <section className="max-w-7xl mx-auto p-6">
          <ExpensesList
            expenses={props.expenses}
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

interface ExpensesListProps {
  expenses: IExpense[];
  isLoading: boolean;
  isUpdating: boolean;
  error: string;
  onEdit: (id: number, expense: IExpense) => Promise<void>;
  onDelete: (id: number) => void;
  toggleForm: () => void;
  pageNumber: number;
  totalPages: number;
  onNextClick: () => void;
  onPrevClick: () => void;
}

export function ExpensesList({
  expenses,
  isLoading,
  isUpdating,
  error,

  onEdit,
  onDelete,
  toggleForm,
  pageNumber,
  totalPages,
  onNextClick,
  onPrevClick,
}: ExpensesListProps) {
  if (isLoading) {
    return <ExpenseListSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header + Filter + Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Expenses</h2>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" onClick={toggleForm}>
            + Add New Expense
          </Button>
        </div>
      </div>

      {/* Table / Empty / Error */}
      <div className="border rounded-xl overflow-hidden shadow-sm">
        {expenses.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Date</TableHead>
                <TableHead>Head</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Farm</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <ExpenseItem
                  key={expense.id}
                  isUpdating={isUpdating}
                  expense={expense}
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
              Error loading expenses
            </div>
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : (
          <div className="text-center py-16 space-y-6">
            <h2 className="text-2xl font-bold text-muted-foreground">
              No expenses recorded yet
            </h2>
            <p className="text-muted-foreground">Add your first expense</p>
            <Button size="lg" onClick={toggleForm}>
              + Add Expense
            </Button>
          </div>
        )}
      </div>

      {/* Pagination Controls – right below the list */}
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

// ExpenseItem (unchanged – included for completeness)
interface ExpenseItemProps {
  isUpdating: boolean;
  expense: IExpense;
  error: string;
  onEdit: (id: number, expense: IExpense) => Promise<void>;
  onDelete: (id: number) => void;
}

const ExpenseItem = ({
  expense,
  isUpdating,
  error,
  onDelete,
  onEdit,
}: ExpenseItemProps) => {
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <>
      <TableRow key={expense.id} className="hover:bg-muted/30">
        <TableCell className="font-medium">
          {format(new Date(expense.expenseDate), "dd MMM yyyy")}
        </TableCell>
        <TableCell>
          <Badge variant="outline">{expense.head}</Badge>
        </TableCell>
        <TableCell className="font-medium">
          Rs. {expense.expenseCost.toLocaleString()}
        </TableCell>
        <TableCell>{expense.farm}</TableCell>
        <TableCell>{expense.month || "-"}</TableCell>
        <TableCell className="max-w-xs truncate">
          {expense.notes || "-"}
        </TableCell>
        <TableCell className="text-right space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpenEditModal(true)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive/90"
            onClick={() => setOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>

      <ConfirmationPoppup
        open={open}
        title="Delete Expense"
        desc="Are you sure you want to delete this expense?"
        onClick={async (flag: boolean) => {
          if (flag) onDelete(expense.id);
          setOpen(false);
        }}
      />

      <EditModal
        title="Edit Expense"
        desc="Update the expense details below"
        open={openEditModal}
        onOpenChange={() => setOpenEditModal((prev) => !prev)}
      >
        <ExpenseForm
          expense={expense}
          onSubmit={async (values: any) => {
            await onEdit(expense.id, values);
            setOpenEditModal(false);
          }}
          isLoading={isUpdating}
          error={error}
          className="space-y-4"
        />
      </EditModal>
    </>
  );
};
