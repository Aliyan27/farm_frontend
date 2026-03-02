// src/services/reportService.ts

import ApiNames from "@/constants/ApiNames";
import { apiRequest } from "./NetworkService";
import { RequestMethod } from "@/constants/Method";
import type { IResponse } from "@/@types/commonTypes";

// ────────────────────────────────────────────────
// 1. Expense Summary
// ────────────────────────────────────────────────
export interface IExpenseSummary {
  totalExpenses: number;
  byHead: Array<{
    head: string;
    _sum: {
      expenseCost: number | null;
    };
  }>;
  graphData: {
    monthlyTotals: Array<{
      month: string;
      total: number;
    }>;
  };
}

export const getExpenseSummaryService = async (
  startDate?: string,
  endDate?: string,
  farm?: string,
): Promise<IResponse<IExpenseSummary>> => {
  let endpoint = ApiNames.dashboardExpenses; // e.g. "/api/expenses/summary"

  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);
  if (farm) params.append("farm", farm);

  if (params.size > 0) {
    endpoint += `?${params.toString()}`;
  }

  const { data } = await apiRequest(endpoint, RequestMethod.Get);

  return data;
};

// ────────────────────────────────────────────────
// 2. Egg Production Summary
// ────────────────────────────────────────────────
export interface IEggProductionSummary {
  totalProduced: number;
  totalSold: number;
  totalEggs: number;
  byFarm: Array<{
    farm: string;
    _sum: {
      chickenEggs: number | null;
      eggsSold: number | null;
      totalEggs: number | null;
    };
  }>;
  graphData: {
    dailyProduction: Array<{
      date: string;
      totalEggs: number;
    }>;
  };
}

export const getEggProductionSummaryService = async (
  startDate?: string,
  endDate?: string,
  farm?: string,
): Promise<IResponse<IEggProductionSummary>> => {
  let endpoint = ApiNames.dashboardEggProductions;

  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);
  if (farm) params.append("farm", farm);

  if (params.size > 0) {
    endpoint += `?${params.toString()}`;
  }

  const { data } = await apiRequest(endpoint, RequestMethod.Get);

  return data;
};

// ────────────────────────────────────────────────
// 3. Egg Sale Summary
// ────────────────────────────────────────────────
export interface IEggSaleSummary {
  totalEggsSold: number;
  totalRevenue: number;
  totalReceived: number;
  totalDue: number;
  byFarm: Array<{
    farm: string;
    _sum: {
      eggsSold: number | null;
      totalAmount: number | null;
      amountReceived: number | null;
      paymentDue: number | null;
    };
  }>;
  graphData: {
    dailyRevenue: Array<{
      date: string;
      revenue: number;
    }>;
  };
}

export const getEggSaleSummaryService = async (
  startDate?: string,
  endDate?: string,
  farm?: string,
): Promise<IResponse<IEggSaleSummary>> => {
  let endpoint = ApiNames.dashboardEggSales;

  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);
  if (farm) params.append("farm", farm);

  if (params.size > 0) {
    endpoint += `?${params.toString()}`;
  }

  const { data } = await apiRequest(endpoint, RequestMethod.Get);

  return data;
};

// ────────────────────────────────────────────────
// 4. Feed Purchase Summary
// ────────────────────────────────────────────────
export interface IFeedPurchaseSummary {
  totalBags: number;
  totalDebit: number;
  totalCredit: number;
  runningBalance: number;
  byFarm: Array<{
    farm: string;
    _sum: {
      bags: number | null;
      debit: number | null;
      credit: number | null;
      runningBalance: number | null;
    };
  }>;
  graphData: {
    dailyCosts: Array<{
      date: string;
      cost: number;
    }>;
  };
}

export const getFeedPurchaseSummaryService = async (
  startDate?: string,
  endDate?: string,
  farm?: string,
): Promise<IResponse<IFeedPurchaseSummary>> => {
  let endpoint = ApiNames.dashboardFeedPurchase;

  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);
  if (farm) params.append("farm", farm);

  if (params.size > 0) {
    endpoint += `?${params.toString()}`;
  }

  const { data } = await apiRequest(endpoint, RequestMethod.Get);

  return data;
};

// ────────────────────────────────────────────────
// 5. Salary Summary
// ────────────────────────────────────────────────
export interface ISalarySummary {
  totalPaid: number;
  totalAdvance: number;
  totalSalaryAmount: number;
  byFarm: Array<{
    farm: string;
    _sum: {
      total: number | null;
      advance: number | null;
      salaryAmount: number | null;
    };
  }>;
  graphData: {
    monthlyTotals: Array<{
      month: string;
      total: number;
    }>;
  };
}
