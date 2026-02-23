import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ExpenseForm } from "@/components/Expenses/ExpensesForm";
import FormContainer from "@/components/ui/FormContainer";
import type { IExpense } from "@/@types/expenseTypes";
import { ConfirmationPoppup } from "@/components/Modals/ConfirmationPoppup";
import { useState } from "react";
import { EditModal } from "@/components/Modals/EditModal";
import type { ICreateExpenseBody } from "@/services/expenseService";
import { cn } from "@/lib/utils";

interface ExpenseProps {
  showForm: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  error: string;
  expenses: IExpense[];
  selectedFarm: string;
  onCreate: (values: ICreateExpenseBody) => Promise<void>;
  onEdit: (id: number, expense: IExpense) => Promise<void>;
  onDelete: (id: number) => void;
  toggleForm: () => void;
  onSelectFarm: (farm: string) => void;
}

export default function Expenses(props: ExpenseProps) {
  return (
    <>
      {props.showForm ? (
        <div className=" flex-col d-flex justify-center items-center">
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
            <Button className="my-3 w-full" onClick={props.toggleForm}>
              <p>View Expenses</p>
            </Button>
          </FormContainer>
        </div>
      ) : (
        <div className="min-h-screen bg-background p-4 md:p-8">
          <ExpensesList
            expenses={props.expenses}
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

interface ExpensesListProps {
  expenses: IExpense[];
  isLoading: boolean;
  isUpdating: boolean;
  error: string;
  selectedFarm: string;
  onSelectFarm: (farm: string) => void;
  onEdit: (id: number, expense: IExpense) => Promise<void>;
  onDelete: (id: number) => void;
  toggleForm: () => void;
}

export function ExpensesList({
  expenses,
  isLoading,
  isUpdating,
  selectedFarm,
  onEdit,
  onDelete,
  error,
  toggleForm,
  onSelectFarm,
}: ExpensesListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Expenses</h2>
        </div>

        <div className="border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Head</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Farm</TableHead>
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
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16" />
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

  return (
    <div className="space-y-6">
      {/* Header + Filter + Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Expenses</h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* Farm Filter */}
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

          {/* Add New Button */}
          <Button variant="outline" size="sm" onClick={toggleForm}>
            + Add New Expense
          </Button>
        </div>
      </div>

      {/* Table */}
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
        ) : error.length > 0 ? (
          <div className="text-center py-12">
            <div className="text-red-600 font-medium mb-2">
              Error loading expenses
            </div>
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : (
          <div className="text-center py-16 space-y-4">
            <h2 className="text-2xl font-bold text-muted-foreground">
              No expenses recorded yet
            </h2>
            <p className="text-muted-foreground">
              Start by adding your first expense using the form above
            </p>
            <Button asChild onClick={toggleForm}>
              <p style={{ cursor: "pointer" }}>Add Expense</p>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

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
          onSubmit={async (values: IExpense) => {
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
