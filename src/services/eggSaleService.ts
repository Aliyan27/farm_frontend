import ApiNames from "@/constants/ApiNames";
import { apiRequest } from "./NetworkService";
import { RequestMethod } from "@/constants/Method";
import type {
  IEggSale,
  IEggSaleData,
  IEggSaleSummary,
  ICreateEggSaleBody,
  IUpdateEggSaleBody,
} from "@/@types/eggSaleTypes";
import type { IResponse } from "@/@types/commonTypes";

// ────────────────────────────────────────────────
// Get paginated list of egg sales
export const getAllEggSalesService = async (
  pageNumber: number,
  limit: number,
  filters?: string,
): Promise<IResponse<IEggSaleData>> => {
  const endpoint = `${ApiNames.eggSales}?page=${pageNumber}&limit=${limit}${
    filters ? filters : ""
  }`;

  const { data } = await apiRequest(endpoint, RequestMethod.Get);

  return data;
};

// ────────────────────────────────────────────────
// Create new egg sale
export const createEggSaleService = async (
  values: ICreateEggSaleBody,
): Promise<IResponse<IEggSale>> => {
  const endpoint = ApiNames.eggSales;

  const { data } = await apiRequest(endpoint, RequestMethod.Post, values);

  return data;
};

// ────────────────────────────────────────────────
// Update existing egg sale
export const updateEggSaleService = async (
  id: number,
  values: IUpdateEggSaleBody,
): Promise<IResponse<IEggSale>> => {
  const endpoint = `${ApiNames.eggSales}/${id}`;

  const { data } = await apiRequest(endpoint, RequestMethod.Put, values);

  return data;
};

// ────────────────────────────────────────────────
// Delete egg sale
export const deleteEggSaleService = async (
  id: number,
): Promise<IResponse<null>> => {
  const endpoint = `${ApiNames.eggSales}/${id}`;

  const { data } = await apiRequest(endpoint, RequestMethod.Delete);

  return data;
};

// ────────────────────────────────────────────────
// Get egg sale summary (current schema: only amountReceived)
export const getEggSaleSummaryService = async (
  filters?: string,
): Promise<IResponse<IEggSaleSummary>> => {
  const endpoint = `${ApiNames.eggSalesSummary}${filters ? filters : ""}`;

  const { data } = await apiRequest(endpoint, RequestMethod.Get);

  return data;
};
