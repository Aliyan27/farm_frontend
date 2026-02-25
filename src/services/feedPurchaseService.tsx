import ApiNames from "@/constants/ApiNames";
import { apiRequest } from "./NetworkService";
import { RequestMethod } from "@/constants/Method";
import type {
  IFeed,
  IFeedData,
  IFeedSummary,
} from "@/@types/feedPurchaseTypes";
import type { IResponse } from "@/@types/commonTypes";

// Get all feed purchases (paginated)
export const getAllFeedPurchasesService = async (
  pageNumber: number,
  limit: number,
  filters?: string,
) => {
  let endpoint = `${ApiNames.feedPurchases}?page=${pageNumber}&limit=${limit}${filters ? filters : ""}`;

  let { data }: { data: IResponse<IFeedData> } = await apiRequest(
    endpoint,
    RequestMethod.Get,
  );

  return data;
};

export interface IFeedPurchaseBody {
  date: Date;
  month: string;
  voucherType: string;
  feedType: string;
  farm: string;
  bags: number;
  description: string;
  debit: number;
  credit: number;
  reconciled: boolean;
}

// Create new feed purchase / payment
export const createFeedPurchaseService = async (values: IFeedPurchaseBody) => {
  let endpoint = `${ApiNames.feedPurchases}`;

  let { data }: { data: IResponse<IFeed> } = await apiRequest(
    endpoint,
    RequestMethod.Post,
    values,
  );

  return data;
};

// Update existing feed purchase / payment
export const updateFeedPurchaseService = async (id: number, values: IFeed) => {
  let endpoint = `${ApiNames.feedPurchases}/${id}`;

  let { data }: { data: IResponse<IFeed> } = await apiRequest(
    endpoint,
    RequestMethod.Put,
    values,
  );

  return data;
};

// Delete feed purchase / payment
export const deleteFeedPurchaseService = async (id: number) => {
  let endpoint = `${ApiNames.feedPurchases}/${id}`;

  let { data }: { data: IResponse<any> } = await apiRequest(
    endpoint,
    RequestMethod.Delete,
  );

  return data;
};

export const getFeedSummaryService = async (filters?: string) => {
  let endpoint = `${ApiNames.feedPurchasesSummary}${filters ? filters : ""}`;

  let { data }: { data: IResponse<IFeedSummary> } = await apiRequest(
    endpoint,
    RequestMethod.Get,
  );

  return data;
};
