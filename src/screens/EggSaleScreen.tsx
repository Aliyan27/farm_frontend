import { useCallback, useEffect, useRef, useState } from "react";
import {
  createEggSaleService,
  deleteEggSaleService,
  getAllEggSalesService,
  getEggSaleSummaryService,
  updateEggSaleService,
} from "@/services/eggSaleService";
import { getErrorDataCase } from "@/lib/utils";
import EggSale from "@/pages/EggSale";
import type {
  ICreateEggSaleBody,
  IEggSale,
  IEggSaleSummary,
} from "@/@types/eggSaleTypes";

const EggSaleScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [sales, setSales] = useState<IEggSale[]>([]);
  const pageNumber = useRef(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState<string>("");
  const [summary, setSummary] = useState<IEggSaleSummary | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const loadMore = useRef(true);
  const totalPages = useRef(0);

  useEffect(() => {
    pageNumber.current = 1;
    loadMore.current = true;
    getAllEggSales();
  }, [selectedFarm, startDate, endDate]);

  useEffect(() => {
    getSummary(selectedFarm, startDate, endDate);
  }, [selectedFarm, startDate, endDate]);

  const getAllEggSales = async () => {
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

      const response = await getAllEggSalesService(
        pageNumber.current,
        10,
        filters.length > 1 ? filters : undefined,
      );

      if (response.message.toLowerCase() === "success") {
        loadMore.current =
          pageNumber.current < response.data.pagination.pages &&
          response.data.pagination.pages > 0;
        totalPages.current = response.data.pagination.pages;
        setSales(response.data.items);
        setError("");
      }
    } catch (error) {
      setError(getErrorDataCase(error));
    } finally {
      setIsLoading(false);
    }
  };

  const onCreate = async (values: ICreateEggSaleBody) => {
    try {
      setIsLoading(true);
      const response = await createEggSaleService(values);
      if (response.message.toLowerCase() === "success") {
        setSales((prev) => [...prev, response.data]);
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
      const response = await deleteEggSaleService(id);
      if (response.message.toLowerCase() === "success") {
        setSales((prev) => prev.filter((item) => item.id !== id));
        setError("");
      }
    } catch (error) {
      setError(getErrorDataCase(error));
    }
  };

  const onEdit = async (id: number, updatedSale: IEggSale) => {
    try {
      setIsUpdating(true);
      const response = await updateEggSaleService(id, updatedSale);
      if (response.message.toLowerCase() === "success") {
        setSales((prev) => {
          const index = prev.findIndex((item) => item.id === id);
          if (index < 0) return prev;
          prev[index] = { ...prev[index], ...updatedSale };
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

      const response = await getEggSaleSummaryService(
        filters.length > 1 ? filters : undefined,
      );

      if (response.message.toLowerCase() === "success") {
        setSummary(response.data);
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
    getAllEggSales();
  }, []);

  const onPrevClick = useCallback(() => {
    pageNumber.current -= 1;
    loadMore.current = pageNumber.current > 0;
    getAllEggSales();
  }, []);

  return (
    <EggSale
      showForm={showForm}
      sales={sales}
      isLoading={isLoading}
      isUpdating={isUpdating}
      error={error}
      summary={summary}
      selectedFarm={selectedFarm}
      startDate={startDate}
      endDate={endDate}
      isLoadingSummary={isLoadingSummary}
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

export default EggSaleScreen;
