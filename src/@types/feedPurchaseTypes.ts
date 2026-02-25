import type { IPagination } from "./commonTypes";

export interface IFeedData {
  items: IFeed[];
  pagination: IPagination;
}

export interface IFeed {
  id: number;
  date: Date;
  month: string | null;
  voucherType: string;
  feedType: string;
  farm: string;
  bags: number;
  description: number;
  debit: number | null;
  credit: number | null;
  runningBalance: number;
  reconciled: boolean;
  postedToStatement: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFeedSummary {
  totalDebit: number;
  totalCredit: number;
  totalBags: number;
  currentBalance: number;
}
