import type { IExpense } from "@/@types/expenseTypes";
import { getErrorDataCase } from "@/lib/utils";
import Home from "@/pages/Home";
import {
  createExpenseService,
  deleteExpenseService,
  getAllExpensesService,
  type ICreateExpenseBody,
} from "@/services/expenseService";
import { useCallback, useEffect, useRef, useState } from "react";

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [expense, setExpenses] = useState<IExpense[]>([]);
  const pageNumber = useRef(1);

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

  const onEdit = async (expense: IExpense) => {
    try {
    } catch (error) {
      setError(getErrorDataCase(error));
      console.log(error);
    }
  };

  const toggleForm = useCallback(() => {
    setShowForm((prev) => !prev);
  }, []);
  return (
    <Home
      showForm={showForm}
      expenses={expense}
      isLoading={isLoading}
      error={error}
      onCreate={onCreate}
      onDelete={onDelete}
      onEdit={onEdit}
      toggleForm={toggleForm}
    />
  );
};

export default HomeScreen;
