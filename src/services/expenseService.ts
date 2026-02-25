import ApiNames from "@/constants/ApiNames";
import { apiRequest } from "./NetworkService";
import { RequestMethod } from "@/constants/Method";
import type {
  IExpense,
  IExpenseBody,
  IExpenseSummary,
} from "@/@types/expenseTypes";
import type { IResponse } from "@/@types/commonTypes";

export const getAllExpensesService = async (
  pageNumber: number,
  limit: number,
  filters?: string,
) => {
  let endpoint = `${ApiNames.expenses}?page=${pageNumber}&limit=${limit}${filters ? filters : ""}`;

  let { data }: { data: IResponse<IExpenseBody> } = await apiRequest(
    endpoint,
    RequestMethod.Get,
  );

  return data;
};

export interface ICreateExpenseBody {
  expenseDate: Date;
  month: string;
  farm: string;
  expenseCost: number;
  head: string;
  notes?: string;
}

export const createExpenseService = async (values: ICreateExpenseBody) => {
  let endpoint = `${ApiNames.expenses}`;
  let { data }: { data: IResponse<IExpense> } = await apiRequest(
    endpoint,
    RequestMethod.Post,
    values,
  );

  return data;
};

export const updateExpenseService = async (id: number, values: IExpense) => {
  let endpoint = `${ApiNames.expenses}/${id}`;
  let { data }: { data: IResponse<any> } = await apiRequest(
    endpoint,
    RequestMethod.Put,
    values,
  );

  return data;
};

export const deleteExpenseService = async (id: number) => {
  let endpoint = `${ApiNames.expenses}/${id}`;
  let { data }: { data: IResponse<any> } = await apiRequest(
    endpoint,
    RequestMethod.Delete,
  );

  return data;
};

export const getExpenseSummaryService = async (filters?: string) => {
  let endpoint = `${ApiNames.expensesSummary}${filters ? filters : ""}`;

  let { data }: { data: IResponse<IExpenseSummary> } = await apiRequest(
    endpoint,
    RequestMethod.Get,
  );

  return data;
};
