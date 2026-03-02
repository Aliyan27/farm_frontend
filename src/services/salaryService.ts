import ApiNames from "@/constants/ApiNames";
import { apiRequest } from "./NetworkService";
import { RequestMethod } from "@/constants/Method";
import type {
  ISalary,
  ISalaryData,
  ISalarySummary,
  ICreateSalaryBody,
  IUpdateSalaryBody,
} from "@/@types/salaryTypes";
import type { IResponse } from "@/@types/commonTypes";

export const getAllSalariesService = async (
  pageNumber: number,
  limit: number,
  filters?: string,
): Promise<IResponse<ISalaryData>> => {
  const endpoint = `${ApiNames.salaries}?page=${pageNumber}&limit=${limit}${
    filters ? filters : ""
  }`;

  const { data } = await apiRequest(endpoint, RequestMethod.Get);

  return data;
};

export const createSalaryService = async (
  values: ICreateSalaryBody,
): Promise<IResponse<ISalary>> => {
  const endpoint = ApiNames.salaries;

  const { data } = await apiRequest(endpoint, RequestMethod.Post, values);

  return data;
};

export const updateSalaryService = async (
  id: number,
  values: IUpdateSalaryBody,
): Promise<IResponse<ISalary>> => {
  const endpoint = `${ApiNames.salaries}/${id}`;

  const { data } = await apiRequest(endpoint, RequestMethod.Put, values);

  return data;
};

export const deleteSalaryService = async (
  id: number,
): Promise<IResponse<null>> => {
  const endpoint = `${ApiNames.salaries}/${id}`;

  const { data } = await apiRequest(endpoint, RequestMethod.Delete);

  return data;
};

export const getSalarySummaryService = async (
  filters?: string,
): Promise<IResponse<ISalarySummary>> => {
  const endpoint = `${ApiNames.salariesSummary}${filters ? filters : ""}`;

  const { data } = await apiRequest(endpoint, RequestMethod.Get);

  return data;
};
