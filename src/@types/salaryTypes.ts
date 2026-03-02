import type { IPagination } from "./commonTypes";

// Single salary record (from API response)
export interface ISalary {
  id: number;
  date: string; // ISO string (e.g. "2025-02-01T00:00:00.000Z")
  month: string | null; // e.g. "FEB", "JAN"
  employeeName: string;
  designation: string;
  farm?: string | null; // optional
  total: number; // total salary amount
  advance: number; // advance paid
  salaryAmount: number; // net salary paid
  remarks?: string | null;
  createdAt: string;
  updatedAt: string;
}

// Paginated list response
export interface ISalaryData {
  items: ISalary[];
  pagination: IPagination;
}

// Create payload (what frontend sends to POST)
export interface ICreateSalaryBody {
  date: string | Date;
  month?: string;
  employeeName: string;
  designation: string;
  farm?: string;
  total: number;
  advance?: number;
  salaryAmount: number;
  remarks?: string;
}

// Update payload (partial)
export interface IUpdateSalaryBody {
  date?: string | Date;
  month?: string;
  employeeName?: string;
  designation?: string;
  farm?: string;
  total?: number;
  advance?: number;
  salaryAmount?: number;
  remarks?: string;
}

// Summary shape (matches your backend service)
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
}

// Reusable response wrapper
export interface IResponse<T> {
  message: string;
  data: T | null;
}
