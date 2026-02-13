import { AppMessage } from "@/constants/AppMessage";
import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorDataCase = (e: unknown): string => {
  try {
    if (e instanceof AxiosError) {
      if (e.response?.data?.result) {
        return String(e.response.data.result);
      }

      // Common backend pattern: { message: "..." }
      if (e.response?.data?.message) {
        return String(e.response.data.message);
      }

      // Axios error message
      if (e.message) {
        return e.message;
      }
    }

    // Non-Axios errors
    if (e instanceof Error) {
      return e.message;
    }

    return AppMessage.requestFailed;
  } catch {
    return AppMessage.requestFailed;
  }
};
