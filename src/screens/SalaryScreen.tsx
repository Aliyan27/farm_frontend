import { useCallback, useEffect, useRef, useState } from "react";
import {
  createSalaryService,
  deleteSalaryService,
  getAllSalariesService,
  getSalarySummaryService,
  updateSalaryService,
} from "@/services/salaryService";
import { getErrorDataCase } from "@/lib/utils";
import Salary from "@/pages/Salary";
import type { ISalary, ISalarySummary } from "@/@types/salaryTypes";
import toast from "react-hot-toast";

const SalaryScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [salaries, setSalaries] = useState<ISalary[]>([]);
  const pageNumber = useRef(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState<string>("");
  const [summary, setSummary] = useState<ISalarySummary | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const loadMore = useRef(true);
  const totalPages = useRef(0);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Debounce search input
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [search]);

  useEffect(() => {
    pageNumber.current = 1;
    loadMore.current = true;
    getAllSalaries(selectedFarm, debouncedSearch);
  }, [selectedFarm]);

  useEffect(() => {
    if (debouncedSearch.length > 0) {
      pageNumber.current = 1;
      loadMore.current = true;
      getAllSalaries(selectedFarm, debouncedSearch);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    getSummary(selectedFarm);
  }, [selectedFarm]);

  const getAllSalaries = async (farm?: string, searchTerm?: string) => {
    try {
      if (!loadMore.current) return;
      setIsLoading(true);
      let filters = `&`;

      if (searchTerm) filters += `&search=${encodeURIComponent(searchTerm)}`;
      if (farm) filters += `&farm=${farm}`;

      const response = await getAllSalariesService(
        pageNumber.current,
        10,
        filters.length > 1 ? filters : undefined,
      );

      if (response.message.toLowerCase() === "success") {
        loadMore.current =
          pageNumber.current < response.data.pagination.pages &&
          response.data.pagination.pages > 0;
        totalPages.current = response.data.pagination.pages;
        setSalaries(response.data.items);
      }
    } catch (error) {
      toast.error(getErrorDataCase(error));
    } finally {
      setIsLoading(false);
    }
  };

  const onCreate = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await createSalaryService(values);
      if (response.message.toLowerCase() === "success") {
        setSalaries((prev) => [...prev, response.data]);
      }
    } catch (error) {
      toast.error(getErrorDataCase(error));
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async (id: number) => {
    try {
      const response = await deleteSalaryService(id);
      if (response.message.toLowerCase() === "success") {
        setSalaries((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      toast.error(getErrorDataCase(error));
    }
  };

  const onEdit = async (id: number, updatedSalary: ISalary) => {
    try {
      setIsUpdating(true);

      const updateValues = {
        date: updatedSalary.date,
        month: updatedSalary.month ?? undefined,
        employeeName: updatedSalary.employeeName,
        designation: updatedSalary.designation,
        farm: updatedSalary.farm ?? undefined,
        total: updatedSalary.total,
        advance: updatedSalary.advance,
        salaryAmount: updatedSalary.salaryAmount,
        remarks: updatedSalary.remarks ?? undefined,
      };

      const response = await updateSalaryService(id, updateValues);

      if (response.message.toLowerCase() === "success") {
        setSalaries((prev) => {
          const index = prev.findIndex((item) => item.id === id);
          if (index < 0) return prev;
          prev[index] = { ...prev[index], ...updatedSalary };
          return [...prev];
        });
      }
    } catch (error) {
      toast.error(getErrorDataCase(error));
    } finally {
      setIsUpdating(false);
    }
  };

  const getSummary = async (farm?: string) => {
    try {
      setIsLoadingSummary(true);
      let filters = "?";
      if (farm) filters += `farm=${farm}`;

      const response = await getSalarySummaryService(
        filters.length > 1 ? filters : undefined,
      );

      if (response.message.toLowerCase() === "success") {
        setSummary(response.data);
      }
    } catch (error) {
      toast.error(getErrorDataCase(error));
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

  const onSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const onNextClick = useCallback(() => {
    pageNumber.current += 1;
    loadMore.current = pageNumber.current <= totalPages.current;
    getAllSalaries(selectedFarm, debouncedSearch);
  }, [selectedFarm, debouncedSearch]);

  const onPrevClick = useCallback(() => {
    pageNumber.current -= 1;
    loadMore.current = pageNumber.current > 0;
    getAllSalaries(selectedFarm, debouncedSearch);
  }, [selectedFarm, debouncedSearch]);

  return (
    <Salary
      showForm={showForm}
      salaries={salaries}
      isLoading={isLoading}
      isUpdating={isUpdating}
      summary={summary}
      selectedFarm={selectedFarm}
      search={search}
      isLoadingSummary={isLoadingSummary}
      pageNumber={pageNumber.current}
      totalPages={totalPages.current}
      onSearch={onSearchChange}
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

export default SalaryScreen;
