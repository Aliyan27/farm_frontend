import ApiNames from "@/constants/ApiNames";
import { apiRequestNoAuth } from "./NetworkService";
import { RequestMethod } from "@/constants/Method";
import type { IResponse, ISigninResponse, IUser } from "@/@types/commonTypes";

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
