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

interface ExpenseProps {
  showForm: boolean;
  isLoading: boolean;
  error: string;
  expenses: IExpense[];
  onCreate: (values: any) => void;
  onEdit: (expense: IExpense) => void;
  onDelete: (id: number) => void;
  toggleForm: () => void;
}

export default function Home(props: ExpenseProps) {
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
            error={props.error}
            toggleForm={props.toggleForm}
          />
        </div>
      )}
    </>
  );
}

interface ExpensesListProps {
  expenses: IExpense[];
  isLoading: boolean;
  onEdit: (expense: IExpense) => void;
  onDelete: (id: number) => void;
  error?: string;
  toggleForm: () => void;
}

export function ExpensesList({
  expenses,
  isLoading,
  onEdit,
  onDelete,
  error,
  toggleForm,
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

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 font-medium mb-2">
          Error loading expenses
        </div>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
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
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">Expenses</h2>
          <Button asChild variant="outline" size="sm" onClick={toggleForm}>
            <p>Add New Expense</p>
          </Button>
        </div>

        <div className="border rounded-xl overflow-hidden shadow-sm">
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
                  expense={expense}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

interface ExpenseItemProps {
  expense: IExpense;

  onEdit: (expense: IExpense) => void;
  onDelete: (id: number) => void;
}

const ExpenseItem = ({ expense, onDelete, onEdit }: ExpenseItemProps) => {
  const [open, setOpen] = useState(false);
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
          <Button variant="ghost" size="icon" onClick={() => onEdit(expense)}>
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
    </>
  );
};
