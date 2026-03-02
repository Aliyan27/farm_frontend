import ApiNames from "@/constants/ApiNames";
import { apiRequest, apiRequestNoAuth } from "./NetworkService";
import { RequestMethod } from "@/constants/Method";
import type {
  IIncomeStatement,
  IResponse,
  ISigninResponse,
  IUser,
} from "@/@types/commonTypes";

export const signinService = async (email: string, password: string) => {
  let endPoint = ApiNames.signin;

  const { data }: { data: IResponse<ISigninResponse> } = await apiRequestNoAuth(
    endPoint,
    RequestMethod.Post,
    {
      email,
      password,
    },
  );

  return data;
};

export const signupService = async (
  name: string,
  email: string,
  password: string,
) => {
  let endPoint = ApiNames.signup;

  const { data }: { data: IResponse<IUser> } = await apiRequestNoAuth(
    endPoint,
    RequestMethod.Post,
    {
      name,
      email,
      password,
    },
  );

  return data;
};

export const getIncomeStatementService = async (params?: {
  startDate?: string;
  endDate?: string;
  farm?: string;
  month?: string;
}): Promise<IResponse<IIncomeStatement>> => {
  let endpoint = ApiNames.incomeStatement;

  const query = new URLSearchParams();
  if (params?.startDate) query.append("startDate", params.startDate);
  if (params?.endDate) query.append("endDate", params.endDate);
  if (params?.farm) query.append("farm", params.farm);
  if (params?.month) query.append("month", params.month);

  if (query.size > 0) {
    endpoint += `?${query.toString()}`;
  }

  const { data } = await apiRequest(endpoint, RequestMethod.Get);

  return data;
};
