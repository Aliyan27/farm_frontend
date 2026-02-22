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
