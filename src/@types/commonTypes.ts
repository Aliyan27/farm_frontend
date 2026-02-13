export interface IResponse<T> {
  message: string;
  data: T;
}

export interface ISigninResponse {
  token: string;
}
