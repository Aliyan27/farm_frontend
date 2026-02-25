import { useCallback, useEffect, useRef, useState } from "react";
import {
  createExpenseService,
  deleteExpenseService,
  getAllExpensesService,
  getExpenseSummaryService,
  updateExpenseService,
  type ICreateExpenseBody,
} from "@/services/expenseService";
import { getErrorDataCase } from "@/lib/utils";
import Expenses from "@/pages/Expenses";
import type { IExpense } from "@/@types/expenseTypes";
import type { IExpenseSummary } from "@/@types/expenseTypes"; // adjust if needed

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const pageNumber = useRef(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState<string>("");
  const [expenseSummary, setExpenseSummary] = useState<IExpenseSummary | null>(
    null,
  );
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const loadMore = useRef(true);
  const totalPages = useRef(0);

  useEffect(() => {
    pageNumber.current = 1;
    loadMore.current = true;
    getAllExpenses();
  }, [selectedFarm, startDate, endDate]);

  useEffect(() => {
    getSummary(selectedFarm, startDate, endDate);
  }, [selectedFarm, startDate, endDate]);

  const getAllExpenses = async () => {
    try {
      if (!loadMore.current) return;
      setIsLoading(true);
      let filters = `&`;

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (start <= end) {
          filters += `&startDate=${startDate}&endDate=${endDate}`;
        }
      }
      if (selectedFarm) filters += `&farm=${selectedFarm}`;

      const response = await getAllExpensesService(
        pageNumber.current,
        10,
        filters.length > 1 ? filters : undefined,
      );

      if (response.message.toLowerCase() === "success") {
        loadMore.current =
          pageNumber.current < response.data.pagination.pages &&
          response.data.pagination.pages > 0;
        totalPages.current = response.data.pagination.pages;
        setExpenses(response.data.items);
        setError("");
      }
    } catch (error) {
      setError(getErrorDataCase(error));
    } finally {
      setIsLoading(false);
    }
  };

  const onCreate = async (values: ICreateExpenseBody) => {
    try {
      setIsLoading(true);
      const response = await createExpenseService(values);
      if (response.message.toLowerCase() === "success") {
        setExpenses((prev) => [...prev, response.data]);
        setError("");
      }
    } catch (error) {
      setError(getErrorDataCase(error));
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async (id: number) => {
    try {
      const response = await deleteExpenseService(id);
      if (response.message.toLowerCase() === "success") {
        setExpenses((prev) => prev.filter((expense) => expense.id !== id));
        setError("");
      }
    } catch (error) {
      setError(getErrorDataCase(error));
    }
  };

  const onEdit = async (id: number, updatedExpense: IExpense) => {
    try {
      setIsUpdating(true);
      const response = await updateExpenseService(id, updatedExpense);
      if (response.message.toLowerCase() === "success") {
        setExpenses((prev) => {
          const index = prev.findIndex((exp) => exp.id === id);
          if (index < 0) return prev;
          prev[index] = { ...prev[index], ...updatedExpense };
          return [...prev];
        });
        setError("");
      }
    } catch (error) {
      setError(getErrorDataCase(error));
    } finally {
      setIsUpdating(false);
    }
  };

  const getSummary = async (
    farm?: string,
    startDate?: string,
    endDate?: string,
  ) => {
    try {
      setIsLoadingSummary(true);
      let filters = "?";

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (start <= end) {
          filters += `startDate=${startDate}&`;
          filters += `endDate=${endDate}&`;
        }
      }
      if (farm) filters += `farm=${farm}&`;

      if (filters.length > 1 && filters.endsWith("&")) {
        filters = filters.slice(0, -1);
      }

      const response = await getExpenseSummaryService(
        filters.length > 1 ? filters : undefined,
      );

      if (response.message.toLowerCase() === "success") {
        setExpenseSummary(response.data);
        setError("");
      }
    } catch (error) {
      setError(getErrorDataCase(error));
    } finally {
      setIsLoadingSummary(false);
    }
  };

  const toggleForm = useCallback(() => {
    setShowForm((prev) => !prev);
  }, []);

  const onSelectFarm = useCallback((farm: string) => {
    setSelectedFarm(farm);
  }, []);

  const onSelectStartDate = useCallback((date: string) => {
    setStartDate(date);
  }, []);

  const onSelectEndDate = useCallback((date: string) => {
    setEndDate(date);
  }, []);

  const onNextClick = useCallback(() => {
    pageNumber.current += 1;
    loadMore.current = pageNumber.current <= totalPages.current;
    getAllExpenses();
  }, []);

  const onPrevClick = useCallback(() => {
    pageNumber.current -= 1;
    loadMore.current = pageNumber.current > 0;
    getAllExpenses();
  }, []);

  return (
    <Expenses
      showForm={showForm}
      expenses={expenses}
      isLoading={isLoading}
      isUpdating={isUpdating}
      error={error}
      expenseSummary={expenseSummary}
      isLoadingSummary={isLoadingSummary}
      selectedFarm={selectedFarm}
      startDate={startDate}
      endDate={endDate}
      pageNumber={pageNumber.current}
      totalPages={totalPages.current}
      onSelectStartDate={onSelectStartDate}
      onSelectEndDate={onSelectEndDate}
      onSelectFarm={onSelectFarm}
      onCreate={onCreate}
      onDelete={onDelete}
      onEdit={onEdit}
      toggleForm={toggleForm}
      onNextClick={onNextClick}
      onPrevClick={onPrevClick}
    />
  );
};

export default HomeScreen;
