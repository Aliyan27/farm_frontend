import axios from "axios";
import { baseUrl } from "../utils/Config";

const newBaseUrl = () => {
  if (window.location.protocol === "http:") {
    let newBaseUrl: string | undefined = baseUrl;
    newBaseUrl = newBaseUrl?.replace("https", "http");
    return newBaseUrl;
  } else {
    return baseUrl;
  }
};

export const apiRequest = async (
  endPoint: string,
  method: string,
  data?: any,
) => {
  // Determine if data is FormData
  const isFormData = data instanceof FormData;

  // Set headers based on data type
  const headers: any = {
    Authorization: "Bearer " + globalThis.authToken,
  };

  // Only set Content-Type for non-FormData requests
  // FormData will automatically set the correct Content-Type with boundary
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await axios({
    url: `${newBaseUrl()}${endPoint}`,
    method: method,
    headers: headers,
    data: data,
  });

  return response;
};

export const apiRequestNoAuth = async (
  endPoint: string,
  method: string,
  data?: any,
) => {
  // Determine if data is FormData
  const isFormData = data instanceof FormData;

  // Set headers based on data type
  const headers: any = {};

  // Only set Content-Type for non-FormData requests
  // FormData will automatically set the correct Content-Type with boundary
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await axios({
    url: `${newBaseUrl()}${endPoint}`,
    method: method,
    headers: headers,
    data: data,
  });

  return response;
};
