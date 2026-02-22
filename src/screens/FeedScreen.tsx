import { useCallback, useEffect, useRef, useState } from "react";
import {
  createFeedPurchaseService,
  deleteFeedPurchaseService,
  getAllFeedPurchasesService,
  updateFeedPurchaseService,
  type IFeedPurchaseBody,
} from "@/services/feedPurchaseService";
import { getErrorDataCase } from "@/lib/utils";
import Feed from "@/pages/Feed";
import type { IFeed } from "@/@types/feedPurchaseTypes";

const FeedScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [feedPurchases, setFeedPurchases] = useState<IFeed[]>([]);
  const pageNumber = useRef(1);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    getAllFeedPurchases();
  }, []);

  const getAllFeedPurchases = async () => {
    try {
      setIsLoading(true);
      const response = await getAllFeedPurchasesService(pageNumber.current, 10);
      if (response.message.toLowerCase() === "success") {
        pageNumber.current += 1;
        setFeedPurchases(response.data.items);
        setError("");
      }
    } catch (error) {
      setError(getErrorDataCase(error));
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const toggleForm = useCallback(() => {
    setShowForm((prev) => !prev);
  }, []);

  return (
    <Feed
      showForm={showForm}
      feedPurchases={feedPurchases}
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

export default FeedScreen;
