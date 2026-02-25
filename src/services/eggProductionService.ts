import ApiNames from "@/constants/ApiNames";
import { apiRequest } from "./NetworkService";
import { RequestMethod } from "@/constants/Method";
import type {
  IEggProduction,
  IEggProductionSummary,
} from "@/@types/eggProductionTypes";
import type { IResponse } from "@/@types/commonTypes";

export interface ICreateEggProductionBody {
  date: Date | string;
  farm: string;
  chickenEggs: number;
  totalEggs: number;
  notes?: string;
}
export const getAllEggProductionsService = async (
  pageNumber: number,
  limit: number,
  filters?: string,
) => {
  const endpoint = `${ApiNames.eggProductions}?page=${pageNumber}&limit=${limit}${
    filters ? filters : ""
  }`;

  const { data } = await apiRequest(endpoint, RequestMethod.Get);

  return data;
};

export const createEggProductionService = async (
  values: ICreateEggProductionBody,
): Promise<IResponse<IEggProduction>> => {
  const endpoint = ApiNames.eggProductions;

  const { data } = await apiRequest(endpoint, RequestMethod.Post, values);

  return data;
};

export const updateEggProductionService = async (
  id: number,
  values: Partial<IEggProduction>,
): Promise<IResponse<IEggProduction>> => {
  const endpoint = `${ApiNames.eggProductions}/${id}`;

  const { data } = await apiRequest(endpoint, RequestMethod.Put, values);

  return data;
};

export const deleteEggProductionService = async (
  id: number,
): Promise<IResponse<null>> => {
  const endpoint = `${ApiNames.eggProductions}/${id}`;

  const { data } = await apiRequest(endpoint, RequestMethod.Delete);

  return data;
};

export const getEggProductionSummaryService = async (
  filters?: string,
): Promise<IResponse<IEggProductionSummary>> => {
  const endpoint = `${ApiNames.eggProductionsSummary}${filters ? filters : ""}`;

  const { data } = await apiRequest(endpoint, RequestMethod.Get);

  return data;
};
