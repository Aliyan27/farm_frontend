import { useCallback, useEffect, useRef, useState } from "react";
import {
  createFeedPurchaseService,
  deleteFeedPurchaseService,
  getAllFeedPurchasesService,
  getFeedSummaryService,
  updateFeedPurchaseService,
  type IFeedPurchaseBody,
} from "@/services/feedPurchaseService";
import { getErrorDataCase } from "@/lib/utils";
import Feed from "@/pages/Feed";
import type { IFeed, IFeedSummary } from "@/@types/feedPurchaseTypes";

const FeedScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [feedPurchases, setFeedPurchases] = useState<IFeed[]>([]);
  const pageNumber = useRef(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState<string>("");
  const [feedSummary, setFeedSummary] = useState<IFeedSummary | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const loadMore = useRef(true);
  const totalPages = useRef(0);

  useEffect(() => {
    pageNumber.current = 1;
    loadMore.current = true;
    getAllFeedPurchases();
  }, [selectedFarm, startDate, endDate]);

  useEffect(() => {
    getSummary(selectedFarm, startDate, endDate);
  }, [startDate, endDate, selectedFarm]);

  const getAllFeedPurchases = async () => {
    try {
      if (!loadMore.current) return;
      setIsLoading(true);
      let filters = "&";
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start <= end) {
          filters += `startDate=${startDate}&`;
          filters += `endDate=${endDate}&`;
        }
      }
      if (selectedFarm) filters += `farm=${selectedFarm}&`;
      const response = await getAllFeedPurchasesService(
        pageNumber.current,
        10,
        filters.length > 1 ? filters : undefined,
      );
      if (response.message.toLowerCase() === "success") {
        loadMore.current =
          response.data.pagination.pages < pageNumber.current &&
          response.data.pagination.pages > 0;
        totalPages.current = response.data.pagination.pages;
        setFeedPurchases(response.data.items);
        setError("");
      }
    } catch (error) {
      setError(getErrorDataCase(error));
    } finally {
      setIsLoading(false);
    }
  };

  const onCreate = async (values: IFeedPurchaseBody) => {
    try {
      setIsLoading(true);
      const response = await createFeedPurchaseService(values);
      if (response.message.toLowerCase() === "success") {
        setFeedPurchases((prev) => [...prev, response.data]);
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
      const response = await deleteFeedPurchaseService(id);
      if (response.message.toLowerCase() === "success") {
        setFeedPurchases((prev) => prev.filter((item) => item.id !== id));
        setError("");
      }
    } catch (error) {
      setError(getErrorDataCase(error));
    }
  };

  const onEdit = async (id: number, updatedPurchase: IFeed) => {
    try {
      setIsUpdating(true);
      const response = await updateFeedPurchaseService(id, updatedPurchase);
      if (response.message.toLowerCase() === "success") {
        setFeedPurchases((prev) => {
          const index = prev.findIndex((item) => item.id === id);
          if (index < 0) return prev;
          prev[index] = { ...prev[index], ...updatedPurchase };
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

      const response = await getFeedSummaryService(
        filters.length > 1 ? filters : undefined,
      );

      if (response.message.toLowerCase() === "success") {
        setFeedSummary(response.data);
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
    getAllFeedPurchases();
  }, [pageNumber.current]);

  const onPrevClick = useCallback(() => {
    pageNumber.current -= 1;
    loadMore.current = pageNumber.current > 0;
    getAllFeedPurchases();
  }, [pageNumber.current]);

  return (
    <Feed
      showForm={showForm}
      feedPurchases={feedPurchases}
      isLoading={isLoading}
      isUpdating={isUpdating}
      error={error}
      feedSummary={feedSummary}
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

export default FeedScreen;
