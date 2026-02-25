import { useCallback, useEffect, useRef, useState } from "react";
import {
  createEggProductionService,
  deleteEggProductionService,
  getAllEggProductionsService,
  getEggProductionSummaryService,
  updateEggProductionService,
  type ICreateEggProductionBody,
} from "@/services/eggProductionService";
import { getErrorDataCase } from "@/lib/utils";
import EggProduction from "@/pages/EggProduction";
import type {
  IEggProduction,
  IEggProductionSummary,
} from "@/@types/eggProductionTypes";

const EggProductionScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [records, setRecords] = useState<IEggProduction[]>([]);
  const pageNumber = useRef(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState<string>("");
  const [summary, setSummary] = useState<IEggProductionSummary | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const loadMore = useRef(true);
  const totalPages = useRef(0);

  useEffect(() => {
    pageNumber.current = 1;
    loadMore.current = true;
    getAllEggProductions();
  }, [selectedFarm, startDate, endDate]);

  useEffect(() => {
    getSummary(selectedFarm, startDate, endDate);
  }, [selectedFarm, startDate, endDate]);

  const getAllEggProductions = async () => {
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

      const response = await getAllEggProductionsService(
        pageNumber.current,
        10,
        filters,
      );

      if (response.message.toLowerCase() === "success") {
        loadMore.current =
          pageNumber.current < response.data.pagination.pages &&
          response.data.pagination.pages > 0;
        totalPages.current = response.data.pagination.pages;
        setRecords(response.data.items);
        setError("");
      }
    } catch (error) {
      setError(getErrorDataCase(error));
    } finally {
      setIsLoading(false);
    }
  };

  const onCreate = async (values: ICreateEggProductionBody) => {
    try {
      setIsLoading(true);
      const response = await createEggProductionService(values);
      if (response.message.toLowerCase() === "success") {
        setRecords((prev) => [...prev, response.data]);
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
      const response = await deleteEggProductionService(id);
      if (response.message.toLowerCase() === "success") {
        setRecords((prev) => prev.filter((item) => item.id !== id));
        setError("");
      }
    } catch (error) {
      setError(getErrorDataCase(error));
    }
  };

  const onEdit = async (id: number, updatedRecord: IEggProduction) => {
    try {
      setIsUpdating(true);
      const response = await updateEggProductionService(id, updatedRecord);
      if (response.message.toLowerCase() === "success") {
        setRecords((prev) => {
          const index = prev.findIndex((item) => item.id === id);
          if (index < 0) return prev;
          prev[index] = { ...prev[index], ...updatedRecord };
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

      const response = await getEggProductionSummaryService(
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
    getAllEggProductions();
  }, []);

  const onPrevClick = useCallback(() => {
    pageNumber.current -= 1;
    loadMore.current = pageNumber.current > 0;
    getAllEggProductions();
  }, []);

  return (
    <EggProduction
      showForm={showForm}
      records={records}
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

export default EggProductionScreen;
