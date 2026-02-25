export interface IEggProduction {
  id: number;
  date: string | Date;
  farm: string;
  chickenEggs: number;
  totalEggs: number;
  notes?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ICreateEggProductionBody {
  date: string | Date;
  farm: string;
  chickenEggs: number;
  totalEggs: number;
  notes?: string;
}

export interface IUpdateEggProductionBody {
  id: number;
  date?: string | Date;
  farm?: string;
  chickenEggs?: number;
  totalEggs?: number;
  notes?: string;
}

export interface IEggProductionListResponse {
  items: IEggProduction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface IEggProductionSummary {
  totalEggs: number;
  byFarm: Array<{
    farm: string;
    _sum: {
      chickenEggs: number | null;
      totalEggs: number | null;
    };
  }>;
}

export interface IResponse<T> {
  message: string;
  data: T | null;
}
