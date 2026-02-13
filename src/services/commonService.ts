import ApiNames from "@/constants/ApiNames";
import { apiRequest } from "./NetworkService";
import { RequestMethod } from "@/constants/Method";
import type { IResponse, ISigninResponse } from "@/@types/commonTypes";

export const signinService = async (email: string, password: string) => {
  let endPoint = ApiNames.signin;

  const { data }: { data: IResponse<ISigninResponse> } = await apiRequest(
    endPoint,
    RequestMethod.Post,
    {
      email,
      password,
    },
  );

  return data;
};
