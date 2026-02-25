import type { IPagination } from "./commonTypes";

export interface IExpenseBody {
  items: IExpense[];
  pagination: IPagination;
}

export interface IExpense {
  id: number;
  expenseDate: Date;
  month: string;
  challan: null;
  transId: null;
  farm: string;
  expenseCost: number;
  head: string;
  notes: string;
  createdBy: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IExpenseSummary {
  total: number;
  byHead: ByHead[];
  byFarm: ByFarm[];
}

export interface ByFarm {
  _sum: Sum;
  farm: string;
}

export interface Sum {
  expenseCost: number;
}

export interface ByHead {
  _sum: Sum;
  head: string;
}
