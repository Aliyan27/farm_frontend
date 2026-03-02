export interface IResponse<T> {
  message: string;
  data: T;
}

export interface ISigninResponse {
  token: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  createdAt: Date;
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface IIncomeStatement {
  period: string;
  grossRevenue: number;
  otherIncome: number;
  totalRevenue: number;
  cogs: {
    chicken: number;
    feed: number;
    medicine: number;
    vaccine: number;
    total: number;
  };
  operatingExpenses: {
    rent: number;
    utilities: number;
    salariesPayments: number;
    mess: number;
    powerElectric: number;
    pol: number;
    packingMaterial: number;
    repairMaintenance: number;
    officeExpenses: number;
    meetingRefreshment: number;
    travellingLogistics: number;
    miscellaneous: number;
    total: number;
  };
  totalExpenses: number;
  netIncome: number;
  notes: string; // e.g. "Profitable"
}
