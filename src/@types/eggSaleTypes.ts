import type { IPagination } from "./commonTypes";

// Single egg sale record (from API response)
export interface IEggSale {
  id: number;
  saleDate: string;
  challanNumber: string | null;
  farm: string;
  amountReceived: number;
  notes: string;
  eggsSold: number;
  pricePerEgg: number;
  totalAmount: number;
  paymentDue: number;
  type: string;
  createdAt: string;
  updatedAt: string;
}

// Paginated list response shape
export interface IEggSaleData {
  items: IEggSale[];
  pagination: IPagination;
}

// Input shape for creating a new sale (what frontend sends)
export interface ICreateEggSaleBody {
  saleDate: string | Date;
  challanNumber?: string;
  eggsSold: number;
  pricePerEgg: number;
  totalAmount: number;
  paymentDue: number;
  farm: string;
  amountReceived: number;
  description: string;
  type?: string;
}

// Input shape for updating a sale (partial)
export interface IUpdateEggSaleBody {
  saleDate?: string | Date;
  challanNumber?: string | null;
  farm?: string;
  amountReceived?: number;
  description?: string;
  type?: string;
}

// Summary shape (adjusted to match current backend reality)
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
      paymentReceived: number | null;
      paymentDue: number | null;
    };
  }>;
}
