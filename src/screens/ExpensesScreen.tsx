import type { IExpense } from "@/@types/expenseTypes";
import { getErrorDataCase } from "@/lib/utils";
import Expenses from "@/pages/Expenses";
import {
  createExpenseService,
  deleteExpenseService,
  getAllExpensesService,
  updateExpenseService,
  type ICreateExpenseBody,
} from "@/services/expenseService";
import { useCallback, useEffect, useRef, useState } from "react";

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [expense, setExpenses] = useState<IExpense[]>([]);
  const pageNumber = useRef(1);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    getAllExpenses();
  }, []);

  const getAllExpenses = async () => {
    try {
      setIsLoading(true);
      let response = await getAllExpensesService(pageNumber.current, 10);
      if (response.message.toLowerCase() === "success") {
        pageNumber.current += 1;
        setExpenses(response.data.items);
        setError("");
      }
    } catch (error) {
      setError(getErrorDataCase(error));
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onCreate = async (values: ICreateExpenseBody) => {
    try {
      setIsLoading(true);
      let response = await createExpenseService(values);
      if (response.message.toLowerCase() === "success") {
        setExpenses((prev) => [...prev, response.data]);
        setError("");
      }
    } catch (error) {
      setError(getErrorDataCase(error));
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async (id: number) => {
    try {
      let response = await deleteExpenseService(id);
      if (response.message.toLowerCase() === "success") {
        setExpenses((prev) => prev.filter((expense) => expense.id !== id));
        setError("");
      }
    } catch (error) {
      setError(getErrorDataCase(error));
      console.log(error);
    }
  };

  const onEdit = async (id: number, expense: IExpense) => {
    try {
      setIsUpdating(true);
      let response = await updateExpenseService(id, expense);
      if (response.message.toLowerCase() === "success") {
        setExpenses((prev) => {
          let i = prev.findIndex((expense) => expense.id === id);
          console.log(i);
          if (i < 0) {
            return prev;
          }
          prev[i] = expense;
          return [...prev];
        });
        setError("");
      }
    } catch (error) {
      setError(getErrorDataCase(error));
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const toggleForm = useCallback(() => {
    setShowForm((prev) => !prev);
  }, []);
  return (
    <Expenses
      showForm={showForm}
      expenses={expense}
      isLoading={isLoading}
      isUpdating={isUpdating}
      error={error}
      onCreate={onCreate}
      onDelete={onDelete}
      onEdit={onEdit}
      toggleForm={toggleForm}
    />
  );
};

export default HomeScreen;
